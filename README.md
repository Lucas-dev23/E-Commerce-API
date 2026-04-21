# 🛒 E-commerce API

API RESTful para gerenciamento de e-commerce desenvolvida com
**Node.js**, **Express** e **PostgreSQL**, utilizando arquitetura em
camadas (Controller, Service e Repository).

------------------------------------------------------------------------

## 🚀 Tecnologias Utilizadas

-   Node.js
-   Express
-   PostgreSQL
-   pg (node-postgres)
-   dotenv

------------------------------------------------------------------------

## 📂 Estrutura do Projeto

    schemas/
    └── ecommerce_schema.sql

    src/
    ├── configs/
    ├── controllers/
    ├── database/
    ├── middlewares/
    ├── models/
    ├── routes/
    ├── services/
    ├── utils/
    ├── app.js
    └── server.js

------------------------------------------------------------------------

## 🗄️ Banco de Dados

O projeto utiliza PostgreSQL.

O script completo de criação do banco está na pasta:

    schemas/

### Estrutura do Banco

-   **usuarios** → autenticação e autorização\
-   **categorias** → categorias de produtos\
-   **produtos** → produtos do e-commerce

### Regras importantes

-   `email` é único\
-   `categoria_id` é obrigatório\
-   Não é permitido deletar categoria que tenha produtos vinculados
    (`ON DELETE NO ACTION`)

------------------------------------------------------------------------

## ⚙️ Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto no mesmo formato do arquivo
`.env.example`.

### Exemplo:
    PORT=3000
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=sua_senha
    DB_NAME=ecommerce
    JWT_SECRET=sua_chave_secreta
    
⚠️ O arquivo `.env` **não deve ser versionado**.

------------------------------------------------------------------------

## ▶️ Como Executar o Projeto

### 1️⃣ Clonar repositório

    git clone https://github.com/Lucas-dev23/E-Commerce-API.git

### 2️⃣ Instalar dependências

    npm install

### 3️⃣ Criar banco de dados

Execute o script localizado na pasta `schemas` no PostgreSQL.

### 4️⃣ Rodar aplicação

    npm run dev

------------------------------------------------------------------------

## 🩺 Rotas de Teste

### ✅ Health Check

    GET /

Resposta:

``` json
{
  "message": "API E-commerce funcionando 🚀"
}
```

------------------------------------------------------------------------

### ✅ Teste de Conexão com Banco

    GET /teste-db

Retorna a data/hora atual do servidor PostgreSQL:

``` json
[
  {
    "now": "2026-03-01T15:23:45.000Z"
  }
]
```

------------------------------------------------------------------------

## 🏗️ Arquitetura

O projeto segue arquitetura em camadas:

-   **Controller** → recebe requisições HTTP\
-   **Service** → regras de negócio\
-   **Repository** → acesso ao banco de dados\
-   **Config** → configuração de ambiente e conexão

### Benefícios:

-   Organização do código\
-   Separação de responsabilidades\
-   Facilidade de manutenção\
-   Escalabilidade\
-   Testabilidade

------------------------------------------------------------------------

## 📌 Status do Projeto

🚧 Em desenvolvimento

### Próximos passos:

-   Implementar autenticação com JWT\
-   CRUD completo de usuários\
-   CRUD completo de produtos\
-   CRUD completo de categorias\
-   Upload de fotos dos produtos
-   Middleware de autenticação\
-   Validações de entrada\
-   Tratamento global de erros

------------------------------------------------------------------------

## 👨‍💻 Autor

Lucas Lima\
Desenvolvedor Backend focado em Node.js e PostgreSQL.