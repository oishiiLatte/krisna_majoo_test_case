import React, { Component } from 'react';
import { TodoModel } from '../../../models/Todo';
import TodoContext from '../../../context/todo-context'

class TodoForm extends Component {

    state = {
        todo: new TodoModel(),
        is_not_editable: this.props.context === 'view' ? true : false,
        context: 'view'
    }

    static contextType = TodoContext;

    componentDidMount() {
        this.setState({ todo: this.props.item })
    }

    componentDidUpdate() {
        if (this.state.todo.id !== this.props.item.id) {
            this.setState({
                todo: this.props.item,
            })
        }
        if (this.state.context !== this.props.context) {
            this.setState({
                is_not_editable: this.props.context === 'view' ? true : false,
                context: this.props.context
            })
        }
    }


    inputOnChange = (data) => {
        let current_value = { ...this.state.todo };
        current_value[Object.keys(data)[0]] = Object.values(data)[0]
        this.setState({ todo: current_value })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.context.saveTodo(this.state.todo)
    }

    handleCancel = (event) => {
        if (this.props.context !== 'add') {
            this.props.onCancelEdit('view')
        } else {
            this.props.onCancelEdit('add')
        }
    }

    render() {
        let submit_btn = null;
        if (!this.state.is_not_editable) {
            submit_btn = <div className="row mt-5">
                <div className="col-md-6">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                <div className="col-md-6">
                    <button type="button" className="btn btn-primary" onClick={this.handleCancel}>Cancel</button>
                </div>
            </div>
        }

        return (
            <form onSubmit={event => this.handleSubmit(event)}>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Title</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" value={this.state.todo.title} onChange={(event) => this.inputOnChange({ title: event.target.value })} readOnly={this.state.is_not_editable} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Description</label>
                    <div className="col-sm-10">
                        <textarea className="form-control" rows="3" value={this.state.todo.description} onChange={(event) => this.inputOnChange({ description: event.target.value })} readOnly={this.state.is_not_editable}></textarea>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Title</label>
                    <div className="col-sm-10">
                        <select className="form-control" value={this.state.todo.status} onChange={(event) => this.inputOnChange({ status: parseInt(event.target.value) })} readOnly={this.state.is_not_editable}>
                            <option value={1}>Selesai</option>
                            <option value={0}>Belum Selesai</option>
                        </select>
                    </div>
                </div>
                {submit_btn}
            </form>
        );
    }
}

export default TodoForm;