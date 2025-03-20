import { expect, test } from 'vitest';
import { findMatches, Match, mergeMatches, parseToken, parseTokens } from './search';

test('parseToken', () => {
	expect(parseToken('foO')).toStrictEqual({
		type: null,
		text: 'foo',
	});

	expect(parseToken('aUthOR:john')).toStrictEqual({
		type: 'author',
		text: 'john',
	});

	expect(parseToken('Foo:BAr')).toStrictEqual({
		type: null,
		text: 'foo:bar',
	});

	expect(parseToken('')).toBeNull();
	expect(parseToken('author:')).toBeNull();

	expect(() => parseToken('hello world')).toThrowError('space');

	expect(() => parseToken('hello world')).toThrowError('space');
});

test('parseTokens', () => {
	expect(parseTokens('')).toStrictEqual([]);

	expect(parseTokens('foo bar baz')).toStrictEqual([
		{ type: null, text: 'foo' },
		{ type: null, text: 'bar' },
		{ type: null, text: 'baz' },
	]);

	expect(parseTokens('    hElLo     WoRld')).toStrictEqual([
		{ type: null, text: 'hello' },
		{ type: null, text: 'world' },
	]);

	expect(parseTokens('author:foo tag:HELLO bar:Baz')).toStrictEqual([
		{ type: 'author', text: 'foo' },
		{ type: 'tag', text: 'hello' },
		{ type: null, text: 'bar:baz' },
	]);
});

test('mergeMatches', () => {
	expect(mergeMatches([])).toStrictEqual([]);

	expect(mergeMatches([new Match(2, 4), new Match(5, 8), new Match(10, 12)])).toStrictEqual([
		new Match(2, 4),
		new Match(5, 8),
		new Match(10, 12),
	]);

	expect(mergeMatches([new Match(3, 8), new Match(2, 4), new Match(10, 12)])).toStrictEqual([
		new Match(2, 8),
		new Match(10, 12),
	]);

	expect(mergeMatches([new Match(2, 4), new Match(4, 8), new Match(3, 5)])).toStrictEqual([
		new Match(2, 8),
	]);

	expect(mergeMatches([new Match(2, 4), new Match(4, 8), new Match(3, 5)])).toStrictEqual([
		new Match(2, 8),
	]);
});

test('findMatches', () => {
	expect(findMatches('foo', '')).toStrictEqual([]);

	expect(findMatches('foo', 'bar baz')).toStrictEqual([]);

	expect(findMatches('foo', 'foobarbaz')).toStrictEqual([new Match(0, 3)]);

	expect(findMatches('foo', ' foo bafoo fo')).toStrictEqual([new Match(1, 4), new Match(7, 10)]);

	expect(findMatches('aa', 'aaaaa')).toStrictEqual([
		new Match(0, 2),
		new Match(1, 3),
		new Match(2, 4),
		new Match(3, 5),
	]);

	expect(() => findMatches('', 'foobar')).toThrowError('empty');
});
