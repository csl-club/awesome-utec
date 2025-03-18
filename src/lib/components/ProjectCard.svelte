<script lang="ts">
	import type { Project } from '$lib/content';
	import classNames from 'classnames';
	import type { HTMLLiAttributes } from 'svelte/elements';
	import { repoStringToUrl } from '$lib/repo';
	import ExternalLink from '$lib/components/ExternalLink.svelte';

	export interface Props extends HTMLLiAttributes {
		project: Project;
	}

	const { project, class: className, ...props }: Props = $props();
</script>

<li {...props} class={classNames(className, 'bg-background-alt p-2')}>
	<h2 class="text-xl font-semibold">
		<ExternalLink href={repoStringToUrl(project.repo)}>
			{project.name}
		</ExternalLink>
	</h2>
	<p>{project.authors.map((author) => author.name).join(', ')}</p>
</li>
