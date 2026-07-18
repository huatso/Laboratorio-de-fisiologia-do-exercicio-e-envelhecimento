// Script de migração única: gera worker/seed.sql a partir dos dados estáticos
// que hoje vivem em src/data/*.ts, escapando strings corretamente pro SQLite/D1.
// Não é parte do app em runtime — roda uma vez, revisa o output e descarta.
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = dirname(dirname(fileURLToPath(import.meta.url)))

function sqlStr(v) {
  if (v === null || v === undefined) return 'NULL'
  return `'${String(v).replace(/'/g, "''")}'`
}

// --- Members (extraídos manualmente de src/data/Members.ts) ---
// image_url mapeado pros objetos já enviados ao bucket lafee-files em /files/members/*
const members = [
  { name: 'Francisco Luciano Pontes', image: 'members/default.png', subtitle: 'PhD Sciences - USP', teaser: 'Atualmente é docente do curso de Bacharelado e do programa de pós-graduação em Gerontologia da Escola de Artes, Ciências e Humanidades da Universidade de São Paulo-EACH/USP', bio: 'sdnflkasnflnasdf', location: 'São Paulo - BR', links: 'lucianopontes@usp.br' },
  { name: 'Leandro Brasil Rego', image: 'members/default.png', subtitle: 'Pós-Graduação', teaser: '', bio: '', location: 'São Paulo - BR', links: 'http://lattes.cnpq.br/2489448067323873' },
  { name: 'Ruy Barbosa Martins Calheiros Netto', image: 'members/ruy-barbosa.jpg', subtitle: 'Pós-Graduação', teaser: '', bio: 'Possui graduação em Educação Física pela Universidade de Santo Amaro-UNISA, Mestrado em Ciências do Movimento Humano pela Universidade Cruzeiro do Sul-UNICSUL. Atualmente é Professor titular da Universidade Municipal de São Caetano do Sul-USCS e aluno de Doutorado no programa de Pós-Graduação em Gerontologia pela Escola de Artes, Ciências e Humanidades da Universidade de São Paulo-EACH-USP.', location: 'São Paulo - BR', links: 'http://lattes.cnpq.br/7837616003060870' },
  { name: 'Taína Costa Nonato', image: 'members/taina-costa.jpg', subtitle: 'Pós-Graduação', teaser: '', bio: '', location: 'São Paulo - BR', links: 'http://lattes.cnpq.br/4236304464623906' },
  { name: 'Rodrigo Chaves da Silva', image: 'members/default.png', subtitle: 'Pós-Graduação', teaser: ' ', bio: 'Possui graduação em Gestão Hospitalar pela Universidade Anhembi Morumbi e Gerontologia pela Escola de Artes, Ciências e Humanidades da Universidade de São Paulo-EACH-USP. Atualmente é pesquisador do Instituto Dante Pazzanese de Cardiologia-IDPC e aluno do Mestrado no Programa de Pós-Graduação em Gerontologia pela Escola de Artes, Ciências e Humanidades da Universidade de São Paulo-EACH-USP.', location: 'São Paulo - BR', links: 'http://lattes.cnpq.br/1665363937150810' },
  { name: 'Lucas Marques Vieira', image: 'members/lucas-marques.jpg', subtitle: 'Pós-Graduação', teaser: '', bio: 'Possui Graduação em Educação Física pela Universidade Federal de São Paulo-UNIFESP e Residência Multiprofissional na área de Saúde Pública pela Pontifícia Universidade Católica de São Paulo-PC. Atualmente é aluno de Mestrado no Programa de Pós-Graduação em Gerontologia pela Escola de Artes, Ciências e Humanidades da Universidade de São Paulo-EACH-USP.', location: 'São Paulo - BR', links: 'http://lattes.cnpq.br/4996201644508327' },
  { name: 'Ana Paula de Souza Lima', image: 'members/ana-paula.jpg', subtitle: 'Pós-Graduação', teaser: ' ', bio: 'Possui graduação em Educação Física pela Universidade Mogi das Cruzes-UMC. Especialização em Algias da Coluna Vertebra pela Faculdade Unileya. Analista de Informações, Cultura e Desporto da Secretaria Municipal de Esportes-PMSP. Atualmente é aluna no Programa de Pós-Graduação em Gerontologia pela Escola de Artes, Ciências e Humanidades da Universidade de São Paulo-EACH-USP.', location: 'São Paulo - BR', links: 'http://lattes.cnpq.br/7065004099846705' },
  { name: 'João Paulo Pinto', image: 'members/joao-paulo.jpg', subtitle: 'Pós-Graduação', teaser: ' ', bio: 'Possui Graduação em Gerontologia pela Escola de Artes, Ciências e Humanidades da Universidade de São Paulo-EACH-USP. Especialista MBA em Administração Hospitalar e Sistemas de Saúde pelo Centro Universitário Faculdade de Medicina do ABC, Gestão da Qualidade e Processos pela FM2S Educação Consultoria, Gestão de Projetos e Metodologias Ágeis pela FM2S Educação Consultoria. Atualmente é aluno de Mestrado no programa de Pós-Graduação em Gerontologia pela Escola de Artes, Ciências e Humanidades da Universidade de São Paulo-EACH-USP.', location: 'São Paulo - BR', links: 'http://lattes.cnpq.br/8821060836747211' },
  { name: 'Rodrigo Villar', image: 'members/rodrigo-villar.jpg', subtitle: 'Pesquisador', teaser: ' ', bio: ' ', location: ' ', links: ' ' },
  { name: 'Aylton José Figueira Junior', image: 'members/aylton-jose.jpg', subtitle: 'Pesquisador', teaser: ' ', bio: 'Universidade São Judas Tadeu-USJT. Programa de Pós-graduação em Educação Física', location: 'São Paulo - BR', links: 'http://lattes.cnpq.br/1107427417348652' },
  { name: 'Danilo Sales Bocalini', image: 'members/danilo-sales.jpg', subtitle: 'Pesquisador', teaser: ' ', bio: 'Universidade Federal do Espírito Santo, Centro de Educação Física e Desportos-UFES. Programa de Pós-Graduação em Educação Física.', location: 'São Paulo - BR', links: 'http://lattes.cnpq.br/6290090639004596' },
  { name: 'Felício Savioli Neto', image: 'members/default.png', subtitle: 'Felicio', teaser: ' ', bio: 'Instituto Dante Pazzanese de Cardiologia/Setor de Cardiogeriatria', location: 'São Paulo - BR', links: 'http://lattes.cnpq.br/1217943416869111' },
  { name: 'Ysis Barreto Donati', image: 'members/default.png', subtitle: 'Graduação', teaser: ' ', bio: 'Instituto Dante Pazzanese de Cardiologia/Setor de Cardiogeriatria', location: 'São Paulo - BR', links: 'http://lattes.cnpq.br/1217943416869111' },
  { name: 'Barbara Rafaela Rubino da Silva', image: 'members/default.png', subtitle: 'Graduação', teaser: ' ', bio: 'Instituto Dante Pazzanese de Cardiologia/Setor de Cardiogeriatria', location: 'São Paulo - BR', links: 'http://lattes.cnpq.br/1217943416869111' },
  { name: 'Eloa Silva Lira', image: 'members/default.png', subtitle: 'Graduação', teaser: ' ', bio: 'Instituto Dante Pazzanese de Cardiologia/Setor de Cardiogeriatria', location: 'São Paulo - BR', links: 'http://lattes.cnpq.br/1217943416869111' },
]

