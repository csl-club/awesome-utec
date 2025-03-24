import 'dotenv/config';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { getAllProjects } from '../../src/lib/content';
import { generateReadme } from './lib';

const args = process.argv.slice(2);
const checkOnly = args.includes('--check');

const cwd = process.cwd();
const TEMPLATE_FILE = join(cwd, 'README.template.md');
const OUT_FILES = [join(cwd, 'README.md'), join(cwd, 'static/README.md')];

const { GITHUB_TOKEN } = process.env;
if (!GITHUB_TOKEN) {
	console.warn('GITHUB_TOKEN env variable not found. Proceeding without authentication');
}

console.log('Getting project data...');
const projects = await getAllProjects({ githubToken: GITHUB_TOKEN });

console.log('Reading template...');
const template = readFileSync(TEMPLATE_FILE, 'utf-8');

console.log('Generating README...');
const result = generateReadme(template, projects);

if (checkOnly) {
	const currentContentss = OUT_FILES.map((file) => readFileSync(file, 'utf-8'));
	if (currentContentss.some((contents) => contents !== result)) {
		console.error(
			'One of the generated READMEs is not up-to-date. Run "pnpm run readmegen" to fix this.',
		);
		process.exit(1);
	} else {
		console.log('READMEs are up-to-date');
	}
} else {
	for (const file of OUT_FILES) {
		console.log(`Writing to ${file.replace(`${cwd}/`, '')}...`);
		writeFileSync(file, result);
	}
	console.log('Done');
}
