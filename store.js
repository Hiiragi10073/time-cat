const Store = require('electron-store');
const store = new Store();

function initStore() {
  if (!store.has('todo')) {
    store.set('todo', []);
  }
}

initStore();

module.exports = {
  getTodo() {
    return store.get('todo');
  },
  setTodo(value) {
    console.log(store.path);
    return store.set('todo', value);
  },
};
