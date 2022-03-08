import React, { useState } from 'react';
import './index.css';

export function TodoForm(props) {
  const [title, setTitle] = useState(props.data.title);
  const [time, setTime] = useState(props.data.time);

  function handleSubmit(e) {
    props.submit({
      title,
      time,
    });
    props.setIsShowForm(false);
    e.preventDefault();
  }

  return (
    <div className="todo-form">
      <div className="todo-form__header">
        <span
          className="button-text iconfont icon-guanbi header__close-button"
          onClick={() => props.setIsShowForm(false)}
        ></span>
      </div>
      <form className="todo-form__content">
        <div className="form-item">
          <label className="form-item__label">日程:</label>
          <div className="form-item__content">
            <input
              className="form-item__input"
              type="text"
              value={title}
              onInput={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="form-item">
          <label className="form-item__label">时间:</label>
          <div className="form-item__content">
            <input
              className="form-item__input"
              type="text"
              value={time}
              onInput={(e) => setTime(e.target.value)}
            />
          </div>
        </div>
        <div className="form-item">
          <div className="form-item__content form-item__content--button">
            <button
              className="button-text form-item__button"
              onClick={handleSubmit}
            >
              确定
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
