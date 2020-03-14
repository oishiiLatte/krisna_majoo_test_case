import React from 'react';

const TodoDetailLine = (props) => (
    <div className="row">
        <div className="col-md-4">
            {props.item.label}
        </div>
        <div className="col-md-8">
            {props.item.value}
        </div>
    </div>
);

export default TodoDetailLine;