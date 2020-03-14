import React from 'react';

const AddNewTodo = (props) => (
    <div className="container">
        <div className="row my-5">
            <div className="col-md-12">
                <button className="btn btn-primary" onClick={event => props.addClicked()}>Tambah Todo</button>
            </div>
        </div>
    </div>
);

export default AddNewTodo;