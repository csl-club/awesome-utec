import { getAllProjects } from "$lib/content";
import type { LayoutLoad } from "./$types";
import { GITHUB_TOKEN } from "$env/static/private";

export const load: LayoutLoad = async () => {
    const projects = await getAllProjects(GITHUB_TOKEN);
    return { projects };
}