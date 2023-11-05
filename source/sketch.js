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

    p.setup = () => {
        scene = 0;

        canvasManager = new CanvasManager(p);
        canvasManager.createCanvas(1920, 1080);

        fileList = new FileList("fileList");
        paneManager = new PaneManager();
        fileList.event.add("svgFileAdded", () => {
            paneManager.addMonitorBindings();
            paneManager.addPARAMSBindings();
            paneManager.addButtonBindings();
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
        paneManager.setMonitorPARAMS(frameCount);
        p.background(220);
        ballsManager.update();
        ballsManager.display();
        frameCount++;
    }

    //書き出し画面
    function scene2() {
        if (frameCount == paneManager.timelinePARAMS.startFrame) {
            startRecord();
        }
        if (paneManager.timelinePARAMS.encodeFormat == "png") {
            p.clear();
        }
        else if (paneManager.timelinePARAMS.encodeFormat == "gif") {
            p.background(0, 255, 0);
        }
        ballsManager.display();
        if (CanvasCapture.isRecording()) {
            CanvasCapture.recordFrame();
        }
        ballsManager.update();
        if (frameCount > paneManager.timelinePARAMS.endFrame) {
            CanvasCapture.stopRecord();
            scene = 1;
        }
        frameCount++;
    }

    function startRecord() {
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
                onExportProgress: (progress) => {
                    console.log(progress);
                },
                name: `${clockDate.getMonth() + 1}-${clockDate.getDate()}_${clockDate.getHours()}-${clockDate.getMinutes()}_gifFrames`,
                fps: 60,
                quality: 1,
            });
        }
    }


};

