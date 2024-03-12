import './App.css';
import { useState } from 'react';

function App() {

  let [logo, setLogo] = useState(['남자 코트 추천', '강남 우동맛집', 'React 독학']);
  let [good, setGood] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(1); //Modal 컴포넌트에 해도됨. 
  let [value, setValue] = useState('');

  const goodClick = (i, e) => {
    e.stopPropagation();
    let copy = [...good];
    copy[i] += 1;
    setGood(copy);
  }

  function logoChange() {
    let copy = [...logo];
    copy[0] = '여자 코트 추천';
    setLogo(copy);
  }

  function logoSort() {
    let copy = [...logo];
    copy.sort();
    setLogo(copy);
  }

  function logoClick(i) {
    setTitle(i);
    if (modal === false) {
      setModal(true);
    }
    else {
      setModal(false);
    }
  }

  const inputText = (e) => {
    setValue(e);
  }

  const addText = () => {
    setLogo((prev) => [...prev, value]);
    setGood((prev) => [...prev, 0]);
  }

  const deleteText = (i) => {
    let copylogo = [...logo];
    copylogo.splice(i, 1);
    setLogo(copylogo);
    let copyGood = [...good];
    copyGood.splice(i, 1);
    setGood(copyGood);
    // setLogo(logo.filter(word => word !== logo[i]));
    // setGood(good.filter(word => word !== good[i])); //살짝 이상
  }

  return ( //html을 return 소괄호 안에 작성
    <div className="App">
      <div className="black-nav">
        <h4>블로그</h4>
      </div>
      {/* <div className='list'>
        <h4>{logo[0]} <span onClick={goodClick}>👍</span> {good} </h4>
        <p>2월 17일 발행</p>
      </div>
      <div className='list'>
        <h4>{logo[1]}</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className='list'>
        <h4 onClick={logoClick}>{logo[2]}</h4>
        <p>2월 17일 발행</p>
      </div> */}
      {
        logo.map(function (title, i) {
          return (<div className='list'>
            <h4 onClick={()=>logoClick(i)}>{title}
              <span onClick={(e) => goodClick(i, e)}>👍</span> {good[i]} 
            </h4>
            <p>2월 17일 발행</p>
            <button onClick={() => deleteText(i)}>삭제</button>
          </div>)
        })
      }
      <input onChange={(e) => inputText(e.target.value)}></input>
      <button onClick={addText}>글 발행</button>
      {
        modal === true ? <Modal color = {'gray'} logo = {logo} logoChange = {logoChange} title = {title}></Modal> : null
      }
      {/* <button className='change' onClick={logoChange}>변경</button>
      <button className='change' onClick={logoSort}>정렬</button> */}
    </div>
  );
}

function Modal(props) { //컴포넌트
  return (
    <div className="modal" style={{background : props.color}}>
      <h4>{props.logo[props.title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button className='change' onClick={props.logoChange}>변경</button>
    </div>
  )
}
export default App;
