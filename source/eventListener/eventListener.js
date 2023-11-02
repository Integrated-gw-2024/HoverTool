import { EventRegistry } from "./eventRegistry";

export class EventListener {
  callbacks;

  constructor() {
    this.callbacks = new Map();
  }

  add(name, callback, scope) {
    if (!this.callbacks.has(name)) {
      this.callbacks.set(name, []);
    }
    if (callback === undefined) return;
    let event;
    if (scope === undefined) {
      event = new EventRegistry(this, name, callback, callback);
    } else {
      event = new EventRegistry(this, name, callback, scope);
    }
    this.callbacks.get(name)?.push(event);
  }

  dispatch(name, argA, argB, argC, argD, argE, argF) {
    if (!this.callbacks.has(name)) {
      throw new Error(`'${name}'イベントは登録されていません。`);
    }
    for (const event of this.callbacks.get(name)) {
      event.callback.call(event.scope, argA, argB, argC, argD, argE, argF);
    }
  }
}
