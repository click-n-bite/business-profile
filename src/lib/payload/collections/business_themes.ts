import { CollectionConfig } from "payload"

const BRAND_COLORS = [
	{ label: "Blue", value: "#3B82F6" },
	{ label: "Green", value: "#136c36" },
	{ label: "Red", value: "#c30811" },
	{ label: "Yellow", value: "#FACC15" },
	{ label: "Purple", value: "#8B5CF6" },
	{ label: "Pink", value: "#EC4899" },
	{ label: "Gray", value: "#6B7280" }
]

export const BusinessThemes: CollectionConfig = {
	slug: "business_themes",
	admin: {
		useAsTitle: "name"
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: false
		},
		{
			name: "lightBackground",
			type: "group",
			fields: [
				{
					name: "type",
					type: "select",
					options: [
						{ label: "Color", value: "color" },
						{ label: "Image", value: "image" }
					],
					defaultValue: "color"
				},
				{
					name: "color",
					type: "select",
					options: [
						{ label: "White", value: "#FFFFFF" },
						{ label: "Gray 50", value: "#F9FAFB" },
						{ label: "Gray 100", value: "#F3F4F6" }
					],
					admin: {
						condition: (_, siblingData) => siblingData.type === "color"
					}
				},
				{
					name: "image",
					type: "upload",
					relationTo: "media",
					admin: {
						condition: (_, siblingData) => siblingData.type === "image"
					}
				}
			]
		},
		{
			name: "themeType",
			type: "select",
			label: "Theme Type",
			required: true,
			defaultValue: "business",
			options: [
				{
					label: "👔 Business / Professional",
					value: "business"
				},
				{
					label: "👤 Personal / Individual",
					value: "personal"
				}
			]
		},
		{
			name: "darkBackground",
			type: "group",
			fields: [
				{
					name: "type",
					type: "select",
					options: [
						{ label: "Color", value: "color" },
						{ label: "Image", value: "image" }
					],
					defaultValue: "color",
					required: true
				},
				{
					name: "color",
					type: "select",
					options: [
						{ label: "Black", value: "#000000" },
						{ label: "Gray 900", value: "#111827" }
					],
					admin: {
						condition: (_, siblingData) => siblingData?.type === "color"
					}
				},
				{
					name: "image",
					type: "upload",
					relationTo: "media",
					admin: {
						condition: (_, siblingData) => siblingData?.type === "image"
					}
				}
			]
		},
		{
			name: "primaryColor",
			type: "select",
			required: true,
			options: BRAND_COLORS
		},
		{
			name: "secondaryColor",
			type: "select",
			options: BRAND_COLORS
		},
		{
			name: "accentColor",
			type: "select",
			options: BRAND_COLORS
		}
	]
}

// import { CollectionConfig } from "payload"

// const BRAND_COLORS = [
// 	{ label: "Blue", value: "#3B82F6" },
// 	{ label: "Green", value: "#136c36" },
// 	{ label: "Red", value: "#c30811" },
// 	{ label: "Yellow", value: "#FACC15" },
// 	{ label: "Purple", value: "#8B5CF6" },
// 	{ label: "Pink", value: "#EC4899" },
// 	{ label: "Gray", value: "#6B7280" },
// 	{ label: "Orange", value: "#F97316" },
// 	{ label: "Teal", value: "#14B8A6" },
// 	{ label: "Indigo", value: "#6366F1" },
// 	{ label: "Rose", value: "#F43F5E" },
// 	{ label: "Emerald", value: "#10B981" },
// 	{ label: "Cyan", value: "#06B6D4" },
// 	{ label: "Violet", value: "#8B5CF6" },
// 	{ label: "Amber", value: "#F59E0B" }
// ]

// const PERSONAL_COLORS = [
// 	{ label: "Soft Pink", value: "#FCE7F3" },
// 	{ label: "Light Blue", value: "#DBEAFE" },
// 	{ label: "Mint Green", value: "#D1FAE5" },
// 	{ label: "Lavender", value: "#E9D5FF" },
// 	{ label: "Peach", value: "#FFEDD5" },
// 	{ label: "Sky Blue", value: "#E0F2FE" },
// 	{ label: "Light Gray", value: "#F3F4F6" },
// 	{ label: "Beige", value: "#FEF3C7" },
// 	{ label: "Rose Quartz", value: "#FECDD3" },
// 	{ label: "Sea Foam", value: "#CCFBF1" }
// ]

