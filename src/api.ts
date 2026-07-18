import type { ApiMember, ApiResource, ApiPublication, ApiFile } from './types/api'

class ApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    credentials: 'include',
    headers: {
      ...(init?.body && !(init.body instanceof FormData) ? { 'Content-Type': 'application/json' } : {}),
      ...init?.headers,
    },
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new ApiError(res.status, (data as any)?.error || `Erro ${res.status}`)
  }
  return data as T
}

// --- Auth ---
export const login = (username: string, password: string) =>
  request<{ message: string; role: string }>('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) })

export const register = (username: string, password: string) =>
  request<{ message: string; role: string }>('/auth/register', { method: 'POST', body: JSON.stringify({ username, password }) })

export const logout = () => request<{ message: string }>('/auth/logout', { method: 'POST' })

export const me = () => request<{ username: string; role: string }>('/auth/me')

// --- Members ---
export const getMembers = () => request<{ members: ApiMember[] }>('/api/members').then(r => r.members)
export const createMember = (data: Partial<ApiMember>) =>
  request<{ id: number }>('/api/members', { method: 'POST', body: JSON.stringify(data) })
export const updateMember = (id: number, data: Partial<ApiMember>) =>
  request<{ message: string }>(`/api/members/${id}`, { method: 'PUT', body: JSON.stringify(data) })
export const deleteMember = (id: number) =>
  request<{ message: string }>(`/api/members/${id}`, { method: 'DELETE' })

// --- Resources ---
export const getResources = () => request<{ resources: ApiResource[] }>('/api/resources').then(r => r.resources)
export const createResource = (data: Partial<ApiResource>) =>
  request<{ id: number }>('/api/resources', { method: 'POST', body: JSON.stringify(data) })
export const updateResource = (id: number, data: Partial<ApiResource>) =>
  request<{ message: string }>(`/api/resources/${id}`, { method: 'PUT', body: JSON.stringify(data) })
export const deleteResource = (id: number) =>
  request<{ message: string }>(`/api/resources/${id}`, { method: 'DELETE' })

// --- Publications ---
export const getPublications = () => request<{ publications: ApiPublication[] }>('/api/publications').then(r => r.publications)
export const createPublication = (data: Partial<ApiPublication>) =>
  request<{ id: number }>('/api/publications', { method: 'POST', body: JSON.stringify(data) })
export const updatePublication = (id: number, data: Partial<ApiPublication>) =>
  request<{ message: string }>(`/api/publications/${id}`, { method: 'PUT', body: JSON.stringify(data) })
export const deletePublication = (id: number) =>
  request<{ message: string }>(`/api/publications/${id}`, { method: 'DELETE' })

// --- Upload ---
export const uploadFile = (file: File, category: 'members' | 'resources', replaceKey?: string) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('category', category)
  if (replaceKey) formData.append('replace_key', replaceKey)
  return request<ApiFile>('/api/upload', { method: 'POST', body: formData })
}

export const getStorageStats = () => request<{ used: number; limit: number }>('/api/upload/stats')

export { ApiError }
