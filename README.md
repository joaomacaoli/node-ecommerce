# Sistema de E-commerce

Este repositório contém um sistema de e-commerce construído com Node.js e Express, que utiliza autenticação JWT para segurança e Mongoose para integração com o banco de dados MongoDB. A aplicação oferece funcionalidades básicas para a gestão de um e-commerce, incluindo autenticação de usuários, gerenciamento de produtos e pedidos.

## Dependências

- **bcrypt**: Utilizado para criptografia de senhas, garantindo a segurança dos dados dos usuários.
- **express**: Framework web minimalista e flexível para Node.js, que serve como base para a construção das rotas e middlewares da aplicação.
- **express-jwt**: Middleware que permite proteger rotas utilizando tokens JWT, assegurando que apenas usuários autenticados possam acessar determinadas funcionalidades.
- **jsonwebtoken**: Biblioteca para criação e verificação de tokens JWT, usada para implementar autenticação baseada em token.
- **mongoose**: ODM (Object Data Modeling) para MongoDB, que facilita o trabalho com o banco de dados através de modelos de dados estruturados.

## Funcionalidades

- **Autenticação de usuários** com criptografia de senha e tokens JWT.
- **Gerenciamento de produtos**, incluindo criação, leitura, atualização e remoção.
- **Gerenciamento de pedidos**, permitindo que os usuários façam e acompanhem seus pedidos.
- **Integração com MongoDB** para persistência de dados.
