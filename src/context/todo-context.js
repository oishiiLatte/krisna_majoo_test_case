import React from 'react';

const todoContext = React.createContext({
    saveTodo: () => {},
    removeTodo: () => {}
});

export default todoContext;