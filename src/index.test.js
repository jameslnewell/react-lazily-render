import React from 'react';
import {mount,shallow} from 'enzyme';
import LazyRender from '.';
import {__setViewportBounds} from './utils/getViewportBounds';
import {__setElementBounds} from './utils/getElementBounds';

let mockScrollParent = window;
jest.mock('scrollparent', () => (element) => { return mockScrollParent; });

jest.mock('./utils/eventListenerOptions', () => {
  return {
    passive: true
  };
});

jest.mock('./utils/getViewportBounds', () => {
  let bounds = undefined;
  const getViewportBounds = () => bounds;
  getViewportBounds.__setViewportBounds = val => bounds = val;
  return getViewportBounds;
});

jest.mock('./utils/getElementBounds', () => {
  let bounds = undefined;
  const getElementBounds = () => bounds;
  getElementBounds.__setElementBounds = val => bounds = val;
  return getElementBounds;
});

function setupElementInView() {
  __setViewportBounds({
    top: 0,
    right: 1000,
    bottom: 1000,
    left: 0
  });
  __setElementBounds({
    top: 100,
    right: 200,
    bottom: 200,
    left: 100
  });
}

function setupElementOutOfView() {
  __setViewportBounds({
    top: 0,
    right: 1000,
    bottom: 1000,
    left: 0
  });
  __setElementBounds({
    top: 1100,
    right: 1200,
    bottom: 1200,
    left: 1100
  });
}

let compatMode;
function mockCompatMode(mode) {
  compatMode = Object.getOwnPropertyDescriptor(Document.prototype, 'compatMode');
  Object.defineProperty(document, 'compatMode', { value: mode, writable: false, configurable: true });
}
function unmockCompatMode() {
  Object.defineProperty(document, 'compatMode', compatMode);
}

function wrapper(node) {
  jest.useFakeTimers();
  const wrapper = mount(node);
  jest.runAllTimers();
  wrapper.update();
  return wrapper;
}

// return the div wrapper
function getWrapper(element) {
  return element.children().first();
}

