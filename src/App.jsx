import { useState, useEffect, useRef, Component } from "react";
import "./App.css";
let t;

// change variable names accordingly

class App extends Component {
  state = {
    isTimerOn: false,
    break: false,
    timerInSec: 1500,
    breakTimeInSec:5,
    sessionTimeInSec: 25
  }

  audio = document.getElementsByTagName('audio')[0]

   handleBreakDec = () => {
    if (this.state.breakTimeInSec <= 1 || this.state.breakTimeInSec > 60) return;
    this.setState({breakTimeInSec : this.state.breakTimeInSec - 1});
  };
   handleBreakInc = () => {
    if (this.state.breakLength < 1 || this.state.breakLength >= 60) return;
    this.setState({breakTimeInSec : this.state.breakTimeInSec + 1});
  };
   handleSessionDec = () => {
    if (this.state.sessionTimeInSec <= 1 || this.state.sessionTimeInSec > 60) return;
    this.setState({sessionTimeInSec: this.state.sessionTimeInSec - 1})
  };
   handleSessionInc = () => {
    if (this.state.sessionTimeInSec < 1 || this.state.sessionTimeInSec >= 60) return;
    this.setState({sessionTimeInSec: this.state.sessionTimeInSec + 1})
  };


  startStopTimer = () => {
    if (this.state.isTimerOn === true) {
      console.log(this.state);
      this.setState({ isTimerOn: false});
      clearInterval(this.timerInSec);
    } else if (this.state.isTimerOn === false) {
      this.setState({ isTimerOn: true });
      if (this.state.timerInSec > 0) {
        this.timer = setInterval(() => {
          let currTimer = this.state.timerInSec;
          let breakStatus = this.state.break;
          if (currTimer > 0) {
            currTimer -= 1;
          } else if (currTimer === 0 && breakStatus === false) {
            currTimer = this.state.breakTimeInSec * 60;
            breakStatus = true;
          } else if (currTimer === 0 && breakStatus === true) {
            currTimer = this.state.sessionTimeInSec * 60;
            breakStatus = false;
          }
          this.setState({
            timerInSec: currTimer,
            break: breakStatus
          });
        }, 1000);
      };
    };
  };


  reset = () => {
    this.setState({
      isTimerOn: false,
      break: false,
      timerInSec: 1500,
      breakTimeInSec: 5,
      sessionTimeInSec: 25,
    });
    clearInterval(this.timerInSec);
    let beep = document.getElementsByTagName('audio')[0];
    beep.pause();
    beep.currentTime = 0;
  };

  
  
  render() {
    let minute = Math.floor(this.state.timerInSec / 60);
    let second = this.state.timerInSec % 60;

  return (
    <>
      <div className="container">
        <p>25 + 5 Clock TImer</p>
        <div className="controls">
          <div id="break">
            <div id="break-label">Break Length</div>
            <span id="break-decrement" onClick={this.handleBreakDec}>
              -
            </span>
            <span id="break-length">{this.state.breakTimeInSec}</span>
            <span id="break-increment" onClick={this.handleBreakInc}>
              +
            </span>
          </div>
          <div id="session">
            <div id="session-label">Session Length</div>
            <span id="session-decrement" onClick={this.handleSessionDec}>
              -
            </span>
            <span id="session-length">{this.state.sessionTimeInSec}</span>
            <span id="session-increment" onClick={this.handleSessionInc}>
              +
            </span>
          </div>
        </div>
        <div className="timer">
          <div className="inner">
            <div id="timer-label">{this.state.break === true ? "Break" : "Session"}</div>
            <div id="timer-left">
              {minute?.toString().length === 1
                ? `0${minute}`
                : minute || this.state.sessionTimeInSec}
              :{second?.toString().length === 1 ? `0${second}` : second || 0}
            </div>
          </div>
          <div className="outer">
            <div id="start_stop" onClick={this.startStopTimer}>
              Start
            </div>
            <div id="reset" onClick={this.reset}>
              reset
            </div>
          </div>
        </div>
      </div>
      {/* <audio ref={audio} style={{ display: "none" }} src="https://goo.gl/65cBl1"></audio> */}
      {/* <audio ref={audio} style={{ display: "none" }} src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"></audio> */}
      <audio ref={this.audio} style={{ display: "none" }} src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
    </>
  );
}
}

export default App;
