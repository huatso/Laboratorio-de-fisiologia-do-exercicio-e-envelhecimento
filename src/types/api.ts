export interface ApiMember {
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

export interface ApiResource {
  id: number
  title: string
  description: string | null
  download_url: string | null
  upload_year_month: string | null
  tag: string | null
  created_at: string
  updated_at: string
}

export interface ApiPublication {
  id: number
  bibtex_key: string
  bibtex_raw: string
  created_at: string
  updated_at: string
}

export interface ApiFile {
  r2_key: string
  url: string
  size: number
  mime_type: string
}
