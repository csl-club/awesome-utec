import { expect, test } from 'vitest';
import { parseToken, parseTokens } from './search';

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
