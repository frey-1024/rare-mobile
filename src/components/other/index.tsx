import React from 'react';

interface ButtonProps {
  className?: string;
}

class Other extends React.Component<ButtonProps, any> {
  render() {
    return (<button>btn</button>);
  }
}

export default Other;
