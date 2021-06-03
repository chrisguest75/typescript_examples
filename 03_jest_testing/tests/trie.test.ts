import { trie } from '../src/trie'

test('empty trie contains no words', () => {
  // ARRANGE
  let t = new trie();
  // ACT
  // ASSERT
  expect(t.size).toBe(0);
});

test('adding word to empty trie increase size', () => {
  // ARRANGE
  let t = new trie();
  // ACT
  t.add("hello");
  // ASSERT
  expect(t.size).toBe(1);
});

test('adding word to empty trie will contain it', () => {
  // ARRANGE
  let t = new trie();
  // ACT
  t.add("hello");
  // ASSERT
  expect(t.size).toBe(1);
  expect(t.contains("hello")).toBe(true);
});

test('adding empty word does not add it', () => {
  // ARRANGE
  let t = new trie();
  // ACT
  t.add("");
  // ASSERT
  expect(t.size).toBe(0);
  expect(t.contains("")).toBe(false);
});

test('word not added should not be contained', () => {
  // ARRANGE
  let t = new trie();
  // ACT
  t.add("hello");
  // ASSERT
  expect(t.size).toBe(1);
  expect(t.contains("hello")).toBe(true);
  expect(t.contains("bellow")).toBe(false);
});

test('add multiple words', () => {
  // ARRANGE
  let t = new trie();
  // ACT
  t.add("hello");
  t.add("halo");
  t.add("bell");
  // ASSERT
  expect(t.size).toBe(3);
  expect(t.contains("hello")).toBe(true);
  expect(t.contains("halo")).toBe(true);
  expect(t.contains("bell")).toBe(true);
});

test('similiar words not added should not be found', () => {
  // ARRANGE
  let t = new trie();
  // ACT
  t.add("hello");
  // ASSERT
  expect(t.size).toBe(1);
  expect(t.contains("hello")).toBe(true);
  expect(t.contains("halo")).toBe(false);
});

test('incomplete words should not be found', () => {
  // ARRANGE
  let t = new trie();
  // ACT
  t.add("hello");
  // ASSERT
  expect(t.size).toBe(1);
  expect(t.contains("hello")).toBe(true);
  expect(t.contains("helloworld")).toBe(false);
});

test('subwords not explicitly added do not exist', () => {
  // ARRANGE
  let t = new trie();
  // ACT
  t.add("hello");
  // ASSERT
  expect(t.size).toBe(1);
  expect(t.contains("hello")).toBe(true);
  expect(t.contains("he")).toBe(false);
});