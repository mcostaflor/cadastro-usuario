# Introdução

Projeto desenvolvido utilizando React e NodeJS.

Aplicação contém um fluxo simples de manutenção de usuários. Tem as seguintes funcões implementadas: Listar usuários,  Adicionar usuário, Visualizar usuário e Editar usuário.

#### Frontend

Iniciado com `create-react-app`.

Para executar o projeto é necessário preencher o arquivo `config.json` que está na pasta `app` do projeto React. com os dados de conexão da api.

`npm install` na pasta raíz do frontend para instalar as dependências e `npm start` para executar o projeto. Porta padrão: `3000`.

#### Backend

`npm install` para instalar dependências e `npm start` para executar a aplicação.

Projeto está configurado para uma instancia gratuita Postgres na nuvem.

Caso queria utilizar outra base de dados Postgres, é necessário modificar arquivo de conexão do banco de dados `config/config.json` e aplicar as migrations inclusas. Para usar outro banco de dados também é necessário adicionar os drivers do mesmo no projeto (apenas os do Postgres estão instalados). 

Arquivo `app.config.json` possui as configurações de host e porta.

