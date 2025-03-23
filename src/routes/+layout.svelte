<script lang="ts">
	import Footer from '$lib/components/layout/Footer.svelte';
	import state, { getThemeName, loadPreferredTheme, themeEffect } from '$lib/svelte/state.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import { ArrowUpIcon, MoonStar, Sun } from '@lucide/svelte';
	import themes from '$lib/themes';
	import { initScript } from './theme-init';
	import * as conversion from "$lib/util/projects.to.readme";

	let { data, children }: any = $props();

	let ThemeIcon = $derived(getThemeName() === 'dark' ? MoonStar : Sun);

	const switchTheme = () => {
		const newTheme = getThemeName() === 'dark' ? 'light' : 'dark';
		state.preferredTheme = newTheme;
	};

	const download = (content: string) => {
		const blob = new Blob([content], { type: 'text/markdown' });
  		const url = window.URL.createObjectURL(blob);
  		const a = document.createElement("a");

		a.href = url;
		a.download = "README.md";
  		a.click();
	}

	const exportReadme = async () => {
		var template = await fetch("/README.template.md");
		var lines = (await template.text()).split("\n")
		var content = await conversion.processTemplate(lines, data.projects);

		console.log(content)
		download(content);
	};

	$effect(themeEffect);

	onMount(loadPreferredTheme);
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html initScript()}
</svelte:head>

<div class="p-4 flex align-center justify-between">
	<button title="Export as README.md" onclick={exportReadme} class="cursor-pointer p-2">
		<ArrowUpIcon />
	</button>

	<button title="Switch theme" onclick={switchTheme} class="cursor-pointer p-2">
		<ThemeIcon/>
	</button>
</div>
<div class="mx-auto flex max-w-4xl grow flex-col leading-relaxed">
	{@render children()}
</div>
<Footer />
