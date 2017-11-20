import React from 'react';
import LazilyRender from 'react-lazily-render';

function Content({isWindow, onRender}) {
  return (
    <div style={{background: 'linear-gradient(to bottom, #fafafa 0%,#c6c6c6 50%,#f3f3f3 100%)'}}>
      <div style={{height: '100vh'}}/>
      <LazilyRender key={isWindow ? 'window' : 'container'} onRender={onRender}>
        {render => render
          ? <div style={{width: '300px', height: '150px', backgroundColor: 'green'}}>loaded!</div>
          : <div style={{width: '300px', height: '150px', backgroundColor: 'pink'}}>loading...</div>
        }
      </LazilyRender>
      <div style={{height: '100vh'}}/>
    </div>
  );
}

export default class App extends React.Component {

  state = {
    isWindow: true,
    isRendered: false
  };

  handleToggle = () => {
    this.setState(({isWindow}) => ({
      isWindow: !isWindow,
      isRendered: false
    }));
  }

  handleRender = () => {
    this.setState({
      isRendered: true
    });
  }

  render() {
    const {isWindow, isRendered} = this.state;

    return (
      <div>
        <h1>react-lazily-render</h1>

        <label>
          <input type="radio" name="container" value="window" checked={isWindow} onChange={this.handleToggle}/>
          Scrollable window
        </label>
        <br/>
        <label>
          <input type="radio" name="container" value="container" checked={!isWindow} onChange={this.handleToggle}/>
          Scrollable container
        </label>

        <h4>Scroll the {isWindow ? 'window' : 'container'} {isRendered ? '✅' : '⬇'}</h4>

        {isWindow
          ? (
            <Content isWindow={isWindow} onRender={this.handleRender}/>
          ) : (
            <div style={{overflow: 'auto', height: 'calc(100vh - 175px)', border: '1px solid #ccc'}}>
            <Content isWindow={isWindow} onRender={this.handleRender}/>
            </div>
          )
        }

      </div>
    );
  }

}
