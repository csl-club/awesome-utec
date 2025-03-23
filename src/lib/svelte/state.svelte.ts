import themes, { isThemeName, themeVariables, type Theme, type ThemeName } from '$lib/themes';

export interface State {
	preferredTheme: ThemeName | null;
	searchQuery: string;
}

const state = $state<State>({
	preferredTheme: null,
	searchQuery: '',
});

export const getThemeName = (): ThemeName => state.preferredTheme ?? 'light';
export const getTheme = (): Theme => themes[getThemeName()];

export const themeEffect = () => {
	if (state.preferredTheme !== null) {
		localStorage.theme = state.preferredTheme;
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
		state.preferredTheme = savedThemeName;
	}
};

export default state;
