import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

import cloneDeep from 'lodash/cloneDeep';

class Recharts extends Component {

  state = {
    initialData: [],
  };

  componentDidMount() {
    const { initialData } = this.state;
    this.changeData(initialData);
    this.convertData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      const { initialData } = this.state;
      this.changeData(initialData);
      this.convertData();
    }
  }

  changeData = (initialData) => {
    for (let i = 0; i < 24; i++) {
      initialData[i] = { id: i, min: 0 };
    }
    this.setState(() => ({
      initialData,
    }));
  };

  convertTimeInMinutes = (h, m, s) => {
    return parseInt(h * 60) + parseInt(m);
  };

  convertData = () => {
    let { initialData } = this.state;
    let { data } = this.props;


    for (let i = 0; i < data.length; i++) {
      let dataTimeSplit = data[i].timeStart.split(':');
      let idDataStartTime = parseInt(dataTimeSplit[0]);

      const timeSpendOnTask = data[i].timeSpend.split(':');
      let timeSpendOnMinutes = this.convertTimeInMinutes(...timeSpendOnTask);
      let minutes = 60;

      while (timeSpendOnMinutes > 0) {
        let amountForFullMinutes = minutes - initialData[idDataStartTime].min;
        initialData[idDataStartTime].min = initialData[idDataStartTime].min + timeSpendOnMinutes;

        if (initialData[idDataStartTime].min > 60) {
          initialData[idDataStartTime].min = 60;
          idDataStartTime++;
          timeSpendOnMinutes = timeSpendOnMinutes - amountForFullMinutes;
        } else {
          timeSpendOnMinutes = 0;
        }
      }
      this.setState(() => ({
        initialData,
      }));
    }

  };

  render() {
    const { initialData } = this.state;
    let newData = cloneDeep(initialData);
    return (
      <div style={{ maxWidth: '100%', height: 300, padding: '0 20px 0 0' }}>
        <ResponsiveContainer>
          <BarChart
            data={newData}
            margin={{
              top: 20, right: 0, left: 0, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="id"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Bar name="Minutes in this hours" dataKey="min" fill="#3248C7"/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { data } = state;
  return { data };
};


export default connect(mapStateToProps)(Recharts);