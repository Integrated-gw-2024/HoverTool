export class EventRegistry {
  listener;
  name;
  callback;
  scope;
  constructor(listener, name, callback, scope) {
    this.listener = listener;
    this.name = name;
    this.callback = callback;
    this.scope = scope;
  }
}
