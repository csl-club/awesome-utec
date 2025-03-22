<script lang="ts">
	import type { Project } from '$lib/content';
	import classNames from 'classnames';
	import type { HTMLLiAttributes } from 'svelte/elements';
	import { repoStringToUrl } from '$lib/repo';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import { iconByProgrammingLanguage, colorByProgrammingLanguage } from '$lib/icons';
	import SimpleIconComponent from './SimpleIconComponent.svelte';
	import { Link } from '@lucide/svelte';
	import { readableColor } from 'polished';

	export interface Props extends HTMLLiAttributes {
		project: Project;
		addTag: (tag: string) => void;
	}

	const { project, class: className, ...props }: Props = $props();
	const { lang } = project;

	const projectUrl = $derived(repoStringToUrl(project.repo));
	const langIcon = $derived(lang ? iconByProgrammingLanguage(lang) : null);
	const langBackground = $derived(
		(lang && colorByProgrammingLanguage(lang)) || 'var(--color-background)',
	);
	const langForeground = $derived(readableColor(langBackground));
</script>

<li {...props} class={classNames(className, 'bg-background-alt flex flex-col px-3 py-2')}>
	<div class="flex items-start justify-between">
		<h2 class="text-xl font-semibold">
			<ExternalLink href={projectUrl}>
				{project.name}
				<Link class="text-foreground-muted inline w-3" />
			</ExternalLink>
		</h2>
		<span
			style="background-color: {langBackground}; color: {langForeground}"
			class="h-auto px-2 py-1 text-xs text-nowrap"
		>
			{#if langIcon !== null}
				<SimpleIconComponent icon={langIcon} fill={langForeground} class="inline h-3 w-3" />
			{/if}<span class="ml-2">{project.lang}</span>
		</span>
	</div>
	<p>{project.authors.map((author) => author.name).join(', ')}</p>
	<p class="grow text-sm">{project.summary}</p>
	<ul class="mt-2 flex space-x-4">
		{#each project.tags as tag (tag)}
			<a href="#project-search" onclick={() => props.addTag(tag)} class="bg-background-alt-2 px-2 py-1 text-xs">#{tag}</a>
		{/each}
	</ul>
</li>
