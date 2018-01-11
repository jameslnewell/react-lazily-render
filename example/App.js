import React from 'react';
import LazilyRender from 'react-lazily-render';

function Content({isWindow, offset, onRender}) {
  return (
    <div style={{background: 'linear-gradient(to bottom, #fafafa 0%,#c6c6c6 50%,#f3f3f3 100%)'}}>
      <div style={{height: '125vh'}}/>
      <LazilyRender key={isWindow ? 'window' : 'container'} offset={offset} onRender={onRender}>
        {render => render
          ? <div style={{width: '300px', height: '150px', backgroundColor: 'green'}}>loaded!</div>
          : <div style={{width: '300px', height: '150px', backgroundColor: 'pink'}}>loading...</div>
        }
      </LazilyRender>
      <div style={{height: '125vh'}}/>
    </div>
  );
}

export default class App extends React.Component {

  state = {
    isWindow: true,
    isRendered: false,
    offset: undefined
  };


  handleMountContainer = (el) => {
    this.containerEl = el;
  }

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

  handleOffsetChange = (event) => {
    try {
      const offset = JSON.parse(event.target.value);
      this.setState({offset});
    } catch (e) {
    }
  }

  handleJumpToBottom = () => {
    const {isWindow} = this.state;
    if (isWindow) {
      window.scrollTo(0, 99999);
    } else {
      if (this.containerEl) {
        this.containerEl.scrollTo(0, 99999);
      }
    }
  }

  render() {
    const {isWindow, isRendered, offset} = this.state;

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
        <br/>
        <br/>
        <label>
          Offset: <input defaultValue="0" onChange={this.handleOffsetChange} style={{textAlign: 'right'}}/>
        </label>
        <br/>
        <br/>
        <button onClick={this.handleJumpToBottom}>⛹🏾 Jump to bottom</button>

        <h4>Scroll the {isWindow ? 'window' : 'container'} {isRendered ? '✅' : '⬇'}</h4>

        {isWindow
          ? (
            <Content isWindow={isWindow} offset={offset} onRender={this.handleRender}/>
          ) : (
            <div ref={this.handleMountContainer} style={{overflow: 'auto', height: 'calc(100vh - 250px)', border: '1px solid #ccc'}}>
              <Content isWindow={isWindow} offset={offset} onRender={this.handleRender}/>
            </div>
          )
        }

      </div>
    );
  }

}
