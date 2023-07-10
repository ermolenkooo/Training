import React, { Component } from 'react';
import { SetParameters } from './SetParameters';
import { Button } from 'reactstrap'

export class Table extends Component {

    constructor(props) {
        super(props);
        this.state = { functions: [], objects: [] };
        this.selectAll = this.selectAll.bind(this);
        this.unselectAll = this.unselectAll.bind(this);
        this.addRow = this.addRow.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.count = this.count.bind(this);
        this.onIdUpdate = this.onIdUpdate.bind(this);
        this.onMarkUpdate = this.onMarkUpdate.bind(this);
        this.onFunctionUpdate = this.onFunctionUpdate.bind(this);
    }

    onIdUpdate(index, event) {
        var objs = this.state.objects;
        objs[index].id_Object = event.target.value;
        this.setState({ objects: objs });
    }
    onMarkUpdate(index, event) {
        var objs = this.state.objects;
        objs[index].mark = event.target.value;
        this.setState({ objects: objs });
    }
    onFunctionUpdate(index, event) {
        alert(event.target.value);
        var objs = this.state.objects;
        objs[index].id_Function = event.target.value;
        this.setState({ objects: objs });
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <div>
                <div>
                    <Button style={{ marginRight: 20 }} onClick={this.selectAll}>Выделить все</Button>
                    <Button style={{ marginRight: 20 }} onClick={this.unselectAll}>Снять выделение со всех</Button>
                    <Button style={{ marginRight: 20 }} onClick={this.addRow}>Добавить строку</Button>
                    <Button style={{ marginRight: 20 }} onClick={this.deleteRow}>Удалить строку</Button>
                    <Button onClick={this.count}>Рассчитать</Button>
                </div>
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th></th>
                            <th>ID</th>
                            <th>Марка</th>
                            <th>Функция</th>
                            <th>Выбранные параметры функции</th>
                            <th>Результат</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.objects.map((o, index) =>
                            <tr key={o.id}>
                                <td>
                                    <input type="checkbox" className="form-check-input" name="check" />
                                </td>
                                <td>
                                    <input type="text" value={o.id_Object} onChange={(event) => this.onIdUpdate(index, event)} />
                                </td>
                                <td>
                                    <input type="text" value={o.mark} onChange={(event) => this.onMarkUpdate(index, event)} />
                                </td>
                                <td>
                                    <select placeholder="Выберите функцию" value={o.id_Function} onChange={(event) => this.onFunctionUpdate(index, event)}>
                                        {
                                            this.state.functions.map(function (f) {
                                                return <option value={f.id}>{f.name}</option>
                                            })
                                        }
                                    </select>
                                </td>
                                <td>
                                    <SetParameters />
                                </td>
                                <td>
                                    {o.result}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
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
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'POST Request' })
        };
        var response = await fetch('objects', requestOptions);
        var data = await response.json();
        var objs = this.state.objects;
        objs.push(data);
        this.setState({ objects: objs });
    }

    deleteRow() {

    }

    count() {

    }

    async getData() {
        var response = await fetch('functions');
        var data = await response.json();
        this.setState({ functions: data });

        response = await fetch('objects');
        data = await response.json();
        this.setState({ objects: data });

        console.log(data);
    }
}