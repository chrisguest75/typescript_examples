import { loadwords } from '../src/loadwords'

jest.mock("fs", () => ({
  readFileSync: jest.fn()
}));
import * as fs from 'fs'

describe.only("loadwords.mocked test", () => {
    afterEach(() => {
      //let testName = expect.getState().currentTestName
      //console.log(`afterEach ${testName}`)
      jest.clearAllMocks()
    });

    test('non existentent file throws', () => {
      // ARRANGE
      // ACT
      // ASSERT
      expect(() => {new loadwords("./tests/data/nofile.txt")}).toThrow(Error);
    })

    test('empty file', () => {
        // ARRANGE
        (fs.readFileSync as jest.Mock).mockReturnValue('');        
        expect(jest.isMockFunction(fs.readFileSync)).toBeTruthy();
    
        // ACT
        let words = new loadwords("./tests/data/emptylines.txt")
        
        // ASSERT
        expect(words.words).toEqual([]);
      })

      test('load file should load rows without empty lines', () => {
        // ARRANGE
        (fs.readFileSync as jest.Mock).mockReturnValue(`a
is
silly

this
that

when`
        );        
        expect(jest.isMockFunction(fs.readFileSync)).toBeTruthy();
        
        // ACT
        let words = new loadwords("./tests/data/containsempty.txt")

        // ASSERT
        expect(words.words).toEqual([
          "a",
          "is", 
          "silly",
          "this",
          "that",
          "when"
        ]);
      })      

    test('load file should load rows', () => {
        // ARRANGE
        (fs.readFileSync as jest.Mock).mockReturnValue(`a
is
this
that

when`
        );        
        expect(jest.isMockFunction(fs.readFileSync)).toBeTruthy();
        
        // ACT
        let words = new loadwords("./tests/data/fewwords.txt")

        // ASSERT
        expect(words.words).toEqual([
          "a",
          "is", 
          "this",
          "that",
          "when"
        ]);
      })      
})
