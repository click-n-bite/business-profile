/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiConfig {
	baseURL: string
	timeout?: number
}

export class ApiClient {
	private baseURL: string
	private timeout: number

	constructor(config: ApiConfig) {
		this.baseURL = config.baseURL
		this.timeout = config.timeout || 10000
	}

	private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
		const url = `${this.baseURL}${endpoint}`

		const username = process.env.NEXT_PUBLIC_INTERNAL_API_USERNAME

		const password = process.env.NEXT_PUBLIC_INTERNAL_API_PASSWORD

		if (!username || !password) {
			throw new Error("API credentials are not configured")
		}

		const auth = Buffer.from(`${username}:${password}`).toString("base64")

		const headers = {
			"Content-Type": "application/json",
			Authorization: `Basic ${auth}`,
			...options.headers
		}

		const controller = new AbortController()

		const timeoutId = setTimeout(() => controller.abort(), this.timeout)

		try {
			const response = await fetch(url, {
				...options,
				headers,
				signal: controller.signal
			})

			clearTimeout(timeoutId)

			if (!response.ok) {
				const errorText = await response.text()

				throw new Error(`API Error (${response.status}): ${errorText}`)
			}

			return await response.json()
		} catch (error) {
			clearTimeout(timeoutId)

			if (error instanceof Error && error.name === "AbortError") {
				throw new Error(`Request timeout after ${this.timeout}ms`)
			}

			throw error
		}
	}

	async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
		return this.request<T>(endpoint, {
			...options,
			method: "GET"
		})
	}

	async post<T>(endpoint: string, body?: any, options?: RequestInit): Promise<T> {
		return this.request<T>(endpoint, {
			...options,
			method: "POST",
			body: body ? JSON.stringify(body) : undefined
		})
	}

	async patch<T>(endpoint: string, body?: any, options?: RequestInit): Promise<T> {
		return this.request<T>(endpoint, {
			...options,
			method: "PATCH",
			body: body ? JSON.stringify(body) : undefined
		})
	}

	async put<T>(endpoint: string, body?: any, options?: RequestInit): Promise<T> {
		return this.request<T>(endpoint, {
			...options,
			method: "PUT",
			body: body ? JSON.stringify(body) : undefined
		})
	}

	async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
		return this.request<T>(endpoint, {
			...options,
			method: "DELETE"
		})
	}
}

const apiClient = new ApiClient({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:3000",
	timeout: 15000
})

export default apiClient