// const BUSINESS_COLORS = [
// 	{ label: "Corporate Blue", value: "#1E40AF" },
// 	{ label: "Professional Gray", value: "#4B5563" },
// 	{ label: "Trust Green", value: "#065F46" },
// 	{ label: "Energy Orange", value: "#EA580C" },
// 	{ label: "Creative Purple", value: "#7C3AED" },
// 	{ label: "Innovation Teal", value: "#0D9488" },
// 	{ label: "Luxury Gold", value: "#B45309" },
// 	{ label: "Modern Black", value: "#1F2937" },
// 	{ label: "Tech Blue", value: "#2563EB" },
// 	{ label: "Eco Green", value: "#15803D" }
// ]

// export const BusinessThemes: CollectionConfig = {
// 	slug: "business_themes",
// 	admin: {
// 		useAsTitle: "name",
// 		group: "Design",
// 		description: "Custom themes for personal or business profiles"
// 	},
// 	fields: [
// 		{
// 			name: "name",
// 			type: "text",
// 			required: true,
// 			label: "Theme Name",
// 			admin: {
// 				placeholder: "My Professional Theme"
// 			}
// 		},
// 		{
// 			name: "description",
// 			type: "textarea",
// 			label: "Description",
// 			admin: {
// 				placeholder: "Describe this theme (e.g., 'Clean professional look for corporate profiles')"
// 			}
// 		},
// 		{
// 			name: "themeType",
// 			type: "select",
// 			label: "Theme Type",
// 			required: true,
// 			defaultValue: "business",
// 			options: [
// 				{
// 					label: "👔 Business / Professional",
// 					value: "business",
// 					description: "Formal, corporate, or professional appearance"
// 				},
// 				{
// 					label: "👤 Personal / Individual",
// 					value: "personal",
// 					description: "Casual, personal, or individual profile"
// 				},
// 				{
// 					label: "🎨 Creative / Portfolio",
// 					value: "creative",
// 					description: "Artistic, creative, or portfolio-focused"
// 				},
// 				{
// 					label: "🛍️ E-commerce / Retail",
// 					value: "ecommerce",
// 					description: "For online stores and product-focused profiles"
// 				}
// 			],
// 			admin: {
// 				description: "Select the purpose of this theme"
// 			}
// 		},
// 		{
// 			name: "isDefault",
// 			type: "checkbox",
// 			label: "Set as Default Theme",
// 			admin: {
// 				description: "Use this theme as the default for new profiles"
// 			}
// 		},
// 		{
// 			name: "category",
// 			type: "select",
// 			label: "Category",
// 			options: [
// 				{ label: "Minimal", value: "minimal" },
// 				{ label: "Modern", value: "modern" },
// 				{ label: "Vintage", value: "vintage" },
// 				{ label: "Dark", value: "dark" },
// 				{ label: "Bright", value: "bright" },
// 				{ label: "Gradient", value: "gradient" },
// 				{ label: "Geometric", value: "geometric" },
// 				{ label: "Nature", value: "nature" }
// 			],
// 			admin: {
// 				condition: (data) => data.themeType === "creative"
// 			}
// 		},

// 		// Appearance Settings
// 		{
// 			name: "appearance",
// 			type: "group",
// 			label: "Appearance Settings",
// 			admin: {
// 				description: "Customize the look and feel"
// 			},
// 			fields: [
// 				{
// 					name: "roundedness",
// 					type: "select",
// 					label: "Border Radius",
// 					options: [
// 						{ label: "Sharp (0px)", value: "0" },
// 						{ label: "Slightly Rounded (4px)", value: "4" },
// 						{ label: "Rounded (8px)", value: "8" },
// 						{ label: "Very Rounded (16px)", value: "16" },
// 						{ label: "Pill (9999px)", value: "9999" }
// 					],
// 					defaultValue: "8"
// 				},
// 				{
// 					name: "shadow",
// 					type: "select",
// 					label: "Shadow Intensity",
// 					options: [
// 						{ label: "None", value: "none" },
// 						{ label: "Subtle", value: "sm" },
// 						{ label: "Medium", value: "md" },
// 						{ label: "Large", value: "lg" },
// 						{ label: "Extra Large", value: "xl" }
// 					],
// 					defaultValue: "md"
// 				},
// 				{
// 					name: "animation",
// 					type: "select",
// 					label: "Animation Style",
// 					options: [
// 						{ label: "None", value: "none" },
// 						{ label: "Subtle", value: "subtle" },
// 						{ label: "Smooth", value: "smooth" },
// 						{ label: "Bouncy", value: "bouncy" }
// 					],
// 					defaultValue: "smooth"
// 				}
// 			]
// 		},

