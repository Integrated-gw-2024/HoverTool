import { CanvasManager } from "./CanvasManager";
import { FileList } from "./fileList/FileList";
import { BallsManager } from "./BallsManager";
import { PaneManager } from "./PaneManager";
import { CanvasCapture } from 'canvas-capture';


export const sketch = (p) => {
    let canvasManager;
    let fileList;
    let ballsManager;
    let scene;
    let paneManager;
    let frameCount = 0;
    let clockDate = new Date()
    let captureStartSwitch = false;//trueにして1フレームの間でstartRecordする

    p.setup = () => {
        scene = 0;

        canvasManager = new CanvasManager(p);
        canvasManager.createCanvas(300, 300);

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

        //canvasCaptureの初期設定
        CanvasCapture.init(
            document.getElementById('defaultCanvas0'),
            { showRecDot: false }, // Options are optional, more info below.
        );

        window.addEventListener("keypress", (event) => {
            if (scene == 1) {
                if (event.key === " ") {
                    ballsManager.reset();
                    frameCount = 0;
                }
            }
        });

        //paneManagerのeventListenerの設定
        paneManager.event.add("PARAMSChanged", (PARAMS) => {
            ballsManager.setPARAMS(PARAMS);
            ballsManager.reset();
            frameCount = 0;
        });
        paneManager.event.add("encodeButtonPressed", () => {
            frameCount = 0;
            ballsManager.reset();
            if (scene == 1) {
                console.log(paneManager.timelinePARAMS.encodeFormat);
                captureStartSwitch = true;
                scene = 2;
            }
        });
    };

    p.draw = () => {
        if (scene == 0) {
            scene0();
        }
        else if (scene == 1) {
            scene1();
        }
        else if (scene == 2) {
            scene2();
        }
    };

    function scene0() {
        p.background(220);
    }

    //プレビュー画面
    function scene1() {
        p.background(220);
        ballsManager.update();
        ballsManager.display();
        p.noStroke();
        p.fill(0);
        p.textSize(30);
        p.text("現在のフレーム: " + frameCount, 0, 30);
        frameCount++;
        console.log(paneManager.timelinePARAMS.endFrame);
    }

    //書き出し画面
    function scene2() {
        if(captureStartSwitch == true){
            startRecord();
            console.log("ok");
            captureStartSwitch = false;
        }
        p.clear();
        ballsManager.update();
        ballsManager.display();
        if (CanvasCapture.isRecording()) {
            CanvasCapture.recordFrame();
        }
        if (frameCount > paneManager.timelinePARAMS.endFrame) {
            CanvasCapture.stopRecord();
            scene = 1;
        }
        frameCount++;
    }

    function startRecord(){
        if (paneManager.timelinePARAMS.encodeFormat == "png") {
            CanvasCapture.beginPNGFramesRecord({
                onExportProgress: (progress) => {
                    console.log(progress);
                },
                fps: 60,
                quality: 1,
                name: `${clockDate.getMonth() + 1}-${clockDate.getDate()}_${clockDate.getHours()}-${clockDate.getMinutes()}_pngFrames`,
            });
        }
        else if (paneManager.timelinePARAMS.encodeFormat == "gif") {
            CanvasCapture.beginGIFRecord({
                name: `${clockDate.getMonth() + 1}-${clockDate.getDate()}_${clockDate.getHours()}-${clockDate.getMinutes()}_gifFrames`,
                fps: 60,
                quality: 1,
            });
        }
    }


};

