import React, { Component } from 'react';
import TodoListContainer from '../components/List/TodoListContainer';

class Layout extends Component {
    render() {
        return (
            <div className="container">
                <h1 className="mt-4">To Do App</h1>
                <TodoListContainer />
            </div>
        );
    }
}

export default Layout;