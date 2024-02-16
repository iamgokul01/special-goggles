import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timer: '25:00',
    min: 25,
    seconds: 0,
    isStarted: false,
  }

  renderTimer = async () => {
    let {min, seconds} = this.state

    if (min < 10) {
      min = `0${min}`
    }
    if (seconds < 10) {
      seconds = `0${seconds}`
    }
    const renderedTime = `${min}:${seconds}`
    await this.setState({timer: renderedTime})
  }

  increaseMin = async () => {
    await this.setState(prevState => ({min: prevState.min + 1}))
    this.renderTimer()
  }

  decreaseMin = async () => {
    const {min} = this.state
    if (min > 0) {
      await this.setState(prevState => ({min: prevState.min - 1}))
      this.renderTimer()
    }
  }

  startTimer = () => {
    const timerId = setInterval(async () => {
      const {min, seconds} = this.state

      if (seconds === 0) {
        if (min === 0 && seconds === 0) {
          await this.setState({min: 0, seconds: 0})
        } else {
          await this.setState({min: min - 1, seconds: 59, isStarted: true})
        }
      } else {
        await this.setState({seconds: seconds - 1, isStarted: true, timerId})
        console.log('reducing sec')
      }

      this.renderTimer()
    }, 1000)
  }

  pauseTimer = () => {
    const {timerId} = this.state
    clearInterval(timerId)
    this.setState({isStarted: false})
  }

  resetTimer = () => {
    const {timerId} = this.state
    clearInterval(timerId)
    this.setState({timer: `25:00`, min: 25, seconds: 59})
  }

  render() {
    const {min, timer, isStarted} = this.state
    return (
      <div className="timer-container">
        <h1 className="app-name">Digital Timer</h1>
        <div className="timer-viewer-controller-section">
          <div className="timer-viewer">
            <div className="timer-viewer-bg">
              <div className="timer-countdown-section">
                <h1 className="timer">{timer}</h1>
                <p className="timer-stats">
                  {isStarted ? 'Running' : 'Paused'}
                </p>
              </div>
            </div>
          </div>
          <div className="timer-controller-section">
            <div className="timer-controller">
              <div className="start-reset-btns">
                <button
                  type="button"
                  className="ctrl-btns"
                  onClick={isStarted ? this.pauseTimer : this.startTimer}
                >
                  <img
                    src={
                      isStarted
                        ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                    }
                    alt={isStarted ? 'pause icon' : 'play icon'}
                    className="icon"
                  />
                  {isStarted ? 'Pause' : 'Play'}
                </button>
                <button type="button" className="ctrl-btns">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="icon"
                    onClick={this.resetTimer}
                  />
                  Reset
                </button>
              </div>
              <div className="set-timer-limit">
                <p>Set Timer Limit</p>
                <div className="timer-limiter-section">
                  <button
                    type="button"
                    onClick={this.decreaseMin}
                    className="min-controller"
                  >
                    -
                  </button>
                  <p className="min">{min}</p>
                  <button
                    type="button"
                    onClick={this.increaseMin}
                    className="min-controller"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
