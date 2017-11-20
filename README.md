# react-lazily-render

Lazily render components.

Delay mounting expensive components until a placeholder component has been scrolled into view.

## Installation

```
npm install --save react-lazily-render
```

# Usage

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