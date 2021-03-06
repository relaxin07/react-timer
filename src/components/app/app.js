import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { homePage, chartPage, detailTaskPage } from '../../pages';
import MyTabs from '../tabs';
import Timer from '../timer';

import './app.css';

const App = () => {
  return (
    <div className="container">
      <Timer/>
      <MyTabs/>
      <Switch>
        <Route path="/" component={homePage} exact/>
        <Route path="/chart-page" component={chartPage}/>
        <Route path="/tasks/:id" component={detailTaskPage}/>
        <Route path="*"> <br/> Page is undefined <br/>
          <Link to="/" className="back-home-link">
            Back home
          </Link>
        </Route>
      </Switch>
    </div>
  );
};


export default App;