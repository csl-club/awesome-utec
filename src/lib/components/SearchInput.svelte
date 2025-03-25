<script lang="ts">
	import { onMount } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { on } from 'svelte/events';

	export interface Props extends HTMLInputAttributes {
		focusOnSlash?: boolean;
		input: HTMLInputElement | null;
	}

	let {
		focusOnSlash = true,
		input = $bindable(null),
		class: className,
		value = $bindable(''),
		...props
	}: Props = $props();

	onMount(() => {
		if (focusOnSlash) {
			return on(document, 'keydown', (ev) => {
				if (ev.key === '/' && document.activeElement !== input) {
					ev.preventDefault();
					input?.focus();
				}
			});
		}
	});
</script>

<input
	type="text"
	{...props}
	bind:value={() => value, (v) => (value = v.trimStart())}
	class={['border-foreground border px-2 py-1', className]}
	bind:this={input}
/>
