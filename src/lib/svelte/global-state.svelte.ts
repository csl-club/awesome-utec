import themes, { isThemeName, themeVariables, type Theme, type ThemeName } from '$lib/themes';

export interface State {
	preferredTheme: ThemeName | null;
	searchQuery: string;
	searchInput: HTMLInputElement | null;
}

const globalState = $state<State>({
	preferredTheme: null,
	searchQuery: '',
	searchInput: null,
});

export const getThemeName = (): ThemeName => globalState.preferredTheme ?? 'light';
export const getTheme = (): Theme => themes[getThemeName()];

export const themeEffect = () => {
	if (globalState.preferredTheme !== null) {
		localStorage.theme = globalState.preferredTheme;
	}

	const theme = getTheme();

	for (const keyStr in theme) {
		const key = keyStr as keyof Theme;
		document.documentElement.style.setProperty(themeVariables[key as keyof Theme], theme[key]);
	}
};

export const loadPreferredTheme = () => {
	const savedThemeName = localStorage.theme;
	if (savedThemeName !== null && isThemeName(savedThemeName)) {
		globalState.preferredTheme = savedThemeName;
	}
};

export default globalState;
