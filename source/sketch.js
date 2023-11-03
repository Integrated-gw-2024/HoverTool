import { CanvasManager } from "./CanvasManager";
import { FileList } from "./fileList/FileList";
import { BallsManager } from "./BallsManager";
import { PaneManager } from "./PaneManager";


export const sketch = (p) => {
    let canvasManager;
    let fileList;
    let ballsManager;
    let scene;
    let paneManager;

    p.setup = () => {
        scene = 0;
        canvasManager = new CanvasManager(p);
        canvasManager.createCanvas(300,300);
        fileList = new FileList("fileList");
        paneManager = new PaneManager();
        fileList.event.add("svgFileAdded", () => {
            console.log(fileList.getSvgData(0));
            ballsManager = new BallsManager(p, fileList.getSvgData(0));
            //キャンバスの大きさを変える
            canvasManager.resizeCanvas(fileList.analyzer.svgViewSize.width, fileList.analyzer.svgViewSize.height);
            //sceneを更新する
            scene = 1;
            
        });

        window.addEventListener("keypress", () => {
            ballsManager.reset();
        });
        paneManager.event.add("PARAMSChanged", (PARAMS) => {
            ballsManager.setPARAMS(PARAMS);
            ballsManager.reset();
        });
    };

    p.draw = () => {
        p.background(220);
        if(scene == 1){
            scene1();
        }
    };

    function scene1(){
        ballsManager.update();
        ballsManager.display();
    }
};

