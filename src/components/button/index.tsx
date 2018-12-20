import React from 'react';

interface ButtonProps {
  className?: string;
}

class Button extends React.Component<ButtonProps, any> {
  render() {
    return (<button>
      <span>111</span>
    </button>);
  }
}

export default Button;
