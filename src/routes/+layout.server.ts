import { GITHUB_TOKEN } from '$env/static/private';
import { getAllProjects } from '$lib/content';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	const projects = await getAllProjects({ githubToken: GITHUB_TOKEN });
	return { projects };
};
