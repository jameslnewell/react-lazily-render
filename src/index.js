// @flow
import * as React from 'react';
import throttle from 'lodash/throttle';
import scrollParent from 'scrollparent';
import {type Bounds, type Window} from './types';
import getViewportBounds from './utils/getViewportBounds';
import getElementBounds from './utils/getElementBounds';
import isElementInViewport from './utils/isElementInViewport'

export type LazilyRenderProps = {
  children: (render: boolean) => React.Node;
  onRender?: () => void;
  className?: string;
};

export type LazilyRenderState = {
  hasBeenScrolledIntoView: boolean;
};

export default class LazilyRender extends React.Component<LazilyRenderProps, LazilyRenderState> {

  element: ?HTMLElement = undefined;

  state = {
    hasBeenScrolledIntoView: false
  };

  get container(): ?HTMLElement | ?Window {
    const container = scrollParent(this.element);
    if (container === document.documentElement) {
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

  startListening() {
    const container = this.container;
    if (container) container.addEventListener('scroll', this.update);
    window.addEventListener('resize', this.update);
  }

  stopListening() {
    const container = this.container;
    if (container) container.removeEventListener('scroll', this.update);
    window.removeEventListener('resize', this.update);
  }

  update = throttle(() => {
    const elementBounds = this.getElementBounds();
    const viewportBounds = this.getViewportBounds();

    if (!elementBounds || !viewportBounds) {
      return;
    }

    if (isElementInViewport(elementBounds, viewportBounds)) {
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

  }, 16)

  handleMount = (element: ?HTMLElement) => {
    this.element = element;
  }

  componentDidMount() {
    this.update();
    this.startListening();
  }

  componentWillUnmount() {
    this.stopListening();
  }

  render() {
    const {className, children} = this.props;
    const {hasBeenScrolledIntoView} = this.state;
    return (
      <div ref={this.handleMount} className={className}>
        {children(hasBeenScrolledIntoView)}
      </div>
    );
  }

}

// TODO:
// - shouldComponentUpdate => false (when hasBeenScrolledIntoView) -> check changing children still works
// - test get*Bounds() fns
