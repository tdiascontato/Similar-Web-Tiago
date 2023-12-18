# Projeto Similar Web - Tiago

Este projeto utiliza Node.js para criar uma API que realiza scraping de dados do SimilarWeb e armazena as informações em um banco de dados MongoDB.
![image](https://github.com/tdiascontato/Similar-Web-Tiago/assets/98658691/617359cd-e6a6-40be-91a6-2e355933374f)

## Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/tdiascontato/similar-web-Tiago.git
   
2. .env:
API_KEY_SIMILARWEB=sua_chave_api
Foram salvas em .env uma chave para acesso a plataforma e o acesso ao MongoDB.

3. npm run dev
Acesso a API em http://localhost:3003

4. Endpoints da API
POST /salve_info/:url
Realiza scraping de dados do SimilarWeb para a URL fornecida e salva as informações no MongoDB.
![image](https://github.com/tdiascontato/Similar-Web-Tiago/assets/98658691/38363c8b-6b30-4a4b-8e7a-a5a533c3b524)


Exemplo de requisição:
curl -X POST http://localhost:3000/salve_info/site.com

POST /get_info/:url
Busca as informações do site no banco de dados para a URL fornecida e as retorna. Retorna um código de erro se as informações não estiverem disponíveis.
![image](https://github.com/tdiascontato/Similar-Web-Tiago/assets/98658691/c5ca26eb-d702-4ce3-b0d9-43d63d86a8a0)


Exemplo de requisição:
curl -X POST http://localhost:3000/get_info/site.com

GET /teste/:url
Busca as informações da plataforma SimilarWeb para testar as requisições.
![image](https://github.com/tdiascontato/Similar-Web-Tiago/assets/98658691/d0aff53c-dbdd-43f7-b4ae-e460798ed1da)


Exemplo de requisição:
curl -X GET http://localhost:3000/teste/site.com
