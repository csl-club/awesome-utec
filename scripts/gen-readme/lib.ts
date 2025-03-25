import type { Project } from '../../src/lib/content';
import { repoStringToUrl } from '../../src/lib/repo';
import { enumerate } from '../../src/lib/util/arrays';

const prettifyTag = (s: string) => s[0].toUpperCase() + s.slice(1);

const formatTag = (tag: string) => {
	const prettyTag = prettifyTag(tag);
	return `[${prettyTag}](#${prettyTag})`;
};

const formatProject = (project: Project) => {
	const url = repoStringToUrl(project.repo);
	const authorNames = project.authors.map((author) => author.name);
	return `[${project.name}](${url}) (${authorNames.join(', ')}): ${project.summary}`;
};

const getAllTags = (projects: Project[]) => {
	const allTags = projects.map((proj) => proj.tags).flat();
	const tagSet = new Set(allTags);
	return [...tagSet].sort();
};

const generateIndex = (projects: Project[]): string => {
	const tags = getAllTags(projects);
	const lines = tags.map((tag) => `- ${formatTag(tag)}`);
	return lines.join('\n');
};

const generateProjects = (projects: Project[]): string => {
	const lines: string[] = [];
	const tags = getAllTags(projects);

	for (const [i, tag] of enumerate(tags)) {
		lines.push(`### ${prettifyTag(tag)}`);
		lines.push('');

		const projectsWithTag = projects
			.filter((proj) => proj.tags.includes(tag))
			.sort((pa, pb) => pa.name.localeCompare(pb.name));

		const projectLines = projectsWithTag.map((proj) => `- ${formatProject(proj)}`);

		lines.push(...projectLines);

		if (i !== tags.length - 1) {
			lines.push(''); // Empty line in-between
		}
	}

	return lines.join('\n');
};

export const generateReadme = (template: string, projects: Project[]): string => {
	const indexContents = generateIndex(projects);
	const projectsContents = generateProjects(projects);

	return template
		.replaceAll('<!-- %INDEX% -->', indexContents)
		.replaceAll('<!-- %PROJECTS% -->', projectsContents);
};
