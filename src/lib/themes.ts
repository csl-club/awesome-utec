// Should a new field be added to the themes, said new field should get a
// corresponding default value for its CSS variable over at app.css.
export interface Theme {
	background: string;
	backgroundAlt: string;
	backgroundAlt2: string;
	foreground: string;
	foregroundMuted: string;
}

const themes = {
	light: {
		background: '#eff1f5',
		backgroundAlt: '#e6e9ef',
		backgroundAlt2: '#dce0e8',
		foreground: '#4c4f69',
		foregroundMuted: '#8c8fa1',
	} as const,
	dark: {
		background: '#1e1e2e',
		backgroundAlt: '#181825',
		backgroundAlt2: '#11111b',
		foreground: '#cdd6f4',
		foregroundMuted: '#7f849c',
	} as const,
} as const satisfies Record<string, Theme>;

export type ThemeName = keyof typeof themes;

export const isThemeName = (s: string): s is ThemeName => Object.keys(themes).includes(s);

export const themeVariables = {
	background: '--color-background',
	backgroundAlt: '--color-background-alt',
	backgroundAlt2: '--color-background-alt-2',
	foreground: '--color-foreground',
	foregroundMuted: '--color-foreground-muted',
} as const satisfies Theme;

export default themes;
