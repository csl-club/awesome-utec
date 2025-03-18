<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	export interface Props extends HTMLAnchorAttributes {}

	const { children, ...props }: Props = $props();
</script>

<a {...props} target="_blank" rel="noopener noreferrer">
	{@render children?.()}
</a>
