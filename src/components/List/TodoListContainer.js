import React, { Component, Fragment } from 'react';
import TodoList from './TodoList';

import axios from 'axios';
import Modal from '../UI/Modal/Modal';
import TodoDetail from '../TodoDetail/TodoDetail';
import TodoContext from '../../context/todo-context';
import AddNewTodo from './AddNewTodo';
import { TodoModel } from '../../models/Todo';

class TodoListContainer extends Component {

    state = {
        todos: [],
        finished_todos: [],
        unfinished_todos: [],
        isTodoItemClicked: false,
        selected_todo: null,
        show_modal: false,
        context: 'view'
    }

    componentDidMount() {
        this.getTodo();
    }

    getTodo = () => {
        let self = this;
        axios.get('https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list')
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        todos: response.data,
                    });
                    self.filterTodo();
                }
            })
            .catch(err => {
                console.log('ERROR')
            })
    }

    filterTodo = () => {
        let todos = [...this.state.todos];
        let finished_todos = [];
        let unfinished_todos = [];

        if (todos.length) {
            todos.forEach(todo => {
                todo.status === 0 ? unfinished_todos.push(todo) : finished_todos.push(todo);
            });

            this.setState({
                finished_todos: this.sortData(finished_todos, 'desc'),
                unfinished_todos: this.sortData(unfinished_todos, 'asc')
            })
        }
    }

    sortData = (obj, type) => {

        return obj.sort((a, b) => {
            let a_date = new Date(a.createdAt);
            let b_date = new Date(b.createdAt);
            if (type === 'asc') {
                if (a_date < b_date) {
                    return -1;
                }
                if (a_date > b_date) {
                    return 1;
                }
            } else {
                if (a_date > b_date) {
                    return -1;
                }
                if (a_date < b_date) {
                    return 1;
                }
            }
    
            return 0
        })
    }

    onTodoItemClicked = (id) => {
        let selected_todo = this.state.todos.find(obj => {
            return obj.id === id;
        })
        this.setState({ 
            show_modal: true,
            selected_todo: selected_todo,
            context: 'view'
        });
    }

    closeModal = () => {
        this.setState({ show_modal: false })
    }

    addTodoHandler = () => {
        this.setState({
            show_modal: true,
            selected_todo: new TodoModel(),
            context: 'add'
        })
    }

    onSaveTodo = (todo) => {
        let updated_todo = [...this.state.todos];

        if (todo.id !== 0) {
            let selected_index = updated_todo.findIndex(obj => {
                return obj.id === todo.id;
            })
            updated_todo[selected_index] = todo;
        } else {
            let modified_todo = {...todo};
            let next_id = updated_todo[updated_todo.length-1].id+1
            modified_todo.id = next_id;
            updated_todo.push(modified_todo);
        }

        this.setState({ todos: updated_todo }, () => {
            this.filterTodo();
            this.setState({ show_modal: false });
        })

    }

    onRemoveTodo = (todo_id) => {
        if (todo_id !== 0) {
            let updated_todo = [...this.state.todos];
            let selected_index = updated_todo.findIndex(obj => {
                return obj.id === todo_id;
            })

            updated_todo.splice(selected_index, 1)
            this.setState({
                todos: updated_todo
            }, () => {
                this.filterTodo();
                this.setState({ show_modal: false });
            })
        }
    }

    render() {
        return (
            <Fragment>
                <TodoContext.Provider
                    value={{
                        saveTodo: this.onSaveTodo,
                        removeTodo: this.onRemoveTodo
                    }}>
                    <AddNewTodo addClicked={this.addTodoHandler} />
                    <TodoList todoItem={this.state.finished_todos} todoClicked={this.onTodoItemClicked} title='To Do Belum Selesai' />
                    <TodoList todoItem={this.state.unfinished_todos} todoClicked={this.onTodoItemClicked} title='To Do Telah Selesai' />
                    <Modal show={this.state.show_modal} modalClosed={this.closeModal}>
                        <TodoDetail todo={this.state.selected_todo} context={this.state.context} closeDetail={() => this.setState({show_modal: false})} />
                    </Modal>
                </TodoContext.Provider>
            </Fragment>
        );
    }
}

export default TodoListContainer;