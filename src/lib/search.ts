import removeAccents from 'remove-accents';
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

const normalizeText = (text: string) => removeAccents(text).toLowerCase();

const matchesToken = (token: Token) => (text: string) => {
	return normalizeText(text).includes(token.text);
};

export const doesProjectMatchToken =
	(project: Project) =>
	(token: Token): boolean => {
		const matcher = matchesToken(token);
		const authorStrings = project.authors.flatMap((author) => [author.name, author.id]);

		switch (token.type) {
			case 'name':
				return matcher(project.name);
			case 'author':
				return authorStrings.some(matcher);
			case 'tag':
				return project.tags.some(matcher);
			case 'summary':
				return matcher(project.summary);
			case 'lang':
				return project.lang !== undefined && matcher(project.lang);
			case null:
				// Can match anything
				return [
					project.name,
					...authorStrings,
					...project.tags,
					project.summary,
					project.lang ?? '',
				].some(matcher);
		}
	};

export const doesProjectMatchQuery = (query: string) => (project: Project) => {
	const tokens = parseTokens(query);
	const matcher = doesProjectMatchToken(project);
	return tokens.every(matcher);
};
