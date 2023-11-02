import { Element } from "../../utility/Element";

export class FileDivElements {
    divElement;
    pElement;
    divStyle;

    constructor(ParentElement, Text) {
        this.parentElement = ParentElement;
        this.text = Text;
        this.divElement = new Element(this.parentElement, "class", "file_divElement", "div")
        this.pElement = new Element(this.divElement.getDOMElement(), "class", "file_pElement", "p");
        this.pElement.getDOMElement().textContent = this.text;
    }
}