FROM node:latest
LABEL authors="mohamed"
# RUN apt update && \
#     apt upgrade && \
#     apt install -y npm 

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]

