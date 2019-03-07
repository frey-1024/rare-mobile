import React from 'react';
import { withRouter } from 'react-router-dom';
import marked from 'marked';
import hljs from 'highlight.js';
import uuidv4 from 'uuid/v4';
import {isBlank} from '../utils/assert';
import QRCodeAndRun from '@/components/QRCodeAndRun';
import 'highlight.js/styles/github.css';
import '../styles/markdownRun.scss';

interface MarkdownRunProps extends RouteProps {
  mark: string
}

interface MarkdownRunStates {
  runList: Array<any>
}

const iframeUrlReg = /@IFRAME@URL\s*=\s*(\S*)/ig;
function parserMark(mark: string) {
  const result: Array<any> = [];
  // 找到代码块， 然后分割和替换
  const currentMark = mark.replace(iframeUrlReg, ($0: any) => {
    const iframeUrl = $0.replace(/@IFRAME@URL\s*=\s*/i, '');
    const id = uuidv4();
    result.push({
      iframeUrl,
      id
    });
    return id;
  });
  const rest: Array<any> = [];
  let nextMarkdownString = currentMark;
  // 把拆分的代码再次处理，按照顺序保存成数组
  for (let i = 0, l = result.length, item; i < l; i++) {
    item = result[i];
    if (!nextMarkdownString) {
      break;
    }
    const splitArr = nextMarkdownString.split(item.id);
    if (splitArr.length > 1) {
      nextMarkdownString = splitArr[1];
    } else {
      nextMarkdownString = '';
    }
    if (!isBlank(splitArr[0])) {
      rest.push({
        template: marked(splitArr[0]),
        isReactNode: false
      });
    }
    rest.push({
      template: <QRCodeAndRun url={item.iframeUrl}/>,
      isReactNode: true
    });
  }
  // 处理循环过后，没有处理完的nextMarkdownString
  if (!isBlank(nextMarkdownString)) {
    rest.push({
      template: marked(nextMarkdownString),
      isReactNode: false
    });
  }
  return rest;
}

class MarkdownRun extends React.Component<MarkdownRunProps, MarkdownRunStates> {
  constructor(props: any) {
    super(props);

    const renderer = new marked.Renderer();
    marked.setOptions({
      renderer: renderer,
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      langPrefix: 'hljs lang-',
      highlight: function (code: any) {
        return hljs.highlightAuto(code).value;
      }
    });

    this.state = {
      runList: parserMark(props.mark)
    };
  }
  render() {
    const {runList} = this.state;
    return <div className="markdown-run-wrapper">
      {
        runList.map((item: any, index: number) => {
          if (item.isReactNode) {
            return <div key={index}>{item.template}</div>;
          }
          return <div key={index} dangerouslySetInnerHTML = {{ __html: item.template }}/>;
        })
      }
    </div>;
  }
}

export default withRouter(MarkdownRun);
