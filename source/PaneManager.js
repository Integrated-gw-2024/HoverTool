import { Pane } from "tweakpane";
import { EventListener } from "./utility/eventListener/eventListener";


export class PaneManager {
    pane;
    PARAMS;

    constructor() {
        this.event = new EventListener();
        this.event.add("PARAMSChanged");
        this.event.add("encodeButtonPressed");

        this.pane = new Pane();
        this.PARAMS = {
            Gravity: 350,
            InitSpeedRatio: 0.5,
            Speed: 0.017,
            LimitSpeed: 0.7,
        };
        this.PARAMSFolder = this.pane.addFolder({
            title: 'パラメーター',
        });
        this.buttonFolder = this.pane.addFolder({
            title: 'ボタン',
        });
        this.addPARAMSBindings();
        this.addButtonBindings();
    }
    addPARAMSBindings() {
        this.PARAMSFolder.addBinding(this.PARAMS, 'Gravity', {
            min: 100,
            max: 500,
        });
        this.PARAMSFolder.addBinding(this.PARAMS, 'Speed', {
            min: 0,
            max: 0.1,
        });
        this.PARAMSFolder.addBinding(this.PARAMS, 'LimitSpeed', {
            min: 0,
            max: 5,
        });
        this.PARAMSFolder.addBinding(this.PARAMS, 'InitSpeedRatio', {
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
        this.encodeButton = this.buttonFolder.addButton({
            title: 'スタート',
            label: 'エンコード',
        });
        this.encodeButton.on('click', () => {
            console.log("エンコードボタンが押された");
            this.event.dispatch("encodeButtonPressed");
        });
    }
}