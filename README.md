# Gerenciador de Dragões

Plataforma web para gerenciamento de dragões (CRUD) desenvolvida em Next.js com TypeScript, Tailwind CSS, Docker e integração com MockAPI.

## Tecnologias Utilizadas

- Framework: Next.js 15+ (App Router)
- Linguagem: TypeScript
- Estilização: Tailwind CSS e shadcn/ui
- Autenticação: Cookie-based estático via Middleware Next.js
- Containerização: Docker e Docker Compose

## Credenciais de Acesso

- E-mail: admin@email.com
- Senha: 123456

## Como Executar a Aplicação

### Via Docker (Recomendado)

1. Certifique-se de ter o Docker e o Docker Compose instalados.
2. Na raiz do projeto, execute:

```bash
docker compose up --build
```

3. Acesse a aplicação em:

```
http://localhost:3000
```

4. Para parar os contêineres:

```bash
docker compose down
```

### Via Ambiente Local (Node.js)

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

3. Acesse a aplicação em `http://localhost:3000`.
