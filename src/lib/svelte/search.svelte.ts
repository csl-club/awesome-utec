import { parseTokens, type Token } from '$lib/search';
import state from '$lib/svelte/state.svelte';

export const getSearchTokens = (): Token[] => parseTokens(state.searchQuery);

export const addTokenToQuery = (token: Token): boolean => {
	const tokens = getSearchTokens();

	if (tokens.some((t) => t.type === token.type && t.text === token.text)) {
		return false;
	}

	if (state.searchQuery.length !== 0 && state.searchQuery.at(-1)! !== ' ') {
		state.searchQuery += ' ';
	}

	state.searchQuery += token.toString() + ' ';
	return true;
};
