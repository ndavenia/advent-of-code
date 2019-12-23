const INPUT_STR = "3,8,1001,8,10,8,105,1,0,0,21,46,67,88,101,126,207,288,369,450,99999,3,9,1001,9,5,9,1002,9,5,9,1001,9,5,9,102,3,9,9,101,2,9,9,4,9,99,3,9,102,4,9,9,101,5,9,9,102,5,9,9,101,3,9,9,4,9,99,3,9,1001,9,3,9,102,2,9,9,1001,9,5,9,102,4,9,9,4,9,99,3,9,102,3,9,9,1001,9,4,9,4,9,99,3,9,102,3,9,9,1001,9,3,9,1002,9,2,9,101,4,9,9,102,3,9,9,4,9,99,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,99,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,99";

class Computer {

    constructor() {
        this.program = INPUT_STR
            .split(",")
            .map(v => parseInt(v));
        this.i = 0;
        this.input = [];
        this.output = undefined;

    }
    isEnd() {
        return !!this.finished;
    }
    compute(input) {

        this.input.push(...input);

        for (; ;) {
            const parameter = this.program[this.i];
            const instruction = parameter % 100;
            if (instruction === 99) {
                this.finished = true;
                break;
            }
            const iMode1 = !!(~~(parameter / 100) % 10);
            const iMode2 = !!(~~(parameter / 1000) % 10);
            const iMode3 = !!(~~(parameter / 10000) % 10);
            const index1 = iMode1 ? this.i + 1 : this.program[this.i + 1];
            const index2 = iMode2 ? this.i + 2 : this.program[this.i + 2];
            const index3 = iMode3 ? this.i + 3 : this.program[this.i + 3];

            if (instruction === 1) {
                this.program[index3] = this.program[index1] + this.program[index2];
                this.i += 4;
            } else if (instruction === 2) {
                this.program[index3] = this.program[index1] * this.program[index2];
                this.i += 4;
            } else if (instruction === 3) {
                this.program[index1] = this.input.shift();
                this.i += 2;
            } else if (instruction === 4) {
                this.output = this.program[index1];
                this.i += 2;
                return this.output;
            } else if (instruction === 5) { //jump if true
                this.i = !!this.program[index1] ? this.program[index2] : this.i + 3;
            } else if (instruction === 6) { // jump if false
                this.i = !this.program[index1] ? this.program[index2] : this.i + 3;
            } else if (instruction === 7) { // less than
                this.program[index3] = this.program[index1] < this.program[index2] ? 1 : 0;
                this.i += 4;
            } else if (instruction === 8) { // equal
                this.program[index3] = this.program[index1] === this.program[index2] ? 1 : 0;
                this.i += 4;
            } else {
                this.i++; // should not happen
            }
        }
        return this.output;
    }
};

const generatePositions = (val, result = new Array(val), results = []) =>{
  if(val <0) {
      return
  }
  for(let i =5; i<=9; i++) {
      result[val] = i;
      if((new Set(result)).size === result.length) {
          results.push([...result]);
      }
      generatePositions(val -1, result, results)
  }
  return results;
};
const results = generatePositions(4).map(
    position => {
        var ampA = new Computer();
        var ampB = new Computer();
        var ampC = new Computer();
        var ampD = new Computer();
        var ampE = new Computer();
        let res = 0;
        res = ampA.compute([position[0],res]);
        res = ampB.compute([position[1],res]);
        res = ampC.compute([position[2],res]);
        res = ampD.compute([position[3],res]);
        res = ampE.compute([position[4],res]);
        do {
            res = ampA.compute([res]);
            res = ampB.compute([res]);
            res = ampC.compute([res]);
            res = ampD.compute([res]);
            res = ampE.compute([res]);
        } while(!ampE.isEnd());

        return {
            res,
            position
        }
    }
);
console.log(results.sort((a,b) => b.res - a.res)[0]);

