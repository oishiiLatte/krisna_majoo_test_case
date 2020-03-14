import React, { Fragment } from 'react';

import classes from './Modal.module.scss'
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {
    let modal_children = null

    if (props.show) {
        modal_children = props.children
    }

    return (
        <Fragment>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div className={classes.Modal} style={{ transform: props.show ? 'translateY(0)' : 'translateY(-100vh)', opacity: props.show ? '1' : '0' }}>
                {modal_children}
            </div>
        </Fragment>
    );
};

export default Modal;