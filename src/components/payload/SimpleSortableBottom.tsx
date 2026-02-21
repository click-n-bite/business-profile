/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState, useEffect } from "react"
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent
} from "@dnd-kit/core"
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
	useSortable
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useRouter } from "next/navigation"

const SimpleSortableBottom: React.FC = () => {
	const [items, setItems] = useState<any[]>([])

	const [loading, setLoading] = useState(true)

	const [collectionSlug, setCollectionSlug] = useState<string>("")

	const router = useRouter()

	useEffect(() => {
		if (typeof window !== "undefined") {
			const pathParts = window.location.pathname.split("/")

			const collectionsIndex = pathParts.indexOf("collections")

			if (collectionsIndex !== -1 && pathParts[collectionsIndex + 1]) {
				setCollectionSlug(pathParts[collectionsIndex + 1])
			}
		}
	}, [])

	// Fetch items
	useEffect(() => {
		if (collectionSlug) {
			fetchItems()
		}
	}, [collectionSlug])

	const fetchItems = async () => {
		try {
			setLoading(true)
			const res = await fetch(`/api/${collectionSlug}?limit=100&sort=order`)

			const data = await res.json()

			setItems(data.docs || [])
		} catch (error) {
			console.error("Error fetching items:", error)
		} finally {
			setLoading(false)
		}
	}

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: { distance: 8 }
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	)

	const handleDragEnd = async (event: DragEndEvent) => {
		const { active, over } = event

		if (active.id !== over?.id) {
			setItems((currentItems) => {
				const oldIndex = currentItems.findIndex((item) => item.id === active.id)

				const newIndex = currentItems.findIndex((item) => item.id === over?.id)

				if (oldIndex === -1 || newIndex === -1) return currentItems

				const newItems = arrayMove(currentItems, oldIndex, newIndex)

				updateOrders(newItems)

				return newItems
			})
		}
	}

	const updateOrders = async (updatedItems: any[]) => {
		try {
			await Promise.all(
				updatedItems.map((item, index) =>
					fetch(`/api/${collectionSlug}/${item.id}`, {
						method: "PATCH",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ order: index })
					})
				)
			)
			router.refresh()
		} catch (error) {
			console.error("Error updating orders:", error)
		}
	}

	const getTitle = (item: any) => {
		if (item.title || item.name) {
			if (typeof item.title === "string") return item.title || item.name

			return (
				item.title.en ||
				item.title.fr ||
				Object.values(item.title)[0] ||
				"Untitled" ||
				item.name.en ||
				Object.values(item.name)[0]
			)
		}

		return "Untitled"
	}

	if (loading) {
		return <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>Loading sortable list...</div>
	}

	if (items.length === 0) {
		return null
	}

	return (
		<div
			style={{
				marginTop: "30px",
				padding: "20px",
				backgroundColor: "#f9f9f9",
				borderRadius: "8px",
				border: "1px solid #e2e8f0"
			}}>
			<h3
				style={{
					margin: "0 0 15px 0",
					fontSize: "18px",
					fontWeight: "600",
					color: "#1a1a1a"
				}}>
				Drag & Drop to Reorder
			</h3>

			<p
				style={{
					margin: "0 0 20px 0",
					fontSize: "14px",
					color: "#666",
					fontStyle: "italic"
				}}>
				Drag items by the handle ⋮⋮ to change their order
			</p>

			<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
				<SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
					<div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
						{items.map((item, index) => {
							const title = getTitle(item)

							return <SortableItem key={item.id} id={item.id} title={title} index={index} order={item.order || 0} />
						})}
					</div>
				</SortableContext>
			</DndContext>

			<div
				style={{
					marginTop: "15px",
					padding: "10px",
					backgroundColor: "#e9ecef",
					borderRadius: "4px",
					fontSize: "13px",
					color: "#495057",
					textAlign: "center"
				}}>
				💡 Changes are saved automatically when you drop an item
			</div>
		</div>
	)
}

interface SortableItemProps {
	id: string
	title: string
	index: number
	order: number
}

const SortableItem: React.FC<SortableItemProps> = ({ id, title, index, order }) => {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
		zIndex: isDragging ? 999 : "auto"
	}

	return (
		<div ref={setNodeRef} style={style}>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "12px",
					padding: "12px 16px",
					backgroundColor: isDragging ? "#f0f7ff" : "white",
					border: isDragging ? "2px solid #007bff" : "1px solid #e2e8f0",
					borderRadius: "6px",
					boxShadow: isDragging ? "0 4px 12px rgba(0,0,0,0.1)" : "0 1px 3px rgba(0,0,0,0.05)"
				}}>
				{/* Drag Handle */}
				<div
					{...attributes}
					{...listeners}
					style={{
						cursor: "grab",
						padding: "8px 12px",
						color: "#666",
						fontSize: "20px",
						borderRadius: "4px",
						backgroundColor: isDragging ? "#e6f0ff" : "#f5f5f5",
						userSelect: "none",
						display: "flex",
						alignItems: "center"
					}}>
					⋮⋮
				</div>

				{/* Order Badge */}
				<div
					style={{
						minWidth: "60px",
						padding: "4px 8px",
						backgroundColor: "#007bff",
						color: "white",
						borderRadius: "20px",
						fontSize: "13px",
						fontWeight: "600",
						textAlign: "center"
					}}>
					#{index + 1}
				</div>

				{/* Title */}
				<div
					style={{
						flex: 1,
						fontWeight: "500",
						color: "#1a1a1a"
					}}>
					{title}
				</div>

				{/* Old order value (for reference) */}
				<div
					style={{
						fontSize: "12px",
						color: "#999",
						backgroundColor: "#f5f5f5",
						padding: "4px 8px",
						borderRadius: "4px"
					}}>
					order: {order}
				</div>
			</div>
		</div>
	)
}

export default SimpleSortableBottom
