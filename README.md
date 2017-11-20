# react-lazily-render

Lazily render react components.

Delay mounting expensive components until a placeholder component has been scrolled into view.

## Installation

```
npm install --save react-lazily-render
```

# Usage

[Example](https://jameslnewell.github.io/react-lazily-render) ([source](https://github.com/jameslnewell/react-lazily-render/blob/master/example/App.js#L8))

```js
import React from 'react';
import LazyRender from 'react-lazily-render';

<div>
  lots of content...
  <LazilyRender>
    {render => render
      ? <ExpensiveComponent/>
      : <PlaceholderComponent/>
    }
  </LazilyRender>
  lots of content...
</div>

```
