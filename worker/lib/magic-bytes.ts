const MAGIC_BYTES: Record<string, { magic: number[]; ext: string; mime: string }[]> = {
  jpg: [{ magic: [0xFF, 0xD8, 0xFF], ext: 'jpg', mime: 'image/jpeg' }],
  png: [{ magic: [0x89, 0x50, 0x4E, 0x47], ext: 'png', mime: 'image/png' }],
  gif: [{ magic: [0x47, 0x49, 0x46, 0x38], ext: 'gif', mime: 'image/gif' }],
  avif: [{ magic: [0x00, 0x00, 0x00, 0x1C, 0x66, 0x74, 0x79, 0x70, 0x61, 0x76, 0x69, 0x66], ext: 'avif', mime: 'image/avif' }],
  svg: [
    { magic: [0x3C, 0x73, 0x76, 0x67], ext: 'svg', mime: 'image/svg+xml' },
    { magic: [0x3C, 0x3F, 0x78, 0x6D], ext: 'svg', mime: 'image/svg+xml' },
  ],
  pdf: [{ magic: [0x25, 0x50, 0x44, 0x46], ext: 'pdf', mime: 'application/pdf' }],
}

function isWebp(bytes: Uint8Array): boolean {
  const riff = [0x52, 0x49, 0x46, 0x46]
  const webp = [0x57, 0x45, 0x42, 0x50]
  return bytes.length >= 12 && riff.every((b, i) => bytes[i] === b) && webp.every((b, i) => bytes[8 + i] === b)
}

// PK\x03\x04 = zip container. Cobre docx/xlsx/pptx/odt/ods/odp, que são zips
// por dentro — não dá pra diferenciar sem inspecionar o conteúdo interno, então
// nesse caso confiamos na extensão do nome original só para escolher o rótulo,
// mas o Content-Type servido continua genérico/seguro.
function isZipContainer(bytes: Uint8Array): boolean {
  return bytes.length >= 4 && bytes[0] === 0x50 && bytes[1] === 0x4B && (bytes[2] === 0x03 || bytes[2] === 0x05 || bytes[2] === 0x07)
}

const OFFICE_MIME: Record<string, string> = {
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  odt: 'application/vnd.oasis.opendocument.text',
  ods: 'application/vnd.oasis.opendocument.spreadsheet',
  odp: 'application/vnd.oasis.opendocument.presentation',
}

function extFromName(name: string): string {
  const dotIdx = name.lastIndexOf('.')
  return dotIdx > 0 ? name.slice(dotIdx + 1).toLowerCase() : 'bin'
}

export const IMAGE_EXTS = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'avif', 'svg']

/**
 * Classifica um upload pelos magic bytes reais, nunca pelo Content-Type/extensão
 * informados pelo cliente. SVG é imagem mas não é "inline safe" (pode conter
 * <script>). Formatos zip-based (docx/xlsx/pptx) usam a extensão do nome como
 * rótulo (o container real é sempre o mesmo), mas nunca são tratados como
 * inline-safe. Qualquer coisa não reconhecida vira binário genérico.
 */
export function classifyUpload(buffer: Uint8Array, fallbackName: string): {
  ext: string
  mimeType: string
  inlineSafe: boolean
} {
  if (isWebp(buffer)) return { ext: 'webp', mimeType: 'image/webp', inlineSafe: true }

  for (const [key, patterns] of Object.entries(MAGIC_BYTES)) {
    for (const pattern of patterns) {
      if (buffer.length >= pattern.magic.length && pattern.magic.every((b, i) => buffer[i] === b)) {
        return { ext: pattern.ext, mimeType: pattern.mime, inlineSafe: key !== 'svg' }
      }
    }
  }

  if (isZipContainer(buffer)) {
    const ext = extFromName(fallbackName)
    const mime = OFFICE_MIME[ext] || 'application/zip'
    return { ext, mimeType: mime, inlineSafe: false }
  }

  return { ext: extFromName(fallbackName), mimeType: 'application/octet-stream', inlineSafe: false }
}
