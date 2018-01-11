declare module 'react-lazily-render' {

  import * as React from 'react';

  export interface LazilyRenderProps {
    className?: string;
    offset?: number | {top?: number, right?: number, bottom?: number, left?: number};
    placeholder?: React.ReactNode;
    content?: React.ReactNode;
    children?: (render: boolean) => React.ReactNode;
    onRender?: () => void;
  }

  export default class LazilyRender extends React.Component<LazilyRenderProps, any> {
  }

}
