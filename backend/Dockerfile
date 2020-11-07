# Version de nodejs mas liviana, escoger siempre la version "-alpine"
FROM node:10-alpine

#
RUN mkdir -p /usr/src/logs
WORKDIR /usr/src

# Se copia la app
COPY package*.json /usr/src/
COPY app/ /usr/src/

# Se instala las depedencias
RUN npm install

# Se expone el puerto del container
EXPOSE 3050

# Finalmente se inicia la API
CMD [ "cd", "/usr/src/app/" ]
CMD [ "node", "." ]