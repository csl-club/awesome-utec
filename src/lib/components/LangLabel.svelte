<script lang="ts">
	import classNames from 'classnames';
	import type { HTMLAttributes } from 'svelte/elements';
	import SimpleIconComponent from './SimpleIconComponent.svelte';
	import { colorByProgrammingLanguage, iconByProgrammingLanguage } from '$lib/icons';
	import { setLightness } from 'polished';
	import { themeVariables } from '$lib/themes';
	import globalState from '$lib/svelte/global-state.svelte';
	import { addTokenToQuery } from '$lib/svelte/search.svelte';
	import { Token } from '$lib/search';

	export interface Props extends HTMLAttributes<HTMLSpanElement> {
		lang: string;
	}

	const { lang, class: className, ...props }: Props = $props();

	const icon = $derived(iconByProgrammingLanguage(lang));

	const colors = $derived.by(() => {
		if (!lang) return null;

		const baseColor = colorByProgrammingLanguage(lang);
		let bgColor: string;

		if (!baseColor) {
			bgColor = document.documentElement.style.getPropertyValue(themeVariables.backgroundAlt2);
		} else {
			bgColor = setLightness(0.75)(baseColor);
		}

		const fgColor =
			globalState.preferredTheme === 'dark'
				? `var(${themeVariables.background})`
				: `var(${themeVariables.foreground})`;

		return { bgColor, fgColor };
	});
</script>

<button
	style={colors ? `background-color: ${colors.bgColor}; color: ${colors.fgColor}` : ''}
	class={classNames('h-auto cursor-pointer px-2 py-1 text-xs text-nowrap', className)}
	onclick={() => addTokenToQuery(new Token('lang', lang.toLowerCase()))}
	{...props}
>
	{#if icon !== null}
		<SimpleIconComponent {icon} fill={colors?.fgColor ?? ''} class="inline h-3 w-3" />
	{/if}
	<span>
		{lang}
	</span>
</button>
