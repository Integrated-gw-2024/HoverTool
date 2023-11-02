export class UploaderStyle {
    constructor() {
        this.uploadButton_buttonStyle = document.createElement("style");
        this.uploadButton_buttonStyle_hover = document.createElement("style");
        this.uploadButton_inputStyle = document.createElement("style");
        this.uploadButton_pStyle = document.createElement("style");
        this.uploadButton_pStyle_hover = document.createElement("style");
        document.head.appendChild(this.uploadButton_buttonStyle);
        document.head.appendChild(this.uploadButton_inputStyle);
        document.head.appendChild(this.uploadButton_pStyle);
        document.head.appendChild(this.uploadButton_buttonStyle_hover);
        document.head.appendChild(this.uploadButton_pStyle_hover);
        this.uploadButton_buttonStyle.sheet.insertRule(`
        #uploader_buttonElement {
        margin:5px;
        width: 200px;
        height: 30px;
        background-color: 
        #FFFFFF;
        border-radius: 
        5px;box-shadow: 0px 0px 7px #909090; 
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        }`, 0);
        this.uploadButton_inputStyle.sheet.insertRule(`
        #uploader_inputElement {
        display: none;
        }`, 0);
        this.uploadButton_pStyle.sheet.insertRule(`
        #uploader_pElement {
        color: #000000;
        font-size:15px;
                }`, 0);
        this.uploadButton_buttonStyle_hover.sheet.insertRule(`
        #uploader_buttonElement:hover{
        background-color: 
        #555555;
        }`, 0);
        this.uploadButton_pStyle_hover.sheet.insertRule(`
        #uploader_buttonElement:hover #uploader_pElement{
        color: #FFFFFF;
        font-size:15px;
        }`, 0);
    }
}