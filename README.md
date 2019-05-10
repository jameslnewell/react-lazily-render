# react-lazily-render

[![Build Status](https://travis-ci.org/jameslnewell/react-lazily-render.svg?branch=master)](https://travis-ci.org/jameslnewell/react-lazily-render)

Lazily render react components.

Delay mounting expensive components until a placeholder component has been scrolled into view.

## Installation

```
npm install --save react-lazily-render
```

## Usage

[Example](https://jameslnewell.github.io/react-lazily-render) ([source](https://github.com/jameslnewell/react-lazily-render/blob/master/example/App.js#L8))

```js
import React from 'react';
import LazilyRender from 'react-lazily-render';

<div>
  ...lots of content...
  <LazilyRender
    placeholder={<PlaceholderComponent/>}
    content={<ExpensiveComponent/>}
  />
  ...lots of content...
  <LazilyRender>
    {render => render
      ? <ExpensiveComponent/>
      : <PlaceholderComponent/>
    }
  </LazilyRender>
  ...lots of content...
</div>

```

## API

### Properties

#### className

> `string`

The `className` applied to the wrapping element.

#### component

> `string | React.ComponentClass`

The wrapping component.

e.g. 
```js
<LazilyRender component="span"/>
<LazilyRender component={MyComponent}/>
```

### offset

> `number | {top?: number, right?: number, bottom?: number, left?: number}`

An offset applied to the element for calculating whether the component has been scrolled into view.

You can specify individual values for each side, or a single value used for all sides.

#### placeholder

> `React.Node`

Rendered when the component hasn't been scrolled into view.

#### content

> `React.Node`

Rendered when the component has been scrolled into view.

#### children

> `(render: boolean) => React.Node`

Called to render something depending on whether the component has been scrolled into view.

#### onRender

> `() => void`

Called when the component becomes visible for the first time.

#### scrollContainer

> `HTMLElement | undefined`

The container which `react-lazily-render` listens to for scroll events.

This property can be used in a scenario where you want to specify your own scroll container - e.g. if the component you are rendering is asynchronously added to the DOM.