const inquirer = require('inquirer');
const fs = require('fs');
const shapes = require('./utils/shapes');

class Svg{
    constructor(){
        this.textElement = ''
        this.shapeElement = ''
    }
    render(){

        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`
    }
    setTextElement(text,color){
        this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`
    }
    setShapeElement(shape){
        this.shapeElement = shape.render()

    }
    
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
        message: "Text color: Enter a color keyword:",
    },
    {
        type: "input",
        name: "shape-color",
        messagee: "Shape color: Enter a color keyword",
    },
    {
        type: "list",
        name: "shape",
        message: "Choose which shape you would like",
        choices: ["Circle", "Square", "Triange"],
    }
]

function writeToFile(fileName, data) {
    filesystem.writeFile(fileName, data, function (err) {
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
        console.log("Invalid user text field detected! Please enter 1-3 Characters, no more and no less");
        return;
    }

    user_font_color = answers["text-color"];
    user_shape_color = answers.shape;
    user_shape_type = answers["shape"];
    
    let user_shape;
    if (user_shape_type === "Square" || user_shape_type === "square") {
        user_shape = new Square();
    }
    else if (user_shape_type === "Circle" || user_shape_type === "circle") {
        user_shape = new Circle();
    }
    else if (user_shape_type === "Triangle" || user_shape_type === "triangle") {
        user_shape = new Triangle();
    }
    else {
        console.log("Invalid shape!");
    }
    user_shape.setColor(user_shape_color);

    var svg = new Svg();
    svg.setTextElement(user_text, user_font_color);
    svg.setShapeElement(user_shape);
    svgString = svg.render();
    
    writeToFile(svg_file, svgString); 
}
init()