// 		// Light Mode Background
// 		{
// 			name: "lightBackground",
// 			type: "group",
// 			label: "Light Mode Background",
// 			admin: {
// 				description: "Background settings for light mode"
// 			},
// 			fields: [
// 				{
// 					name: "type",
// 					type: "select",
// 					options: [
// 						{ label: "Solid Color", value: "color" },
// 						{ label: "Gradient", value: "gradient" },
// 						{ label: "Image", value: "image" },
// 						{ label: "Pattern", value: "pattern" }
// 					],
// 					defaultValue: "color"
// 				},
// 				{
// 					name: "color",
// 					type: "select",
// 					options: [
// 						{ label: "White", value: "#FFFFFF" },
// 						{ label: "Off White", value: "#FAFAFA" },
// 						{ label: "Gray 50", value: "#F9FAFB" },
// 						{ label: "Gray 100", value: "#F3F4F6" },
// 						{ label: "Light Blue", value: "#EFF6FF" },
// 						{ label: "Light Green", value: "#F0FDF4" },
// 						{ label: "Light Pink", value: "#FDF2F8" }
// 					],
// 					admin: {
// 						condition: (_, siblingData) => siblingData.type === "color"
// 					}
// 				},
// 				{
// 					name: "gradient",
// 					type: "group",
// 					label: "Gradient Settings",
// 					admin: {
// 						condition: (_, siblingData) => siblingData.type === "gradient"
// 					},
// 					fields: [
// 						{
// 							name: "from",
// 							type: "text",
// 							label: "From Color",
// 							defaultValue: "#FFFFFF"
// 						},
// 						{
// 							name: "to",
// 							type: "text",
// 							label: "To Color",
// 							defaultValue: "#F3F4F6"
// 						},
// 						{
// 							name: "direction",
// 							type: "select",
// 							label: "Direction",
// 							options: [
// 								{ label: "Top to Bottom", value: "to-b" },
// 								{ label: "Left to Right", value: "to-r" },
// 								{ label: "Diagonal", value: "to-br" }
// 							],
// 							defaultValue: "to-b"
// 						}
// 					]
// 				},
// 				{
// 					name: "image",
// 					type: "upload",
// 					relationTo: "media",
// 					admin: {
// 						condition: (_, siblingData) => siblingData.type === "image"
// 					}
// 				},
// 				{
// 					name: "pattern",
// 					type: "select",
// 					label: "Pattern Style",
// 					options: [
// 						{ label: "Dots", value: "dots" },
// 						{ label: "Grid", value: "grid" },
// 						{ label: "Lines", value: "lines" },
// 						{ label: "Zigzag", value: "zigzag" }
// 					],
// 					admin: {
// 						condition: (_, siblingData) => siblingData.type === "pattern"
// 					}
// 				},
// 				{
// 					name: "blur",
// 					type: "checkbox",
// 					label: "Blur Effect",
// 					defaultValue: false,
// 					admin: {
// 						condition: (_, siblingData) => siblingData.type === "image"
// 					}
// 				}
// 			]
// 		},

// 		// Dark Mode Background
// 		{
// 			name: "darkBackground",
// 			type: "group",
// 			label: "Dark Mode Background",
// 			admin: {
// 				description: "Background settings for dark mode"
// 			},
// 			fields: [
// 				{
// 					name: "type",
// 					type: "select",
// 					options: [
// 						{ label: "Solid Color", value: "color" },
// 						{ label: "Gradient", value: "gradient" },
// 						{ label: "Image", value: "image" },
// 						{ label: "Pattern", value: "pattern" }
// 					],
// 					defaultValue: "color",
// 					required: true
// 				},
// 				{
// 					name: "color",
// 					type: "select",
// 					options: [
// 						{ label: "Black", value: "#000000" },
// 						{ label: "Dark Gray", value: "#111827" },
// 						{ label: "Gray 900", value: "#111827" },
// 						{ label: "Gray 800", value: "#1F2937" },
// 						{ label: "Navy Blue", value: "#1E3A8A" },
// 						{ label: "Forest Green", value: "#064E3B" }
// 					],
// 					admin: {
// 						condition: (_, siblingData) => siblingData?.type === "color"
// 					}
// 				},
// 				{
// 					name: "gradient",
// 					type: "group",
// 					label: "Gradient Settings",
// 					admin: {
// 						condition: (_, siblingData) => siblingData.type === "gradient"
// 					},
// 					fields: [
// 						{
// 							name: "from",
// 							type: "text",
// 							label: "From Color",
// 							defaultValue: "#111827"
// 						},
// 						{
// 							name: "to",
// 							type: "text",
// 							label: "To Color",
// 							defaultValue: "#1F2937"
// 						}
// 					]
// 				},
// 				{
// 					name: "image",
// 					type: "upload",
// 					relationTo: "media",
// 					admin: {
// 						condition: (_, siblingData) => siblingData?.type === "image"
// 					}
// 				},
// 				{
// 					name: "blur",
// 					type: "checkbox",
// 					label: "Blur Effect",
// 					defaultValue: false,
// 					admin: {
// 						condition: (_, siblingData) => siblingData.type === "image"
// 					}
// 				}
// 			]
// 		},

