# Project Futebol Club

Projeto desenvolvido durante o curso da Trybe!
Nesse projeto foi desenvolvido uma API que se conecta com o Front-end onde é possível fazer login, adicionar times/Partidas e fazer um filtro por Partidas!

## Rode Localmente

<details>
 <summary><strong>  ⚠️Configurações mínimas para execução do projeto⚠️ </strong></summary>
 Na sua máquina você deve ter:

 - Sistema Operacional Distribuição Unix
 - Node versão 16
 - Docker
 - Docker-compose versão >=1.29.2

➡️ O `node` deve ter versão igual ou superior à `16.14.0 LTS`:
  - Para instalar o nvm, [acesse esse link](https://github.com/nvm-sh/nvm#installing-and-updating);
  - Rode os comandos abaixo para instalar a versão correta de `node` e usá-la:
    - `nvm install 16.14 --lts`
    - `nvm use 16.14`
    - `nvm alias default 16.14`
 
 ➡️ O`docker-compose` deve ter versão igual ou superior à`ˆ1.29.2`:
 
 </details>

<details>
 <summary><strong>  ⚠️Variaveis de Ambiente⚠️ </strong></summary>

Para rodar esse Projeto, você vai precisar adicionar as seguintes variaveis de ambiente no seu arquivo .env:

`JWT_SECRET`

`APP_PORT`

`DB_USER`

`DB_PASS`

`DB_HOST`

`DB_PORT`

</details>

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

| Body       | Type     | Description                |
| :--------- | :------- | :------------------------- |
| `email`    | `string` | **Obrigatório**. Seu Email |
| `password` | `string` | **Obrigatório**. Sua Senha |

#### Valida o Token

```http
  GET /login/validate
```

| Header          | Type     | Description            |
| :-------------- | :------- | :--------------------- |
| `authorization` | `string` | **Obrigatório**. Token |

#### Retorna todos os times

```http
  GET /teams
```

#### Retorna o time por Id

```http
  GET /teams/:id
```

| Header | Type     | Description                 |
| :----- | :------- | :-------------------------- |
| `id`   | `string` | **Obrigatório**. Id do Time |

#### Retorna todos os Jogos

```http
  GET /matches
```

#### Retorna todos os Jogos em Progresso

```http
  GET /matches/inProgress=true
```

| Header       | Type       | Description      |
| :----------- | :--------- | :--------------- |
| `inProgress` | `booleano` | **Obrigatório**. |

#### Retorna todos os Jogos já terminados

```http
  GET /matches/inProgress=false
```

| Header       | Type       | Description      |
| :----------- | :--------- | :--------------- |
| `inProgress` | `booleano` | **Obrigatório**. |
  
#### Adiciona um novo Jogo

```http
  POST /matches
```

| Body       | Type       | Description      |
| :----------- | :--------- | :--------------- |
| `homeTeam` | `number` | **Obrigatório**. Id do Time da Casa |
| `awayTeam` | `number` | **Obrigatório**. Id do TIme de Fora |
| `homeTeamGoals` | `number` | **Obrigatório**. Quantidade de Goals |
| `awayTeamGoals` | `number` | **Obrigatório**. Quantidade de Goals|
  
| Header       | Type       | Description      |
| :----------- | :--------- | :--------------- |
| `authorization` | `string` | **Obrigatório**. Token |
  
  #### Atualiza uma Jogo para Finalizado

```http
  PATCH /matches/:id/finish
```

| Parameter       | Type       | Description      |
| :----------- | :--------- | :--------------- |
| `id` | `number` | **Obrigatório**. Id do Jogo|
  
#### Atualiza um Jogo

```http
  PATCH /matches/:id/
```

| Parameter       | Type       | Description      |
| :----------- | :--------- | :--------------- |
| `id` | `number` | **Obrigatório**. Id do Time|
  
| Body       | Type       | Description      |
| :----------- | :--------- | :--------------- |
| `homeTeamGoals` | `number` | **Obrigatório**. Quantidade de Goals |
| `awayTeamGoals` | `number` | **Obrigatório**. Quantidade de Goals |
  
#### Retorna o placar de todos os Times

```http
  GET /leaderboard
```
  
  #### Retorna o placar dos Times Mandantes

```http
  GET /leaderboard/home
```
  
#### Retorna o placar dos Times Visitantes

```http
  GET /leaderboard/away
```

</details>

## Tecnologias
-   **[Typescript](https://www.typescriptlang.org/)**
-   **[NodeJs](https://nodejs.org/en/)**
-   **[ExpressJs](https://expressjs.com/)**
-   **[MySql](https://www.mysql.com/)**
-   **[Sequelize](https://sequelize.org/)**
-   **[Docker](https://www.docker.com/)**
-   **[JWT](https://jwt.io/)**
