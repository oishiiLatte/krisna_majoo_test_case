import React, { Component } from 'react';
import ToDoItem from './ToDoItem';

class TodoList extends Component {

    renderTodos = () => {
        let todos = null;
        if (this.props.todoItem.length) {
            todos = this.props.todoItem.map(todo => {
                return <ToDoItem key={todo.id} todo={todo} clicked={this.props.todoClicked} />
            })
        }

        return todos;
    }

    render() {
        return (
            <div className="row mb-5">
                <div className="col-md-12">
                    <h2>{this.props.title}</h2>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>To Do</th>
                                <th>Status</th>
                                <th>Tanggal Dibuat</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTodos()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default TodoList;