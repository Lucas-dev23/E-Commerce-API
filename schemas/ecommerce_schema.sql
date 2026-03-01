-- ============================================
-- E-COMMERCE BANCO DE DADOS SCRIPT
-- Stack: Node.js + Express + PostgreSQL
-- ============================================

-- 1️⃣ Criar banco de dados
CREATE DATABASE ecommerce;

-- 2️⃣ Tabela: usuarios (autenticação)
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3️⃣ Table: categorias
CREATE TABLE IF NOT EXISTS categorias (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4️⃣ Table: produtos
CREATE TABLE IF NOT EXISTS produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT,
    preco NUMERIC(10,2) NOT NULL,
    estoque INTEGER NOT NULL,
    categoria_id INTEGER NOT NULL REFERENCES categorias(id) ON DELETE NO ACTION , -- NÃO APAGAR CATEGORIA QUE TENHA PRODUTOS
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);