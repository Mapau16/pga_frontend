# Etapa de build
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Etapa de Nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist/<nombre_app_angular> /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80