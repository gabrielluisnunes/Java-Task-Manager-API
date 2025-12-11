# 🚀 Java Task Manager API (Spring Boot & React)

Este projeto implementa uma API RESTful completa para gerenciamento de tarefas (CRUD), desenvolvida com Spring Boot 3.5.8, Spring Security 6+ e Persistência JPA/H2. O frontend é construído com React e TypeScript (Vite).

---

## ⚙️ Tecnologias Utilizadas

### Backend (api-task-manager)
* **Framework:** Spring Boot 3.5.8
* **Linguagem:** Java 21
* **Segurança:** Spring Security 6+ (Autenticação HTTP Basic e Autorização)
* **Persistência:** Spring Data JPA
* **Banco de Dados:** H2 Database (Em memória, para desenvolvimento)
* **Build Tool:** Maven

### Frontend (frontend-react)
* **Framework:** React
* **Linguagem:** TypeScript (TSX)
* **Build Tool:** Vite
* **HTTP Client:** Axios

---

## 🛠️ Como Rodar o Projeto

### Pré-requisitos
* Java Development Kit (JDK) 17 ou superior
* Node.js e npm (ou yarn)
* Maven

### 1. Inicializar o Backend

1.  Navegue até a pasta `api-task-manager`.
2.  Use o Maven para compilar e rodar:
    ```bash
    cd api-task-manager
    ./mvnw spring-boot:run
    ```
3.  A API estará disponível em: `http://localhost:8080`

### 2. Inicializar o Frontend

1.  Navegue até a pasta `frontend-react`.
2.  Instale as dependências e inicie o servidor de desenvolvimento:
    ```bash
    cd frontend-react
    npm install
    npm run dev
    ```
3.  O Frontend estará disponível em: `http://localhost:5173`

---

## 🔐 Endpoints da API (http://localhost:8080/api/tasks)

| Método | Endpoint | Descrição | Requer Autenticação |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/tasks` | Lista todas as tarefas. | **Não** |
| **GET** | `/api/tasks/{id}` | Busca uma tarefa por ID. | **Não** |
| **POST** | `/api/tasks` | Cria uma nova tarefa. | **Sim** |
| **PATCH** | `/api/tasks/{id}` | Atualiza parcialmente uma tarefa. | **Sim** |
| **DELETE** | `/api/tasks/{id}` | Remove uma tarefa por ID. | **Sim** |

### Credenciais de Teste
A autenticação usa HTTP Basic. As credenciais configuradas em `application.properties` são:
* **User:** `admin`
* **Password:** `suasenhaforte123`

---

## 🤝 Contribuições

Sinta-se à vontade para abrir issues ou Pull Requests!
