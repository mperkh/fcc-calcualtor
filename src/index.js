import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import math from 'mathjs';
import './index.css';

class App extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      stack: ''
    }
  };

  handleClick(key) {
    switch (key) {
      case '=':
        this.setState({
          stack: math.eval(this.state.stack)
        });
        break;
      default:
        this.setState({
          stack: this.state.stack + key
        });
    }
  }

  render() {
    return (
      <div>
        <div>{this.state.stack}</div>
        <ButtonToolbar>
          <Button bsStyle="danger" onClick={this.handleClick.bind(this, 'AC')}>
            AC
          </Button>
          <Button bsStyle="danger" onClick={this.handleClick.bind(this, 'CE')}>
            CE
          </Button>
          <Button bsStyle="primary" onClick={this.handleClick.bind(this, '/')}>
            ÷
          </Button>
          <Button bsStyle="primary" onClick={this.handleClick.bind(this, '*')}>
            x
          </Button>
        </ButtonToolbar>
        <ButtonToolbar>
          <Button bsStyle="default" onClick={this.handleClick.bind(this, 7)}>
            7
          </Button>
          <Button bsStyle="default" onClick={this.handleClick.bind(this, 8)}>
            8
          </Button>
          <Button bsStyle="default" onClick={this.handleClick.bind(this, 9)}>
            9
          </Button>
          <Button bsStyle="primary" onClick={this.handleClick.bind(this, '-')}>
            -
          </Button>
        </ButtonToolbar>
        <ButtonToolbar>
          <Button bsStyle="default" onClick={this.handleClick.bind(this, 4)}>
            4
          </Button>
          <Button bsStyle="default" onClick={this.handleClick.bind(this, 5)}>
            5
          </Button>
          <Button bsStyle="default" onClick={this.handleClick.bind(this, 6)}>
            6
          </Button>
          <Button bsStyle="primary" onClick={this.handleClick.bind(this, '+')}>
            +
          </Button>
        </ButtonToolbar>
        <ButtonToolbar>
          <Button bsStyle="default" onClick={this.handleClick.bind(this, 1)}>
            1
          </Button>
          <Button bsStyle="default" onClick={this.handleClick.bind(this, 2)}>
            2
          </Button>
          <Button bsStyle="default" onClick={this.handleClick.bind(this, 3)}>
            3
          </Button>
          <Button bsStyle="success" onClick={this.handleClick.bind(this, "=")}>
            =
          </Button>
        </ButtonToolbar>
        <ButtonToolbar>
          <Button bsStyle="default" onClick={this.handleClick.bind(this, 0)}>
            0
          </Button>
          <Button bsStyle="default" onClick={this.handleClick.bind(this, ',')}>
            .
          </Button>
        </ButtonToolbar>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
