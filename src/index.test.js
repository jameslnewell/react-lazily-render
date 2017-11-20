import React from 'react';
import {mount} from 'enzyme';
import LazyRender from '../src';

describe('LazyRender', () => {

  // FIXME: I'm not sure how to inject mock values for `element.getBoundingClientRect()`
  // before `componentDidMount()` is called, so the wiring up of this component is untested

  describe('.render()', () => {

    it('should render the class name on the wrapper', () => {
      const wrapper = mount(
        <LazyRender className="my-cool-class">
          {() => <span>HelloWorld!</span>}
        </LazyRender>
      );
      expect(wrapper.prop('className')).toEqual('my-cool-class');
    });

    it('should render the output of the render function', () => {
      const wrapper = mount(
        <LazyRender>
          {() => <span>HelloWorld!</span>}
        </LazyRender>
      );
      expect(wrapper.contains(<span>HelloWorld!</span>)).toBeTruthy();
    });

    it('should call the render function with true when the component is visible in the viewport', () => {
      const render = jest.fn();
      const wrapper = mount(
        <LazyRender>
          {render}
        </LazyRender>
      );
      render.mockReset();
      wrapper.setState({hasBeenScrolledIntoView: true});
      expect(render).toBeCalledWith(true);
    });

    it('should call the render function with false when the component is not visible in the viewport', () => {
      const render = jest.fn();
      const wrapper = mount(
        <LazyRender>
          {render}
        </LazyRender>
      );
      render.mockReset();
      wrapper.setState({hasBeenScrolledIntoView: false});
      expect(render).toBeCalledWith(false);
    });

  });

});
