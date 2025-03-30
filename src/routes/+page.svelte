<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import SearchInput from '$lib/components/SearchInput.svelte';
	import { doesProjectMatchQuery } from '$lib/search';
	import { projectSorters, SORT_TYPES, type SortType } from '$lib/sorting';
	import globalState from '$lib/svelte/global-state.svelte';
	import type { PageProps } from './$types';
	import { ArrowDown, ArrowUp } from '@lucide/svelte';

	const { data }: PageProps = $props();

	let sortType = $state<SortType>('default');
	let reverseSort = $state(false);

	const sorter = $derived(projectSorters[sortType]);

	const filteredProjects = $derived.by(() => {
		const result = data.projects
			.filter(doesProjectMatchQuery(globalState.searchQuery))
			.sort(sorter.sort);

		if (reverseSort) {
			result.reverse();
		}
		return result;
	});

	const SortDirectionIcon = $derived(reverseSort ? ArrowUp : ArrowDown);
</script>

<svelte:head>
	<title>Awesome UTEC</title>
</svelte:head>

<main class="font-main mx-auto max-w-4xl px-6 py-4">
	<div class="text-center">
		<div class="relative inline-block">
			<h1 class="mx-auto mb-4 text-center text-4xl font-bold">Awesome UTEC</h1>
			<a
				href="https://awesome.re"
				aria-label="Awesome"
				class="motion-safe:animate-grow absolute -right-2 -bottom-1 translate-x-1/2 -rotate-12"
				target="_blank"
				rel="noopener noreferrer"
			>
				<enhanced:img src="$lib/assets/img/awesome.svg" alt="" class="inline" />
			</a>
		</div>
	</div>

	<p class="my-10 text-center text-lg">
		Un compendio de proyectos de computación de la Universidad de Ingeniería y Tecnología.
	</p>

	<div
		class="flex flex-col items-center justify-center space-y-4 space-x-4 text-center text-sm sm:flex-row sm:space-y-0"
	>
		<div class="text-right">
			<label for="sortby" class="text-foreground-muted mr-0">Buscar:</label>
			<SearchInput
				name="sortby"
				id="sortby"
				bind:value={globalState.searchQuery}
				bind:input={globalState.searchInput}
				class="w-64 "
			/>
		</div>

		<div class="text-left">
			<label for="sortby" class="text-foreground-muted mr-0">Ordenar por:</label>
			<select
				name="sortby"
				id="sortby"
				bind:value={sortType}
				class="border-foreground mr-1 border px-2 py-1"
			>
				{#each SORT_TYPES as sortType, index (index)}
					<option value={sortType}>{projectSorters[sortType].displayName}</option>
				{/each}
			</select>
			<button onclick={() => (reverseSort = !reverseSort)}>
				<SortDirectionIcon class="inline w-5 cursor-pointer" />
			</button>
		</div>
	</div>

	<ul class="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
		{#each filteredProjects as project (project.repo)}
			<ProjectCard {project} />
		{/each}
	</ul>
</main>
