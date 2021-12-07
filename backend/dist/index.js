"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_graphql_1 = require("express-graphql");
var app = (0, express_1.default)();
var port = 5000 || process.env.PORT;
var schema_1 = __importDefault(require("./schema/schema"));
app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
    schema: schema_1.default,
    graphiql: true,
}));
app.listen(port, function () {
    console.log('Server is up on port ' + port);
});
