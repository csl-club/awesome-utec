import type { Project } from './content';

export interface Sorter<T> {
	displayName: string;
	sort: (a: T, b: T) => number;
}

export const SORT_TYPES = ['default', 'lang', 'name'] as const;

export type SortType = (typeof SORT_TYPES)[number];

export const projectSorters: Readonly<Record<SortType, Sorter<Project>>> = {
	name: {
		displayName: 'Nombre',
		sort: (pa, pb) => pa.name.localeCompare(pb.name),
	},
	lang: {
		displayName: 'Lenguaje',
		sort: (pa, pb) =>
			pa.lang === pb.lang
				? 0
				: pa.lang === undefined
					? -1
					: pb.lang === undefined
						? 1
						: pa.lang.localeCompare(pb.lang),
	},
	default: {
		displayName: 'N/A',
		sort: () => 0,
	},
} as const;
