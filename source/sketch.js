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
    let progressWrapperElement;
    let progressBarElement;
    let renderingProgress;

    p.setup = () => {
        progressWrapperElement = document.querySelector("#progressWrapper");
        progressBarElement = document.querySelector("#progressBar");
        scene = 0;

        canvasManager = new CanvasManager(p);
        canvasManager.createCanvas(1920, 1080);

        fileList = new FileList("fileList");
        paneManager = new PaneManager();
        fileList.event.add("svgFileAdded", () => {
            fileList.removeUploader();
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
                    renderingProgress = 0;
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
            if (scene == 1) {
                frameCount = 0;
                ballsManager.reset();
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
        p.background(219);
    }

    //プレビュー画面
    function scene1() {
        paneManager.setMonitorPARAMS(frameCount);
        p.background(250);
        ballsManager.update();
        ballsManager.display();
        frameCount++;
    }

    //書き出し画面
    function scene2() {
        renderingProgress = p.map(frameCount,paneManager.timelinePARAMS.startFrame,paneManager.timelinePARAMS.endFrame,0,1);
        progressBarElement.style.width = `${p.map(renderingProgress, 0,1, 0,125)}px`;

        paneManager.setMonitorPARAMS(frameCount);
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
        if (frameCount >= paneManager.timelinePARAMS.endFrame) {
            CanvasCapture.stopRecord();
            scene = 1;
        }
        frameCount++;
    }

    function startRecord() {
        if (paneManager.timelinePARAMS.encodeFormat == "png") {
            CanvasCapture.beginPNGFramesRecord({
                onExportProgress: (progress) => {
                    progressBarElement.style.width = `${p.map(progress, 0,1, 125, 250)}px`;
                },
                onExportFinish: () => {
                    progressWrapperElement.style.display = "none";
                    progressBarElement.style.width = "0px";
                },
                fps: 60,
                quality: 1,
                name: `${clockDate.getMonth() + 1}-${clockDate.getDate()}_${clockDate.getHours()}-${clockDate.getMinutes()}_pngFrames`,
            });
        }
        else if (paneManager.timelinePARAMS.encodeFormat == "gif") {
            CanvasCapture.beginGIFRecord({
                onExportProgress: (progress) => {
                    progressBarElement.style.width = `${p.map(progress, 0,1, 125, 250)}px`;
                },
                onExportFinish: () => {
                    progressWrapperElement.style.display = "none";
                    progressBarElement.style.width = "0px";
                },
                name: `${clockDate.getMonth() + 1}-${clockDate.getDate()}_${clockDate.getHours()}-${clockDate.getMinutes()}_gifFrames`,
                fps: 60,
                quality: 1,
            });
        }
        progressWrapperElement.style.display = "flex";
    }


};

