
export class Element {
    parentElement;
    tagDetector;
    name;
    DOMType;
    element;
    styles;

    constructor(ParentElement, TagDetector, Name, DOMType) {
        if (typeof ParentElement == "string") { this.parentElement = document.getElementById(ParentElement); }
        else { this.parentElement = ParentElement; }
        this.tagDetector = TagDetector;
        this.name = Name;
        this.DOMType = DOMType;
        this.createElement();
    }

    createElement() {
        this.element = document.createElement(this.DOMType);//box要素を作る
        if (this.DOMType == "input") { this.element.type = 'file'; }
        this.element.setAttribute(this.tagDetector, this.name);//idをつける
        this.parentElement.appendChild(this.element);
    }

    getDOMElement() {
        return this.element;
    }

    setTag(TagDetector, Name) {
        this.element.setAttribute(TagDetector, Name);//tagをつける
    }

    setClassList(ClassNames) {
        this.getDOMElement().classList.add(...ClassNames);
    }

    replaceClassList(RemoveClass, AddClass) {
        if (this.getDOMElement().classList.contains(RemoveClass)){ 
            this.getDOMElement().classList.remove(RemoveClass);
            this.getDOMElement().classList.add(AddClass);
        }
    }

    setStyle(Styles) {
        //こんな感じでStyleを渡してください
        // this.styles = {
        //     width: '300px',
        //     height: '30px',
        //     backgroundColor: '#FFFFFF',
        //     margin: "5px",
        //     flexShrink: 0
        // };
        this.styles = Styles;
        for (let property in this.styles) {
            this.getDOMElement().style[property] = this.styles[property];
        }

    }
}
