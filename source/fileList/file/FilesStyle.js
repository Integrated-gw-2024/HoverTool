export class FilesStyle {
    constructor() {
        // this.tags = Tags;
        //スタイル エレメントを作成
        this.div_divStyle = document.createElement("style");
        this.div_pStyle = document.createElement("style");
        //スタイルをヘッダに入れる
        document.head.appendChild(this.div_divStyle);
        document.head.appendChild(this.div_pStyle);
        //スタイルシートの設定
        this.div_divStyle.sheet.insertRule(`
        .file_divElement {
                    margin:5px;
                    width: 200px;
                    height: 30px;
                    background-color: 
                    #555555;border-radius: 
                    5px;box-shadow: 0px 0px 7px #909090; 
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: left;
                }`, 0);
        this.div_pStyle.sheet.insertRule(`
                .file_pElement {
                    color:#FFFFFF;
                    margin-left: 10px;
                    font-size:15px;
                }`, 0);
    }
}