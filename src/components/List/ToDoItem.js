import React from 'react';

const ToDoItem = (props) => {
        let todo = props.todo
        let status = todo.status === 0 ? 'Belum Selesai' : 'Selesai';
        return (
            <tr onClick={() => props.clicked(todo.id)}>
                <th>{todo.title}</th>
                <th>{status}</th>
                <th>{todo.createdAt}</th>
            </tr>
        );
}

export default ToDoItem;