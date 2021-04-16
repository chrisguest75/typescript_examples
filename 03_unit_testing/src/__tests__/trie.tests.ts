import { trie } from '../trie'

test('empty trie contains no words', () => {
  let t = new trie();
  expect(t.size).toBe(0);
});

test('adding word to empty trie', () => {
  let t = new trie();
  t.add("hello");
  expect(t.size).toBe(1);
});

test('adding word to empty trie will contain it', () => {
  let t = new trie();
  t.add("hello");
  expect(t.size).toBe(1);
  expect(t.contains("hello")).toBe(true);
});

test('adding empty word does not add it', () => {
  let t = new trie();
  t.add("");
  expect(t.size).toBe(0);
  expect(t.contains("")).toBe(false);
});

test('word not added should not be contained', () => {
  let t = new trie();
  t.add("hello");
  expect(t.size).toBe(1);
  expect(t.contains("hello")).toBe(true);
  expect(t.contains("bellow")).toBe(false);
});

test('add multiple words', () => {
  let t = new trie();
  t.add("hello");
  t.add("halo");
  t.add("bell");
  expect(t.size).toBe(3);
  expect(t.contains("hello")).toBe(true);
  expect(t.contains("halo")).toBe(true);
  expect(t.contains("bell")).toBe(true);
});

test('similiar words not added should not be found', () => {
  let t = new trie();
  t.add("hello");
  expect(t.size).toBe(1);
  expect(t.contains("hello")).toBe(true);
  expect(t.contains("halo")).toBe(false);
});
