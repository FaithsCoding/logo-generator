//This code defines three classes for each shape which inherit from the initial shapes class.
//This class has a constructor that initialises a color.
class Shape {
  constructor() {
    this.color = "";
  }
  setColor(color) {
    this.color = color;
  }
}

//These subclasses render a method which returns an SVG string for rendering the shaoe with inputted color.

class Circle extends Shape {
  render() {
    return `<circle cx="50%" cy="50%" r="100" height="100%" width="100%" fill="${this.color} " />`;
  }
}

class Square extends Shape {
  render() {
    return `<rect x="50" height="200" width="200"  fill="${this.color}" />`;
  }
}

class Triangle extends Shape {
  render() {
    return `<polygon height="100%" width="100%" points="0,200 300,200 150,0" fill="${this.color}" />`;
  }
}

//This globally exports the 3 sublasses and allows them to be used within any file, including our index file.
module.exports = { Circle, Square, Triangle };
