"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var content = require("../src/lib/content");
dotenv_1.default.config();
var GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) {
    throw new Error('Github token not found');
}
var projects = await content.getAllProjects(GITHUB_TOKEN);
console.log(projects);
