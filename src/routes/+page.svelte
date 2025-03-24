<script lang="ts">
	import type { PageProps } from './$types';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { doesProjectMatchQuery } from '$lib/search';
	import SearchInput from '$lib/components/SearchInput.svelte';
	import globalState from '$lib/svelte/global-state.svelte';
	import { projectSorters, SORT_TYPES, type SortType } from '$lib/sorting';

	const { data }: PageProps = $props();

	let sortType = $state<SortType>('default');

	const sorter = $derived(projectSorters[sortType]);

	const filteredProjects = $derived(
		data.projects.filter(doesProjectMatchQuery(globalState.searchQuery)).sort(sorter.sort),
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

	<div class="space-x-4 text-center text-sm">
		<SearchInput
			placeholder="Buscar..."
			bind:value={globalState.searchQuery}
			bind:input={globalState.searchInput}
			class="w-64 "
		/>

		<label for="sortby" class="text-foreground-muted mr-0">Ordenar por:</label>
		<select
			name="sortby"
			id="sortby"
			bind:value={sortType}
			class="border-foreground border px-2 py-1"
		>
			{#each SORT_TYPES as sortType, index (index)}
				<option value={sortType}>{projectSorters[sortType].displayName}</option>
			{/each}
		</select>
	</div>

	<ul class="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
		{#each filteredProjects as project (project.repo)}
			<ProjectCard {project} />
		{/each}
	</ul>
</main>
