import { splitter, word } from '../src/splitter'



test.skip('a basic sentence is split correctly into words', () => {
  // ARRANGE
  const text: string = 'As Oliver gave this first proof of the free and proper action of his lungs';

  let m = new splitter();
  // ACT
  m.split(text);
  // ASSERT
  expect(m.wordCount).toBe(15);
});

test('a basic multiline sentence is split correctly into words', () => {
  // ARRANGE
  const text: string = `As
   Oliver 
   gave 
   this 
   first 
   proof 
   of 
   the 
   free 
   and 
   proper 
   action 
   of 
   his 
   lungs`;
  
  let m = new splitter();
  // ACT
  m.split(text);
  // ASSERT
  expect(m.wordCount).toBe(15);
});

test('a basic sentence is split correctly into words', () => {
  // ARRANGE
  const text: string = 'As Oliver gave this first proof of the free';

  let m = new splitter();
  // ACT
  let words: Map<string, word> = m.split(text);
  // ASSERT
  expect(words.get("As").word).toBe("As");
  expect(words.get("As").words["Oliver"]).toBe(1);
  expect(words.get("Oliver").word).toBe("Oliver");
  expect(words.get("Oliver").words["gave"]).toBe(1);


});