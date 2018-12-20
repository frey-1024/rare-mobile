import React from 'react';

interface ButtonProps {
    className?: string;
}
class Button extends React.Component<ButtonProps, any> {
    render() {
        return (<button>btn</button>);
    }
}

export default Button;