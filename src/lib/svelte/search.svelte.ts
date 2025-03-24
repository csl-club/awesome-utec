import { parseTokens, type Token } from '$lib/search';
import globalState from '$lib/svelte/global-state.svelte';

export const getSearchTokens = (): Token[] => parseTokens(globalState.searchQuery);

export const addTokenToQuery = (token: Token): boolean => {
	const tokens = getSearchTokens();

	if (tokens.some((t) => t.type === token.type && t.text === token.text)) {
		return false;
	}

	if (globalState.searchQuery.length !== 0 && globalState.searchQuery.at(-1)! !== ' ') {
		globalState.searchQuery += ' ';
	}

	globalState.searchQuery += token.toString() + ' ';

	globalState.searchInput?.focus();
	return true;
};
