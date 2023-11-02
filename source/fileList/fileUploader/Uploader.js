import { Element } from "../../utility/Element";

export class Uploader {
    //ファイルをアップロードする関数
    parentElement;
    inputElementId;
    inputElement;
    buttonElement;
    pElement;

    constructor(ParentElementId, IdName) {
        this.parentElement_id = ParentElementId;
        this.idName = IdName;

        //要素を作る
        this.buttonElement = new Element(this.parentElement_id, "id",this.idName + "_buttonElement", "button");
        this.inputElement = new Element(this.buttonElement.getDOMElement(), "id", this.idName +"_inputElement", "input");
        this.pElement = new Element(this.buttonElement.getDOMElement(), "id", this.idName +"_pElement", "p");
        this.pElement.getDOMElement().textContent = '+';

        //wrapperであるbutton要素がクリックされた時に、input要素のボタンを発火させている
        this.buttonElement.getDOMElement().addEventListener("click", () => {
                this.inputElement.getDOMElement().click();
        });
    }

    getDOMElement(TargetElement){
        if(TargetElement == "button"){return this.buttonElement.getDOMElement();}
        else if(TargetElement == "input"){return this.inputElement.getDOMElement();}
        }
}