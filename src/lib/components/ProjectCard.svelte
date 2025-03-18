<script lang="ts">
	import type { Project } from '$lib/content';
	import classNames from 'classnames';
	import type { HTMLLiAttributes } from 'svelte/elements';
	import { repoStringToUrl } from '$lib/repo';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import { iconByProgrammingLanguage } from '$lib/icons';

	export interface Props extends HTMLLiAttributes {
		project: Project;
	}

	const { project, class: className, ...props }: Props = $props();

	const projectUrl = $derived(repoStringToUrl(project.repo));
	const icon = $derived(project.lang ? iconByProgrammingLanguage(project.lang) : null);
</script>

<li {...props} class={classNames(className, 'bg-background-alt flex flex-col px-3 py-2')}>
	<div class="flex justify-between">
		<h2 class="text-xl font-semibold">
			<ExternalLink href={projectUrl}>{project.name}</ExternalLink>
		</h2>
		<span>
			{#if icon !== null}
				<svg role="img" class="inline h-4 w-4" viewBox="0 0 24 24">
					<title>{icon.title}</title>
					<path d={icon.path} />
				</svg>
			{/if}<span class="ml-2 text-sm">{project.lang}</span>
		</span>
	</div>
	<p>{project.authors.map((author) => author.name).join(', ')}</p>
	<p class="grow text-sm">{project.summary}</p>
	<ul class="mt-2 flex space-x-4">
		{#each project.tags as tag (tag)}
			<li class="bg-background-alt-2 px-2 py-1 text-xs">#{tag}</li>
		{/each}
	</ul>
</li>
