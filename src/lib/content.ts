import path from 'node:path';
import fs from 'node:fs/promises';
import YAML from 'yaml';

export interface Author {
	id: string;
	name: string;
	email?: string;
}

export interface Project {
	name: string;
	authors: Author[];
	summary: string;
	repo: string;
}

export interface ProjectData {
	name: string;
	authors: string[];
	summary: string;
	repo: string;
}

export interface ContentData {
	authors: Author[];
	projects: ProjectData[];
}

export const contentFile = path.join(process.cwd(), 'content.yml');

// TODO: content schema validation
export const getContent = async (): Promise<ContentData> => {
	const fileContents = await fs.readFile(contentFile, 'utf-8');
	return YAML.parse(fileContents);
};

export const getAllProjects = async (): Promise<Project[]> => {
	const { projects, authors } = await getContent();
	return projects.map((project) => ({
		...project,
		authors: project.authors.map((authorId) => authors.find((author) => author.id === authorId)!),
	}));
};

export const getAllAuthors = async (): Promise<Author[]> => {
	const content = await getContent();
	return content.authors;
};
