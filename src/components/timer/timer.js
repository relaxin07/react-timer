import React from 'react';
import './timer.css';

import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../../store/modules/tasks/index';
import Modal from '../modal';

class Timer extends React.Component {
  startTime = null;
  timerId = null;
  state = {
    taskText: '',
    flag: false,
    viewBtn: true,
    time: 0,
    loading: true,
  };

  componentDidMount() {
    const { getTime } = this.props;
    getTime();
  }

  componentDidUpdate() {
    const { resumeTimer } = this.props;
    if (this.state.flag === false && resumeTimer.resume === true && resumeTimer.status === true) {
      this.setState(() => ({
        flag: true,
      }));
      this.startTimer(true);
    }

    if (this.state.flag === false && resumeTimer.resume === false && resumeTimer.status === true) {
      this.setState(() => ({
        flag: true,
        loading: false,
      }));

    }
  }

  useStyles = () => makeStyles({
      timerBtn: {
        background: '#fff',
        textTransform: 'uppercase',
      },
    },
  );

  onTimerWrap = () => {
    const { saveTimeOnTimer } = this.props;
    saveTimeOnTimer();
    this.startTimer();
  };

  convertorTime(time) {
    let seconds = Math.round(time / 1000);
    let h = seconds / 3600 ^ 0;
    let m = (seconds - h * 3600) / 60 ^ 0;
    let s = (seconds - h * 3600) % 60;
    if (h < 10) h = '0' + h;
    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + s;
    return `${h}:${m}:${s}`;
  }

  startTimer = (isResumeTime) => {
    const { resumeTimer } = this.props;
    this.startTime = isResumeTime ? new Date(resumeTimer.time) : new Date();
    this.timerId = setInterval(() => {
      this.setState((state) => ({
        time: new Date() - this.startTime,
        loading: false,
      }));
    }, 1000);
    this.setState(() => ({
      viewBtn: false,

    }));
  };

  stopTimer = (event) => {
    const { addItemThunk, showModal } = this.props;
    const { taskText } = this.state;
    if (taskText.length === 0) {
      event.stopPropagation();
      event.preventDefault();
      showModal();
      return false;
    }

    clearTimeout(this.timerId);
    this.setState(() => ({
      time: 0,
      viewBtn: true,
      taskText: '',
      timerResume: false,
    }));
    let timeEnd = new Date();

    const payload = {
      taskName: taskText,
      timeStart: this.startTime.toLocaleTimeString(),
      timeEnd: timeEnd.toLocaleTimeString(),
      timeSpend: this.convertorTime(timeEnd - this.startTime),
    };
    addItemThunk(payload);

  };

  onChangeInput(event) {
    this.setState({
      taskText: event.target.value,
    });
  }

  render() {

    const classes = this.useStyles();
    let { viewBtn, taskText, time, loading } = this.state;
    let { statusModal, showModal } = this.props;

    let timeResult = this.convertorTime(time);
    const modal = statusModal ? <Modal showModal={showModal}/> : null;
    const buttonChange = viewBtn ?
      <Button className={classes.timerBtn} variant="contained" onClick={this.onTimerWrap}> Start </Button> :
      <Button className={classes.timerBtn} variant="contained"
              onClick={(event) => this.stopTimer(event)}> Stop </Button>;
    return (
      <div className='wrap-top-block'>
        {modal}
        <input type="text" className="task-input-name" value={taskText} onChange={(event) => {
          this.onChangeInput(event);
        }} placeholder="Name of your task"/>

        <div className="b-timer">
          <div className="time">
            {
              loading ? <CircularProgress/> : <span className="time__items">{timeResult} </span>
            }
          </div>
        </div>

        <span>{buttonChange}</span>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { statusModal, resumeTimer } = state;
  return {
    statusModal,
    resumeTimer,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { saveTimeOnTimer, addItemThunk, showModal, getTime } = bindActionCreators(actions, dispatch);
  return {
    saveTimeOnTimer,
    addItemThunk,
    showModal,
    getTime,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);

