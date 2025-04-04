<script lang="ts">
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import type { Project } from '$lib/content';
	import { repoStringToUrl } from '$lib/repo';
	import { Token } from '$lib/search';
	import { addTokenToQuery } from '$lib/svelte/search.svelte';
	import LangLabel from './LangLabel.svelte';
	import { Link } from '@lucide/svelte';
	import type { HTMLLiAttributes } from 'svelte/elements';

	export interface Props extends HTMLLiAttributes {
		project: Project;
	}

	const { project, class: className, ...props }: Props = $props();

	const onTagClick = (tag: string) => {
		addTokenToQuery(new Token('tag', tag));
	};

	const projectUrl = $derived(repoStringToUrl(project.repo));
</script>

<li {...props} class={['bg-background-alt flex flex-col space-y-2 px-4 py-2', className]}>
	<div class="flex items-start justify-between">
		<h2 class="text-xl font-semibold">
			<ExternalLink href={projectUrl}>
				{project.name}
				<Link class="text-foreground-muted inline w-3" />
			</ExternalLink>
		</h2>
		{#if project.lang}
			<LangLabel lang={project.lang} />
		{/if}
	</div>

	<ul class="leading-snug">
		{#each project.authors as author (author.id)}
			<li class="inline not-last:after:content-[',_']">{author.name}</li>
		{/each}
	</ul>

	<p class="grow text-sm">{project.summary}</p>
	<ul class="mt-2 flex space-x-2">
		{#each project.tags as tag (tag)}
			<li class="bg-background-alt-2 px-2 py-1 text-xs">
				<button onclick={() => onTagClick(tag)} class="cursor-pointer">
					#{tag}
				</button>
			</li>
		{/each}
	</ul>
</li>
