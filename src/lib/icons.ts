import {
	siAssemblyscript,
	siC,
	siCplusplus,
	siCss3,
	siGo,
	siHaskell,
	siHtml5,
	siJavascript,
	siJulia,
	siKotlin,
	siLua,
	siNixos,
	siOpenjdk,
	siPerl,
	siPhp,
	siPython,
	siR,
	siRuby,
	siRust,
	siScala,
	siSharp,
	siSvelte,
	siTypescript,
	siVuedotjs,
	siZig,
	type SimpleIcon,
} from 'simple-icons';

const icons: Record<string, SimpleIcon> = {
	c: siC,
	'c++': siCplusplus,
	'c#': siSharp,
	html: siHtml5,
	css: siCss3,
	javascript: siJavascript,
	typescript: siTypescript,
	python: siPython,
	php: siPhp,
	rust: siRust,
	nix: siNixos,
	ruby: siRuby,
	julia: siJulia,
	scala: siScala,
	haskell: siHaskell,
	java: siOpenjdk,
	svelte: siSvelte,
	vue: siVuedotjs,
	kotlin: siKotlin,
	assembly: siAssemblyscript,
	lua: siLua,
	go: siGo,
	zig: siZig,
	perl: siPerl,
	r: siR,
};

export const iconByProgrammingLanguage = (lang: string): SimpleIcon | null => {
	lang = lang.toLowerCase();
	return icons[lang] ?? null;
};

// TODO: color by programming language
