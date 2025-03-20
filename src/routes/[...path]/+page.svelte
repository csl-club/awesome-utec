<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Página no encontrada</title>
</svelte:head>

<main class="flex min-h-full grow flex-col justify-center px-6 py-8">
	<h1 class="mb-6 text-center text-4xl leading-normal font-semibold">
		404 - Página no encontrada :/
	</h1>
	<nav class="space-x-6 text-center">
		<a href="{base}/">Volver al inicio</a>
	</nav>
</main>
