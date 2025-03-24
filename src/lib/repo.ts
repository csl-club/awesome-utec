export const REPO_TYPES = ['github', 'gitlab'] as const;
export type RepoType = (typeof REPO_TYPES)[number];

export interface RepoInfo {
	type: RepoType;
	owner: string;
	repo: string;
}

export const isValidRepoType = (type: string): type is RepoType =>
	(REPO_TYPES as readonly string[]).includes(type);

export const repoStringToUrl = (repoString: string) => {
	const repoInfo = parseRepoInfo(repoString);
	if (repoInfo === null) {
		return repoString;
	}

	const { owner, repo } = repoInfo;

	switch (repoInfo.type) {
		case 'github':
			return `https://github.com/${owner}/${repo}`;
		case 'gitlab':
			return `https://gitlab.com/${owner}/${repo}`;
	}
};

export const parseRepoInfo = (repoString: string): RepoInfo | null => {
	const sepIndex = repoString.indexOf(':');
	if (sepIndex === -1) {
		// Just a URL.
		return null;
	}

	const type = repoString.substring(0, sepIndex).toLowerCase();
	const [owner, repo] = repoString.substring(sepIndex + 1).split('/');

	if (!isValidRepoType(type)) {
		return null;
	}

	return { type, owner, repo };
};
