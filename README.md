# GoldenRaspberryAwardsProject

## Iniciar o projeto usando Docker

1. **Instale o Docker**
   - Siga o guia oficial: [Instalar Docker](https://docs.docker.com/engine/install/ubuntu/)

2. **Clone este repositório**
   ```sh
   git clone git@github.com:lucasselliach/GoldenRaspberryAwardsProject.git
   cd GoldenRaspberryAwardsProject
   ```

3. **Construa e execute os containers**
   ```sh
   docker compose up --build
   ```

4. **Acesse as aplicações:**
   - **Frontend:** [http://localhost:4200](http://localhost:4200)
   - **Backend:** [http://localhost:8080/api-docs](http://localhost:8080/api-docs)
   - **Mongo-express:** [http://localhost:8081](http://localhost:8081)

      USERNAME: app
      PASSWORD: MongoExpress2025!

5. **Para parar o projeto**
   ```sh
   docker compose down
   ```

**Nota:**  
Para massa de dados utiliza-se: Movielist.csv que se encontra em backend/infra/assets. Caso queira somente roda o backend, precisa fazer um npm run build primeiro para o arquivo ser copiado para dentro do dist. Depois npm start, e o sistema fará o auto import. 