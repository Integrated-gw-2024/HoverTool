//スタイルエレメントを登録するためのクラス

export class Style{
    tagDetector;
    targetElement_name;
    styles;
    styleElement

    constructor(Styles){
        this.styles = Styles;
        this.createStyle();
    }

    createStyle(){
        this.styleElement = document.createElement('style');
        this.styleElement.textContent =this.styles;
        document.head.appendChild(this.styleElement);
    }
}