import { trie } from '../src/trie'
import { wordset } from '../src/wordset'

beforeAll(() => {
  //console.log("beforeAll")
});

afterAll(() => {
  //console.log("afterAll")
});

beforeEach(() => {
  //let testName = expect.getState().currentTestName
  //console.log(`beforeEach ${testName}`)
});

afterEach(() => {
  //let testName = expect.getState().currentTestName
  //console.log(`afterEach ${testName}`)
});

describe.each`
  wordstoretype
  ${trie}
  ${wordset}
`('$wordstoretype', ({wordstoretype}) => {
  test(`empty ${wordstoretype} contains no words`, () => {
    // ARRANGE
    let t = new wordstoretype();
    // ACT
    // ASSERT
    expect(t.size).toBe(0);
  })

  test(`adding word to empty ${wordstoretype} increase size`, () => {
    // ARRANGE
    let t = new wordstoretype();
    // ACT
    t.add("hello");
    // ASSERT
    expect(t.size).toBe(1);
  })

  test('adding word to empty trie will contain it', () => {
    // ARRANGE
    let t = new wordstoretype();
    // ACT
    t.add("hello");
    // ASSERT
    expect(t.size).toBe(1);
    expect(t.contains("hello")).toBe(true);
  })

  test('adding same word does not increase size', () => {
    // ARRANGE
    let t = new wordstoretype();
    // ACT
    t.add("hello");
    t.add("hello");
    t.add("hello");
    // ASSERT
    expect(t.size).toBe(1);
    expect(t.contains("hello")).toBe(true);
  })

  test('searching on word chains finds them all', () => {
    // ARRANGE
    let t = new wordstoretype();
    // ACT
    t.add("h");
    t.add("he");
    t.add("hel");
    t.add("hell");
    t.add("hello");
    // ASSERT
    expect(t.size).toBe(5);
    expect(t.contains("h")).toBe(true);
    expect(t.contains("he")).toBe(true);
    expect(t.contains("hel")).toBe(true);
    expect(t.contains("hell")).toBe(true);
    expect(t.contains("hello")).toBe(true);
    expect(t.contains("hello ")).toBe(false);  
  })

  test('searching on an empty trie does not crash', () => {
    // ARRANGE
    let t = new wordstoretype();
    // ACT
    // ASSERT
    expect(t.size).toBe(0);  
    expect(t.contains("he")).toBe(false);
  })

  test('adding empty word does not add it', () => {
    // ARRANGE
    let t = new wordstoretype();
    // ACT
    t.add("");
    // ASSERT
    expect(t.size).toBe(0);
    expect(t.contains("")).toBe(false);
  })

  test('word not added should not be contained', () => {
    // ARRANGE
    let t = new wordstoretype();
    // ACT
    t.add("hello");
    // ASSERT
    expect(t.size).toBe(1);
    expect(t.contains("hello")).toBe(true);
    expect(t.contains("bellow")).toBe(false);
  })

  test('add multiple words', () => {
    // ARRANGE
    let t = new wordstoretype();
    // ACT
    t.add("hello");
    t.add("halo");
    t.add("bell");
    // ASSERT
    expect(t.size).toBe(3);
    expect(t.contains("hello")).toBe(true);
    expect(t.contains("halo")).toBe(true);
    expect(t.contains("bell")).toBe(true);
  })

  test('similiar words not added should not be found', () => {
    // ARRANGE
    let t = new wordstoretype();
    // ACT
    t.add("hello");
    // ASSERT
    expect(t.size).toBe(1);
    expect(t.contains("hello")).toBe(true);
    expect(t.contains("halo")).toBe(false);
  })

  test('incomplete words should not be found', () => {
    // ARRANGE
    let t = new wordstoretype();
    // ACT
    t.add("hello");
    // ASSERT
    expect(t.size).toBe(1);
    expect(t.contains("hello")).toBe(true);
    expect(t.contains("helloworld")).toBe(false);
  })

  test('subwords not explicitly added do not exist', () => {
    // ARRANGE
    let t = new wordstoretype();
    // ACT
    t.add("hello");
    // ASSERT
    expect(t.size).toBe(1);
    expect(t.contains("hello")).toBe(true);
    expect(t.contains("he")).toBe(false);
  })

  test.skip('skip this test', () => {
    expect(true).toBe(false);
  })

  test.todo('we are missing a test')
})