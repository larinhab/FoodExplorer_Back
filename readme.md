<p align="center">
  <img alt="Cliente Home" src="./src/assets/outras/home_Cliente.png" width="100%">
</p>

<p align="center">
  <img alt="Admin Home" src="./src/assets/outras/home_Admin.png" width="100%">
</p>

O FoodExplorer é uma aplicação fullstack, utilizando as tecnologias aprendidas durante o curso Explorer, simulando um restaurante fictício de acordo com o layout disponibilizado no Figma.

O food explorer possui duas personas: o admin e o usuário;

O admin é a pessoa responsável pelo restaurante e tem o acesso para criar, visualizar, editar, apagar um prato e alterar os status de pedidos a qualquer momento. Cada prato deve conter uma imagem, nome, categoria, descrição, ingredientes e o seu preço. Ao clicar em adicionar ou editar prato será redirecionado para a página e ao finalizar receberá uma mensagem de sucesso e será redirecionado para a página principal.

O usuário irá visualizar todos os pratos cadastrados, adicionar ao carrinho, fazer um pedido, adicionar aos favoritos, acompanhar seu histórico de pedidos, atualizar seu perfil e quando clicar em um prato, será redirecionado para uma nova tela com informações mais detalhadas sobre ele.
<br/>

<a target="_blank">[Link para o deploy da aplicação](/) </a> <br/>
<a target="_blank">[Link para o Front-End](https://github.com/larinhab/FoodExplorer_Front) </a>

<br/>
<br/>

<h1 align="center">💻 Instalação</h1>

### **_Pré-requisitos_**

Antes de começar, você vai precisar ter instalado em sua máquina <a target="_blank">[NodeJs](https://nodejs.org/en) </a>, uma ferramenta de versionamento como o <a target="_blank">[GIT](https://git-scm.com/) </a>.
Além disto é recomendado um editor de código, por exemplo o<a target="_blank">[VSCode](https://code.visualstudio.com/) </a>.
Para fazer testes localmente uma boa opção é o <a target="_blank">[Insomnia](https://insomnia.rest/) </a> e para gerenciamento de banco de dados relacional o <a target="_blank">[Beekeeper](https://www.beekeeperstudio.io/) </a>.

### **_Configuração_**

Siga os seguintes passos para configurar e rodar a aplicação localmente:

- Clone o repositório:

  ```bash
    git clone https://github.com/larinhab/FoodExplorer_Back
  ```

- Entre no diretório e instale as dependências:

  ```bash
    npm install
  ```

- Preencha as variáveis seguindo o .env.exemplo:

  ```bash
    ADMIN_EMAIL=lara@admin.com
    PORT=2008
    AUTH_SECRET=a76da876da876$ds654a@7656
  ```

- Rode o servidor local:

  ```bash
    npm run dev
  ```

- Caso não ocorra nenhum erro a seguinte mensagem será apresentada:

  ```bash
    Server is running on port 2008.
  ```

- Para utilizar todo dos recursos desta API, acesse o localhost com a porta adicionada no .env:

  `http://localhost:2008`

- Para fazer as requisições utilize o insomnia ou qualquer outro programa de sua preferência.
  <br/>
  <br/>

<h1 align="center">🔧 Recursos</h1>

A aplicação possui duas personas:

- Cliente:

  - Mostrar todos os pratos
  - Mostrar um prato especifico
  - Pesquisar por um prato ou ingrediente
  - Adicionar ao carrinho os pedidos
  - Fazer um pedido
  - Adicionar prato aos favoritos
  - Acessar todos os favoritos
  - Atualizar informações da conta
    <br/>
    <br/>

- Administrador:

  - Mostrar todos os pratos
  - Mostrar um prato especifico
  - Pesquisar por um prato ou ingrediente
  - Acessar todos os pedidos
  - Acessar status do pedido
  - Atualizar status de pedidos
  - Atualizar informações da conta
  - Cadastrar um novo prato
  - Atualizar um prato
  - Deletar um prato
  - Atualizar um pedido
    <br/>
    <br/>

<h1 align="center">📑 Funcionamento</h1>

- ### **Fazer login**

  Para algumas requisições, a aplicação espera um token (JWT) no header da requisição, ou seja, o usuário tem que está autenticado.

  Para gerar um token basta fazer uma requisição:

  `POST("/sessions")`

  Com as seguintes informações:

  ```
   "email": "testeadmin@gmail.com",
   "password": "654321"

   "email": "testeacliente@gmail.com",
   "password": "123456"
  ```

  Se tudo estiver correto será liberado acesso para a aplicação.
  <br/>
  <br/>

- ### **User**

  Rota para criação de conta, por padrão é atribuído acesso de `usuário`, para ter acesso a uma conta de administrador adicione ao arquivo `.env` no campo de `ADMIN_EMAIL` o email desejado para ser atribuído como `Administrador`.

  `POST("/users")`

  ```bash
    ADMIN_EMAIL=admin@gmail.com
    PORT=2008
    AUTH_SECRET=a76da876da876$ds654a@7656
  ```

  Com as seguintes informações:

  ```
   "nome": "Exemplo nome"
   "email": "exemplo@email.com",
   "password": "exemplo123"
  ```

  Rota para atualização da conta

  `PUT("/users")`

  Rota para uma segunda autorização que verificar se a conta foi criada corretamente.

  `GET("/users/validated")`
  <br/>
  <br/>

- ### **Plate**

  As seguintes rotas são para visualização de todos os pratos ou pratos específicos selecionados.

  `GET("/plates")`

  `GET("/plates/:id")`

  Para o admin ele possui as seguintes rotas de criação, exclusão e atualização dos pratos.

  `POST("/plates")` `admin require`

  `PUT("/plates/:id")` `admin require`

  `DELETE("/plates/:id")` `admin require`

  `PATCH("/plates/:id")` `admin require`
  <br/>
  <br/>

  <br/>

- ### **Ingredientes**

  Rota para exibir os ingredients.

  `GET("/ingredients")`
  <br/>
  <br/>

- ### **Favoritos**

  Rotas para adição do prato aos favoritos e para visualização de todos os pratos adicionados.


  `GET("/favorites")`
  `POST("/favorites")`
  `DELETE("/favorites")`
  `INDEX("/favorites")`

<br/>

<h1 align="center">🗂️ Requisitos</h1>

- ✅ Projeto estruturado, com uma boa organização das pastas.
- ✅ Os dados do admin, do restaurante e dos usuários serão armazenados em um banco de dados.
- ✅ Os usuários se autenticam para entrar na aplicação através da tela de login, utilizando autenticação JWT.
- ✅ Usuário e admin podem fazer uma busca tanto pelo nome do prato quanto pelos ingredientes;
- ✅ O admin pode fazer upload de imagens para cadastrar os pratos.
- ✅ Aplicação consome a sua própria API.
  <br/>
  <br/>

<h1 align="center">📊 Tecnologias e Licença</h1>

<p align="center"> 
- NodeJs 
- bcryptjs 
- express 
- knex 
- Multer 
- SQLite 
- PM2 
- JWT</p>
<br/>

<p align="center"> Uso de Licença MIT: Essa licença permite o uso, modificação e distribuição do software sem restrições. </p>
<br/>

<p align="center">Feito com ❤️ por Lara 👋🏽 <a href="https://www.linkedin.com/in/lara-barbosa-viana-813428230/">Entre em Contato</a></p>