import themes, { isThemeName, type Theme, type ThemeName } from '$lib/themes';

export interface State {
	preferredTheme: ThemeName | null;
}

const state = $state<State>({
	preferredTheme: null,
});

export const THEME_STORAGE_KEY = 'theme';

export const getThemeName = (): ThemeName => state.preferredTheme ?? 'light';
export const getTheme = (): Theme => themes[getThemeName()];

export const themeEffect = () => {
	if (state.preferredTheme !== null) {
		localStorage.setItem(THEME_STORAGE_KEY, state.preferredTheme);
	}

	const setVar = (name: string, value: string) =>
		document.documentElement.style.setProperty(name, value);

	const theme = getTheme();
	setVar('--color-background', theme.background);
	setVar('--color-background-alt', theme.backgroundAlt);
	setVar('--color-background-alt-2', theme.backgroundAlt2);
	setVar('--color-foreground', theme.foreground);
	setVar('--color-foreground-muted', theme.foregroundMuted);
};

export const loadPreferredTheme = () => {
	const savedThemeName = localStorage.getItem(THEME_STORAGE_KEY);
	if (savedThemeName !== null && isThemeName(savedThemeName)) {
		state.preferredTheme = savedThemeName;
	}
};

export default state;
