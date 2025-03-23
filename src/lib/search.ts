import type { Project } from './content';

export const TOKEN_TYPES = ['name', 'author', 'summary', 'tag', 'lang'] as const;
export type TokenType = (typeof TOKEN_TYPES)[number];

export class Token {
	public constructor(
		public readonly type: TokenType | null,
		public readonly text: string,
	) {
		if (this.text.match(/\s+/)) {
			throw new Error('token cannot contain whitespace');
		}
	}

	public toString(): string {
		if (this.type === null) {
			return this.text;
		} else {
			return `${this.type}:${this.text}`;
		}
	}
}

export const isTokenType = (s: string): s is TokenType => {
	return (TOKEN_TYPES as readonly string[]).includes(s);
};

export const parseToken = (str: string): Token | null => {
	if (str.length === 0) {
		return null;
	}

	if (str.match(/\s/)) {
		throw new Error('word cannot contain whitespace');
	}

	str = str.toLowerCase();
	const sepIndex = str.indexOf(':');
	if (sepIndex === -1) {
		return { type: null, text: str };
	}

	const type = str.slice(0, sepIndex);
	const text = str.slice(sepIndex + 1);

	if (isTokenType(type)) {
		if (text.length === 0) {
			return null;
		} else {
			return { type, text };
		}
	} else {
		return { type: null, text: str };
	}
};

export const parseTokens = (query: string): Token[] => {
	query = query.trim();
	if (query.length === 0) return [];

	const words = query.split(/\s+/);
	return words.map(parseToken).filter((t) => t !== null);
};

export class Match {
	public constructor(
		public start: number,
		public end: number,
	) {}
}

export class ProjectMatches {
	public constructor(
		public readonly name: Match[],
		public readonly authors: Match[][],
		public readonly tags: Match[][],
		public readonly summary: Match[],
		public readonly lang?: Match[],
	) {}

	public hasSome(): boolean {
		return (
			this.name.length !== 0 ||
			this.authors.some((matches) => matches.length !== 0) ||
			this.tags.some((matches) => matches.length !== 0) ||
			this.summary.length !== 0 ||
			(this.lang !== undefined && this.lang.length !== 0)
		);
	}
}

export const mergeMatches = (matches: Match[]): Match[] => {
	if (matches.length === 0) {
		return [];
	}

	const sortedMatches = matches.toSorted((a, b) => a.start - b.start);
	const out: Match[] = [sortedMatches[0]];

	for (let i = 1; i < sortedMatches.length; i++) {
		const curTail = out.at(-1)!;
		const nextMatch = sortedMatches[i];

		if (nextMatch.start <= curTail.end) {
			curTail.end = Math.max(curTail.end, nextMatch.end);
		} else {
			out.push(nextMatch);
		}
	}

	return out;
};

export const findMatches = (searchValue: string, str: string): Match[] => {
	if (searchValue.length === 0) {
		throw new Error('search value cannot be empty');
	}

	str = str.toLowerCase();

	const out: Match[] = [];
	let pos = -1;

	while (true) {
		pos = str.indexOf(searchValue, pos + 1);
		if (pos === -1) {
			break;
		}
		out.push(new Match(pos, pos + searchValue.length));
	}

	return out;
};

export const doFullQuery = (tokens: Token[], str: string): Match[] =>
	tokens.map((token) => findMatches(token.text, str)).flat();

export const isTokenOfType = (type: TokenType) => (token: Token) =>
	token.type === null || token.type === type;

export const executeProjectQuery = (tokens: Token[], project: Project): ProjectMatches | null => {
	if (tokens.length === 0) {
		return null;
	}

	const nameTokens = tokens.filter(isTokenOfType('name'));
	const summaryTokens = tokens.filter(isTokenOfType('summary'));
	const authorTokens = tokens.filter(isTokenOfType('author'));
	const tagsTokens = tokens.filter(isTokenOfType('tag'));
	const langTokens = tokens.filter(isTokenOfType('lang'));

	const nameMatches = doFullQuery(nameTokens, project.name);
	const summaryMatches = doFullQuery(summaryTokens, project.summary);
	const authorMatches = project.authors.map((author) => doFullQuery(authorTokens, author.name));
	const tagsMatches = project.tags.map((tag) => doFullQuery(tagsTokens, tag));
	const langMatches = project.lang ? doFullQuery(langTokens, project.lang) : undefined;

	return new ProjectMatches(nameMatches, authorMatches, tagsMatches, summaryMatches, langMatches);
};
