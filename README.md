## PermanaCoffe-server

This is a ExpressJs-based API for [frontend project](https://github.com/permana017/Coffe-shop-FE). It uses PostgreSQL as its database

## Getting started

To get the Node server running locally:

* Clone this repo with `https://github.com/permana017/Coffe-shop-BE.git`
* `cd backend`
* `npm install` to install all required dependencies
* `node index.js` to start the local server


## Folder Structure

     ┣ 📂public
     ┃ ┗ 📂uploads
     ┃ ┃ ┗ 📂images
     ┣ 📂src
     ┃ ┣ 📂controllers
     ┃ ┃ ┣ 📜auth.controller.js
     ┃ ┃ ┣ 📜image.controller.js
     ┃ ┃ ┣ 📜order.controller.js
     ┃ ┃ ┣ 📜product.controller.js
     ┃ ┃ ┣ 📜users.controller.js
     ┃ ┣ 📂model
     ┃ ┃ ┣ 📜auth.model.js
     ┃ ┃ ┣ 📜image.model.js
     ┃ ┃ ┣ 📜order.model.js
     ┃ ┃ ┣ 📜product.model.js
     ┃ ┃ ┣ 📜users.model.js
     ┃ ┗ 📂view
     ┃ ┃ ┣ 📜auth.route.js
     ┃ ┃ ┣ 📜image.route.js
     ┃ ┃ ┣ 📜index.route.js
     ┃ ┃ ┣ 📜order.route.js
     ┃ ┃ ┣ 📜product.route.js
     ┃ ┃ ┣ 📜users.route.js
    
## Endpoints
users endpoint

    GET      /api/v1/users
    GET      /api/v1/users/:id
    PATCH    /api/v1/users/:id
    DEL      /api/v1/users/:id
    
auth endpoint

    POST      /api/v1/auth/login
    POST      /api/v1/auth/register
    
products
    
    GET      /api/v1/products
    GET      /api/v1/products:id
    POST     /api/v1/products
    PATCH    /api/v1/products:id
    DEL      /api/v1/products:id

order endpoint

    GET      /api/v1/order:id
    POST     /api/v1/order
    PATCH    /api/v1/order:id
    DEL      /api/v1/order:id
    

when put under a domain with `prefix`, it would look like:

    https://www.example.com/api/users
