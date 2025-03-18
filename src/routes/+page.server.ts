import { getAllProjects } from '$lib/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const projects = await getAllProjects();
	return { projects };
};
