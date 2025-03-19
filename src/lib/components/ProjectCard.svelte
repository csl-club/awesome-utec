<script lang="ts">
	import type { Project } from '$lib/content';
	import classNames from 'classnames';
	import type { HTMLLiAttributes } from 'svelte/elements';
	import { repoStringToUrl } from '$lib/repo';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import { iconByProgrammingLanguage } from '$lib/icons';
	import SimpleIconComponent from './SimpleIconComponent.svelte';
	import { Link } from '@lucide/svelte';

	export interface Props extends HTMLLiAttributes {
		project: Project;
	}

	const { project, class: className, ...props }: Props = $props();

	const projectUrl = $derived(repoStringToUrl(project.repo));
	const langIcon = $derived(project.lang ? iconByProgrammingLanguage(project.lang) : null);
</script>

<li {...props} class={classNames(className, 'bg-background-alt flex flex-col px-3 py-2')}>
	<div class="flex justify-between">
		<h2 class="text-xl font-semibold">
			<ExternalLink href={projectUrl}>
				{project.name}
				<Link class="text-foreground-muted inline w-3" />
			</ExternalLink>
		</h2>
		<span>
			{#if langIcon !== null}
				<SimpleIconComponent
					icon={langIcon}
					fill="var(--color-foreground)"
					class="inline h-4 w-4"
				/>
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
