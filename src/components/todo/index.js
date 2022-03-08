import React, { useState } from 'react';
import './index.css';

import { TodoForm } from '../todo-form';

function Todo(props) {
  const [isShowForm, setIsShowForm] = useState(false);
  const [editData, setEditData] = useState({
    title: '',
    time: '',
  });

  const { ipcRenderer } = window.electron;

  function handleAdd() {
    setEditData({
      title: '',
      time: '',
    });
    setIsShowForm(true);
  }

  function handleEdit({ title, time }, e) {
    setEditData({
      title,
      time,
    });
    setIsShowForm(true);
  }

  function handleSubmit(data) {
    props.setData([...props.data, data]);
    ipcRenderer.send('set-todo', [...props.data, data]);
    localStorage.setItem('todo', JSON.stringify([...props.data, data]));
  }

  function handleDel(index) {
    const temp = props.data.filter((item, i) => i !== index);
    props.setData(temp);
    ipcRenderer.send('set-todo', temp);
    localStorage.setItem('todo', JSON.stringify(temp));
  }

  return (
    <div className="todo">
      <header className="todo-header">
        <h1 className="todo-header__title">time cat</h1>
        <div className="todo-tools">
          <button
            className="button-text todo-tools__button"
            onClick={handleAdd}
          >
            +
          </button>
        </div>
      </header>
      <ul className="todo-container">
        {props.data.map((todo, i) => {
          return (
            <li className="todo-item" key={i}>
              <div className="todo-item__title">{todo.title}</div>
              <div className="todo-item__time">{todo.time}</div>
              <div className="todo-item__buttons">
                <button
                  className="button-text iconfont icon-setup todo-item__button"
                  onClick={handleEdit.bind(this, {
                    title: todo.title,
                    time: todo.time,
                  })}
                ></button>
                <button
                  className="button-text iconfont icon-guanbi todo-item__button"
                  onClick={handleDel.bind(this, i)}
                ></button>
                <button className="button-text iconfont icon-duihao todo-item__button"></button>
              </div>
            </li>
          );
        })}
      </ul>
      {isShowForm && (
        <TodoForm
          data={editData}
          setIsShowForm={setIsShowForm}
          submit={handleSubmit}
        ></TodoForm>
      )}
    </div>
  );
}

export default Todo;
