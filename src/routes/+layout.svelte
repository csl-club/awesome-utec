<script lang="ts">
	import Footer from '$lib/components/layout/Footer.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<div class="mx-auto max-w-4xl grow leading-7">
	{@render children()}
</div>
<Footer />
