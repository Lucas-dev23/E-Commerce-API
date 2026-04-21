-- ============================================
-- E-COMMERCE BANCO DE DADOS SCRIPT
-- ============================================

-- 1️⃣ Criar banco de dados
CREATE DATABASE ecommerce;

-- 2️⃣ Tabela: perfis
CREATE TABLE IF NOT EXISTS perfis (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) UNIQUE NOT NULL,
    nivel_acesso INT NOT NULL
)

-- 3️⃣ Adicionar perfis
INSERT INTO perfis (nome, nivel_acesso) VALUES
('Usuario', 1),
('Administrador', 2);

-- 4️⃣ Tabela: usuarios 
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    perfil_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

    -- Criando uma foreign Key
    CONSTRAINT fk_perfil
        FOREIGN KEY (perfil_id)
        REFERENCES perfis(id)
);

-- 5️⃣ Tabela: categorias
CREATE TABLE IF NOT EXISTS categorias (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6️⃣ Tabela: produtos
CREATE TABLE IF NOT EXISTS produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT,
    preco NUMERIC(10,2) NOT NULL,
    estoque INTEGER NOT NULL,
    categoria_id INTEGER NOT NULL REFERENCES categorias(id) ON DELETE NO ACTION , -- NÃO APAGAR CATEGORIA QUE TENHA PRODUTOS
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);