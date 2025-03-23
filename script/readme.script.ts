// God I hate those '*'
import { config } from 'dotenv';
import { getAllProjects } from "../src/lib/content";
import { processTemplate } from "../src/lib/util/projects.to.readme";
import { open, readFile } from 'fs/promises';

config();
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) {
    throw new Error('Github token not found');
}

const projects = await getAllProjects(GITHUB_TOKEN);
console.log(`Projects loaded ${projects.length}:`); // Nice log
console.log(projects);
console.log("")

var template = await readFile("./static/README.template.md", { encoding: "utf8" });
console.log("Template:")
console.log(template)
console.log("")

var result = await processTemplate(template.split("\n"), projects)
console.log("Output:")
console.log(result)
console.log("")

console.log("Writing to README.md ...")
var base = await open("README.md", "w");
base.write(result);
base.close();

console.log("Done")