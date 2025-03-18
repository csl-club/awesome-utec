import type { Project } from './content';

export const satisfiesQuery = (project: Project, query: string) => {
	query = query.toLowerCase();

	return (
		project.name.toLowerCase().includes(query) ||
		project.authors.some((author) => author.name.toLowerCase().includes(query))
	);
};
