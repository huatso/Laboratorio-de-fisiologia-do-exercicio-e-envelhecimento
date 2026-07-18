# Plano de Desenvolvimento — LAFEE Worker Full-Stack

## Objetivo
Transformar o site LaFEE de SPA React estático em aplicação full-stack Cloudflare Worker (Hono + React + D1), com painel admin para gerenciar conteúdos dinâmicos.

## Status geral: Fases 1–8 completas. Deploy feito e validado em produção: **https://lafee.huatso-hh.workers.dev**

## Decisões de infraestrutura
- **KV e R2 próprios do LAFEE**, não compartilhados com outros projetos (ex: huatso-images) — namespaces/buckets isolados, cada Worker só enxerga o que está no seu próprio binding.
- **Limite de armazenamento do projeto: 300MB** — aplicado em nível de aplicação (R2 não tem cap nativo por bucket), somando o tamanho dos arquivos registrados no D1 antes de aceitar cada novo upload.
- **Assets estáticos do site (logo, vídeos do build) continuam bundlados e servidos via `env.ASSETS`, fora do R2** — só entram na cota de 300MB os arquivos enviados pelo admin em runtime (fotos de membros, PDFs de recursos).
- **Autenticação via tabela `users` no D1**: cadastro aberto em `/admin/register`, primeiro usuário vira admin (todos viram admin), senha hasheada com PBKDF2-SHA256 + salt, sessão em KV com cookie httpOnly + SameSite=Lax + Secure (7 dias TTL).
- **Stack de build**: `@cloudflare/vite-plugin` — descoberto porque já existia uma branch remota `origin/cloudflare/workers-autoconfig` gerada pelo bot da Cloudflare com o nome do worker (`lafee`) e esse plugin já sugeridos. Seguimos esse padrão para ficar alinhado com o que a Cloudflare Workers Builds (dashboard) já espera desse repo.

---

## ☑ Fase 1 — Provisionar recursos Cloudflare (KV + R2 + D1)

- [x] KV namespace `lafee-sessions` criado — id `ff26c9be4b9a448a88edc59a276ec68a`
- [x] Bucket R2 `lafee-files` criado
- [x] D1 database `lafee-db` criado — id `93ab17a8-796f-4bb9-87b0-4fcbf537804f`
- [x] Isolamento confirmado: `wrangler.jsonc` do LAFEE só referencia esses três recursos, nenhum overlap com huatso-images

---

## ☑ Fase 2 — Estrutura do Worker Full-Stack

- [x] `npm install hono`, `wrangler`, `@cloudflare/vite-plugin`, `@cloudflare/workers-types` (v5, compatível com wrangler 4.112)
- [x] `vite.config.ts` com `cloudflare()` plugin
- [x] `wrangler.jsonc` com D1 (`DB`) + KV (`KV`) + R2 (`R2`) + assets (`ASSETS`) bindings reais
- [x] `.gitignore` atualizado (`.dev.vars*`, `.env*`, `.wrangler` — adotado da branch bot)
- [x] `tsconfig.worker.json` dedicado (não interfere no build do React)

### Estrutura real implementada (worker/ na raiz, não dentro de src/)

```
worker/
├── index.ts              ← Hono app entry point (Env type: DB, KV, R2, ASSETS, ADMIN_USER, ADMIN_PASS)
├── db.ts                  ← D1 helpers (query, queryOne, execute)
├── types.ts                ← Member, Resource, Publication, FileRecord
├── schema.sql                ← DDL das 4 tabelas
├── seed.sql                   ← gerado por scripts/generate-seed.mjs, já aplicado no D1 remoto
├── lib/magic-bytes.ts           ← classifica upload por magic bytes reais (não confia em Content-Type do cliente)
├── middleware/
│   ├── auth.ts                    ← createSession/destroySession + middleware auth (cookie + KV)
│   └── rate-limit.ts                ← sliding window genérico (KV)
└── routes/
    ├── auth.ts                        ← POST /auth/login (rate limit 5/min), /logout, GET /me
    ├── members.ts                       ← CRUD /api/members
    ├── resources.ts                       ← CRUD /api/resources
    ├── publications.ts                      ← CRUD /api/publications
    ├── upload.ts                              ← POST /api/upload, GET /api/upload/stats, DELETE /api/upload/:id
    └── files.ts                                 ← GET /files/:category/:filename (serve do R2)
```

