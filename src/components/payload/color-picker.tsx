import React from "react"

interface ColorPreviewProps {
	value?: string
}

export const ColorPreview: React.FC<ColorPreviewProps> = ({ value }) => {
	return (
		<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
			<div
				style={{
					width: 24,
					height: 24,
					borderRadius: 4,
					backgroundColor: value || "#fff",
					border: "1px solid #ccc"
				}}
			/>
			<span>{value}</span>
		</div>
	)
}
