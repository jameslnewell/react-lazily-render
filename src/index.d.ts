declare module 'react-lazily-render' {

  import * as React from 'react';

  export interface LazilyRenderProps {
    children?: (render: boolean) => React.ReactNode; //FIXME: this is only optional because typescript complains an explicit prop named children hasn't been specified
    onRender?: () => void;
    className?: string;
  }

  export default class LazilyRender extends React.Component<LazilyRenderProps, any> {
  }

}
