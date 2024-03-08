import React, { useEffect, useRef, useState } from "react";
import Rules from "./Rules";

import Paper from "./assets/images/icon-paper.svg";
import Rock from "./assets/images/icon-rock.svg";
import Scissors from "./assets/images/icon-scissors.svg";
import Heart from "./assets/images/heart2.png";

const App = () => {
  const [showRules, setShowRules] = useState(false);
  const [score, setScore] = useState(0);
  const [yourPick, setYourPick] = useState("");
  const [housePick, setHousePick] = useState("");
  const [result, setResult] = useState("");
  const playerRef = useRef(null);
  const compRef = useRef(null);
  const getElement = (s) => {
    return (
      <div
        className={`${s} circle`}
        id={s}
        onClick={() => {
          if (yourPick === "") {
            setYourPick(s);
          }
        }}
      >
        <div className="inner-circle">
          <img
            src={s === "rock" ? Rock : s === "paper" ? Paper : Scissors}
            alt={s}
          />
        </div>
      </div>
    );
  };
  useEffect(() => {
    if (yourPick !== "") {
      const arr = ["rock", "paper", "scissors"];
      let i = parseInt(Math.random() * 3);
      setTimeout(() => {
        setHousePick(arr[i]);
      }, 1000);
    }
  }, [yourPick]);

  useEffect(() => {
    if (playerRef.current && compRef.current) {
      let p = playerRef.current.children[1].id;
      let c = compRef.current.children[1].id;
      if (p === c) {
        setResult("it's a draw");
      } else if (p === "rock") {
        if (c === "paper") {
          setScore((score) => score - 1);
          setResult("you lose");
          playerRef.current.children[1].classList.remove("winner");
          compRef.current.children[1].classList.add("winner");
        } else {
          setScore((score) => score + 1);
          setResult("you win");
          compRef.current.children[1].classList.remove("winner");
          playerRef.current.children[1].classList.add("winner");
        }
      } else if (p === "scissors") {
        if (c === "paper") {
          setScore((score) => score + 1);
          setResult("you win");
          compRef.current.children[1].classList.remove("winner");
          playerRef.current.children[1].classList.add("winner");
        } else {
          setScore((score) => score - 1);
          setResult("you lose");
          playerRef.current.children[1].classList.remove("winner");
          compRef.current.children[1].classList.add("winner");
        }
      } else {
        if (c === "rock") {
          setScore((score) => score + 1);
          setResult("you win");
          compRef.current.children[1].classList.remove("winner");
          playerRef.current.children[1].classList.add("winner");
        } else {
          setScore((score) => score - 1);
          setResult("you lose");
          playerRef.current.children[1].classList.remove("winner");
          compRef.current.children[1].classList.add("winner");
        }
      }
    }
  }, [housePick]);
  return (
    <>
      {showRules ? <Rules setShowRules={setShowRules} /> : ""}
      <main>
        <div className="header">
          <p className="title">
            ROCK <br />
            PAPER <br />
            SCISSORS <br />
          </p>
          <div className="score-container">
            <div className="score-title">SCORE</div>
            <div className="score-value">{score}</div>
          </div>
        </div>
        <div className="playground">
          {yourPick === "" ? (
            <div className="options-container">
              <div className="top">
                {getElement("paper")}
                {getElement("scissors")}
              </div>
              {getElement("rock")}
            </div>
          ) : (
            <div className="face-off">
              <div className="col" ref={playerRef} id="player">
                <p className="who">you picked</p>
                {getElement(yourPick)}
              </div>
              {result !== "" ? (
                <div className={`result ${result !== "" ? "rs" : ""}`}>
                  <p className="result-msg">{result}</p>
                  <button
                    className="play-again-btn"
                    onClick={() => {
                      setYourPick("");
                      setHousePick("");
                      setResult("");
                    }}
                  >
                    PLAY AGAIN
                  </button>
                </div>
              ) : (
                ""
              )}
              <div className="col" ref={compRef} id="comp">
                <p className="who">the house picked</p>
                {housePick !== "" ? (
                  getElement(housePick)
                ) : (
                  <div className="blank-circle"></div>
                )}
              </div>
            </div>
          )}
        </div>
        <button
          className="toggle-rules"
          onClick={() => {
            setShowRules(true);
          }}
        >
          RULES
        </button>
      </main>
      <footer>
        Developed with <img src={Heart} alt="heart" /> by{"   "}
        <a
          href="https://baniyaportfolio.web.app"
          rel="noreferrer"
          target="_blank"
        >
          {" "}
          Ritesh
        </a>
      </footer>
    </>
  );
};

export default App;
