import React, { Component, useReducer } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link, useHistory } from "react-router-dom";

export class ContextMenus extends Component {
    constructor(props) {
        super(props);
        this.state = { modal: false, type_id: 0, types: [], instance: "Выберете экземпляр", state_id: 0, states: [], modalInstance: false, instances: [], showFuncMenu: false, showMarkMenu: false, showEventsMenu: false };
        this.functionClick = this.functionClick.bind(this);
        this.markClick = this.markClick.bind(this);
        this.eventsClick = this.eventsClick.bind(this);
        this.menuClick5 = this.menuClick5.bind(this);
        this.onAddCondition = this.onAddCondition.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
        this.toggleInstance = this.toggleInstance.bind(this);
        this.handleChangeState = this.handleChangeState.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onAddCondition() {

    }
    toggle() {
        this.setState({ modal: !this.state.modal, showFuncMenu: false, showEventsMenu: false, showMarkMenu: false });
    }
    handleChangeType() {

    }
    toggleInstance() {
        this.setState({ modalInstance: !this.state.modalInstance });
    }
    handleChangeState() {

    }
    onChange() {

    }
    functionClick() {
        this.setState({ showFuncMenu: !this.state.showFuncMenu, showEventsMenu: false, showMarkMenu: false });
    }
    eventsClick() {
        this.setState({ showEventsMenu: !this.state.showEventsMenu, showFuncMenu: false, showMarkMenu: false });
    }
    markClick() {
        this.setState({ showMarkMenu: !this.state.showMarkMenu, showFuncMenu: false, showEventsMenu: false });
    }
    menuClick5() {
        alert("estoy aqui5");
    }

    render() {
        var functionClick = this.functionClick;
        var markClick = this.markClick;
        var eventsClick = this.eventsClick;
        return (
            <div>
                <ul className="right-menus">
                    <li key="1" onClick={this.toggle}>
                        Условие
                    </li>
                    <li key="2" onClick={this.functionClick}>
                        Функция
                    </li>
                    <li key="3" onClick={this.eventsClick}>
                        Событие
                    </li>
                    <li key="4" onClick={this.markClick}>
                        Оценка
                    </li>
                    <li key="5" onClick={this.menuClick5}>
                        Обозначить событие
                    </li>
                </ul>

                {this.state.showFuncMenu && <ContextMenusFunction toggle={functionClick} />}
                {this.state.showMarkMenu && <ContextMenusMark toggle={markClick} />}
                {this.state.showEventsMenu && <ContextMenusEvents toggle={eventsClick} />}

                {/*модальное окно выбора экземпляра*/}
                <Modal isOpen={this.state.modalInstance}>
                    <form>
                        <ModalHeader><h5>Выбор экземпляра</h5></ModalHeader>

                        <ModalBody>
                            <div>
                                {
                                    this.state.instances.map(function (i) {
                                        return <div>
                                            <label>
                                                <input type="radio" name="myRadio" onChange={onChange} value={i.id} />
                                                {i.name}
                                            </label>
                                        </div>
                                    })
                                }
                            </div>
                        </ModalBody>

                        <ModalFooter>
                            <Button className="btn btn-success" onClick={this.toggleInstance}>Выбрать</Button>
                            <Button color="danger" onClick={this.toggleInstance}>Отмена</Button>
                        </ModalFooter>
                    </form>
                </Modal>

                {/*модальное окно выбора состояния объекта*/}
                <Modal isOpen={this.state.modal}>
                    <form>
                        <ModalHeader><h5>Окно выбора состояния объекта</h5></ModalHeader>

                        <ModalBody>
                            <form>
                                <div className="form-group">
                                    <label className="control-label required">Тип</label>
                                    <select className="form-control" id="InputType" required="required" placeholder="Выберете тип"
                                        value={this.state.type_id}
                                        onChange={this.handleChangeType}>
                                        {
                                            this.state.types.map(function (t) {
                                                return <option value={t.id}>{t.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Экземпляр</label>
                                    <p></p>
                                    <label>{this.state.instance}</label>
                                    <p></p>
                                    <button onClick={this.toggleInstance} style={{ marginRight: '10px', minWidth: '250px' }}>Выберете экземпляр</button>
                                </div>
                                <div className="form-group">
                                    <label className="control-label required">Состояние</label>
                                    <select className="form-control" id="InputState" required="required" placeholder="Выберете состояние"
                                        value={this.state.state_id}
                                        onChange={this.handleChangeState}>
                                        {
                                            this.state.states.map(function (s) {
                                                return <option value={s.id}>{s.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </form>
                        </ModalBody>

                        <ModalFooter>
                            <Button className="btn btn-success" onClick={this.onAddCondition}>OK</Button>
                            <Button color="danger" onClick={this.toggle}>Отмена</Button>
                        </ModalFooter>
                    </form>
                </Modal>

            </div>
        );
    }
}

export class ContextMenusFunction extends Component {
    constructor(props) {
        super(props);
        this.state = { modal: false, units: "", time: 0 };
        this.andClick = this.andClick.bind(this);
        this.orClick = this.orClick.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleChangeUnits = this.handleChangeUnits.bind(this);
        this.handleChangeTime = this.handleChangeTime.bind(this);
        this.onAddFunction = this.onAddFunction.bind(this);
    }
    toggle() {
        this.setState({ modal: !this.state.modal });
    }
    andClick() {
        this.props.toggle();
    }
    orClick() {
        this.props.toggle();
    }
    handleChangeUnits() {

    }
    handleChangeTime() {

    }
    onAddFunction() {
        this.props.toggle();
    }
    render() {
        return (
            <div>
                <ul className="right-menus">
                    <li key="1" onClick={this.toggle}>
                        Выдержка времени
                    </li>
                    <li key="2" onClick={this.andClick}>
                        Логическое И
                    </li>
                    <li key="3" onClick={this.orClick}>
                        Логическое ИЛИ
                    </li>
                </ul>

                {/*модальное окно установки времени*/}
                <Modal isOpen={this.state.modal}>
                    <form>
                        <ModalHeader><h5>Окно установки времени</h5></ModalHeader>

                        <ModalBody>
                            <form>
                                <div className="parent">
                                    <input typeName="number" value={this.state.time} onChange={this.handleChangeTime} />
                                    <select onChange={this.handleChangeUnits} value={this.state.units}>
                                        <option value="м">м</option>
                                        <option value="сек">сек</option>
                                    </select>
                                </div>
                            </form>
                        </ModalBody>

                        <ModalFooter>
                            <Button className="btn btn-success" onClick={this.onAddFunction}>OK</Button>
                            <Button color="danger" onClick={this.toggle}>Отмена</Button>
                        </ModalFooter>
                    </form>
                </Modal>

            </div>
        );
    }
}

export class ContextMenusEvents extends Component {
    constructor(props) {
        super(props);
        this.state = { events: [] };
    }

    allEvents = [
        { "id": "1", "name": "event1" },
        { "id": "2", "name": "event2" },
        { "id": "3", "name": "event3" },
        { "id": "4", "name": "event4" },
        { "id": "5", "name": "event5" }];

    render() {
        var toggle = this.props.toggle;
        return (
            <div>
                <ul className="right-menus">
                    {
                        this.allEvents.map(function (e) {
                            return <li key={e.id} onClick={toggle}>{e.name}</li>
                        })
                    }
                </ul>
            </div>
        );
    }
}

export class ContextMenusMark extends Component {
    constructor(props) {
        super(props);
        this.state = { modal: false, mark: "" };
        this.toggle = this.toggle.bind(this);
        this.handleChangeMark = this.handleChangeMark.bind(this);
        this.onAddMark = this.onAddMark.bind(this);
    }
    toggle() {
        this.setState({ modal: !this.state.modal });
    }
    handleChangeMark() {

    }
    onAddMark() {
        this.props.toggle();
    }
    render() {
        return (
            <div>
                <ul className="right-menus">
                    <li key="1" onClick={this.toggle}>
                        Снять
                    </li>
                </ul>

                {/*модальное окно выбора баллов для снятия*/}
                <Modal isOpen={this.state.modal}>
                    <form>
                        <ModalHeader><h5>Окно выбора баллов для снятия</h5></ModalHeader>

                        <ModalBody>
                            <form>
                                <input typeName="number" value={this.state.mark} onChange={this.handleChangeMark} />
                            </form>
                        </ModalBody>

                        <ModalFooter>
                            <Button className="btn btn-success" onClick={this.onAddMark}>OK</Button>
                            <Button color="danger" onClick={this.toggle}>Отмена</Button>
                        </ModalFooter>
                    </form>
                </Modal>

            </div>
        );
    }
}

export class Operation extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            opertype: props.operation.id_type, command: props.operation.id_command, name: props.operation.name, showRightMenu: false, positiony: 0, positionx: 0 };
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
    onClick(event) { 
        event.preventDefault();
        if (!this.state.showRightMenu)
            this.setState({ positionx: event.pageX, positiony: event.pageY, showRightMenu: true });
        else 
            this.setState({ showRightMenu: false });
    }
    render() {
        var posy = this.state.postiony;
        var posx = this.state.postionx;
        var oper = this.props.operation;
        return (
        <div>
            <input type="checkbox" className="form-check-input" name="check" />
            <p>{this.state.name}</p>
                <img src="images/arrow.png" width="50px" onClick={this.onClick} />
            
            {this.state.showRightMenu && <ContextMenus postiony={posy} postionx={posx} operation={oper} />}
        </div>
        );
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
        this.state = { modalOper: false, nameOper: "", operations: [], commands: [], types: [], modal: false, name: "", trainings: [], id_training: 0 };
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
        this.setState({ id_training: id });
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
                        <Evaluation id_training={this.state.id_training} />
                        {/*<Button style={{ margin: 10 }}><Link to={{ pathname: "/evaluation", id_training: this.state.id_training }}>Перейти к оценке тренировки</Link></Button>*/}
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

const Evaluation = (id_training) => {
    let history = useHistory();

    const goToEvaluation = () => {
        history.push("/evaluation/" + id_training.id_training);
    };
    return (
        <Button style={{ margin: 10 }} onClick={goToEvaluation}>Перейти к оценке тренировки</Button>
    );
};

