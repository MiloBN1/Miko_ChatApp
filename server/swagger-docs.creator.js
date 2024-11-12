const express = require("express");
const ExpressSwaggerGenerator = require('express-swagger-generator');
const jsonToYaml = require('json2yaml');
const fs = require('fs');
const swaggerConverter = require('swagger2openapi');
const path = require('path');
console.log(path.resolve()); 

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            description: 'Данный сервис определяет основные пользовательские функции',
            title: 'Основной игровой сервис',
            version: '1.0.0',
            contact: {
                email: "swdaniel@yandex.ru"
            }
        },
        host: 'localhost:3000',
        basePath: '/',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        },
        externalDocs: {
            description: 'Ссылка на внешнюю документацию',
            url: 'http://localhost:3000/api-docs'
        },
    },
    route: {
        url: '/docs/swagger2',
        docs: '/swagger.json',
    },
    // Use absolute paths or debug file paths
    basedir: path.resolve(),
    files: [path.join(path.resolve(), 'router.js'), path.join(path.resolve(), 'controllers', '*.js')]

};

const app = express();
const expressSwaggerGenerator = ExpressSwaggerGenerator(app);

const swaggerDoc = expressSwaggerGenerator(swaggerOptions);

fs.writeFileSync('./docs/docs_swagger2.yaml', jsonToYaml.stringify(swaggerDoc));

swaggerConverter.convertObj(swaggerDoc, {}, (err, options) => {
    if (err) {
        console.error(err);
    } else {
        const output = jsonToYaml.stringify(options.openapi);
        fs.writeFileSync('./docs/docs.yaml', output);
        process.exit(0);
    }
});
