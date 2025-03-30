import { parseRepoInfo, type RepoInfo, type RepoType } from './repo';
import { Gitlab } from '@gitbeaker/rest';
import { Octokit } from '@octokit/rest';
import { isEmpty, maxBy, merge } from 'lodash-es';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';
import z from 'zod';

export const AuthorData = z.object({
	name: z.string(),
	email: z.string().email().optional(),
});

export type AuthorData = z.infer<typeof AuthorData>;

export const AuthorDataRecord = z.record(z.string(), AuthorData);

export type AuthorDataRecord = z.infer<typeof AuthorDataRecord>;

export const ProjectData = z.object({
	name: z.string(),
	authors: z.array(z.string()),
	repo: z.string(),
	summary: z.string().optional(),
	tags: z.array(z.string()).optional().default([]),
	lang: z.string().optional(),
});

export type ProjectData = z.infer<typeof ProjectData>;

export const Author = AuthorData.extend({
	id: z.string(),
});

export type Author = z.infer<typeof Author>;

export const Project = z.object({
	name: z.string(),
	authors: z.array(Author),
	repo: z.string(),
	summary: z.string(),
	tags: z.array(z.string()),
	lang: z.string().optional(),
});

export type Project = z.infer<typeof Project>;

export const ContentData = z.object({
	authors: AuthorDataRecord,
	projects: z.array(ProjectData),
});

export type ContentData = z.infer<typeof ContentData>;

export interface AuthConfig {
	githubToken?: string;
}

export const contentFile = path.join(process.cwd(), 'content.yml');

export const getContentData = async (): Promise<ContentData> => {
	const fileContents = await readFile(contentFile, 'utf-8');
	const parsedContent: unknown = parseYaml(fileContents);
	return unwrapZodResult(ContentData.safeParse(parsedContent));
};

export const getAllProjects = async (auth: AuthConfig): Promise<Project[]> => {
	const { projects, authors } = await getContentData();
	return await Promise.all(projects.map((proj) => completeProjectData(auth, proj, authors)));
};

type RemoteFetcher = (repoInfo: RepoInfo, auth: AuthConfig) => Promise<Partial<ProjectData>>;

const remoteFetchers: Record<RepoType, RemoteFetcher> = {
	github: async (repoInfo, auth) => {
		if (!auth.githubToken) {
			console.warn('GitHub authentication not provided; beware of rate limits.');
		}

		const octokit = new Octokit({ auth: auth.githubToken });
		const { data } = await octokit.rest.repos.get({ ...repoInfo });

		return {
			lang: data.language ?? undefined,
			summary: data.description ?? undefined,
		};
	},
	gitlab: async (repoInfo) => {
		const projId = `${repoInfo.owner}/${repoInfo.repo}`;
		const gitlab = new Gitlab({});

		const projectData = await gitlab.Projects.show(projId);
		const langs = await gitlab.Projects.showLanguages(projId);

		const mainLang = !isEmpty(langs) ? maxBy(Object.keys(langs), (key) => langs[key]) : undefined;

		return {
			lang: mainLang,
			summary: projectData.description,
		};
	},
};

const completeProjectData = async (
	auth: AuthConfig,
	projectData: ProjectData,
	authorData: AuthorDataRecord,
): Promise<Project> => {
	projectData.tags ??= [];

	const repoInfo = parseRepoInfo(projectData.repo);

	if (repoInfo !== null) {
		const remoteData = await remoteFetchers[repoInfo.type](repoInfo, auth);
		projectData = merge(remoteData, projectData);
	}

	const authors = projectData.authors.map((id) => ({ ...authorData[id], id }));

	return unwrapZodResult(Project.safeParse({ ...projectData, authors }));
};

const unwrapZodResult = <T>(result: z.SafeParseReturnType<unknown, T>): T => {
	if (result.success) {
		return result.data;
	} else {
		const subErrMessages = result.error.issues.map((e) => `${e.path.join('.')}: ${e.message}`);
		console.error(`Validation failed: ${subErrMessages.join('; ')}`);
		throw new Error('validation error');
	}
};
