import themes, { themeVariables, type Theme } from '$lib/themes';

export const initScript = () => {
	const themesStr = JSON.stringify(themes);
	const themeKeys = Object.keys(themeVariables) as (keyof Theme)[];
	const setVarLines = themeKeys.map(
		(key) =>
			`document.documentElement.style.setProperty('${themeVariables[key]}', initialTheme.${key});`,
	);

	return `
<script> 
  (function() {
    var initialTheme = (${themesStr})[localStorage.theme]
    if (initialTheme) {
      ${setVarLines.join('\n')}
    }
  })()
</script>
`;
};
