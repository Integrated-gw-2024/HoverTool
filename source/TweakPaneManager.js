

export class TweakPaneManager {
    pane;
    constructor(PaneObject) {
        this.pane = PaneObject;
        const PARAMS = {
            speed: 50,
        };
        this.pane.addBinding(PARAMS, 'speed', {
            min: 0,
            max: 100,
        });
    }
}