// 		// Color Palette - Conditional based on theme type
// 		{
// 			name: "colorPalette",
// 			type: "group",
// 			label: "Color Palette",
// 			admin: {
// 				description: "Customize the color scheme",
// 				condition: (data) => data.themeType !== "ecommerce"
// 			},
// 			fields: [
// 				{
// 					name: "primaryColor",
// 					type: "select",
// 					label: "Primary Color",
// 					required: true,
// 					options: BRAND_COLORS,
// 					defaultValue: "#3B82F6",
// 					admin: {
// 						description: "Main brand color for buttons and highlights"
// 					}
// 				},
// 				{
// 					name: "secondaryColor",
// 					type: "select",
// 					label: "Secondary Color",
// 					options: BRAND_COLORS,
// 					admin: {
// 						description: "Secondary accent color"
// 					}
// 				},
// 				{
// 					name: "accentColor",
// 					type: "select",
// 					label: "Accent Color",
// 					options: BRAND_COLORS,
// 					admin: {
// 						description: "For special highlights and CTAs"
// 					}
// 				}
// 			]
// 		},

// 		// Personal Theme Specific Settings
// 		{
// 			name: "personalSettings",
// 			type: "group",
// 			label: "Personal Theme Settings",
// 			admin: {
// 				condition: (data) => data.themeType === "personal"
// 			},
// 			fields: [
// 				{
// 					name: "mood",
// 					type: "select",
// 					label: "Theme Mood",
// 					options: [
// 						{ label: "Warm & Friendly", value: "warm" },
// 						{ label: "Cool & Calm", value: "cool" },
// 						{ label: "Vibrant & Energetic", value: "vibrant" },
// 						{ label: "Soft & Gentle", value: "soft" },
// 						{ label: "Bold & Confident", value: "bold" }
// 					],
// 					defaultValue: "warm"
// 				},
// 				{
// 					name: "personalColors",
// 					type: "select",
// 					label: "Color Palette",
// 					options: PERSONAL_COLORS,
// 					defaultValue: "#FCE7F3"
// 				},
// 				{
// 					name: "showAvatar",
// 					type: "checkbox",
// 					label: "Show Profile Avatar",
// 					defaultValue: true
// 				}
// 			]
// 		},

// 		// Business Theme Specific Settings
// 		{
// 			name: "businessSettings",
// 			type: "group",
// 			label: "Business Theme Settings",
// 			admin: {
// 				condition: (data) => data.themeType === "business"
// 			},
// 			fields: [
// 				{
// 					name: "businessColors",
// 					type: "select",
// 					label: "Business Color Palette",
// 					options: BUSINESS_COLORS,
// 					defaultValue: "#1E40AF"
// 				},
// 				{
// 					name: "formality",
// 					type: "select",
// 					label: "Formality Level",
// 					options: [
// 						{ label: "Corporate", value: "corporate" },
// 						{ label: "Professional", value: "professional" },
// 						{ label: "Casual Business", value: "casual" },
// 						{ label: "Startup", value: "startup" }
// 					],
// 					defaultValue: "professional"
// 				},
// 				{
// 					name: "showLogo",
// 					type: "checkbox",
// 					label: "Show Company Logo",
// 					defaultValue: true
// 				},
// 				{
// 					name: "showTagline",
// 					type: "checkbox",
// 					label: "Show Business Tagline",
// 					defaultValue: true
// 				}
// 			]
// 		},

// 		// Creative Theme Specific Settings
// 		{
// 			name: "creativeSettings",
// 			type: "group",
// 			label: "Creative Theme Settings",
// 			admin: {
// 				condition: (data) => data.themeType === "creative"
// 			},
// 			fields: [
// 				{
// 					name: "artisticStyle",
// 					type: "select",
// 					label: "Artistic Style",
// 					options: [
// 						{ label: "Minimalist", value: "minimalist" },
// 						{ label: "Abstract", value: "abstract" },
// 						{ label: "Geometric", value: "geometric" },
// 						{ label: "Organic", value: "organic" },
// 						{ label: "Typography Focused", value: "typography" }
// 					],
// 					defaultValue: "minimalist"
// 				},
// 				{
// 					name: "animationIntensity",
// 					type: "select",
// 					label: "Animation Intensity",
// 					options: [
// 						{ label: "None", value: "none" },
// 						{ label: "Subtle", value: "subtle" },
// 						{ label: "Moderate", value: "moderate" },
// 						{ label: "High", value: "high" }
// 					],
// 					defaultValue: "moderate"
// 				},
// 				{
// 					name: "showWorkSamples",
// 					type: "checkbox",
// 					label: "Show Work Samples Section",
// 					defaultValue: true
// 				}
// 			]
// 		},

