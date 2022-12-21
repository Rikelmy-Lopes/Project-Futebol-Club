
# Project Futebol Club

Projeto desenvolvido durante o curso da Trybe
## Rode Localmente

### Variaveis de Ambiente

Para rodar esse Projeto, você vai precisar adicionar as seguintes variaveis de ambiente no seu arquivo .env:

`JWT_SECRET`

`APP_PORT`

`DB_USER`

`DB_PASS`

`DB_HOST`

`DB_PORT`

Clone o Projeto

```bash
  git clone git@github.com:Rikelmy-Lopes/Project-Futebol-Club.git
```

Vá para o diretorio do Projeto

```bash
  cd Project-Futebol-Club
```

Instale as Dependencias

```bash
  npm install
```

Suba os containers

```bash
  npm run compose:up
```


## Documentação





<details>
  <summary><strong> API Reference </strong></summary>

## API Reference

#### Valida o Usuario

```http
  POST /login
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Obrigatório**. Seu Email |
| `password` | `string` | **Obrigatório**. Sua Senha |

#### Valida o Token

```http
  GET /login/validate
```

| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `authorization`      | `string` | **Obrigatório**. Token |

#### Retorna todos os times

```http
  GET /teams
```

#### Retorna o time por Id

```http
  GET /teams/:id
```

| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Obrigatório**. Id do Time |

#### Retorna todos os Jogos

```http
  GET /matches
```

#### Retorna todos os Jogos em Progresso

```http
  GET /matches/inProgress=true
```

| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `inProgress`      | `booleano` | **Obrigatório**. |

#### Retorna todos os Jogos já terminados

```http
  GET /matches/inProgress=false
```

| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `inProgress`      | `booleano` | **Obrigatório**. |


</details>