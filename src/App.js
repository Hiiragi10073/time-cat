import React, { useEffect, useState } from 'react';

import './App.css';
import './styles/index.css';

import Todo from './components/todo';

import catImg from './assets/img/cat.png';

function App() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const { ipcRenderer } = window.electron;

  useEffect(() => {
    ipcRenderer.invoke('get-todo').then((data) => {
      setData(data);
    });
  }, [show]);

  function handleMouseDown(e) {
    const mouseX = e.pageX;
    const mouseY = e.pageY;

    const clientX = e.clientX;
    const clientY = e.clientY;

    let isDrag = false;

    function handleMove(e) {
      if (!isDrag) {
        const cMouseX = e.pageX;
        const cMouseY = e.pageY;

        const dis = Math.sqrt(
          (cMouseX - mouseX) ** 2 + (cMouseY - mouseY) ** 2
        );
        if (dis > 10) {
          isDrag = true;
        }
      } else {
        ipcRenderer.send('pos-change', {
          x: e.screenX - clientX,
          y: e.screenY - clientY,
        });
      }
    }

    function handleMouseUp(e) {
      if (!isDrag) changeSize();
      isDrag = false;
      catElm.removeEventListener('mousemove', handleMove);
      catElm.removeEventListener('mouseup', handleMouseUp);
    }

    const catElm = document.getElementById('cat');
    catElm.addEventListener('mousemove', handleMove);
    catElm.addEventListener('mouseup', handleMouseUp);
  }

  function changeSize() {
    ipcRenderer.send('size-change', !show);
    setTimeout(
      () => {
        setShow(!show);
      },
      show ? 0 : 300
    );
  }

  function handleAdd(data) {
    ipcRenderer.invoke('add-todo', data).then((result) => {
      setData(result);
    });
  }

  function handleEdit(data) {
    ipcRenderer.invoke('set-todo', data.id, data).then((result) => {
      setData(result);
    });
  }

  function handleDel(id) {
    ipcRenderer.invoke('del-todo', id).then((result) => {
      setData(result);
    });
  }

  function handleClear(id) {
    ipcRenderer.invoke('clear-todo', id).then((result) => {
      setData(result);
    });
  }

  return (
    <div className="App" draggable="false">
      <img
        draggable="false"
        id="cat"
        className="cat"
        src={catImg}
        onMouseDown={handleMouseDown}
      />
      {show && (
        <Todo
          data={data}
          add={handleAdd}
          edit={handleEdit}
          del={handleDel}
          clear={handleClear}
        ></Todo>
      )}
    </div>
  );
}

export default App;
