// @flow
import * as React from 'react';
import scrollParent from 'scrollparent';
import {type Bounds, type Window} from './types';
import getViewportBounds from './utils/getViewportBounds';
import getElementBounds from './utils/getElementBounds';
import convertOffsetToBounds from './utils/convertOffsetToBounds';
import isElementInViewport from './utils/isElementInViewport'
import isBackCompatMode from './utils/isBackCompatMode'
import eventListenerOptions from './utils/eventListenerOptions';

export type LazilyRenderProps = {
  className?: string;
  component?: string | React.ComponentClass;
  offset?: number | {top?: number, right?: number, bottom?: number, left?: number};
  placeholder?: React.Node;
  content?: React.Node;
  children?: (render: boolean) => React.Node;
  onRender?: () => void;
  scrollContainer?: HTMLElement;
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

  getContainer(scrollContainer: ?HTMLElement): ?HTMLElement | ?Window {
    if (scrollContainer) {
      return scrollContainer;
    } else {
      if (this.element) {
        const container = scrollParent(this.element);
        if (container === document.scrollingElement || container === document.documentElement || (!isBackCompatMode() && container == document.body)) {
          return window;
        } else {
          return container;
        }
      } else {
        return undefined;
      }
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

  componentDidUpdate(prevProps: ?LazilyRenderProps, prevState: ?LazilyRenderState) {
    const { scrollContainer: prevContainer } = prevProps;
    const { scrollContainer: nextContainer } = this.props;
    // If a scroll container was defined before, do some cleanup
    // and bootstrap the next scroll container.
    if (prevContainer !== nextContainer) {
      // If the previous container was already utilised, no cleanup
      // is required - already done in LazilyRender.update().
      if (!prevState.hasBeenScrolledIntoView) {
        this.stopListening(prevContainer);
      }
      // Set a new listener if the scrollContainer is defined, and update 
      // the container property accordingly. Note: this should only be done
      // when the next container is different.
      this.container = this.getContainer(nextContainer);
      this.startListening(this.container);
      // Signal that the element has not been scrolled into view and 
      // recompute its position. This will essentially 'reset' the node's
      // current status back to a placeholder item if need be.
      this.setState({ hasBeenScrolledIntoView: false }, () => {
        this.update();
      });
    }
  }

  startListening(container: ?HTMLElement) {
    if (container) container.addEventListener('scroll', this.update, eventListenerOptions);
    window.addEventListener('resize', this.update);
  }

  stopListening(container: ?HTMLElement) {
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
        this.stopListening(this.container);
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
    const { scrollContainer } = this.props;
    this.element = element;
    this.container = this.getContainer(scrollContainer);
  }

  componentDidMount() {
    this.update();
    this.startListening(this.container);
  }

  componentWillUnmount() {
    this.stopListening(this.container);
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
    const {className, component} = this.props;
    return React.createElement(component || 'div', {
      ref: this.handleMount,
      className,
      children: this.renderChildren()
    });
  }

}
