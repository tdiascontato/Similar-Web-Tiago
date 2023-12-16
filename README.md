![image](https://github.com/tdiascontato/similar-web-Tiago/assets/98658691/e4c081ed-6218-4ba5-a747-1aa34321e566)
# Projeto Similar Web - Tiago

Este projeto utiliza Node.js para criar uma API que realiza scraping de dados do SimilarWeb e armazena as informações em um banco de dados MongoDB.

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
![image](https://github.com/tdiascontato/similar-web-Tiago/assets/98658691/e9ba984c-53e7-4f68-8259-815d368d2718)

Exemplo de requisição:
curl -X POST http://localhost:3000/salve_info/site.com

POST /get_info/:url
Busca as informações do site no banco de dados para a URL fornecida e as retorna. Retorna um código de erro se as informações não estiverem disponíveis.
![image](https://github.com/tdiascontato/similar-web-Tiago/assets/98658691/09769763-1ab1-467c-b072-f4a8f31b9367)

Exemplo de requisição:
curl -X POST http://localhost:3000/get_info/site.com

GET /teste/:url
Busca as informações da plataforma SimilarWeb para testar as requisições.
![image](https://github.com/tdiascontato/similar-web-Tiago/assets/98658691/090294af-b23a-41d8-905c-6625d3e29ac2)

Exemplo de requisição:
curl -X GET http://localhost:3000/teste/site.com
