const Store = require('electron-store');
const store = new Store();

const { isDef, isDate } = require('../utils/def');

class Todo {
  constructor({ id, title, time, isClear, clearTime }) {
    this.id = id;
    this.title = title;
    this.time = isDate(time) ? new Date(time).getTime() : Date.now();
    this.isClear = isDef(isClear) ? isClear : false;
    this.clearTime = isDate(clearTime) ? new Date(clearTime).getTime() : 0;
  }
}

class TodoStore {
  constructor() {
    this.init();
  }

  init() {
    if (!store.has('todo')) {
      store.set('todo', []);
    }
  }

  getTodo() {
    return store.get('todo');
  }

  setTodo(id, value) {
    const list = this.getTodo();
    const i = list.findIndex((d) => d.id === id);

    if (i > -1) {
      list[i] = new Todo({
        ...value,
        id,
      });

      store.set('todo', list);
      return true;
    } else {
      return false;
    }
  }

  addTodo(value) {
    const list = this.getTodo();
    const last = list[list.length - 1] || {};
    const id = last.id ? `${last.id + 1}` : '1';
    const newData = new Todo({
      id,
      ...value,
    });

    list.push(newData);

    store.set('todo', list);
    return newData;
  }

  delTodo(id) {
    const list = this.getTodo();
    const i = list.findIndex((d) => d.id === id);

    if (i > -1) {
      list.splice(i, 1);

      store.set('todo', list);
      return true;
    } else {
      return false;
    }
  }

  clearAll() {
    store.set('todo', []);
    return true;
  }

  setClear(id, status) {
    const list = this.getTodo();
    const i = list.findIndex((d) => d.id === id);

    if (i > -1) {
      list[i].isClear = isDef(status) ? status : !list[i].isClear;
      if (list[i].isClear) {
        list[i].clearTime = Date.now();
      } else {
        list[i].clearTime = 0;
      }

      store.set('todo', list);
      return true;
    } else {
      return false;
    }
  }
}

module.exports.TodoStore = TodoStore;
