import React, { Component, useReducer } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class ContextMenus extends Component {
    constructor(props) {
        super(props);
        this.state = { modal: false, type_id: 0, types: [], id_instance: 0, instance: "Выберете экземпляр", state_id: 0, states: [], modalInstance: false, instances: [], showFuncMenu: false, showMarkMenu: false, showEventsMenu: false };
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
    onAddCondition(str) {
        this.props.add(str);
    }
    toggle() {
        this.setState({ modal: !this.state.modal, showFuncMenu: false, showEventsMenu: false, showMarkMenu: false });
    }
    handleChangeType(event) {
        this.setState({ type_id: event.target.value });
    }
    toggleInstance() {
        this.setState({ modalInstance: !this.state.modalInstance });
    }
    handleChangeState(event) {
        this.setState({ state_id: event.target.value });
    }
    onChange(event) {
        this.setState({ id_instance: event.target.value, instance: this.state.instances.filter(e => e.id == event.target.value)[0].name });
    }
    functionClick(str) {
        this.setState({ showFuncMenu: !this.state.showFuncMenu, showEventsMenu: false, showMarkMenu: false });
        if (str != "")
            this.props.add(str);
    }
    eventsClick(str) {
        this.setState({ showEventsMenu: !this.state.showEventsMenu, showFuncMenu: false, showMarkMenu: false });
        if (str != "")
            this.props.add(str);
    }
    markClick(str) {
        this.setState({ showMarkMenu: !this.state.showMarkMenu, showFuncMenu: false, showEventsMenu: false });
        if (str != "")
            this.props.add(str);
    }
    menuClick5() {
        
    }

    render() {
        var functionClick = this.functionClick;
        var markClick = this.markClick;
        var eventsClick = this.eventsClick;
        var onChange = this.onChange;
        return (
            <div className="horizontalLeft">
                <div>
                    <ul className="right-menus">
                        <li key="1" onClick={this.toggle}>
                            Условие
                        </li>
                        <li key="2" onClick={(ev) => { this.functionClick(""); }}>
                            Функция
                        </li>
                        <li key="3" onClick={(ev) => { this.eventsClick(""); }}>
                            Событие
                        </li>
                        <li key="4" onClick={(ev) => { this.markClick(""); }}>
                            Оценка
                        </li>
                        <li key="5" onClick={this.menuClick5}>
                            Обозначить событие
                        </li>
                    </ul>
                    <p></p>
                </div>

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
        this.state = { modal: false, units: "м", time: 0 };
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
        this.props.toggle("И");
    }
    orClick() {
        this.props.toggle("ИЛИ");
    }
    handleChangeUnits(event) {
        this.setState({ units: event.target.value });
    }
    handleChangeTime(event) {
        this.setState({ time: event.target.value });
    }
    onAddFunction() {
        this.props.toggle("t ⩾ " + this.state.time + this.state.units);
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
                            return <li key={e.id} onClick={(ev) => { toggle(e.name); }}>{e.name}</li>
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
    handleChangeMark(event) {
        this.setState({ mark: event.target.value });
    }
    onAddMark() {
        this.props.toggle("Снять " + this.state.mark + " баллов");
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
