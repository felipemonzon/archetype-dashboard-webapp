# Usa una imagen base oficial de Node.js
# Utiliza la versión 18 LTS de Node.js, que es una versión de soporte a largo plazo
FROM node:24.7-alpine AS builder

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración de dependencias para aprovechar el caché de Docker
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia todo el código fuente del proyecto
COPY . .

# Construye la aplicación Angular en modo de producción
# El comando `ng build` compila la aplicación para su despliegue
# La bandera `--output-path` especifica dónde se guardarán los archivos compilados
RUN npm run build -- --output-path=./dist/archetype-dashboard-webapp --base-href=/archetype-dashboard-webapp/

# --- Etapa 2: Servir la aplicación con Nginx ---
# Usa una imagen oficial de Nginx
FROM nginx:alpine AS production

# Copia los archivos de la aplicación construida desde la etapa 'builder' al directorio de Nginx
# Los archivos estáticos se copian al directorio de servicio por defecto de Nginx
COPY --from=builder /app/dist/archetype-dashboard-webapp/browser /usr/share/nginx/html/archetype-dashboard-webapp

# Elimina el archivo de configuración por defecto de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia un archivo de configuración de Nginx personalizado
# Este archivo es crucial para manejar las rutas del lado del cliente en Angular
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80 del contenedor
# Este es el puerto por defecto que Nginx utiliza para servir contenido web
EXPOSE 80

# Inicia Nginx en primer plano
# El comando `nginx -g 'daemon off;'` asegura que Nginx se ejecute como un proceso en primer plano,
# lo que es necesario para que Docker mantenga el contenedor en funcionamiento
CMD ["nginx", "-g", "daemon off;"]
