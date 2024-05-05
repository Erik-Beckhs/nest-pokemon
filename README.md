<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar

```
npm i
```
3. Tener NEST cli instalado

```
npm i @nestjs/cli
```
4. Levantar la bd

```
docker-compose up -d
```
5. Clonar el archivo __.env.template__ por __.env__
6. Poblar las variables de entorno con informacion correspondiente
7. Ejecutar la aplicacion con 
```
npm run start:dev
```
8. Reconstruir la bd con la semilla
```
https://localhost:3000/api/v2/seed
```

## Stack Usado
* MongoDB
* Nest
