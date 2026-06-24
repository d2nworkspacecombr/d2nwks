# D2N Workspace

Plataforma interna da D2N Carreira e Negócios — Fase 1 + Módulo de Assessoria.

## O que já está pronto nesta primeira versão

- **Login** com Supabase Auth (e-mail/senha)
- **3 perfis de acesso**: Admin, Colaborador, Cliente (regras já aplicadas no banco)
- **Cadastro de Clientes**, com campo de serviços contratados
- **Vínculo Colaborador ↔ Cliente**: o Admin decide quais colaboradores acessam quais clientes (um cliente pode ter vários colaboradores vinculados)
- **Módulo de Assessoria**: lista de clientes de assessoria (filtrada automaticamente por quem está logado) e, dentro de cada cliente, 3 abas:
  - Sessões de atendimento (histórico)
  - Planejamento estratégico (5 pilares: Comercial, Marketing, Processos, Pessoas, Finanças)
  - Plano tático (OKRs com barra de progresso)
- Placeholder do módulo de **Diagnóstico** (a migração da ferramenta HTML existente vem na próxima etapa)

## Passo a passo para colocar no ar

### 1. Criar o projeto no Supabase
1. Acesse [supabase.com](https://supabase.com), crie uma conta e um novo projeto.
2. No menu **SQL Editor**, cole o conteúdo do arquivo `supabase/schema.sql` e clique em **Run**. Isso cria todas as tabelas e as regras de permissão automaticamente.
3. Em **Project Settings > API**, copie a **Project URL** e a **anon public key**.

### 2. Configurar o projeto localmente
1. Renomeie o arquivo `.env.example` para `.env.local`.
2. Cole a URL e a chave que você copiou no passo anterior.
3. Instale as dependências: `npm install`
4. Rode localmente: `npm run dev` e acesse `http://localhost:3000`

### 3. Criar os primeiros usuários
Por enquanto, os logins são criados manualmente pelo Admin direto no Supabase:
1. No painel do Supabase, vá em **Authentication > Users > Add user**.
2. Crie o e-mail e senha da pessoa.
3. Depois, na tabela **usuarios** (menu **Table Editor**), encontre o registro criado automaticamente para essa pessoa e edite a coluna `role` para `admin` ou `colaborador`, e preencha `cargo` (ex: "Assessor").

> Isso será substituído por uma tela de gestão de usuários numa próxima etapa — por agora, fazemos direto no Supabase pra simplificar.

### 4. Subir para o GitHub
```
git init
git add .
git commit -m "Primeira versão do D2N Workspace"
git branch -M main
git remote add origin SEU_REPOSITORIO_AQUI
git push -u origin main
```

### 5. Publicar no Vercel
1. Acesse [vercel.com](https://vercel.com), conecte sua conta do GitHub.
2. Importe o repositório do D2N Workspace.
3. Em **Environment Variables**, adicione as mesmas duas variáveis do `.env.local`.
4. Clique em **Deploy**.
5. Depois, em **Settings > Domains**, adicione `d2nworkspace.com.br` e siga as instruções de DNS.

## Como funciona o controle de acesso (explicado sem termos técnicos)

- O **Admin** sempre vê todos os clientes e pode editar tudo.
- Um **Colaborador** só vê os clientes que o Admin vinculou a ele, na tela de detalhe do cliente (`/clientes/[cliente]`).
- Se dois colaboradores (ex: Diogo e Taique) estiverem vinculados ao mesmo cliente, **os dois** veem e editam as mesmas informações — não é um acesso exclusivo, é compartilhado entre quem está vinculado.
- Essas regras não dependem do código da tela — elas estão garantidas dentro do próprio banco de dados (Supabase), então mesmo que uma tela nova seja criada no futuro, a regra de permissão já vale automaticamente.

## Próximos passos sugeridos

1. Você envia os prints do relatório de Assessoria atual → eu ajusto os campos finos das 3 abas para bater exatamente com o que vocês usam hoje.
2. Migrar o módulo de Diagnóstico para este mesmo sistema (hoje é só um placeholder).
3. Criar uma tela de gestão de usuários para o Admin (hoje é feito direto no Supabase).
4. Fase 1.2: Relatório de Atendimento por Assessor.