Painel admin React ficou em `src/admin/` (não `src/admin/` separado do resto do app — faz parte do mesmo SPA/roteador, não um app isolado).

---

## ☑ Fase 3 — Banco de Dados (D1)

Schema aplicado (local + remoto) com as 4 tabelas planejadas: `members`, `resources`, `publications`, `files` (controle de cota de 300MB). Único ajuste: `members` ganhou uma coluna `sort_order INTEGER DEFAULT 0` (não estava no plano original) pra permitir reordenar a listagem pelo admin.

- [x] `worker/schema.sql` criado e aplicado (`wrangler d1 execute lafee-db --file=worker/schema.sql`, local e `--remote`)
- [x] **Migração inicial concluída**: `scripts/generate-seed.mjs` leu `src/data/Members.ts`, `Resources.ts`, `publications.bib.ts` e gerou `worker/seed.sql` (15 members, 3 resources, 5 publications, 10 files) — aplicado no D1 remoto
- [x] 9 fotos de perfil + 1 PDF de recurso enviados ao bucket `lafee-files` via `wrangler r2 object put --remote` (`members/*.jpg`, `members/default.png`, `resources/artigo-fisiologia-esforco.pdf`)
- [x] Verificado no D1 remoto: contagens batem (15/3/5) e soma de `files.size` ≈ 174KB de 300MB usados

`src/data/Members.ts`, `Resources.ts`, `publications.bib.ts` **não foram deletados** — ficam como backup/histórico até confirmar que o site em produção está servindo tudo certo via API. Podem ser removidos depois. `src/data/Researches.ts` já estava órfão antes desse trabalho (a página Research.tsx nunca importou esse arquivo) — não faz parte do escopo, não foi migrado, é conteúdo hardcoded direto no `.tsx`.

---

## ☑ Fase 4 — Autenticação

- [x] `worker/schema.sql`: tabela `users` com `username`, `password_hash`, `salt`, `role` (admin/viewer)
- [x] `worker/middleware/auth.ts`: sessão em KV (`session:<token>`, armazena userId/username/role, TTL 7 dias), cookie httpOnly + SameSite=Lax + Secure; middleware `auth` (verifica sessão) e `adminOnly` (verifica role)
- [x] `worker/routes/auth.ts`: `POST /auth/register` (cadastro aberto, hash PBKDF2-SHA256 + salt, rate limit 5/min), `POST /auth/login` (rate limit 10/min), `POST /auth/logout`, `GET /auth/me`
- [x] Frontend: `src/admin/AdminRegister.tsx` + link em `AdminLogin.tsx` para cadastro
- [x] `.dev.vars` removido — credenciais agora são gerenciadas via D1 + KV, sem secrets de env

---

## ☑ Fase 5 — API Endpoints

Todos implementados e testados localmente (`wrangler dev`, D1 local seedado):

- [x] Members / Resources / Publications: CRUD completo, leitura pública, escrita protegida por `auth`
- [x] `POST /api/upload`: classifica por magic bytes (`worker/lib/magic-bytes.ts` — imagens, PDF, containers zip-based p/ docx/xlsx/pptx), checa `SUM(size)` contra 300MB, rate limit 20/min, apaga `r2_key` antigo quando `replace_key` é passado (evita lixo órfão)
- [x] `GET /api/upload/stats`: usado pelo dashboard admin (`used`/`limit`)
- [x] `DELETE /api/upload/:id`
- [x] `GET /files/:category/:filename`: serve do R2, `Content-Disposition: attachment` forçado pra tudo que não é imagem raster segura (mesma lógica anti-XSS-inline do huatso-images)

---

## ☑ Fase 6 — Painel Admin (React)

Implementado em `src/admin/`: `AuthContext`, `ProtectedRoute`, `AdminLayout` (sidebar), `AdminLogin`, `AdminDashboard` (contagens + barra de uso X/300MB), `AdminMembers`, `AdminResources`, `AdminPublications`. Rotas `/admin`, `/admin/login`, `/admin/members`, `/admin/resources`, `/admin/publications` registradas em `src/main.tsx`, com `AuthProvider` envolvendo o `RouterProvider`.

