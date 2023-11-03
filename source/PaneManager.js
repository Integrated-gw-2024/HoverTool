import { Pane } from "tweakpane";


export class PaneManager {
    pane;
    PARAMS;

    constructor() {
        this.pane = new Pane();
        this.PARAMS = {
            Gravity: 350,
            InitSpeedRatio: 0.5,
            Speed: 0.017,
            LimitSpeed: 0.7,
        };
        this.addBindings();
    }
    addBindings(){
        this.pane.addBinding(this.PARAMS, 'Gravity', {
            min: 100,
            max: 500,
        });
        this.pane.addBinding(this.PARAMS, 'Speed', {
            min: 0,
            max: 0.1,
        });
        this.pane.addBinding(this.PARAMS, 'LimitSpeed', {
            min: 0,
            max: 5,
        });
        this.pane.addBinding(this.PARAMS, 'InitSpeedRatio', {
            step: 0.1,
            min: 0,
            max: 1,
        });
    }
}