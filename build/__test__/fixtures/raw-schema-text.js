"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawSchemaText = void 0;
/* Convert schema file to text for testing */
var fs_1 = require("fs");
var path_1 = require("path");
var rawSchemaText = (0, fs_1.readFileSync)((0, path_1.resolve)(__dirname, './test-schema.graphql'), 'utf8');
exports.rawSchemaText = rawSchemaText;
