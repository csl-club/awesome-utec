import path from 'node:path';
import fs from 'node:fs/promises';
import YAML from 'yaml';
import { Octokit } from '@octokit/rest';
import { Gitlab } from '@gitbeaker/rest';
import { parseRepoInfo } from './repo';
import { isEmpty, maxKeyByValue } from './object';
import { GITHUB_TOKEN } from '$env/static/private';

export interface Author {
	id: string;
	name: string;
	email?: string;
}

export interface ProjectData {
	name: string;
	authors: string[];
	tags?: string[];
	summary?: string;
	repo: string;
	lang?: string;
}

export interface Project {
	name: string;
	authors: Author[];
	tags: string[];
	summary: string;
	repo: string;
	lang?: string;
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
	return await Promise.all(projects.map((proj) => completeProjectData(proj, authors)));
};

export const getAllAuthors = async (): Promise<Author[]> => {
	const content = await getContent();
	return content.authors;
};

const completeProjectData = async (
	projectData: ProjectData,
	allAuthors: Author[],
): Promise<Project> => {
	const tags = projectData.tags?.map((s) => s.toLowerCase()) ?? [];
	const authors = projectData.authors.map(
		(authorId) => allAuthors.find((author) => author.id === authorId)!,
	);

	let { summary, lang } = projectData;

	const repoInfo = parseRepoInfo(projectData.repo);

	if (repoInfo !== null) {
		switch (repoInfo.type) {
			case 'github': {
				if (!GITHUB_TOKEN) {
					console.warn(
						'GITHUB_TOKEN environment variable not found. Proceeding without authentication',
					);
				}

				const octokit = new Octokit({ auth: GITHUB_TOKEN });
				const { data: repoData } = await octokit.rest.repos.get({ ...repoInfo });

				if (repoData.language) {
					lang ??= repoData.language;
				}
				if (repoData.description) {
					summary ??= repoData.description;
				}
				break;
			}
			case 'gitlab': {
				const projId = `${repoInfo.owner}/${repoInfo.repo}`;
				const gitlab = new Gitlab({});

				if (!lang) {
					const langs = await gitlab.Projects.showLanguages(projId);
					if (!isEmpty(langs)) {
						lang = maxKeyByValue(langs);
					}
				}

				if (!summary) {
					const projectData = await gitlab.Projects.show(projId);
					if (projectData.description) summary ??= projectData.description;
				}
				break;
			}
		}
	}

	if (!summary) {
		throw new Error(`'${projectData.name}' does not have a description.`);
	}

	return {
		...projectData,
		summary,
		authors,
		tags,
		lang,
	};
};
