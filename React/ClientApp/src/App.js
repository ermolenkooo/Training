import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Layout } from './components/Layout';
import { FetchData } from './components/FetchData';
import { ConfigModule } from './components/ConfigModule';
import { EditTrainingScript } from './components/EditTrainingScript';
import { EvaluationOfActions } from './components/EvaluationOfActions';
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

    render() {
      return (
        <Router>
              <Layout>
                <Route exact path='/' component={EditTrainingScript} />
                <Route path='/evaluation/:id' component={EvaluationOfActions} />
            </Layout>
        </Router>
    );
  }
}
