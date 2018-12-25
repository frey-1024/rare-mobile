import React from 'react';
import {MarkdownPropsType} from './PropsType';

export interface MarkdownProps extends MarkdownPropsType{
  className?: string;
}

class Markdown extends React.Component<MarkdownProps, any> {
  render() {
    const {code} = this.props;
    return (<div>{code}</div>);
  }
}

export default Markdown;
