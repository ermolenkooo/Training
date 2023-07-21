import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ContextMenus } from "./ContextMenuCriteria"

export class Criteria extends Component {

    constructor(props) {
        super(props);
        this.state = { name: props.criteria.name, showRightMenu: false, conditions: [] }
        this.onClick = this.onClick.bind(this);
        this.addCondition = this.addCondition.bind(this); 
    }
    onClick(event) {
        event.preventDefault();
        this.setState({ showRightMenu: !this.state.showRightMenu });
    }
    addCondition(str) {
        var objs = this.state.conditions;
        objs.push(str);
        this.setState({ conditions: objs });
    }
    render() {
        var add = this.addCondition;
        return <div>
            <input type="checkbox" className="form-check-input" name="check" />
            <p>{this.state.name}</p>
            <div className="horizontalLeft">
                <div className="horizontalLeft">
                    {
                        this.state.conditions.map(function (c) {
                            return (
                                <div className="condition">
                                    <p className="text">{c}</p>
                                </div>
                            );
                        })
                    }
                </div>
                <img src="images/arrow.png" width="50px" height="40px" style={{ marginTop: 25 }} onClick={this.onClick} />
                {this.state.showRightMenu && <ContextMenus criteria={this.props.criteria} add={add} />}
            </div>
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