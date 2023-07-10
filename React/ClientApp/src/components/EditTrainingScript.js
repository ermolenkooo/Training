import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class Operation extends Component { 

    constructor(props) {
        super(props);
        this.state = { opertype: props.operation.id_type, command: props.operation.id_command, name: props.operation.name };
        this.handleChangeType = this.handleChangeType.bind(this);
        this.handleChangeCommand = this.handleChangeCommand.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    handleChangeType(event) {
        this.setState({ opertype: event.target.value });
    }
    handleChangeCommand(event) {
        this.setState({ command: event.target.value });
    }
    onClick() { 
        
    }
    render() {
        return <div>
            <input type="checkbox" className="form-check-input" name="check" />
            <p>{this.state.name}</p>
            <table className="table table-striped table-hover" id="operationTable">
                <tr>
                    <td>
                        <select placeholder="Выберите тип" value={this.state.opertype} onChange={this.handleChangeType} style={{ minWidth: '250px' }}>
                            {
                                this.props.types.map(function (t) {
                                    return <option value={t.id}>{t.name}</option>
                                })
                            }
                        </select>
                    </td>
                    <td>
                        <button onClick={this.onClick} style={{ marginRight: '10px', minWidth: '250px' }}>Экземпляр</button>
                    </td>
                    <td>
                        <select placeholder="Выберите вид команды" value={this.state.command} onChange={this.handleChangeCommand} style={{ minWidth: '250px' }}>
                            {
                                this.props.commands.map(function (c) {
                                    return <option value={c.id}>{c.name}</option>
                                })
                            }
                        </select>
                    </td>
                </tr>
            </table>
        </div>;
    }
}

export class Training extends Component {

    constructor(props) {
        super(props);
        this.state = { data: props.training };
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        
    }
    render() {
        return <div>
            <p onClick={(e) => { this.props.func(e, this.state.data.id); }}>{this.state.data.name}</p>
        </div>;
    }
}

export class EditTrainingScript extends React.Component { 

    constructor(props) {
        super(props);
        this.state = { modalOper: false, nameOper: "", operations: [], commands: [], types: [], modal: false, name: "", trainings: [] };
        this.toggleOper = this.toggleOper.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.onAddTraining = this.onAddTraining.bind(this);
        this.handleChangeNameOper = this.handleChangeNameOper.bind(this);
        this.selectAll = this.selectAll.bind(this);
        this.unselectAll = this.unselectAll.bind(this);
        this.addRow = this.addRow.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.execute = this.execute.bind(this);
        this.goTo = this.goTo.bind(this);
        this.loadData = this.loadData.bind(this);
        this.getOperations = this.getOperations.bind(this);
    }

    toggleOper() {
        this.setState({
            modalOper: !this.state.modalOper
        });
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleChangeName(event) {
        this.setState({ name: event.target.value });
    }

    handleChangeNameOper(event) {
        this.setState({ nameOper: event.target.value });
    }

    async onAddTraining() {
        if (training) {
            let response = await fetch('trainings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ name: this.state.name })
            });
        }
    }

    async getOperations(event, id) {
        var response = await fetch('operations/' + id);
        var data = await response.json();
        this.setState({ operations: data });
    }

    async loadData() {
        var response = await fetch('operations/0');
        var data = await response.json();
        this.setState({ operations: data });

        response = await fetch('commands');
        data = await response.json();
        this.setState({ commands: data });

        response = await fetch('types');
        data = await response.json();
        this.setState({ types: data });

        response = await fetch('trainings');
        data = await response.json();
        this.setState({ trainings: data });
    }

    componentDidMount() {
        this.loadData();
    }

    selectAll() {
        var checkboxes = document.getElementsByName('check');
        for (var i = 0, n = checkboxes.length; i < n; i++) {
            checkboxes[i].checked = true;
        }
    }

    unselectAll() {
        var checkboxes = document.getElementsByName('check');
        for (var i = 0, n = checkboxes.length; i < n; i++) {
            checkboxes[i].checked = false;
        }
    }

    async addRow() {
        if (this.state.nameOper != "") {
            let response = await fetch('operations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ name: this.state.nameOper, id_type: 1, id_command: 1 })
            });
        }
    }

    async deleteRow() {
        var checkboxes = document.getElementsByName('check');
        for (let i = 0; i < this.state.operations.length; i++) {
            if (checkboxes[i].checked) {
                await fetch('operations/' + this.state.operations[i].id, {
                    method: 'DELETE'
                });
            }
        }
        this.loadData();
    }

    execute() {

    }

    goTo() {

    }
    
    render() {
        var types = this.state.types;
        var commands = this.state.commands;
        var func = this.getOperations;
        return (
            <div class="grid">

                <div>
                    <Button style={{ margin: 10 }} onClick={this.toggle}>Добавить тренировку</Button>
                    <p></p>
                    <div>
                        {
                            this.state.trainings.map(function (t) {
                                return <Training key={t.id} training={t} func={ func } />
                            })
                        }
                    </div>
                </div>

                <div>
                    <div class="parent">
                        <Button style={{ margin: 10 }} onClick={this.selectAll}>Выделить все</Button>
                        <Button style={{ margin: 10 }} onClick={this.unselectAll}>Снять выделение со всех</Button>
                        <Button style={{ margin: 10 }} onClick={this.toggleOper}>Добавить операцию</Button>
                        <Button style={{ margin: 10 }} onClick={this.deleteRow}>Удалить</Button>
                        <Button style={{ margin: 10 }} onClick={this.execute}>Выполнить все операции последовательно</Button>
                        <Button style={{ margin: 10 }} onClick={this.goTo}>Перейти к оценке тренировки</Button>
                    </div>

                    <p></p>

                    <div>
                        {
                            this.state.operations.map(function (o) {
                                return <Operation key={o.id} operation={o} types={types} commands={commands} />
                            })
                        }
                    </div>
                </div>

                <Modal isOpen={this.state.modalOper}>
                    <form onSubmit={this.addRow}>
                        <ModalHeader><h5>Добавление операции</h5></ModalHeader>

                        <ModalBody>
                            <form>
                                <div className="form-group">
                                    <label className="control-label required">Название</label>
                                    <input type="text"
                                        className="form-control" id="InputName" required="required" placeholder="Введите название"
                                        value={this.state.nameOper}
                                        onChange={this.handleChangeNameOper} />
                                </div>
                            </form>
                        </ModalBody>

                        <ModalFooter>
                            <input type="submit" value="Добавить" className="btn btn-success" />
                            <Button color="danger" onClick={this.toggleOper}>Отмена</Button>
                        </ModalFooter>
                    </form>
                </Modal>

                <Modal isOpen={this.state.modal}>
                    <form onSubmit={this.onAddTraining}>
                        <ModalHeader><h5>Добавление тренировки</h5></ModalHeader>

                        <ModalBody>
                            <form>
                                <div className="form-group">
                                    <label className="control-label required">Название</label>
                                    <input type="text"
                                        className="form-control" id="InputName" required="required" placeholder="Введите название"
                                        value={this.state.name}
                                        onChange={this.handleChangeName} />
                                </div>
                            </form>
                        </ModalBody>

                        <ModalFooter>
                            <input type="submit" value="Добавить" className="btn btn-success" />
                            <Button color="danger" onClick={this.toggle}>Отмена</Button>
                        </ModalFooter>
                    </form>
                </Modal>

            </div>
        );
    }
}