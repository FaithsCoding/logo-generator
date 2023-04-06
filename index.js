//These lines import the inquirer, fs, and three shape classes from their respective modules.
const inquirer = require("inquirer");
const fs = require("fs");
const { Square, Circle, Triangle } = require("./utils/shapes");

//These lines define a Svg class with methods for rendering SVGs, setting text elements, and setting shape elements.
class Svg {
  constructor() {
    this.textElement = "";
    this.shapeElement = "";
  }

  render(shapeColor, shapeBorder) {
    const borderColor = shapeColor.toLowerCase() === "white" ? "black" : "none";
    const style = shapeBorder ? `style="${shapeBorder}"` : "";
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
    type: "input",
    name: "text",
    message: "Text: Enter up to 3 characters:",
  },
  {
    type: "input",
    name: "text-color",
    message:
      "TEXT COLOR: Enter a color keyword or hexadecimal value (e.g., #FF0000):",
  },
  {
    type: "input",
    name: "shape-color",
    message:
      "SHAPE COLOR: Enter a color keyword or hexadecimal value (e.g., #FF0000):",
  },
  {
    type: "list",
    name: "shape",
    message: "Choose which shape you would like",
    choices: ["Circle", "Square", "Triangle"],
  },
  {
    type: "list",
    name: "shape-border",
    message:
      "Add a border? Note: if you choose a white shape without a border you will not be able to see the outline of that shape.",
    choices: ["Yes", "No"],
    when: (answers) =>
      answers["shape"] === "Circle" ||
      answers["shape"] === "Square" ||
      answers["shape"] === "Triangle",
    validate: (answer) => ["Yes", "No"].includes(answer),
  },
];

//This function writes data to fileName using the fs.writeFile method.
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, function (err) {
    if (err) {
      return console.log(err);
    }
  });
}

//This beginning part of the functions is defining the const variables which are variables that can't be re-definined.
async function init() {
  const svg_file = "logo.svg";
  const answers = await inquirer.prompt(questions);
  const user_text = answers.text.slice(0, 3);
  const user_font_color = answers["text-color"];
  const user_shape_color = answers["shape-color"];
  const user_shape_type = answers["shape"];
  const user_shape_border = answers["shape-border"];
  //This code initializes user_shape to an undefined value and shapeBorder to an empty string. It then checks the user's selection of user_shape_type (which is either "square", "circle", or "triangle") and sets user_shape to a new instance of the corresponding shape class (Square, Circle, or Triangle). If the user selected "Yes" for adding a border (user_shape_border), and the shape color is white (user_shape_color), it sets shapeBorder to a string containing the CSS styles for a black border.
  //Finally, it sets the color of user_shape to the user_shape_color.
  let user_shape;
  let shapeBorder = "";
  if (user_shape_type.toLowerCase() === "square") {
    user_shape = new Square();
    if (user_shape_border === "Yes" && user_shape_color === "white") {
      shapeBorder = "stroke-width: 2px; stroke: black;";
    }
  } else if (user_shape_type.toLowerCase() === "circle") {
    user_shape = new Circle();
    if (user_shape_border === "Yes") {
      shapeBorder = "stroke-width: 2px; stroke: black;";
    }
  } else if (user_shape_type.toLowerCase() === "triangle") {
    user_shape = new Triangle();
    if (user_shape_border === "Yes" && user_shape_color === "white") {
      shapeBorder = "stroke-width: 2px; stroke: black;";
    }
  } else {
    console.log("Invalid shape!");
    return;
  }

  user_shape.setColor(user_shape_color);

  const svg = new Svg();
  svg.setTextElement(user_text, user_font_color);
  svg.setShapeElement(user_shape);
  const svgString = svg.render(user_shape_color, shapeBorder);
  writeToFile(svg_file, svgString);
}

//This is used to run/initialise the above script.
init();
