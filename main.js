let fileList;
let scene;

window.onload = ()=> {
    console.log('すべての読み込み完了！ window.onload() First🔥');
    fileList = new FileList("fileList");
    fileList.event.add("svgFileAdded", () => {
        console.log("sceneを1へ進める");
        scene = 1;
        console.log(fileList.getSvgData(0));
        //キャンパスサイズをリサイズする
        resizeCanvas(fileList.analyzer.svgViewSize.width,fileList.analyzer.svgViewSize.height);
        for(let i = 0; i < fileList.getSvgData(0).length; i ++){
            let position = fileList.getSvgData(0)[i].position;
            circle(position.x,position.y, fileList.getSvgData(0)[i].radius * 2);
        }
    });
};


function setup() {
    createCanvas(100, 100);
    background(255,0,0);
    scene = 0;
}


function draw() {
    // background(255);
    if(scene == 1){
        scene1();
    }
}

function scene1(){
    
}

