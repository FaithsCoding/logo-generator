const inquirer = require("inquirer");
const fs = require("fs");
const { Square, Circle, Triangle } = require("./utils/shapes");

class Svg {
  constructor() {
    this.textElement = "";
    this.shapeElement = "";
  }
  render() {
    return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`;
  }
  setTextElement(text, color) {
    this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`;
  }
  setShapeElement(shape) {
    this.shapeElement = shape.render();
  }
}

function writeHTMLFile(svgContent, backgroundColor) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const htmlFileName = `logo=${timestamp}.html`;
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en"
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, intial-scale=1.0">
    <title> Your logo </title>
    </head>
    <body style="background-color: ${backgroundColor};"
    <div id="svg-container">
    ${svgContent}
    </div>
    </body>
    </html>
     `;

  fs.writeFile(htmlFileName, htmlContent, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log(
      "A SVG & HTML file including your logo has been generated. Please open the HTML file in your browser to view this."
    );
  });
}

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
    type: "input",
    name: "background-color",
    message:
      "Background color: Enter a color keyword or a hexadecimal color code. Consider your choice of shape color:",
  },
];

function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, function (err) {
    if (err) {
      return console.log(err);
    }
  });
}

async function init() {
  var svgString = "";
  var svg_file = "logo.svg";

  const answers = await inquirer.prompt(questions);

  var user_text = "";
  if (answers.text.length > 0 && answers.text.length < 4) {
    user_text = answers.text;
  } else {
    console.log(
      "Invalid user text field detected! Please enter 1-3 Characters, no more and no less"
    );

    return;
  }

  user_font_color = answers["text-color"];
  user_shape_color = answers["shape-color"];
  user_shape_type = answers["shape"];
  user_background_color = answers["background-color"];

  let user_shape;
  if (user_shape_type === "Square" || user_shape_type === "square") {
    user_shape = new Square();
  } else if (user_shape_type === "Circle" || user_shape_type === "circle") {
    user_shape = new Circle();
  } else if (user_shape_type === "Triangle" || user_shape_type === "triangle") {
    user_shape = new Triangle();
  } else {
    console.log("Invalid shape!");
  }
  user_shape.setColor(user_shape_color);

  var svg = new Svg();
  svg.setTextElement(user_text, user_font_color);
  svg.setShapeElement(user_shape);
  svgString = svg.render();

  writeToFile(svg_file, svgString);
  writeToFile(svg_file, svgString);
  writeHTMLFile(svgString, user_background_color);
}
init();
