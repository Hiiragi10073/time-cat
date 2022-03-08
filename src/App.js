import React, { useState } from 'react';

import './App.css';
import './styles/index.css';

import Todo from './components/todo';

import catImg from './assets/img/cat.png';

function App() {
  const initData = JSON.parse(localStorage.getItem('todo') || '[]');
  const [show, setShow] = useState(false);
  const [data, setData] = useState(initData);
  const { ipcRenderer } = window.electron;

  console.log(data);

  function handleMouseDown(e) {
    console.log('down');
    const mouseX = e.pageX;
    const mouseY = e.pageY;

    const clientX = e.clientX;
    const clientY = e.clientY;

    let isDrag = false;

    function handleMove(e) {
      if (!isDrag) {
        console.log('move');
        const cMouseX = e.pageX;
        const cMouseY = e.pageY;

        const dis = Math.sqrt(
          (cMouseX - mouseX) ** 2 + (cMouseY - mouseY) ** 2
        );
        if (dis > 10) {
          console.log('drag');
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
    setShow(!show);
    ipcRenderer.send('size-change', !show);
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
      {show && <Todo data={data} setData={setData}></Todo>}
    </div>
  );
}

export default App;
