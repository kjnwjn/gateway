const api = require("./api");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../utils/swagger_output.json");
module.exports = function route(app) {
    app.use("/api/student-portal/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
    app.use("/gateway", api);
};
