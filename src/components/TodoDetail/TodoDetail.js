import React, { Component } from 'react';
import TodoForm from '../Form/TodoForm/TodoForm';
import TodoContext from '../../context/todo-context';

class TodoDetail extends Component {

    state = {
        context: this.props.context
    }

    static contextType = TodoContext;

    renderForm = () => {
        let el = <div className="row">
            <div className="col-md-12">ERROR</div>
        </div>;

        if (this.props.todo) {
            el = <TodoForm item={this.props.todo} context={this.state.context} onCancelEdit={this.cancelEditHandler} />
        }

        return el
    }

    editHandler = () => {
        this.setState({ context: 'edit' })
    }

    cancelEditHandler = (context) => {
        this.setState({context: context})
        if(context === 'add') {
            this.props.closeDetail();
        }
    }

    renderFooter = () => {
        let delete_button = null;

        if (this.props.todo.status === 0) {
            delete_button = <div className="col-md-6">
                <button type="button" className="btn btn-danger" onClick={(event => this.context.removeTodo(this.props.todo.id))}>Hapus</button>
            </div>
        }
        let footer = <div className="row mt-5">
            <div className="col-md-6">
                <button type="button" className="btn btn-info" onClick={(event) => this.editHandler()}>Edit</button>
            </div>
            {delete_button}
        </div>

        if (this.state.context !== 'view') {
            footer = null;
        }

        return footer
    }

    render() {
        return (
            <div className="container">
                {this.renderForm()}
                {this.renderFooter()}
            </div>
        );
    }
};

export default TodoDetail;