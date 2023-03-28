# Imagem no docker hub
FROM node

WORKDIR /usr/app

# Copia o package.json para dentro de /usr/app
COPY package.json ./

# Usa npm, porque nem todas as imagens têm o yarn instalado
RUN npm install

# Após baixar todas as dependências, copia os arquivos para o workdir
COPY . .

# Porta usada no container
EXPOSE 3333

CMD ["npm", "run", "dev"]