"use client"

import { useFormFields } from "@payloadcms/ui"
import { QRCodeSVG } from "qrcode.react"
import { useMemo } from "react"

export default function QrPreview() {
	const formValues = useFormFields(([fields]) => ({
		tenant: fields.tenant?.value,
		staticUrl: fields.staticUrl?.value,
		mappedUrl: fields.mappedUrl?.value
	}))

	const { qrUrl, tenantId, hasValues } = useMemo(() => {
		const tenantValue = formValues.tenant

		const staticUrl = formValues.staticUrl

		const mappedUrl = formValues.mappedUrl

		let tenantId: string | null = null

		if (tenantValue) {
			if (typeof tenantValue === "string") {
				tenantId = tenantValue
			}
		}

		const staticUrlStr = typeof staticUrl === "string" ? staticUrl : ""

		const mappedUrlStr = typeof mappedUrl === "string" ? mappedUrl : null

		let qrUrl = ""

		let hasValues = false

		if (tenantId && staticUrlStr) {
			hasValues = true
			let finalUrl = mappedUrlStr || staticUrlStr

			if (!mappedUrlStr && staticUrlStr.includes("{tenantId}")) {
				finalUrl = staticUrlStr.replace("{tenantId}", tenantId)
			}

			qrUrl = finalUrl
		}

		return { qrUrl, tenantId, hasValues }
	}, [formValues.tenant, formValues.staticUrl, formValues.mappedUrl])

	const downloadQR = () => {
		if (!tenantId) return

		try {
			const svgElement = document.getElementById("tenant-qr-code")

			if (!svgElement || !(svgElement instanceof SVGSVGElement)) {
				console.error("QR SVG element not found")

				return
			}

			const serializer = new XMLSerializer()

			const svgStr = serializer.serializeToString(svgElement)

			const canvas = document.createElement("canvas")

			const ctx = canvas.getContext("2d")

			if (!ctx) {
				console.error("Could not get canvas context")

				return
			}

			const size = 300

			canvas.width = size
			canvas.height = size

			const img = new Image()

			img.onload = () => {
				ctx.drawImage(img, 0, 0, size, size)

				const pngData = canvas.toDataURL("image/png")

				const link = document.createElement("a")

				link.href = pngData
				link.download = `qr-code-${tenantId}.png`

				document.body.appendChild(link)
				link.click()
				document.body.removeChild(link)
			}

			img.onerror = () => {
				console.error("Failed to load QR image")
			}

			img.src = "data:image/svg+xml;base64," + btoa(svgStr)
		} catch (error) {
			console.error("Error downloading QR code:", error)
		}
	}

	if (!hasValues) {
		return (
			<div
				style={{
					padding: "16px",
					textAlign: "center",
					background: "#f9f9f9",
					borderRadius: "8px",
					border: "1px dashed #ddd"
				}}>
				<p style={{ margin: 0, color: "#666" }}>Select a tenant and enter a static URL to generate QR code</p>
			</div>
		)
	}

	const isUsingMappedUrl = typeof formValues.mappedUrl === "string" && formValues.mappedUrl.length > 0

	return (
		<div
			style={{
				textAlign: "center",
				padding: "16px",
				background: "white",
				borderRadius: "8px",
				border: "1px solid #e5e5e5",
				boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
			}}>
			<h3
				style={{
					margin: "0 0 12px 0",
					fontSize: "14px",
					fontWeight: "600",
					color: "#333"
				}}>
				QR Code for Tenant
			</h3>

			<div style={{ marginBottom: "12px" }}>
				<small style={{ color: isUsingMappedUrl ? "#10b981" : "#6b7280", fontSize: "11px" }}>
					{isUsingMappedUrl ? "Using mapped URL" : "Using static URL"}
				</small>
			</div>

			<div
				style={{
					display: "inline-block",
					padding: "12px",
					background: "white",
					borderRadius: "4px",
					border: "1px solid #eee"
				}}>
				<QRCodeSVG
					id='tenant-qr-code'
					value={qrUrl}
					size={180}
					bgColor='#FFFFFF'
					fgColor='#000000'
					level='Q'
					includeMargin={true}
				/>
			</div>

			<p
				style={{
					fontSize: "12px",
					margin: "12px 0 8px 0",
					wordBreak: "break-all",
					color: "#666",
					lineHeight: "1.4"
				}}>
				{qrUrl}
			</p>

			<p
				style={{
					fontSize: "11px",
					margin: "0 0 12px 0",
					color: "#999"
				}}>
				Scan this QR code to access tenant portal
			</p>

			<button
				type='button'
				onClick={downloadQR}
				style={{
					padding: "10px 20px",
					fontSize: "14px",
					fontWeight: "500",
					color: "white",
					background: "#0070f3",
					border: "none",
					borderRadius: "6px",
					cursor: "pointer",
					transition: "background 0.2s",
					minWidth: "160px"
				}}
				onMouseOver={(e) => (e.currentTarget.style.background = "#0051cc")}
				onMouseOut={(e) => (e.currentTarget.style.background = "#0070f3")}>
				Download QR Code
			</button>

			<p
				style={{
					fontSize: "10px",
					margin: "8px 0 0 0",
					color: "#aaa"
				}}>
				PNG • 300×300 • High Quality
			</p>
		</div>
	)
}
