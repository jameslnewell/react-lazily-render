declare module 'react-lazily-render' {

  import * as React from 'react';

  export interface LazilyRenderProps {
    className?: string;
    placeholder?: React.ReactNode;
    content?: React.ReactNode;
    children?: (hasBeenScrolledIntoView: boolean) => React.ReactNode;
    onRender?: () => void;
  }

  export default class LazilyRender extends React.Component<LazilyRenderProps, any> {
  }

}
