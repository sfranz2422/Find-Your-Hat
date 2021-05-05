const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this.field = field;
    this.playerPosition = null;
    this.hatLocation = null;
    this.holeLocations = [];
  }

  static generateField(height, width, holeNumber) {
    let newField = [];

    for (let h = 0; h < height; h++) {
      newField.push([]);
      for (let w = 0; w < width; w++) {
        newField[h].push(fieldCharacter);
      }
    }

    for (let i = 0; i < holeNumber; i++) {
      let randomHeightValue = Math.floor(Math.random() * height);
      let randomWidthValue = Math.floor(Math.random() * width);
      newField[randomHeightValue][randomWidthValue] = hole;
    }

    let randomHeightValue = Math.floor(Math.random() * height);
    let randomWidthValue = Math.floor(Math.random() * width);
    newField[randomHeightValue][randomWidthValue] = hat;
    this.hatLocation = [randomHeightValue, randomWidthValue];
    newField[0][0] = pathCharacter;
    this.playerPosition = [0, 0];

    return newField;
  }
  playGame() {
    let gameOver = false;
    for (let outter = 0; outter < this.field.length; outter++) {
      for (let inner = 0; inner < this.field[outter].length; inner++) {
        if (this.field[outter][inner] === hat) {
          this.hatLocation = [inner, outter];
        } else if (this.field[outter][inner] === hole) {
          this.holeLocations.push([inner, outter]);
        } else if (this.field[outter][inner] === pathCharacter) {
          this.playerPosition = [inner, outter];
        }
      }
    }
    // && !holeFound
    while (!gameOver) {
      this.print();
      const direction = prompt(
        "Which direction would you like to move? Please enter N for North, S for  South, E for East, or W for West."
      );

      if (direction == "n") {
        if (this.checkPositionLength(this.playerPosition[1] - 1)) {
          this.playerPosition[1]--;
          this.field[this.playerPosition[1]][
            this.playerPosition[0]
          ] = pathCharacter;
          this.print();
          gameOver = this.holeCheck();
          if (!gameOver) {
            gameOver = this.hatFoundCheck();
          }
        } else {
          console.log("Can't move to that position");
        }
      } else if (direction == "s") {
        if (this.checkPositionLength(this.playerPosition[1] + 1)) {
          this.playerPosition[1]++;
          this.field[this.playerPosition[1]][
            this.playerPosition[0]
          ] = pathCharacter;

          gameOver = this.holeCheck();
          if (!gameOver) {
            gameOver = this.hatFoundCheck();
          }
        } else {
          console.log("Can't move to that position");
        }
      } else if (direction == "e") {
        if (this.checkPositionWidth(this.playerPosition[0] + 1)) {
          this.playerPosition[0]++;
          this.field[this.playerPosition[1]][
            this.playerPosition[0]
          ] = pathCharacter;

          gameOver = this.holeCheck();
          if (!gameOver) {
            gameOver = this.hatFoundCheck();
          }
        } else {
          console.log("Can't move to that position");
        }
      } else if (direction == "w") {
        if (this.checkPositionWidth(this.playerPosition[0] - 1)) {
          this.playerPosition[0]--;
          this.field[this.playerPosition[1]][
            this.playerPosition[0]
          ] = pathCharacter;

          gameOver = this.holeCheck();
          if (!gameOver) {
            gameOver = this.hatFoundCheck();
          }
        } else {
          console.log("Can't move to that position");
        }
      } else {
        gameOver = true;
        console.log("Enter a valid key");
      }
    }
  }

  holeCheck() {
    const found = (element) =>
      this.playerPosition[0] === element[0] &&
      this.playerPosition[1] === element[1];
    if (this.holeLocations.some(found)) {
      console.log("You Fell in a hole! Game over!");
      return true;
    } else {
      return false;
    }
  }
  hatFoundCheck() {
    if (
      this.playerPosition[0] === this.hatLocation[0] &&
      this.playerPosition[1] === this.hatLocation[1]
    ) {
      console.log("You Found the hat. You Win!");
      return true;
    } else {
      return false;
    }
  }
  checkPositionWidth(newPosition) {
    if (newPosition < 0 || newPosition === this.field[0].length) {
      return false;
    } else {
      return true;
    }
  }
  checkPositionLength(newPosition) {
    if (newPosition < 0 || newPosition === this.field.length) {
      return false;
    } else {
      return true;
    }
  }

  print() {
    console.log("\n\n\n\n");
    for (let i = 0; i < this.field.length; i++) {
      console.log(this.field[i].join());
    }
    console.log("\n\n\n\n");
    // console.log(this.field);
    // console.log("player position" + this.playerPosition);
    // console.log("height" + this.field.length);
    // console.log("width" + this.field[0].length);
  }
}

myBoard = Field.generateField(4, 5, 4);
const myField = new Field(myBoard);
myField.playGame();
