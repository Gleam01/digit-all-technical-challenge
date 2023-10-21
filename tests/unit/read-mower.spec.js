'use strict';
const expect = require('chai').expect;
const mockFs = require('mock-fs');
const { readFile, readMower, readLawn, readMowerInstructions } = require('../../utils/read-file');

describe('Read File', () => {
  describe('readFile', () => {
    afterEach(() => {
      mockFs.restore();
    });

    it('should read file correctly', () => {
      mockFs({
        './input.txt': '5 5\n1 2 N\nGAGAGAGAA\n3 3 E\nAADAADADDA\n',
      });
      const result = readFile('./input.txt');
      const expectedResult = {
        lawn: { limitX: 5, limitY: 5 },
        mowers: [
          { posX: 1, posY: 2, orientationLabel: 'N', instructions: ['G', 'A', 'G', 'A', 'G', 'A', 'G', 'A', 'A'] },
          { posX: 3, posY: 3, orientationLabel: 'E', instructions: ['A', 'A', 'D', 'A', 'A', 'D', 'A', 'D', 'D', 'A'] },
        ],
      };
      expect(result).to.be.deep.equal(expectedResult);
    });

    it('should throw if number of line is not odd', () => {
      mockFs({
        './input.txt': '5 5\n1 3 N\nGAGAGAGAA\n3 3 E\nAADAADADDA\n5 5 S',
      });
      const readFileThatWillThrow = () => readFile('./input.txt');
      expect(readFileThatWillThrow).to.throw(Error);
    });
  });

  describe('readLawn', () => {
    it('should read string and return a lawn object', () => {
      const lawn = readLawn('1 2');
      expect(lawn).to.deep.equal({ limitX: 1, limitY: 2 });
    });

    it('should throw if string is not in lawn format', () => {
      const readLawnThatWillThrow = () => readLawn('A A');
      expect(readLawnThatWillThrow).to.throw(Error);
    });
  });

  describe('readMower', () => {
    it('should read string and return a mower object', () => {
      const mower = readMower('1 2 N');
      expect(mower).to.deep.equal({ posX: 1, posY: 2, orientationLabel: 'N' });
    });

    it('should throw if string is not in mower format', () => {
      const readMowerThatWillThrow = () => readMower('1 2 G');
      expect(readMowerThatWillThrow).to.throw(Error);
    });
  });

  describe('readLawnInstructions', () => {
    it('should read string and return an array of instructions', () => {
      const instructions = readMowerInstructions('ADDG');
      expect(instructions).to.deep.equal(['A', 'D', 'D', 'G']);
    });

    it('should throw if string is not in mower instructions format', () => {
      const readMowerInstructionsThatWillThrow = () => readMowerInstructions('SILICON');
      expect(readMowerInstructionsThatWillThrow).to.throw(Error);
    });
  });
});
