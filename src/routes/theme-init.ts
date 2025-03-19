export const initScript = (themes: unknown) => `
<script> 
  (function() {
    var initialTheme = (${JSON.stringify(themes)})[localStorage.theme]
    if (initialTheme) {
    document.documentElement.style.setProperty('--color-background', initialTheme.background);
    document.documentElement.style.setProperty('--color-background-alt', initialTheme.backgroundAlt);
    document.documentElement.style.setProperty('--color-background-alt-2', initialTheme.backgroundAlt2);
    document.documentElement.style.setProperty('--color-foreground', initialTheme.foreground);
    document.documentElement.style.setProperty('--color-foreground-muted', initialTheme.foregroundMuted);
    }
  })()
</script>
`;
