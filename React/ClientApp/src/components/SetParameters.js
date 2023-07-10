import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class SetParameters extends React.Component { //класс модального окна установки параметров
    constructor(props) {
        super(props);
        this.state = { modal: false, startDate: "", endDate: "", minBorder: "", maxBorder: "" };

        this.toggle = this.toggle.bind(this);
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
        this.handleChangeMinBorder = this.handleChangeMinBorder.bind(this);
        this.handleChangeMaxBorder = this.handleChangeMaxBorder.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    handleChangeStartDate(event) {
        this.setState({ startDate: event.target.value });
    }
    handleChangeEndDate(event) {
        this.setState({ endDate: event.target.value });
    }
    handleChangeMinBorder(event) {
        this.setState({ minBorder: event.target.value });
    }
    handleChangeMaxBorder(event) {
        this.setState({ maxBorder: event.target.value });
    }

    handleSubmit(e) { //обрабатываем клик на кнопку "ok"
        e.preventDefault();

        var start = this.state.startDate.trim();
        var end = this.state.endDate.trim();
        var min = this.state.minBorder.trim();
        var max = this.state.maxBorder.trim();

        //this.props.onSubmit({ startDate: start, endDate: end, minBorder: min, maxBorder: max });
        this.toggle();
    }

    // загрузка данных
    loadData() {
        
    }
    componentDidMount() {
        this.loadData();
    }

    render() {
        return (
            <div>
                <textarea onClick={this.toggle}/>
                <Modal isOpen={this.state.modal}>
                    <form onSubmit={this.handleSubmit}>
                        <ModalHeader><h3>Установка параметров</h3></ModalHeader>

                        <ModalBody>
                            <form>
                                <div className="form-group">
                                    <label className="control-label">Начальная дата</label>
                                    <input type="datetime-local" className="form-control" id="InputStart" value={this.state.startDate} onChange={this.handleChangeStartDate} />
                                </div>

                                <div className="form-group">
                                    <label className="control-label">Конечная дата</label>
                                    <input type="datetime-local" className="form-control" id="InputStart" value={this.state.endDate} onChange={this.handleChangeEndDate} />
                                </div>

                                <div className="form-group">
                                    <label className="control-label">Минимальная граница</label>
                                    <input type="number" step="0.1" className="form-control" id="InputStart" value={this.state.minBorder} onChange={this.handleChangeMinBorder} />
                                </div>

                                <div className="form-group">
                                    <label className="control-label">Максимальная граница</label>
                                    <input type="number" step="0.1" className="form-control" id="InputStart" value={this.state.maxBorder} onChange={this.handleChangeMaxBorder} />
                                </div>
                                
                            </form>
                        </ModalBody>

                        <ModalFooter>
                            <input type="submit" value="OK" color="success" className="btn btn-success" />
                            <Button color="danger" onClick={this.toggle}>Отмена</Button>
                        </ModalFooter>
                    </form>
                </Modal>
            </div>
        );
    }
}
