import React, { FunctionComponent } from 'react';
import './Iframe.scss';

export interface IframeProps {
  url: string;
  height?: number;
  width?: number;
  title: string;
  sandbox: string;
}
const Iframe: FunctionComponent<IframeProps> = ({ url, height = 600, width = 1200, title, sandbox }) => {
  return <iframe className="main-content" src={url} height={height} width={width} title={title} sandbox={sandbox}/>;
};

export default Iframe;
