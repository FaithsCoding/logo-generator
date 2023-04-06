const { Svg } = require("../index");
const { Square, Circle, Triangle } = require("../lib/shapes");

describe("Svg class", () => {
  let svg;

  beforeEach(() => {
    svg = new Svg();
  });

  describe("setTextElement method", () => {
    test("sets the text element", () => {
      svg.setTextElement("ABC", "red");
      expect(svg.textElement).toEqual(
        '<text x="150" y="125" font-size="60" text-anchor="middle" fill="red">ABC</text>'
      );
    });
  });

  describe("setShapeElement method", () => {
    test("sets the shape element for a square", () => {
      const square = new Square();
      svg.setShapeElement(square);
      expect(svg.shapeElement).toContain("<rect");
    });

    test("sets the shape element for a circle", () => {
      const circle = new Circle();
      svg.setShapeElement(circle);
      expect(svg.shapeElement).toContain("<circle");
    });

    test("sets the shape element for a triangle", () => {
      const triangle = new Triangle();
      svg.setShapeElement(triangle);
      expect(svg.shapeElement).toContain("<polygon");
    });
  });

  describe("render method", () => {
    test("renders a square", () => {
      const square = new Square();
      square.setColor("red");
      svg.setShapeElement(square);
      svg.setTextElement("ABC", "red");
      const svgString = svg.render("red", "");
      expect(svgString).toContain("<rect");
    });

    test("renders a circle with a border", () => {
      const circle = new Circle();
      circle.setColor("blue");
      svg.setShapeElement(circle);
      svg.setTextElement("ABC", "red");
      const svgString = svg.render("blue", "stroke-width: 2px; stroke: black;");
      expect(svgString).toContain("<circle");
      expect(svgString).toContain("stroke-width: 2px; stroke: black;");
    });

    test("renders a triangle without a border", () => {
      const triangle = new Triangle();
      triangle.setColor("green");
      svg.setShapeElement(triangle);
      svg.setTextElement("ABC", "red");
      const svgString = svg.render("green", "");
      expect(svgString).toContain("<polygon");
      expect(svgString).not.toContain("stroke");
    });
  });
});
