﻿import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class ConfigModule extends React.Component { //класс модального окна настроек
    constructor(props) {
        super(props);
        this.state = { modal: true, pathDB: "", pathDir: "", IP: "" };
        this.fileInput = React.createRef();
        this.toggle = this.toggle.bind(this);
        this.handleChangePathDB = this.handleChangePathDB.bind(this);
        this.handleChangePathDir = this.handleChangePathDir.bind(this);
        this.handleChangeIP = this.handleChangeIP.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    handleChangePathDB(event) {
        this.setState({ pathDB: event.target.value });
    }
    handleChangePathDir(event) {
        this.setState({ pathDir: event.target.value });
    }
    handleChangeIP(event) {
        this.setState({ IP: event.target.value });
    }
    handleSubmit(e) { //обрабатываем клик на кнопку "сохранить"
        e.preventDefault();

        this.toggle();
    }
    loadData() { //загрузка данных

    }
    componentDidMount() {
        this.loadData();
    }
    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal}>
                    <form onSubmit={this.handleSubmit}>
                        <ModalHeader><h5>Модуль настройки</h5></ModalHeader>

                        <ModalBody>
                            <form>

                                <div className="form-group">
                                    <label className="control-label required">Путь к БД Scada</label>
                                    <p></p>
                                    <input type="file" ref={this.fileInput} id="InputPathDB" onChange={this.handleChangePathDB} />
                                </div>

                                <div className="form-group">
                                    <label className="control-label required">Путь к папке с отчетами</label>
                                    <p></p>
                                    <input type="file" directory="" webkitdirectory="" ref={this.fileInput} id="InputPathDir" onChange={this.handleChangePathDir} />
                                </div>

                                <div className="form-group">
                                    <label className="control-label required">IP компьютера с запущенной архивной станцией</label>
                                    <input type="text"
                                        className="form-control" id="InputIP" required="required" placeholder="Введите IP"
                                        value={this.state.IP}
                                        onChange={this.handleChangeIP} />
                                </div>

                            </form>
                        </ModalBody>

                        <ModalFooter>
                            <input type="submit" value="Сохранить" className="btn btn-success" />
                            <Button onClick={this.toggle}>Отмена</Button>
                        </ModalFooter>
                    </form>
                </Modal>
            </div>
        );
    }
}