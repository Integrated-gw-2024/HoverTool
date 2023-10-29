class Element{
    parentElement;
    tagDetector;
    name;
    DOMType;
    element;

    constructor(ParentElement, TagDetector, Name, DOMType){
        if(typeof ParentElement == "string"){this.parentElement = document.getElementById(ParentElement);}
        else{this.parentElement = ParentElement;}
        this.tagDetector = TagDetector;
        this.name = Name;
        this.DOMType = DOMType;
        this.createElement();
    }

    createElement(){
        console.log(this.name + " / " + this.parentElement);
        this.element = document.createElement(this.DOMType);//box要素を作る
        if(this.DOMType == "input"){this.element.type = 'file';}
        this.element.setAttribute(this.tagDetector, this.name);//idをつける
        this.parentElement.appendChild(this.element);
    }

    getDOMElement(){
        return this.element;
    }
}
