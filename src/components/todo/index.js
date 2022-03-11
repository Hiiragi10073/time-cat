import React, { useState } from 'react';
import dayjs from 'dayjs';
import './index.css';

import { TodoForm } from '../todo-form';

function Todo(props) {
  const [isShowForm, setIsShowForm] = useState(false);
  const [editData, setEditData] = useState({});
  const [status, setStatus] = useState('add');

  function handleAdd() {
    setStatus('add');
    setEditData({
      title: '',
      time: '',
    });
    setIsShowForm(true);
  }

  function handleEdit({ id, title, time }, e) {
    setStatus('edit');
    setEditData({
      id,
      title,
      time,
    });
    setIsShowForm(true);
  }

  function handleSubmit({ data, status }) {
    props[status](data);
  }

  function handleDel(id) {
    props.del(id);
  }

  function handleClear(id) {
    props.clear(id);
  }

  return (
    <div className="todo">
      <header className="todo-header">
        <h1 className="todo-header__title"></h1>
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
        {props.data
          .filter((d) => !d.isClear)
          .map((todo, i) => {
            return (
              <li className="todo-item" key={i}>
                <div className="todo-item__title">{todo.title}</div>
                <div className="todo-item__time">
                  {dayjs(todo.time).format('YYYY-MM-DD')}
                </div>
                <div className="todo-item__buttons">
                  <button
                    className="button-text iconfont icon-setup todo-item__button"
                    onClick={handleEdit.bind(this, todo)}
                  ></button>
                  <button
                    className="button-text iconfont icon-guanbi todo-item__button"
                    onClick={handleDel.bind(this, todo.id)}
                  ></button>
                  <button
                    className="button-text iconfont icon-duihao todo-item__button"
                    onClick={handleClear.bind(this, todo.id)}
                  ></button>
                </div>
              </li>
            );
          })}
      </ul>
      {isShowForm && (
        <TodoForm
          data={editData}
          status={status}
          setIsShowForm={setIsShowForm}
          submit={handleSubmit}
        ></TodoForm>
      )}
    </div>
  );
}

export default Todo;
