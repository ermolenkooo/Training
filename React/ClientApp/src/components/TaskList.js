import React, { Component } from 'react';
import { ModalAdd } from './ModalAdd';

export class Task extends Component { 

    constructor(props) {
        super(props);
        this.state = { data: props.task };
        this.onClick = this.onClick.bind(this);
    }
    onClick(e) { 
        
    }
    render() { 
        return <div>
            <p>{this.state.data.name}</p>
            
        </div>;
    }
}

export class TasksList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { tasks: [] };

        this.onAddTask = this.onAddTask.bind(this);
        this.loadData = this.loadData.bind(this);
    }
    // загрузка данных
    async loadData() {
        var response = await fetch('tasks');
        var data = await response.json();
        this.setState({ tasks: data });
    }
    componentDidMount() {
        this.loadData();
    }
    // добавление объекта
    async onAddTask(task) {
        if (task) {
            let response = await fetch('tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(task)
            });
        }
    }
    render() {
        return (
            <div>
                <ModalAdd onTaskSubmit={this.onAddTask} />
                <p></p>
                <div>
                    {
                        this.state.tasks.map(function (t) {
                            return <Task key={t.id} task={t} />
                        })
                    }
                </div>
            </div>
        );
    }
}