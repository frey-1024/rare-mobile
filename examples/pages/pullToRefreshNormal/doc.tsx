import React from 'react';
import MarkdownRun from '@/components/MarkdownRun';
import introduce from './introduce.md';

export default class PullToRefreshNormalDoc extends React.Component {
  render() {
    return <MarkdownRun mark={introduce}/>;
  }
}
