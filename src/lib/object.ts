export const maxKeyByValue = (obj: Record<string, number>): string => {
	const entries = Object.entries<number>(obj);
	if (entries.length === 0) {
		throw new Error('object cannot be empty');
	}

	entries.sort((a, b) => b[1] - a[1]);
	return entries[0][0];
};

export const isEmpty = (obj: object) => {
	for (const prop in obj) {
		if (Object.hasOwn(obj, prop)) {
			return false;
		}
	}

	return true;
};
