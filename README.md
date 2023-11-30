# grupo_Los-Detonadores_frontend

# Avances Entrega 3

- Backend: Se actualizaron los modelos, especificamente los atributos y los códigos de error en las rutas de las requests. Se incluye el manejo de sesión mediante autenticación, se agregaron rutas protegidas y el uso de tokens JWT. Se actualizan las dependencias de eslint. 

- Frontend: Se implementa el inicio de sesión y registro de nuevos usuarios. Además, se implementan todas las funcionalidades de la aplicación (a excepción del chat y la eliminación del grupo por parte del creador). Las funcionalidades implementadas incluyen crear grupos, hacer requests, responder requests, hacer reviews, ver la información de usuario y modificarla y ver participantes de los grupos.

- Diagrame E/R actualizado.

# Documentación de Instalación y Configuración de la API-Base de datos

## Requisitos previos

### Node.js
- Versión recomendada: Se recomienda utilizar una versión como Node.js ^12.22.0, ^14.17.0 o >=16.0.0.
- Cómo instalar Node.js:
  - Dirígete al [sitio web oficial de Node.js](https://nodejs.org/) y descarga la versión deseada.
  - Sigue las instrucciones del instalador.

### PostgreSQL
- Versión recomendada: El paquete pg con versión ^8.11.3 es un cliente de Node.js para PostgreSQL. Aunque no se especifica la versión exacta de PostgreSQL requerida, se recomienda utilizar una versión compatible con el cliente pg.
- Cómo instalar PostgreSQL:
  - Visita la [página oficial de PostgreSQL](https://www.postgresql.org/) para obtener instrucciones detalladas sobre cómo instalarlo en tu sistema operativo.
- Instalación en sistemas basados en Ubuntu/Debian:
  ```bash
  sudo apt install postgresql postgresql-contrib
  sudo service postgresql start
- Acceso al terminal de PostgreSQL:
  ```bash
  sudo -u postgres psql 
- Creación de la base de datos:
  ```bash
  sudo -u postgres createdb educolab_development 
- Establecer contraseña para el usuario:
  ```bash
  ALTER USER user WITH PASSWORD 'password'; 
- Acceder a la base de datos:
  ```bash
  psql -U user -d educolab_development -h 127.0.0.1

### Otros software o herramientas necesarios: 

- git: Para clonar el repositorio. 

-Yarn: Funciona como gestor de paquete, se puede instalar usando npm install -g yarn después de instalar Node.js. 

- Koa: Es un framework de Node.js. Hay varios paquetes relacionados con Koa en las dependencias, como @koa/cors, koa, koa-body, koa-logger, y koa-router. 

- Sequelize: Es un ORM (Object-Relational Mapping) para Node.js. Se encuentran sequelize y sequelize-cli en las dependencias. 

- Nodemon: Es una herramienta que ayuda a desarrollar aplicaciones basadas en Node.js al reiniciar automáticamente la aplicación de Node.js cuando se detectan cambios en el archivo.  

- TypeScript 

- ESLint: Es una herramienta de linting para JavaScript y TypeScript. Hay múltiples paquetes relacionados con ESLint en las devDependencies. 

- dotenv: Se utiliza para cargar variables de entorno desde un archivo .env.


## Configuración de la Base de Datos (BDD) 

- Instalación de PostgreSQL: Visita la página oficial de PostgreSQL para obtener instrucciones detalladas sobre cómo instalarlo en tu sistema operativo. 

### Configuración de PostgreSQL: 

Después de la instalación, puedes necesitar crear un usuario específico para tu aplicación. Puedes hacer esto usando el comando createuser --interactive

Asegúrate de asignarle una contraseña a tu usuario con el comando alter user <USERNAME> with encrypted password '<PASSWORD>'. 

Otorga los permisos necesarios al usuario con: alter user <USERNAME> createdb

### Comandos Específicos: 

- Crear la base de datos:
  ```bash
  createdb <DATABASE_NAME> -U <USERNAME>

- Desde la carpeta raíz de tu proyecto, debes deshacer todas las migraciones:
  ```bash
  yarn sequelize-cli db:migrate:undo:all

- Ejecutar las migraciones:
  ```bash
  yarn sequelize-cli db:migrate

- Ejecutar los seeders:
  ```bash
  yarn sequelize-cli db:seed:all
 

## Configuración de la API	 

- Repositorio del proyecto: La API se encuentra en este repositorio de GitHub. 

- Configuración del entorno en el Backend: 

    1. Navega a la carpeta del proyecto backend. 

    2. Crea un archivo .env en la raíz. 

    3. Añade y configura las siguientes variables de entorno:
        ```bash
        DB_USERNAME = [Tu_Usuario] 
        DB_PASSWORD = [Tu_Contraseña] 
        DB_NAME = educolab 
        DB_HOST = 'localhost'

- Asegúrate de reemplazar [Tu_Usuario] y [Tu_Contraseña] con tus credenciales reales. 

- Configuración del entorno en el Frontend: 

    1. Navega a la carpeta del proyecto frontend. 

    2. Crea un archivo .env en la raíz. 

    3. Añade la siguiente variable de entorno: VITE_BACKEND_URL = http://localhost:3000

## Instalación de dependencias: 

- Ejecutar yarn para instalar todas las dependencias necesarias. 

## Ejecución de la API: 

- Para iniciar la API en modo de producción, ejecuta: yarn start 

- Para iniciar la API en modo de desarrollo (con reinicios automáticos al detectar cambios), ejecuta: yarn dev  
