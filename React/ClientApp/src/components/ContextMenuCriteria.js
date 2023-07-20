import React, { Component, useReducer } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class ContextMenus extends Component {
    constructor(props) {
        super(props);
        this.state = { modal: false, showTimeMenu: false, showFuncMenu: false, showConditionMenu: false, showMarkMenu: false, modalTime: false };
        this.functionClick = this.functionClick.bind(this);
        this.conditionClick = this.conditionClick.bind(this);
        this.markClick = this.markClick.bind(this);
        this.menuClick5 = this.menuClick5.bind(this);
        this.timeClick = this.timeClick.bind(this);
        this.onAddFunction = this.onAddFunction.bind(this);
    }
    timeClick(str) {
        this.setState({ showTimeMenu: !this.state.showTimeMenu, showMarkMenu: false, showConditionMenu: false, showFuncMenu: false });
        if (str != "")
            this.props.add(str);
    }
    functionClick(str) {
        this.setState({ showFuncMenu: !this.state.showFuncMenu, showMarkMenu: false, showConditionMenu: false, showTimeMenu: false });
        if (str != "")
            this.props.add(str);
    }
    markClick(str) {
        this.setState({ showMarkMenu: !this.state.showMarkMenu, showFuncMenu: false, showConditionMenu: false, showTimeMenu: false });
        if (str != "")
            this.props.add(str);
    }
    conditionClick(str) {
        this.setState({ showConditionMenu: !this.state.showConditionMenu, showFuncMenu: false, showMarkMenu: false, showTimeMenu: false });
        if (str != "")
            this.props.add(str);
    }
    menuClick5() {

    }
    onAddFunction() {
        this.toggleTime();
        this.props.add("t ⩾ " + this.state.time + this.state.units);
    }

    render() {
        var functionClick = this.functionClick;
        var conditionClick = this.conditionClick;
        var markClick = this.markClick;
        var timeClick = this.timeClick;
        return (
            <div className="horizontalLeft">
                <div>
                    <ul className="right-menus">
                        <li key="0" onClick={(ev) => { this.timeClick(""); }}>
                            Выдержка времени
                        </li>
                        <li key="1" onClick={(ev) => { this.conditionClick(""); }}>
                            Условие
                        </li>
                        <li key="2" onClick={(ev) => { this.functionClick(""); }}>
                            Функция
                        </li>
                        <li key="3" onClick={(ev) => { this.markClick(""); }}>
                            Оценка
                        </li>
                    </ul>
                    <p></p>
                </div>

                {this.state.showFuncMenu && <ContextMenusFunction toggle={functionClick} />}
                {this.state.showMarkMenu && <ContextMenusMark toggle={markClick} />}
                {this.state.showConditionMenu && <ContextMenusCondition style={{ marginLeft: 10, marginTop: 15 }} toggle={conditionClick} />}
                {this.state.showTimeMenu && <ContextMenusTime style={{ marginLeft: 10, marginTop: 15 }} toggle={timeClick} />}

            </div>
        );
    }
}

export class ContextMenusFunction extends Component {
    constructor(props) {
        super(props);
        this.andClick = this.andClick.bind(this);
        this.orClick = this.orClick.bind(this);
    }
    andClick() {
        this.props.toggle("И");
    }
    orClick() {
        this.props.toggle("ИЛИ");
    }
    render() {
        return (
            <div>
                <ul className="right-menus">
                    <li key="1" onClick={this.andClick}>
                        Логическое И
                    </li>
                    <li key="2" onClick={this.orClick}>
                        Логическое ИЛИ
                    </li>
                </ul>
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

export class ContextMenusCondition extends Component {
    constructor(props) {
        super(props);
        this.state = { type_id: 0, types: [], id_instance: 0, instance: "Выберете экземпляр", state_id: 0, states: [], modal: false, instances: [] };
        this.toggle = this.toggle.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
        this.handleChangeState = this.handleChangeState.bind(this);
        this.onChange = this.onChange.bind(this);
        this.ok = this.ok.bind(this);
    }
    toggle() {
        this.setState({ modal: !this.state.modal });
    }
    handleChangeType(event) {
        this.setState({ type_id: event.target.value });
    }
    handleChangeState(event) {
        this.setState({ state_id: event.target.value });
    }
    onChange(event) {
        this.setState({ id_instance: event.target.value, instance: this.state.instances.filter(e => e.id == event.target.value)[0].name });
    }
    ok() {
        this.props.toggle("");
    }
    render() {
        var onChange = this.onChange;
        return (
            <div className="menuCondition">
                <div className="parent">
                    <select className="form-control" id="InputType" required="required" placeholder="Выберете тип"
                        value={this.state.type_id}
                        onChange={this.handleChangeType}>
                        {
                            this.state.types.map(function (t) {
                                return <option value={t.id}>{t.name}</option>
                            })
                        }
                    </select>
                    <div style={{ marginLeft: 10 }}>
                        <label style={{ color: 'white' }}>{this.state.instance}</label>
                        <button onClick={this.toggle} style={{ marginRight: '10px', minWidth: '200px' }}>Выберете экземпляр</button>
                    </div>
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
                <Button className="btn btn-success" onClick={this.ok}>OK</Button>

                {/*модальное окно выбора экземпляра*/}
                <Modal isOpen={this.state.modal}>
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
                            <Button className="btn btn-success" onClick={this.toggle}>Выбрать</Button>
                            <Button color="danger" onClick={this.toggle}>Отмена</Button>
                        </ModalFooter>
                    </form>
                </Modal>
            </div>
        );
    }
}

export class ContextMenusTime extends Component {
    constructor(props) {
        super(props);
        this.state = { units: "м", time: 0 };
        this.toggle = this.toggle.bind(this);
        this.handleChangeUnits = this.handleChangeUnits.bind(this);
        this.handleChangeTime = this.handleChangeTime.bind(this);
        this.ok = this.ok.bind(this);
    }
    handleChangeUnits(event) {
        this.setState({ units: event.target.value });
    }
    handleChangeTime(event) {
        this.setState({ time: event.target.value });
    }
    toggle() {
        this.setState({ modal: !this.state.modal });
    }
    ok() {
        this.props.toggle("");
    }
    render() {
        return (
            <div className="menuCondition">
                <div className="parent">
                    <input typeName="number" value={this.state.time} onChange={this.handleChangeTime} />
                    <select onChange={this.handleChangeUnits} value={this.state.units}>
                        <option value="м">м</option>
                        <option value="сек">сек</option>
                    </select>
                </div>
                <Button className="btn btn-success" onClick={this.ok}>OK</Button>
            </div>
        );
    }
}