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
import lingC from 'linguist-languages/data/C';
import lingCplusplus from 'linguist-languages/data/C++';
import lingCSharp from 'linguist-languages/data/C#';
import lingHtml5 from 'linguist-languages/data/HTML';
import lingCss3 from 'linguist-languages/data/CSS';
import lingJavaScript from 'linguist-languages/data/JavaScript';
import lingTypeScript from 'linguist-languages/data/TypeScript';
import lingPython from 'linguist-languages/data/Python';
import lingPhp from 'linguist-languages/data/PHP';
import lingRust from 'linguist-languages/data/Rust';
import lingNixos from 'linguist-languages/data/Nix';
import lingRuby from 'linguist-languages/data/Ruby';
import lingJulia from 'linguist-languages/data/Julia';
import lingScala from 'linguist-languages/data/Scala';
import lingHaskell from 'linguist-languages/data/Haskell';
import lingOpenjdk from 'linguist-languages/data/Java';
import lingSvelte from 'linguist-languages/data/Svelte';
import lingVuedotjs from 'linguist-languages/data/Vue';
import lingKotlin from 'linguist-languages/data/Kotlin';
import lingAssembly from 'linguist-languages/data/Assembly';
import lingLua from 'linguist-languages/data/Lua';
import lingGo from 'linguist-languages/data/Go';
import lingZig from 'linguist-languages/data/Zig';
import lingPerl from 'linguist-languages/data/Perl';
import lingR from 'linguist-languages/data/R';
import type { Language } from 'linguist-languages';

const icons: Record<string, SimpleIcon | undefined> = {
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

const langInfo: Record<string, Language | undefined> = {
	c: lingC,
	'c++': lingCplusplus,
	'c#': lingCSharp,
	html: lingHtml5,
	css: lingCss3,
	javascript: lingJavaScript,
	typescript: lingTypeScript,
	python: lingPython,
	php: lingPhp,
	rust: lingRust,
	nix: lingNixos,
	ruby: lingRuby,
	julia: lingJulia,
	scala: lingScala,
	haskell: lingHaskell,
	java: lingOpenjdk,
	svelte: lingSvelte,
	vue: lingVuedotjs,
	kotlin: lingKotlin,
	assembly: lingAssembly,
	lua: lingLua,
	go: lingGo,
	zig: lingZig,
	perl: lingPerl,
	r: lingR,
};

export const iconByProgrammingLanguage = (lang: string): SimpleIcon | null => {
	lang = lang.toLowerCase();
	return icons[lang] ?? null;
};

export const colorByProgrammingLanguage = (lang: string): string | null => {
	lang = lang.toLowerCase();
	return langInfo[lang]?.color ?? null;
};