**Desvio consciente do plano original**: ao invés de componentes genéricos separados (`DataTable.tsx`, `MemberForm.tsx`, `ResourceForm.tsx`, `BibtexEditor.tsx`), cada `Admin*.tsx` é auto-contido (tabela + modal de formulário inline). Funciona igual, só não tem a camada de abstração reutilizável — refatorar pra componentes compartilhados é opcional, não é um bug.

`AdminPublications` edita o BibTeX como texto puro (textarea monoespaçada) em vez de um editor de campos estruturado — mais simples, mas exige que quem for editar saiba o formato BibTeX.

---

## ☑ Fase 7 — Adaptar Frontend Público

- [x] `Members.tsx`, `Resources.tsx`, `Publication.tsx` trocaram import estático por `fetch` via `src/api.ts`, com loading (`Spinner`) e error (`Alert`) states
- [x] `About.tsx` e `Research.tsx` não precisaram de mudança — nunca consumiram dados estáticos de `src/data/`
- [x] Build de assets confirmado funcionando via `@cloudflare/vite-plugin` (não precisou de lógica manual de `ASSETS.fetch` fallback pro SPA — o plugin cuida disso com `not_found_handling: single-page-application`)

---

## ☑ Fase 8 — Deploy

- [x] Recursos Cloudflare provisionados (Fase 1)
- [x] `wrangler d1 execute lafee-db --file=worker/schema.sql` e `--file=worker/seed.sql` já rodados **no D1 remoto** (produção já tem os dados)
- [x] Auth agora é via tabela `users` no D1 (não mais `.dev.vars`/secrets de env) — cadastro do admin acontece pela própria UI em `/admin/register`, protegido pela trava de "só enquanto não existir admin" (ver seção de bugs corrigidos acima)
- [x] `npx wrangler deploy` executado — usuário pediu explicitamente ("dá um wrangler deploy") depois de eu flagar e corrigir a falha de cadastro aberto
- [ ] Associar domínio customizado (se houver) — não solicitado ainda

---

## Validação feita nesta sessão

- `tsc --noEmit -p tsconfig.worker.json` — limpo
- `tsc -b` (frontend React) — limpo
- `npm run build` (tsc + vite build via cloudflare plugin) — build completo, Worker bundle + SPA client gerados sem erro
- `wrangler dev` local com D1 local seedado: testados manualmente `GET /api/members`, `GET /api/resources`, `POST /auth/login` (certo e errado), `GET /auth/me` com cookie, `POST /api/members` autenticado, `DELETE /api/members/:id`, e rate limit de login (5 tentativas OK, 6ª+ retorna 429)
- `/files/:key` **não foi testado localmente** (os uploads foram feitos com `--remote`, direto no R2 de produção; o D1/R2 local do `wrangler dev` não tem esses objetos) — funciona pela mesma lógica de `image.ts` do huatso-images, mas vale um teste manual pós-deploy

---

## Bugs encontrados e corrigidos numa segunda sessão (após mudanças de outro agente em Fase 4)

Outro agente reescreveu a Fase 4 entre a sessão anterior e esta: trocou o admin único via env vars (`ADMIN_USER`/`ADMIN_PASS` em `.dev.vars`) por uma tabela `users` real no D1 com cadastro público em `/admin/register` (PBKDF2-SHA256 + salt, roles admin/viewer). Essa mudança está refletida nas seções de Fase 4 acima. Ao testar essa versão, apareceram 3 problemas:

1. **Erro de rota no browser** (reportado pelo usuário via screenshot do console): `Uncaught Error: Absolute route path "/admin" nested under path "/admin/" is not valid.` Causa: `src/main.tsx` usava paths **absolutos** repetidos (`/admin`) em 3 níveis de rotas aninhadas (`ProtectedRoute` → `AdminLayout` → `AdminDashboard`), o que o React Router v7 (`createBrowserRouter`) rejeita. **Corrigido**: trocado para `index: true` na rota padrão do layout e paths **relativos** (`members`, `resources`, `publications`) nos filhos, em vez de repetir `/admin` em cada nível. Esse bug já existia desde a implementação original (Fase 6) — só não tinha sido pego porque a app nunca tinha sido aberta num browser de verdade, só testada via `curl` na API.

