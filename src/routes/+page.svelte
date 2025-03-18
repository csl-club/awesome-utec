<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { satisfiesQuery } from '$lib/search';
	import type { PageProps } from './$types';

	let searchQuery = $state('');

	const { data }: PageProps = $props();

	const filteredProjects = $derived(data.projects.filter((p) => satisfiesQuery(p, searchQuery)));
</script>

<svelte:head>
	<title>Awesome UTEC</title>
</svelte:head>

<main class="font-main mx-auto max-w-4xl px-6 py-8">
	<h1 class="my-6 text-center text-4xl font-bold">Awesome UTEC</h1>
	<p class="my-10 text-center text-lg">
		Un compendio de proyectos de computación de la Universidad de Ingeniería y Tecnología.
	</p>

	<div class="space-x-4 text-center">
		<input
			type="text"
			placeholder="Buscar..."
			bind:value={() => searchQuery, (v) => (searchQuery = v.trimStart())}
			class="border-foreground border px-2 py-1"
		/>
	</div>

	<ul class="my-8 grid grid-cols-2 gap-4">
		{#each filteredProjects as project (project.repo)}
			<ProjectCard {project} />
		{/each}
	</ul>
</main>
