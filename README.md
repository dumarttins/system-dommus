# Dommus Full‑Stack Application

Este repositório contém a aplicação **Dommus** (backend em Laravel + frontend em React) para gerenciamento de empreendimentos e unidades.

---

## 🏗️ Estrutura de Pastas

```
dommus-api/                # Backend Laravel (Docker)
├── app/
│   ├── Http/Controllers/Api
│   │   ├── AuthController.php
│   │   ├── EmpreendimentoController.php
│   │   └── UnidadeController.php
│   └── Models
│       ├── Empreendimento.php
│       ├── Unidade.php
│       └── ReajusteLog.php
├── database/
│   ├── migrations/
│   ├── seeders/
│   └── factories/
├── routes/
│   └── api.php
├── docker-compose.yml
├── Dockerfile
└── .env.example

dommus-frontend/           # Frontend React
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── services/api.js
│   ├── App.jsx
│   └── index.js
└── package.json
```

---

## 🚀 Tecnologias

- **Backend:** PHP 8.2, Laravel 12, Sanctum, MySQL, Docker (app, db, nginx)
- **Frontend:** React 18, React Router, Axios, Formik, Yup, Bootstrap

---

## 📦 Instalação & Execução

### 1. Clone o repositório

```bash
git clone https://github.com/dumarttins/system-dommus.git
cd system-dommus/dommus-api
```

### 2. Backend Laravel (Docker)

1. Copie o `.env.example` para `.env` e ajuste as credenciais:
   ```dotenv
   DB_CONNECTION=mysql
   DB_HOST=db
   DB_PORT=3306
   DB_DATABASE=dommus
   DB_USERNAME=dommus
   DB_PASSWORD=password
   SANCTUM_STATEFUL_DOMAINS=localhost:3000
   ```
2. Suba os containers:
   ```bash
    docker-compose up -d
```
3. Instale dependências e crie tabelas:
   ```bash
    docker-compose exec app composer install
    docker-compose exec app php artisan migrate --seed
```
4. Verifique rotas disponíveis (opcional):
   ```bash
docker-compose exec app php artisan route:list
```

### 3. Frontend React

Abra outro terminal:
```bash
cd ../dommus-frontend
npm install
npm start
```
O app será aberto automaticamente em `http://localhost:3000`.

---

## 🔑 Endpoints da API

| Método | Rota                                            | Ação                                            |
| ------ | ----------------------------------------------- | ----------------------------------------------- |
| POST   | `/api/register`                                | Registrar usuário                               |
| POST   | `/api/login`                                   | Login                                           |
| POST   | `/api/logout`                                  | Logout (token)                                  |
| GET    | `/api/user`                                    | Dados do usuário autenticado                    |
| GET    | `/api/empreendimentos`                        | Listar empreendimentos (filtros & paginação)    |
| POST   | `/api/empreendimentos`                        | Criar empreendimento                             |
| GET    | `/api/empreendimentos/{id}`                   | Obter detalhes de um empreendimento              |
| PUT    | `/api/empreendimentos/{id}`                   | Atualizar empreendimento                         |
| DELETE | `/api/empreendimentos/{id}`                   | Excluir empreendimento (checagem de unidades)    |
| POST   | `/api/empreendimentos/{id}/unidades-lote`     | Criar unidades em lote                           |
| POST   | `/api/empreendimentos/{id}/atualizar-precos`  | Reajustar preços das unidades disponíveis        |
| GET    | `/api/unidades`                                | Listar unidades (filtros & paginação)           |
| POST   | `/api/unidades`                                | Criar unidade                                   |
| GET    | `/api/unidades/{id}`                           | Obter detalhes de uma unidade                   |
| PUT    | `/api/unidades/{id}`                           | Atualizar unidade                               |
| DELETE | `/api/unidades/{id}`                           | Excluir unidade (restrições de status)          |

> **Filtros de Query (empreendimentos):** `?codigo=&nome=&cidade=&page=`
>
> **Filtros de Query (unidades):** `?empreendimento_id=&codigo=&preco_min=&preco_max=&status=&bloco=&page=`

---

## 📐 Arquitetura & Design

- **Camada de API (Laravel)**
  - Controladores em `App\Http\Controllers\Api`
  - Modelos Eloquent em `App\Models`
  - Autenticação via Sanctum (tokens)
  - Migrations e Seeders para automação de banco
  - Rotas `routes/api.php` protegidas por middleware `auth:sanctum`

- **Frontend (React)**
  - **Context** de autenticação em `src/context/AuthContext.jsx`
  - **API Service** central em `src/services/api.js`
  - **Pages** em `src/pages`
  - **Components** reutilizáveis em `src/components`
  - Validações de formulário com **Formik** + **Yup**
  - Estilização rápida com **Bootstrap**

---

## 🎯 Uso do Sistema

1. **Registrar/Login**
   - Acesse `http://localhost:3000/login`
   - Cadastre-se ou use um usuário seedado (`admin@exemplo.com` / `password`).
2. **Empreendimentos**
   - Listagem com filtros por código, nome e cidade.
   - CRUD completo (novo, editar, excluir).
   - Criar unidades em lote e reajustar preço em lote.
3. **Unidades**
   - Acessar `/empreendimentos/{id}/unidades`
   - Filtrar por código, faixa de preço, status e bloco.
   - CRUD completo (respeitando restrições de status).

---

## 📚 Referências

- [Laravel Sanctum](https://laravel.com/docs/sanctum)
- [React Router](https://reactrouter.com/)
- [Formik](https://formik.org/)
- [Yup](https://github.com/jquense/yup)
- [Bootstrap](https://getbootstrap.com/)

---

Desenvolvido por **Seu Nome**, 2025.