2. **`tsc -b` poluindo `src/` com `.js` soltos a cada build**: o `tsconfig.json` raiz não tinha `noEmit` nem `references` pros `tsconfig.app.json`/`tsconfig.node.json`, então `tsc -b` compilava e emitia `.js` ao lado de cada `.tsx`/`.ts` em `src/`. **Corrigido**: adicionado `"noEmit": true` no `tsconfig.json` raiz (Vite/esbuild já faz a transpilação de verdade, `tsc` aqui é só type-check).

3. **Falha de segurança grave**: `POST /auth/register` estava aberto ao público e atribuía `role = 'admin'` **para todo mundo que se cadastrasse**, não só o primeiro usuário — apesar do comentário no código dizer o contrário. Como não existe hoje nenhuma rota que diferencie admin de viewer na prática (todas usam só o middleware `auth`, não `adminOnly`), isso significa que **qualquer visitante da internet poderia se cadastrar e ganhar acesso de escrita total** ao conteúdo do site assim que fosse feito o deploy. **Corrigido** em `worker/routes/auth.ts`: `POST /auth/register` agora checa `SELECT COUNT(*) FROM users` e só permite cadastro quando a tabela está vazia (bootstrap do único admin); depois disso retorna `403 Cadastro fechado`. Testado local: 1º cadastro cria admin (201), 2º cadastro é bloqueado (403). Confirmado que a tabela `users` remota estava vazia (nenhum cadastro real tinha acontecido ainda), então a correção não quebrou nenhuma conta existente.

---

## Pendências para revisar antes de ir ao ar

1. **Criar a conta real de admin**: acessar https://lafee.huatso-hh.workers.dev/admin/register e cadastrar — é a primeira e única vez que vai funcionar (fecha sozinho depois, ver bug #3 corrigido acima). Depois, validar login, CRUD de membros/recursos/publicações e upload de arquivo pela UI.
   - Smoke test já feito nesta sessão contra produção: `GET /api/members` (200, dados reais), `GET /files/members/ruy-barbosa.jpg` (200, confirma que o serving do R2 funciona — esse caminho nunca tinha sido testado antes, só localmente onde não há objetos), `GET /` (200, SPA carrega), `POST /auth/register` alcançável (400 por payload vazio, não testei com credencial real de propósito — isso fica pra você).
2. **Branch remota `origin/cloudflare/workers-autoconfig`** existe no GitHub (gerada pelo bot da Cloudflare) com uma versão mais simples do `wrangler.jsonc` — como já implementamos um `wrangler.jsonc` completo direto na `master` local, essa branch remota ficou obsoleta. Vale fechar/deletar ela no GitHub depois que este trabalho for commitado, pra não confundir.
3. **`src/data/Members.ts`, `Resources.ts`, `publications.bib.ts`** ainda existem no repo mas não são mais importados por nenhuma página — são só histórico da migração. Podem ser deletados com segurança depois que o site em produção for validado.
4. **Sem testes automatizados** — o huatso-images tem `test_security.sh`; o LAFEE não ganhou um equivalente nesta sessão. Se o projeto crescer, vale considerar.
5. **`scripts/generate-seed.mjs`** foi uma migração de uso único (já rodou, já aplicou). Não faz parte do runtime do app — pode ser deletado ou mantido como referência histórica.
6. **`adminOnly` middleware existe mas não é usado em nenhuma rota** (`members.ts`, `resources.ts`, `publications.ts`, `upload.ts` só checam `auth`, isto é, "está logado", não "é admin"). Hoje isso não é um problema prático porque só existe o role `admin` de fato (cadastro fechado após o primeiro), mas se algum dia o app ganhar um segundo role de verdade (viewer com permissões restritas), essas rotas de escrita precisam trocar `auth` por `adminOnly`.
7. Nada foi commitado nem enviado ao GitHub — todas as mudanças estão só no working tree local. `git status` mostra o diff completo quando for a hora de revisar e commitar.

---

## Ordem de Implementação (histórico)

1. ✅ Fase 1 (provisionar KV + R2 + D1 próprios)
2. ✅ Fase 2 (estrutura worker + dependências)
3. ✅ Fase 3 + 4 (DB + auth)
4. ✅ Fase 5 (API endpoints, incluindo upload/limite de 300MB)
5. ✅ Fase 6 (Admin panel React)
6. ✅ Fase 7 (adaptar frontend público)
7. ✅ Fase 8 (deploy) — feito, https://lafee.huatso-hh.workers.dev no ar
