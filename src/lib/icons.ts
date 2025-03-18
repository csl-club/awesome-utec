import {
	siAssemblyscript,
	siC,
	siCplusplus,
	siHaskell,
	siJavascript,
	siNixos,
	siPerl,
	siPython,
	siRust,
	siSharp,
	siTypescript,
	type SimpleIcon,
} from 'simple-icons';

export const iconByProgrammingLanguage = (lang: string): SimpleIcon | null => {
	switch (lang.toLowerCase()) {
		case 'c':
			return siC;
		case 'c++':
			return siCplusplus;
		case 'c#':
			return siSharp;
		case 'javascript':
			return siJavascript;
		case 'typescript':
			return siTypescript;
		case 'python':
			return siPython;
		case 'rust':
			return siRust;
		case 'nix':
			return siNixos;
		case 'haskell':
			return siHaskell;
		case 'assembly':
			return siAssemblyscript;
		case 'perl':
			return siPerl;
		default:
			return null;
	}
};

// TODO: color by programming language
