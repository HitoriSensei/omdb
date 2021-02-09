# OMDB search

Small app that searches and displays movies from OMDB API

## Important

### vendor
`vendor` directory is the framework base I'm using for most of my projects, code inside this directory is not counted towards time constraints.

### gen/api
Code inside this directory is generated using `swagger-codegen` from (OMDB OpenAPI definition)[https://www.omdbapi.com/swagger.json]. For this reason, the code is excluded from linting.

## Starting

Before starting the app, you must set the OMDB_APIKEY environmental variable to your OMDB APIKEY.

### How
`APP_PORT=8080 OMDB_APIKEY=yourapikey && yarn build-start`