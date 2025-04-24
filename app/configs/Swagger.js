bodyParser = require("body-parser"),
swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express");
const path = require("path");

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API Express JS Bibliothèque",
        version: "1.0.0",
        description:
          "API pour gérer une bibliothèque de livres et d'utilisateurs",
        contact: {
          name: "Serge Eric KALAGA",
          url: "https://github.com/serge-eric-kalaga",
          email: "kalagaserge4@gmail.com",
        },
      },
      servers: [
        {
          url: "http://localhost:5000",
        },
      ],
    },
    apis: [path.join(__dirname, "../routes/*.route.js")], // Correction du chemin pour inclure les fichiers de routes
  };

  
const swaggerSpec = swaggerJsdoc(options);

// console.log("Swagger generated spec:", JSON.stringify(swaggerSpec, null, 2));

module.exports.swaggerSpec = swaggerSpec;