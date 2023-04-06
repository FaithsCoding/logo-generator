//These lines import the inquirer, fs, and three shape classes from their respective modules.
const inquirer = require("inquirer");
const fs = require("fs");
const { Square, Circle, Triangle } = require("./lib/shapes");

//These lines define a Svg class with methods for rendering SVGs, setting text elements, and setting shape elements.
class Svg {
  constructor() {
    this.textElement = "";
    this.shapeElement = "";
  }

  render(shapeColor, shapeBorder) {
    const borderColor = shapeColor.toLowerCase() === 'white' ? 'black' : 'none';
    const style = shapeBorder ? `style="${shapeBorder}"` : '';
    const svgString = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200" ${style}>${this.shapeElement}${this.textElement}</svg>`;
    return svgString;
  }

  setTextElement(text, color) {
    this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`;
  }

  setShapeElement(shape) {
    this.shapeElement = shape.render();
  }
}
//These lines define an array of questions for the user prompt. The prompt asks for text, text color, shape color, shape type, and whether to add a border.
const questions = [
  {
    type: 'input',
    name: 'text',
    message: 'Text: Enter up to 3 characters:',
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'TEXT COLOR: Enter a color keyword or hexadecimal value (e.g., #FF0000):',
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: 'SHAPE COLOR: Enter a color keyword or hexadecimal value (e.g., #FF0000):',
  },
  {
    type: 'list',
    name: 'shape',
    message: 'Choose which shape you would like',
    choices: ['Circle', 'Square', 'Triangle'],
  },
  {
    type: 'list',
    name: 'shapeBorder',
    message:
      'Add a border? Note: if you choose a white shape without a border you will not be able to see the outline of that shape.',
    choices: ['Yes', 'No'],
    when: (answers) =>
      ['Circle', 'Square', 'Triangle'].includes(answers.shape),
    validate: (answer) => ['Yes', 'No'].includes(answer),
  },
];

//This function writes data to fileName using the fs.writeFile method.
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log(`Generated ${fileName}`);
  });
}

//This beginning part of the functions is defining the const variables which are variables that can't be re-definined.
async function init() {
  const svgFile = 'logo.svg';
  const answers = await inquirer.prompt(questions);
  const userText = answers.text.slice(0, 3);
  const userFontColor = answers.textColor;
  const userShapeColor = answers.shapeColor;
  const userShapeType = answers.shape;
  const userShapeBorder = answers.shapeBorder;

  let userShape;
  let shapeBorder = '';
  if (userShapeType.toLowerCase() === 'square') {
    userShape = new Square();
    if (userShapeColor === 'white') {
      shapeBorder = 'stroke-width: 2px; stroke: black;';
    }
  } else if (userShapeType.toLowerCase() === 'circle') {
    userShape = new Circle();
    if (userShapeBorder === 'Yes') {
      shapeBorder = 'stroke-width: 2px; stroke: black;';
    }
  } else if (userShapeType.toLowerCase() === 'triangle') {
    userShape = new Triangle();
    if (userShapeBorder === 'Yes' && userShapeColor === 'white') {
      shapeBorder = 'stroke-width: 2px; stroke: black;';
    }
  } else {
    console.log('Invalid shape!');
    return;
    }
    
    userShape.setColor(userShapeColor);
    
    const svg = new Svg();
    svg.setTextElement(userText, userFontColor);
    svg.setShapeElement(userShape);
    const svgString = svg.render(userShapeColor, shapeBorder);
    writeToFile(svgFile, svgString);
    }

//This is used to run/initialise the above script.
init();
module.exports = { Svg };