export type RepoType = 'github'; // | 'gitlab'

export interface Repo {
	owner: string;
	name: string;
	url: string;
}

export const repoStringToUrl = (repoString: string) => {
	const sepIndex = repoString.indexOf(':');

	if (sepIndex === -1) {
		// Just a URL
		return repoString;
	} else {
		const repoType = repoString.substring(0, sepIndex);
		const [owner, name] = repoString.substring(sepIndex + 1).split('/');

		switch (repoType.toLowerCase()) {
			case 'github':
				return `https://github.com/${owner}/${name}`;
			default:
				return repoString;
		}
	}
};
