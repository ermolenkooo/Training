import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class ConfigModule extends React.Component { //класс модального окна настроек
    constructor(props) {
        super(props);
        this.state = { modal: false, pathDB: "", pathDir: "", IP: "", count: 0 };
        this.toggle = this.toggle.bind(this);
        this.handleChangePathDB = this.handleChangePathDB.bind(this);
        this.handleChangePathDir = this.handleChangePathDir.bind(this);
        this.handleChangeIP = this.handleChangeIP.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeCount = this.handleChangeCount.bind(this);
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
    handleChangeCount(event) {
        this.setState({ count: event.target.value });
    }
    handleSubmit(e) { 
        e.preventDefault();
        this.toggle();
    }
    loadData() { 

    }
    componentDidMount() {
        this.loadData();
    }
    render() {
        return (
            <div>
                <Button outline onClick={this.toggle}>Настройка</Button>
                <Modal isOpen={this.state.modal}>
                    <form onSubmit={this.handleSubmit}>
                        <ModalHeader><h5>Модуль настройки</h5></ModalHeader>

                        <ModalBody>
                            <form>
                                <div className="form-group">
                                    <label className="control-label required">Путь к БД Scada</label>
                                    <p></p>
                                    <input type="text" className="form-control" id="InputPathDB" onChange={this.handleChangePathDB} value={this.state.pathDB} placeholder="Введите путь к базе данных" />
                                </div>

                                <div className="form-group">
                                    <label className="control-label required">Путь к папке с отчетами</label>
                                    <p></p>
                                    <input type="text" className="form-control" id="InputPathDir" onChange={this.handleChangePathDir} value={this.state.pathDir} placeholder="Введите путь к папке с отчетами" />
                                </div>

                                <div className="form-group">
                                    <label className="control-label required">IP компьютера с запущенной архивной станцией</label>
                                    <input type="text" className="form-control" id="InputIP" required="required" placeholder="Введите IP" value={this.state.IP} onChange={this.handleChangeIP} />
                                </div>

                                <div className="form-group">
                                    <label className="control-label required">Начальное количество баллов перед началом тренировки</label>
                                    <p></p>
                                    <input type="number" className="form-control" id="InputCount" onChange={this.handleChangeCount} value={this.state.count} placeholder="Введите количество баллов" />
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
