import './App.css';
import React, { useEffect, useRef, useState } from 'react';

const defaultvalues = {
  1: '',
  2: '',
  3: '',
  4: '',
  5: '',
  6: '',
  7: '',
  8: '',
  9: '',
  10: ''
};


function App() {

  const [answerList, setAnswerList] = useState(defaultvalues);
  const [currentFocus, setCurrentFocus] = useState(0);
  const [timeTableList, setTimesTableList] = useState([]);
  const [countdown, setCountdown] = useState(30);
  const [failure, setFailure] = useState(false);
  const inputField1 = useRef(null);
  const inputField2 = useRef(null);
  const inputField3 = useRef(null);
  const inputField4 = useRef(null);
  const inputField5 = useRef(null);
  const inputField6 = useRef(null);
  const inputField7 = useRef(null);
  const inputField8 = useRef(null);
  const inputField9 = useRef(null);
  const inputField10 = useRef(null);

  const inputList = [
    inputField1,
    inputField2,
    inputField3,
    inputField4,
    inputField5,
    inputField6,
    inputField7,
    inputField8,
    inputField9,
    inputField10,
  ];

  let interval;

  const recursivelyGenerateRandomNumberAbove10 = () => {
    let randomNumber = Math.floor(Math.random() * 100);
    if (randomNumber <= 10) recursivelyGenerateRandomNumberAbove10();
    return randomNumber;
  }

  const createTimesTableList = (firstNumber) => {
    let timesList = [];
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((numberToTimesBy) => {
      timesList.push(firstNumber * numberToTimesBy);
    });
    return timesList;
  }

  const isAnswerIsCorrect = (answerListIndex, timeTableIndex) => {
    return answerList[answerListIndex] == timeTableList[timeTableIndex]
  }

  const setTimer = () => {
    const interval = setInterval(() => {
      setCountdown((prevCounter) => prevCounter - 1);
    }, 1000);

    return interval;
  };

  useEffect(() => {
    const randomNumber = recursivelyGenerateRandomNumberAbove10();
    setTimesTableList(createTimesTableList(randomNumber));
    interval = setTimer();
  }, []);

  useEffect(() => {
    const isAnswerCorrect = isAnswerIsCorrect(currentFocus + 1, currentFocus);
    if (isAnswerCorrect && currentFocus !== 9) setCurrentFocus(currentFocus + 1);
    else inputList[currentFocus].current.focus();
  }, [answerList]);

  useEffect(() => {
    inputList[currentFocus].current.focus();
  }, [currentFocus]);

  useEffect(() => {
    if (countdown <= 0) {
      setFailure(true);
      clearInterval(interval)
    }
  }, [countdown])

  return (
    <div className="App">
      {failure && <p>You've failed!</p>}
      <p>Times Table list of: {timeTableList[0]}</p>
      <p>Time left: {countdown}</p>
      <form>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((ele, index) => {
          return (
            <input 
              onChange={(e) => {
                const newAnswerList = JSON.parse(JSON.stringify(answerList));
                newAnswerList[ele] = e.target.value;
                setAnswerList(newAnswerList);
              }}
              ref={inputList[index]}
              value={answerList[ele]}
              key={ele + Math.random()}
            />
          )
        })}
      </form>
    </div>
  );
}

export default App;
