<script lang="ts">
	import type { SimpleIcon } from 'simple-icons';
	import type { SVGAttributes } from 'svelte/elements';

	export interface Props extends SVGAttributes<SVGSVGElement> {
		icon: SimpleIcon;
	}

	const { icon, ...props }: Props = $props();
</script>

<svg role="img" viewBox="0 0 24 24" {...props}>
	<title>{icon.title}</title>
	<path d={icon.path} />
</svg>
