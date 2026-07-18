export interface Member {
  id: number
  name: string
  subtitle: string | null
  teaser: string | null
  bio: string | null
  location: string | null
  links: string | null
  image_url: string | null
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Resource {
  id: number
  title: string
  description: string | null
  download_url: string | null
  upload_year_month: string | null
  tag: string | null
  created_at: string
  updated_at: string
}

export interface Publication {
  id: number
  bibtex_key: string
  bibtex_raw: string
  created_at: string
  updated_at: string
}

export interface FileRecord {
  id: number
  r2_key: string
  original_name: string | null
  size: number
  mime_type: string | null
  created_at: string
}

export interface User {
  id: number
  username: string
  password_hash: string
  salt: string
  role: 'admin' | 'viewer'
  created_at: string
}
