import { Pane } from "tweakpane";
import { EventListener } from "./utility/eventListener/eventListener";


export class PaneManager {
    pane;
    PARAMS;

    constructor() {
        this.event = new EventListener();
        this.event.add("PARAMSChanged");
        this.event.add("encodeButtonPressed");
        this.event.add("timelinePARAMSChanged", (ev) => {
            console.log(ev);
        });

        this.pane = new Pane();

        //パラメーターの設定
        this.monitorPARAMS = {
            nowFrame: "0",
        }
        this.PARAMS = {
            waitGravity: 350,
            initSpeedRatio: 0.5,
            waitSpeed: 0.017,
            limitSpeed: 0.7,
        };
        this.timelinePARAMS = {
            encodeFormat: "png",
            startFrame: 0,
            endFrame: 100,
        };

        //フォルダを登録
        this.monitorFolder = this.pane.addFolder({
            title: 'モニター'
        })
        this.PARAMSFolder = this.pane.addFolder({
            title: 'パラメーター設定',
        });
        this.buttonFolder = this.pane.addFolder({
            title: '書き出し設定',
        });
    }

    addMonitorBindings(){
        this.monitorFolder.addBinding(this.monitorPARAMS, 'nowFrame', {
            label: '現在のフレーム',
            readonly: true,
        });
    }

    setMonitorPARAMS(newFrame){
        this.monitorPARAMS.nowFrame = newFrame;
        this.monitorFolder.refresh();
    }

    addPARAMSBindings() {
        this.PARAMSFolder.addBinding(this.PARAMS, 'waitGravity', {
            label: '重力',
            min: 100,
            max: 500,
        });
        this.PARAMSFolder.addBinding(this.PARAMS, 'waitSpeed', {
            label: '速度',
            min: 0,
            max: 0.1,
        });
        this.PARAMSFolder.addBinding(this.PARAMS, 'limitSpeed', {
            label: '制限速度',
            min: 0,
            max: 5,
        });
        this.PARAMSFolder.addBinding(this.PARAMS, 'initSpeedRatio', {
            label: '初速度の比率',
            step: 0.1,
            min: 0,
            max: 1,
        });
        this.PARAMSFolder.on('change', (ev) => {
            if (ev.last) {
                console.log("Paneで値を操作した");
                this.event.dispatch("PARAMSChanged", this.PARAMS);
            }
        });
    }

    addButtonBindings() {
        this.buttonFolder.addBinding(this.timelinePARAMS, 'encodeFormat',{
            label: 'フォーマット',
            options: {
                png: "png",
                gif: "gif",
            }
        });
        this.buttonFolder.addBinding(this.timelinePARAMS, 'startFrame',{
            label: '開始フレーム',
            step: 1,
            min: 0,
        });
        this.buttonFolder.addBinding(this.timelinePARAMS, 'endFrame',{
            label: '終了フレーム',
            step: 1,
            min: 1,
        });
        this.encodeButton = this.buttonFolder.addButton({
            title: 'スタート',
            label: 'エンコード',
        });

        this.encodeButton.on('click', () => {
            console.log("エンコードボタンが押された");
            this.event.dispatch("encodeButtonPressed");
        });
        this.buttonFolder.on('change', (ev) => {
            if (ev.last) {
                console.log("timelinePaneが操作された");
                //startFrameがendFrameを超えてしまった場合、値をリフレッシュする
                if(this.timelinePARAMS.startFrame >= this.timelinePARAMS.endFrame){
                    this.timelinePARAMS.startFrame = this.timelinePARAMS.endFrame -1;
                    this.buttonFolder.refresh();
                }
                this.event.dispatch("timelinePARAMSChanged", this.timelinePARAMS);
            }
        });
    }
}