// --- Resources ---
const resources = [
  { title: 'Planilha de Coleta de Dados.xlsx', description: 'Modelo de planilha para coleta de dados de VO2 máximo.', download_url: null, upload_year_month: '2025-09', tag: 'Disciplina de Pós-Graduação' },
  { title: 'Artigo sobre Fisiologia do Esforço.pdf', description: 'Publicação sobre as adaptações cardiovasculares.', download_url: '/files/resources/artigo-fisiologia-esforco.pdf', upload_year_month: '2025-09', tag: 'Disciplina de Pós-Graduação' },
  { title: 'Apresentação sobre Biomecânica.pptx', description: 'Slides da apresentação do último congresso da equipe.', download_url: null, upload_year_month: '2025-09', tag: 'Congresso' },
]

// --- Publications: parseadas do rawBibtex de src/data/publications.bib.ts ---
const bibSrc = readFileSync(join(root, 'src/data/publications.bib.ts'), 'utf-8')
const bibMatch = bibSrc.match(/rawBibtex = `([\s\S]*)`;?\s*$/)
if (!bibMatch) throw new Error('Não achei rawBibtex em publications.bib.ts')
const rawBibtex = bibMatch[1].trim()
const entries = rawBibtex.split(/(?=^@article\{)/m).map(e => e.trim()).filter(Boolean)
const publications = entries.map(entry => {
  const keyMatch = entry.match(/^@article\{([^,]+),/)
  if (!keyMatch) throw new Error('Entrada bibtex sem chave: ' + entry.slice(0, 50))
  return { bibtex_key: keyMatch[1], bibtex_raw: entry }
})

// --- Files (controle de armazenamento; tamanhos reais dos objetos já enviados ao R2) ---
const files = [
  { r2_key: 'members/default.png', original_name: 'Default.png', size: 31740, mime_type: 'image/png' },
  { r2_key: 'members/ruy-barbosa.jpg', original_name: 'Ruy_barbosa.jpg', size: 7069, mime_type: 'image/jpeg' },
  { r2_key: 'members/taina-costa.jpg', original_name: 'Taina_costa.jpg', size: 20477, mime_type: 'image/jpeg' },
  { r2_key: 'members/lucas-marques.jpg', original_name: 'Lucas_marques.jpg', size: 13049, mime_type: 'image/jpeg' },
  { r2_key: 'members/ana-paula.jpg', original_name: 'Ana_paula.jpg', size: 4757, mime_type: 'image/jpeg' },
  { r2_key: 'members/joao-paulo.jpg', original_name: 'Joao_paulo.jpg', size: 16464, mime_type: 'image/jpeg' },
  { r2_key: 'members/rodrigo-villar.jpg', original_name: 'Rodrigo_villar.jpg', size: 9373, mime_type: 'image/jpeg' },
  { r2_key: 'members/aylton-jose.jpg', original_name: 'Aylton_jose.jpg', size: 16585, mime_type: 'image/jpeg' },
  { r2_key: 'members/danilo-sales.jpg', original_name: 'Danilo_sales.jpg', size: 9856, mime_type: 'image/jpeg' },
  { r2_key: 'resources/artigo-fisiologia-esforco.pdf', original_name: 'artigo-fisiologia-esforco.pdf', size: 44562, mime_type: 'application/pdf' },
]

let sql = '-- Gerado por scripts/generate-seed.mjs a partir de src/data/*.ts — rodar uma única vez.\n\n'

sql += '-- members\n'
for (const m of members) {
  sql += `INSERT INTO members (name, subtitle, teaser, bio, location, links, image_url) VALUES (${sqlStr(m.name)}, ${sqlStr(m.subtitle)}, ${sqlStr(m.teaser)}, ${sqlStr(m.bio)}, ${sqlStr(m.location)}, ${sqlStr(m.links)}, ${sqlStr('/files/' + m.image)});\n`
}

sql += '\n-- resources\n'
for (const r of resources) {
  sql += `INSERT INTO resources (title, description, download_url, upload_year_month, tag) VALUES (${sqlStr(r.title)}, ${sqlStr(r.description)}, ${sqlStr(r.download_url)}, ${sqlStr(r.upload_year_month)}, ${sqlStr(r.tag)});\n`
}

sql += '\n-- publications\n'
for (const p of publications) {
  sql += `INSERT INTO publications (bibtex_key, bibtex_raw) VALUES (${sqlStr(p.bibtex_key)}, ${sqlStr(p.bibtex_raw)});\n`
}

sql += '\n-- files (controle de cota de 300MB)\n'
for (const f of files) {
  sql += `INSERT INTO files (r2_key, original_name, size, mime_type) VALUES (${sqlStr(f.r2_key)}, ${sqlStr(f.original_name)}, ${f.size}, ${sqlStr(f.mime_type)});\n`
}

writeFileSync(join(root, 'worker/seed.sql'), sql)
console.log(`OK: ${members.length} members, ${resources.length} resources, ${publications.length} publications, ${files.length} files`)