// 		// E-commerce Theme Specific Settings
// 		{
// 			name: "ecommerceSettings",
// 			type: "group",
// 			label: "E-commerce Theme Settings",
// 			admin: {
// 				condition: (data) => data.themeType === "ecommerce"
// 			},
// 			fields: [
// 				{
// 					name: "storeType",
// 					type: "select",
// 					label: "Store Type",
// 					options: [
// 						{ label: "Fashion & Apparel", value: "fashion" },
// 						{ label: "Electronics", value: "electronics" },
// 						{ label: "Home & Living", value: "home" },
// 						{ label: "Beauty & Cosmetics", value: "beauty" },
// 						{ label: "Food & Beverage", value: "food" }
// 					],
// 					defaultValue: "fashion"
// 				},
// 				{
// 					name: "ctaColor",
// 					type: "select",
// 					label: "Call-to-Action Color",
// 					options: [
// 						{ label: "Buy Now Red", value: "#DC2626" },
// 						{ label: "Shop Green", value: "#16A34A" },
// 						{ label: "Add to Cart Orange", value: "#EA580C" },
// 						{ label: "Checkout Blue", value: "#2563EB" }
// 					],
// 					defaultValue: "#DC2626"
// 				},
// 				{
// 					name: "showProductGrid",
// 					type: "checkbox",
// 					label: "Show Product Grid",
// 					defaultValue: true
// 				},
// 				{
// 					name: "showPrices",
// 					type: "checkbox",
// 					label: "Display Prices",
// 					defaultValue: true
// 				}
// 			]
// 		},

// 		// Font Settings
// 		{
// 			name: "fonts",
// 			type: "group",
// 			label: "Font Settings",
// 			fields: [
// 				{
// 					name: "primaryFont",
// 					type: "text",
// 					label: "Primary Font",
// 					defaultValue: "Inter",
// 					admin: {
// 						description: "Main font for headings and titles"
// 					}
// 				},
// 				{
// 					name: "secondaryFont",
// 					type: "text",
// 					label: "Secondary Font",
// 					defaultValue: "Roboto",
// 					admin: {
// 						description: "Font for body text and paragraphs"
// 					}
// 				},
// 				{
// 					name: "fontSize",
// 					type: "select",
// 					label: "Base Font Size",
// 					options: [
// 						{ label: "Small", value: "14px" },
// 						{ label: "Medium", value: "16px" },
// 						{ label: "Large", value: "18px" }
// 					],
// 					defaultValue: "16px"
// 				}
// 			]
// 		},

// 		// Advanced Settings
// 		{
// 			name: "advanced",
// 			type: "group",
// 			label: "Advanced Settings",
// 			admin: {
// 				description: "Additional customization options"
// 			},
// 			fields: [
// 				{
// 					name: "customCSS",
// 					type: "code",
// 					label: "Custom CSS",
// 					admin: {
// 						language: "css"
// 					}
// 				},
// 				{
// 					name: "customJS",
// 					type: "code",
// 					label: "Custom JavaScript",
// 					admin: {
// 						language: "javascript"
// 					}
// 				},
// 				{
// 					name: "metadata",
// 					type: "textarea",
// 					label: "Theme Metadata",
// 					admin: {
// 						description: "Additional theme configuration in JSON format"
// 					}
// 				}
// 			]
// 		},

// 		// SEO & Visibility
// 		{
// 			name: "seo",
// 			type: "group",
// 			label: "SEO & Visibility",
// 			fields: [
// 				{
// 					name: "visible",
// 					type: "checkbox",
// 					label: "Publicly Visible",
// 					defaultValue: true,
// 					admin: {
// 						description: "Make this theme available for selection"
// 					}
// 				},
// 				{
// 					name: "featured",
// 					type: "checkbox",
// 					label: "Featured Theme",
// 					defaultValue: false,
// 					admin: {
// 						description: "Highlight this theme as featured"
// 					}
// 				},
// 				{
// 					name: "keywords",
// 					type: "text",
// 					label: "SEO Keywords",
// 					admin: {
// 						description: "Comma-separated keywords for search"
// 					}
// 				}
// 			]
// 		}
// 	]
// }
