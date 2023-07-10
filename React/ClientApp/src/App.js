import React, { Component } from 'react';
import { Button } from 'reactstrap'
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Table } from './components/Table';
import { TasksList } from './components/TaskList';
import { ConfigModule } from './components/ConfigModule';
import { OperationsList } from './components/EditTrainingScript';
import { EditTrainingScript } from './components/EditTrainingScript';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <Layout>
            {/*<div class="grid">*/}
            {/*    <TasksList></TasksList>*/}
            {/*    <Table></Table>*/}
            {/*</div>*/}
            <ConfigModule></ConfigModule>
            <EditTrainingScript></EditTrainingScript>
      </Layout>
    );
  }
}
