export interface Theme {
	background: string;
	backgroundAlt: string;
	backgroundAlt2: string;
	foreground: string;
	foregroundMuted: string;
}

const themes = Object.freeze({
	light: {
		background: '#eff1f5',
		backgroundAlt: '#e6e9ef',
		backgroundAlt2: '#dce0e8',
		foreground: '#4c4f69',
		foregroundMuted: '#8c8fa1',
	},
	dark: {
		background: '#1e1e2e',
		backgroundAlt: '#181825',
		backgroundAlt2: '#11111b',
		foreground: '#cdd6f4',
		foregroundMuted: '#7f849c',
	},
}) satisfies Record<string, Theme>;

export type ThemeName = keyof typeof themes;

export const isThemeName = (s: string): s is ThemeName => Object.keys(themes).includes(s);

export default themes;
