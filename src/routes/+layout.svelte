<script lang="ts">
	import Footer from '$lib/components/layout/Footer.svelte';
	import state, { getThemeName, loadPreferredTheme, themeEffect } from '$lib/svelte/state.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import { Download, MoonStar, Sun } from '@lucide/svelte';
	import { initScript } from './theme-init';
	import type { LayoutProps } from './$types';
	import { base } from '$app/paths';

	let { children }: LayoutProps = $props();

	const ThemeIcon = $derived(getThemeName() === 'dark' ? MoonStar : Sun);

	const switchTheme = () => {
		const newTheme = getThemeName() === 'dark' ? 'light' : 'dark';
		state.preferredTheme = newTheme;
	};

	$effect(themeEffect);

	onMount(loadPreferredTheme);
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html initScript()}
</svelte:head>

<div class="align-center flex justify-between p-4">
	<a
		title="Download README"
		href="{base}/README.md"
		download="README.md"
		class="cursor-pointer p-2"
	>
		<Download />
	</a>

	<button title="Switch theme" onclick={switchTheme} class="cursor-pointer p-2">
		<ThemeIcon />
	</button>
</div>
<div class="mx-auto flex max-w-4xl grow flex-col leading-relaxed">
	{@render children()}
</div>
<Footer />
