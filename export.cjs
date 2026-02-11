/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client")

const fs = require("fs")

const prisma = new PrismaClient()

async function exportAll() {
	const raw = await prisma.$queryRawUnsafe(
		"SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
	)

	const tables = raw.map((t) => t.table_name)

	let sqlOutput = ""

	for (const table of tables) {
		sqlOutput += `DROP TABLE IF EXISTS "${table}" CASCADE;\n`

		const createTable = await prisma.$queryRawUnsafe(
			`SELECT 'CREATE TABLE "' || table_name || '" (' ||
                string_agg('  "' || column_name || '" ' || 
                    data_type || 
                    CASE 
                        WHEN character_maximum_length IS NOT NULL 
                        THEN '(' || character_maximum_length || ')'
                        ELSE ''
                    END ||
                    CASE 
                        WHEN is_nullable = 'NO' THEN ' NOT NULL'
                        ELSE ''
                    END ||
                    CASE 
                        WHEN column_default IS NOT NULL 
                        THEN ' DEFAULT ' || column_default
                        ELSE ''
                    END, ',\n') ||
                '\n);' as create_statement
            FROM information_schema.columns 
            WHERE table_name = '${table}'
            GROUP BY table_name`
		)

		if (createTable[0]?.create_statement) {
			sqlOutput += createTable[0].create_statement + "\n\n"
		}
	}

	for (const table of tables) {
		try {
			const data = await prisma.$queryRawUnsafe(`SELECT * FROM "${table}"`)

			if (data.length > 0) {
				for (const row of data) {
					const columns = Object.keys(row)
						.map((c) => `"${c}"`)
						.join(", ")

					const values = Object.values(row)
						.map((v) => {
							if (v === null) return "NULL"

							if (typeof v === "string") return `'${v.replace(/'/g, "''")}'`

							if (v instanceof Date) return `'${v.toISOString()}'`

							if (typeof v === "object") return `'${JSON.stringify(v).replace(/'/g, "''")}'`

							return v
						})
						.join(", ")

					sqlOutput += `INSERT INTO "${table}" (${columns}) VALUES (${values});\n`
				}
				sqlOutput += "\n"
			}
		} catch (err) {
			console.log(`   ❌ ${table}: ${err.message}`)
		}
	}

	fs.writeFileSync("prisma_full_backup.sql", sqlOutput, "utf8")
	console.log("file: prisma_full_backup.sql")

	const stats = fs.statSync("prisma_full_backup.sql")

	console.log("stats", stats)
}

exportAll()
	.catch(console.error)
	.finally(() => prisma.$disconnect())
