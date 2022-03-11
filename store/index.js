const { ipcMain } = require('electron');
const { TodoStore } = require('./store');
const store = new TodoStore();

module.exports.install = function install() {
  ipcMain.handle('get-todo', (e) => {
    return store.getTodo();
  });

  ipcMain.handle('set-todo', (e, id, value) => {
    store.setTodo(id, value);
    return store.getTodo();
  });

  ipcMain.handle('add-todo', (e, value) => {
    store.addTodo(value);
    return store.getTodo();
  });

  ipcMain.handle('del-todo', (e, id) => {
    store.delTodo(id);
    return store.getTodo();
  });

  ipcMain.handle('clear-todo', (e, id, status) => {
    store.setClear(id, status);
    return store.getTodo();
  });
};
