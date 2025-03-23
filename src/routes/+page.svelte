<script lang="ts">
	import removeAccents from 'remove-accents';
	import type { PageProps } from './$types';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { executeProjectQuery, parseTokens } from '$lib/search';
	import SearchInput from '$lib/components/SearchInput.svelte';
	import state from '$lib/svelte/state.svelte';
	import type { Project } from '$lib/content';


	const { data }: PageProps = $props();

	const removeProjectAccents = (proj: Project): Project => ({
		name: removeAccents(proj.name),
		authors: proj.authors.map((author) => ({
			...author,
			name: removeAccents(author.name),
		})),
		summary: removeAccents(proj.summary),
		tags: proj.tags.map(removeAccents),
		lang: proj.lang ? removeAccents(proj.lang) : proj.lang,
		repo: removeAccents(proj.repo),
	});

	const searchTokens = $derived(parseTokens(state.searchQuery));

	const filteredProjects = $derived(
		searchTokens.length === 0
			? data.projects
			: data.projects.filter((proj) =>
					executeProjectQuery(searchTokens, removeProjectAccents(proj))!.hasSome(),
				),
	);
</script>

<svelte:head>
	<title>Awesome UTEC</title>
</svelte:head>

<main class="font-main mx-auto max-w-4xl px-6 py-4">
	<h1 class="mb-4 text-center text-4xl font-bold">Awesome UTEC</h1>
	<div class="text-center">
		<a href="https://awesome.re" aria-label="Awesome">
			<enhanced:img src="$lib/assets/img/awesome.svg" alt="" class="inline" />
		</a>
	</div>

	<p class="my-10 text-center text-lg">
		Un compendio de proyectos de computación de la Universidad de Ingeniería y Tecnología.
	</p>

	<div class="space-x-4 text-center">
		<SearchInput placeholder="Buscar..." bind:value={state.searchQuery} class="w-64 text-sm" />
	</div>

	<ul class="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
		{#each filteredProjects as project (project.repo)}
			<ProjectCard {project} />
		{/each}
	</ul>
</main>
