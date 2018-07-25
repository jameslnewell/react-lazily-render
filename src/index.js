// @flow
import * as React from 'react';
import scrollParent from 'scrollparent';
import {type Bounds, type Window} from './types';
import getViewportBounds from './utils/getViewportBounds';
import getElementBounds from './utils/getElementBounds';
import convertOffsetToBounds from './utils/convertOffsetToBounds';
import isElementInViewport from './utils/isElementInViewport'
import eventListenerOptions from './utils/eventListenerOptions';

export type LazilyRenderProps = {
  className?: string;
  offset?: number | {top?: number, right?: number, bottom?: number, left?: number};
  placeholder?: React.Node;
  content?: React.Node;
  children?: (render: boolean) => React.Node;
  onRender?: () => void;
};

export type LazilyRenderState = {
  hasBeenScrolledIntoView: boolean;
};

export default class LazilyRender extends React.Component<LazilyRenderProps, LazilyRenderState> {

  raf: ?number;
  element: ?HTMLElement;
  container: ?HTMLElement | ?Window; 

  state = {
    hasBeenScrolledIntoView: false
  };

  isBackCompatMode() {
    return document.compatMode === "BackCompat";
  }

  getContainer(): ?HTMLElement | ?Window {
    const container = scrollParent(this.element);
    if (container === document.scrollingElement || container === document.documentElement || (!this.isBackCompatMode() && container == document.body)) {
      return window;
    } else {
      return container;
    }
  }

  getViewportBounds(): ?Bounds {
    return getViewportBounds(this.container)
  }

  getElementBounds(): ?Bounds {
    return getElementBounds(this.element);
  }

  getOffsetBounds(): ?Bounds {
    const {offset} = this.props;
    return convertOffsetToBounds(offset);
  }

  startListening() {
    const container = this.container;
    if (container) container.addEventListener('scroll', this.update, eventListenerOptions);
    window.addEventListener('resize', this.update);
  }

  stopListening() {
    const container = this.container;
    if (container) container.removeEventListener('scroll', this.update, eventListenerOptions);
    window.removeEventListener('resize', this.update);
  }

  update = () => {
    cancelAnimationFrame(this.raf);
    this.raf = requestAnimationFrame(() => {

      const elementBounds = this.getElementBounds();
      const viewportBounds = this.getViewportBounds();
      const offsetBounds = this.getOffsetBounds();
  
      if (!elementBounds || !viewportBounds) {
        return;
      }
  
      if (isElementInViewport(elementBounds, viewportBounds, offsetBounds)) {
        this.stopListening();
        this.setState(
          {
            hasBeenScrolledIntoView: true
          },
          () => {
            const {onRender} = this.props;
            if (onRender) {
              onRender();
            }
          }
        );
      }

    });
  }

  handleMount = (element: ?HTMLElement) => {
    this.element = element;
    if (this.element) {
      this.container = this.getContainer();
    } else {
      this.container = undefined;
    }
  }

  componentDidMount() {
    this.update();
    this.startListening();
  }

  componentWillUnmount() {
    this.stopListening();
  }

  renderChildren() {
    const {placeholder, content, children} = this.props;
    const {hasBeenScrolledIntoView} = this.state;

    if (!hasBeenScrolledIntoView && placeholder) {
      return placeholder;
    }

    if (hasBeenScrolledIntoView && content) {
      return content;
    }

    if (children) {
      return children(hasBeenScrolledIntoView);
    }

    return null;
  }

  render() {
    const {className} = this.props;
    return (
      <div ref={this.handleMount} className={className}>
        {this.renderChildren()}
      </div>
    );
  }

}