describe('LazyRender', () => {
  const placeholder = '...';
  const content = 'Hello World!'
  const children = 'foo bar';

  describe('.render()', () => {

    it('should render the class name on the wrapper', () => {
      const wrapper = mount(
        <LazyRender className="my-cool-class">
          {() => <span>HelloWorld!</span>}
        </LazyRender>
      );
      expect(wrapper.prop('className')).toEqual('my-cool-class');
    });

    describe(`when component="span"`, () => {
      it(`should render the wrapper as <span>`, () => {
        const wrapper = shallow(
          <LazyRender component="span">
            {() => <span>HelloWorld!</span>}
          </LazyRender>
        );
        expect(wrapper.type()).toEqual('span');
      });
    });

    describe(`when component="div"`, () => {
      it(`should render the wrapper as <div>`, () => {
        const wrapper = shallow(
          <LazyRender component="div">
            {() => <span>HelloWorld!</span>}
          </LazyRender>
        );
        expect(wrapper.type()).toEqual('div');
      });
    });

    it('should call the render fn with true when the component is visible in the viewport', () => {
      setupElementInView();
      const render = jest.fn();
      const element = wrapper(
        <LazyRender>
          {render}
        </LazyRender>
      );
      expect(render).toBeCalledWith(true);
    });

    it('should call the render fn with false when the component is not visible in the viewport', () => {
      setupElementOutOfView();
      const render = jest.fn();
      const element = wrapper(
        <LazyRender>
          {render}
        </LazyRender>
      );
      expect(render).toBeCalledWith(false);
    });

    describe('has not been scrolled into view:', () => {
      beforeEach(() => setupElementOutOfView());

      it('should render the "placeholder" when there is a "placeholder"', () => {
        const element = wrapper(
          <LazyRender placeholder={placeholder} content={content}>
            {() => children}
          </LazyRender>
        );
        expect(getWrapper(element).contains(placeholder)).toBeTruthy();
      });

      it('should render the "render fn" when there is no "placeholder"', () => {
        const element = wrapper(
          <LazyRender content={content}>
            {() => children}
          </LazyRender>
        );
        expect(getWrapper(element).contains(children)).toBeTruthy();
      });

      it('should render "null" when there is no "placeholder" and no "render fn"', () => {
        const element = wrapper(<LazyRender content={content}/>);
        expect(getWrapper(element).children().exists()).toBeFalsy();
      });

    });

    describe('has been scrolled into view:', () => {
      beforeEach(() => setupElementInView());

      it('should render the "content" when there is "content"', () => {
        const element = wrapper(
          <LazyRender placeholder={placeholder} content={content}>
            {() => children}
          </LazyRender>
        );
        expect(getWrapper(element).contains(content)).toBeTruthy();
      });

      it('should render the "render fn" when there is no "content"', () => {
        const element = wrapper(
          <LazyRender placeholder={placeholder}>
            {() => children}
          </LazyRender>
        );
        expect(getWrapper(element).contains(children)).toBeTruthy();
      });

      it('should render "null" when there is no "content" and no "render fn"', () => {
        const element = wrapper(<LazyRender placeholder={placeholder}/>);
        expect(getWrapper(element).children().exists()).toBeFalsy();
      });

    });

  });

  describe('Event handling', () => {

    let windowAddEventSpy;
    let bodyAddEventSpy;
    let windowRemoveEventSpy;
    let bodyRemoveEventSpy;

    beforeEach(() => {
      windowAddEventSpy = jest.spyOn(window, 'addEventListener');
      bodyAddEventSpy = jest.spyOn(document.body, 'addEventListener');
      windowRemoveEventSpy = jest.spyOn(window, 'removeEventListener');
      bodyRemoveEventSpy = jest.spyOn(document.body, 'removeEventListener');
    });

    it('should use passive event listeners when available', () => {
      const element = wrapper(
        <LazyRender>
          {() => children}
        </LazyRender>
      );

      expect(windowAddEventSpy).toBeCalledWith('scroll', expect.anything(), {
        passive: true
      });

      element.unmount();

      expect(windowRemoveEventSpy).toBeCalledWith('scroll', expect.anything(), {
        passive: true
      });
    });

    it('should listen to the window when scrollparent returns body in CSS1Compat mode', () => {
      mockCompatMode('CSS1Compat');
      mockScrollParent = document.body;

      const element = wrapper(
        <LazyRender>
          {() => children}
        </LazyRender>
      );

      expect(windowAddEventSpy).toBeCalledWith('scroll', expect.anything(), expect.anything());
      expect(bodyAddEventSpy).not.toBeCalledWith('scroll', expect.anything(), expect.anything());

      windowAddEventSpy.mockClear();
      bodyAddEventSpy.mockClear();
      windowRemoveEventSpy.mockClear();
      bodyRemoveEventSpy.mockClear();

      element.unmount();

      expect(windowRemoveEventSpy).toBeCalledWith('scroll', expect.anything(), expect.anything());
      expect(bodyRemoveEventSpy).not.toBeCalledWith('scroll', expect.anything(), expect.anything());

      unmockCompatMode();
    });

    it('should listen to the body when scrollparent returns body in BackCompat mode', () => {
      mockCompatMode('BackCompat');
      mockScrollParent = document.body;
      const windowAddEventSpy = jest.spyOn(window, 'addEventListener');
      const bodyAddEventSpy = jest.spyOn(document.body, 'addEventListener');
      const windowRemoveEventSpy = jest.spyOn(window, 'removeEventListener');
      const bodyRemoveEventSpy = jest.spyOn(document.body, 'removeEventListener');

      const element = wrapper(
        <LazyRender>
          {() => children}
        </LazyRender>
      );

      expect(windowAddEventSpy).not.toBeCalledWith('scroll', expect.anything(), expect.anything());
      expect(bodyAddEventSpy).toBeCalledWith('scroll', expect.anything(), expect.anything());

      windowAddEventSpy.mockClear();
      bodyAddEventSpy.mockClear();
      windowRemoveEventSpy.mockClear();
      bodyRemoveEventSpy.mockClear();

      element.unmount();

      expect(windowRemoveEventSpy).not.toBeCalledWith('scroll', expect.anything(), expect.anything());
      expect(bodyRemoveEventSpy).toBeCalledWith('scroll', expect.anything(), expect.anything());

      unmockCompatMode();
    });

  });

});
