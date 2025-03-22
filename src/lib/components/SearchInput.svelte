<script lang="ts">
	import { onMount } from 'svelte';
	import { on } from 'svelte/events';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import classNames from 'classnames';

	export interface Props extends HTMLInputAttributes {
		focusOnSlash?: boolean;
	}

	let { focusOnSlash = true, class: className, value = $bindable(''), ...props }: Props = $props();
	let element = $state<HTMLInputElement | null>(null);

	onMount(() => {
		if (focusOnSlash) {
			return on(document, 'keydown', (ev) => {
				if (ev.key === '/' && document.activeElement !== element) {
					ev.preventDefault();
					element?.focus();
				}
			});
		}
	});
</script>

<input
	id="project-search"
	type="text"
	{...props}
	bind:value={() => value, (v) => (value = v.trimStart())}
	class={classNames('border-foreground border px-2 py-1', className)}
	bind:this={element}
/>
