import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class Criteria extends Component {

    constructor(props) {
        super(props);
        this.state = { id_instance: props.criteria.id_instance, instance: "", modal: false, type: props.criteria.id_type, func: props.criteria.id_function, name: props.criteria.name, price: props.criteria.price, instances: [] };
        this.handleChangeType = this.handleChangeType.bind(this);
        this.handleChangeFunction = this.handleChangeFunction.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
        this.onClick = this.onClick.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.update = this.update.bind(this);
        this.loadData = this.loadData.bind(this);
        this.changeInstance = this.changeInstance.bind(this);
    }
    async loadData() {
        var response = await fetch('instances/instancesOfCriteria/' + this.state.type);
        var data = await response.json();
        this.setState({ instances: data });
        this.setState({ instance: this.state.instances.filter(e => e.id == this.state.id_instance)[0].name });
    }
    componentDidMount() {
        this.loadData();
    }
    async toggle() {
        var response = await fetch('instances/instancesOfCriteria/' + this.state.type);
        var data = await response.json();
        this.setState({ instances: data });
        this.setState({ modal: !this.state.modal });
    }
    handleChange(event) {
        this.setState({ id_instance: event.target.value, instance: this.state.instances.filter(e => e.id == event.target.value)[0].name });
    }
    changeInstance() {
        this.update();
        this.toggle();
    }
    handleChangeType(event) {
        this.setState({ type: event.target.value, id_instance: 0, instance: "" }, () => { this.update(); });
    }
    handleChangeFunction(event) {
        this.setState({ func: event.target.value }, () => { this.update(); });
    }
    handleChangePrice(event) {
        this.setState({ price: event.target.value }, () => { this.update(); });
    }
    onClick() {
        this.setState({
            modal: !this.state.modal
        });
    }
    async update() {
        if (this.state.name != "") {
            let response = await fetch('criterias/' + this.props.criteria.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ price: this.state.price, id_type: this.state.type, id_function: this.state.func, id_instance: this.state.id_instance })
            });
        }
    }
    render() {
        var onChange = this.handleChange;
        return <div>
            <input type="checkbox" className="form-check-input" name="check" />
            <p>{this.state.name}</p>
            <table className="table table-striped table-hover" id="criteriaTable">
                <tr>
                    <td>
                        <select placeholder="Выберите тип" value={this.state.type} onChange={this.handleChangeType} style={{ minWidth: '250px' }}>
                            {
                                this.props.types.map(function (t) {
                                    return <option value={t.id}>{t.name}</option>
                                })
                            }
                        </select>
                    </td>
                    <td>
                        <label>{this.state.instance}</label>
                        <button onClick={this.toggle} style={{ marginRight: '10px', minWidth: '250px' }}>Экземпляр</button>
                    </td>
                    <td>
                        <select placeholder="Выберите функцию" value={this.state.func} onChange={this.handleChangeFunction} style={{ minWidth: '250px' }}>
                            {
                                this.props.functions.map(function (c) {
                                    return <option value={c.id}>{c.name}</option>
                                })
                            }
                        </select>
                    </td>
                    <td>
                        <input type="number" value={this.state.price} onChange={this.handleChangePrice} style={{ minWidth: '250px' }} />
                    </td>
                </tr>
            </table>

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
                        <Button className="btn btn-success" onClick={this.changeInstance}>ОК</Button>
                        <Button color="danger" onClick={this.toggle}>Отмена</Button>
                    </ModalFooter>
                </form>
            </Modal>

        </div>;
    }
}

export class EvaluationOfActions extends React.Component {

    constructor(props) {
        super(props);
        this.state = { criterias: [], functions: [], types: [], modal: false, name: "", id_training: this.props.match.params.id };
        this.toggle = this.toggle.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.addRow = this.addRow.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.selectAll = this.selectAll.bind(this);
        this.unselectAll = this.unselectAll.bind(this);
        this.loadData = this.loadData.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleChangeName(event) {
        this.setState({ name: event.target.value });
    }

    async loadData() {
        var response = await fetch('criterias/' + this.state.id_training);
        var data = await response.json();
        this.setState({ criterias: data });

        response = await fetch('functions');
        data = await response.json();
        this.setState({ functions: data });

        response = await fetch('types/typesOfCriteria');
        data = await response.json();
        this.setState({ types: data });
    }

    componentDidMount() {
        this.loadData();
    }

    async addRow() {
        if (this.state.name != "") {
            let response = await fetch('criterias', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ name: this.state.name, id_training: this.state.id_training })
            });
        }
        this.loadData();
        this.toggle();
    }

    async deleteRow() {
        var checkboxes = document.getElementsByName('check');
        for (let i = 0; i < this.state.criterias.length; i++) {
            if (checkboxes[i].checked) {
                await fetch('criterias/' + this.state.criterias[i].id, {
                    method: 'DELETE'
                });
            }
        }
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

    render() {
        var types = this.state.types;
        var functions = this.state.functions;
        var criterias = this.state.criterias;
        return (
            <div class="grid">

                <div>
                    <div class="parent">
                        <Button style={{ margin: 10 }} onClick={this.selectAll}>Выделить все</Button>
                        <Button style={{ margin: 10 }} onClick={this.unselectAll}>Снять выделение со всех</Button>
                        <Button style={{ margin: 10 }} onClick={this.toggle}>Добавить критерий</Button>
                        <Button style={{ margin: 10 }} onClick={this.deleteRow}>Удалить</Button>
                    </div>

                    <p></p>

                    <div>
                        {
                            criterias.map(function (c) {
                                return <Criteria key={c.id} criteria={c} types={types} functions={functions} />
                            })
                        }
                    </div>
                </div>

                <Modal isOpen={this.state.modal}>
                    <form>
                        <ModalHeader><h5>Добавление критерия</h5></ModalHeader>

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
                            <Button className="btn btn-success" onClick={this.addRow}>Добавить</Button>
                            <Button color="danger" onClick={this.toggle}>Отмена</Button>
                        </ModalFooter>
                    </form>
                </Modal>

            </div>
        );
    }
}