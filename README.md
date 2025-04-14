
# Proyecto NOC

Desarrollado con arquitectura limpia

# dev
1. clonar el archivo .env.template a .env
2. configurar las variables de entorno

```
PORT=3000
MAILER_EMAIL=
MAILER_SECRET_KEY=
PROD=false
```
3. ejecutar el comando ```npm install```
4. levantar las bases de datos con el comando ```docker compose -d```
5. ejecutar el comando 
```
npx prisma generate 
npx prisma migrate dev 
npx prisma db pull
```
6. ejecutar el comando ```npm run dev```

