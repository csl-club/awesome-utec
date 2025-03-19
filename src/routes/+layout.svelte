<script lang="ts">
	import Footer from '$lib/components/layout/Footer.svelte';
	import state, { getThemeName, loadPreferredTheme, themeEffect } from '$lib/state.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import { MoonStar, Sun } from '@lucide/svelte';
	import themes from '$lib/themes';
	import { initScript } from './theme-init';

	let { children } = $props();

	let ThemeIcon = $derived(getThemeName() === 'dark' ? MoonStar : Sun);

	const switchTheme = () => {
		const newTheme = getThemeName() === 'dark' ? 'light' : 'dark';
		state.preferredTheme = newTheme;
	};

	$effect(themeEffect);

	onMount(loadPreferredTheme);
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html initScript(themes)}
</svelte:head>

<div class="p-4 text-right">
	<button onclick={switchTheme} class="cursor-pointer p-2">
		<ThemeIcon />
	</button>
</div>
<div class="mx-auto flex max-w-4xl grow flex-col leading-7">
	{@render children()}
</div>
<Footer />
