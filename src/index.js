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
      stack: [],
      display: '0',
      result: false,
      decimal: false
    }
  };

  componentDidMount() {
    math.config({
      number: 'BigNumber',
      precision: 64
    });
  }

  handleClick(key) {
    switch (key) {
      case 'AC':
        this.setState({
          stack: [],
          display: '',
          result: false,
          decimal: false
        })
        break;
      case 'CE':
        if (this.state.display !== '') {
          this.setState({
            display: ''
          })
        } else {
          let newstack = this.state.stack;
          newstack.pop();
          this.setState({
            stack: newstack
          });
        }
        break;
      case '=':
        if (!/[+\-*/]/.test(this.state.display) && this.state.display !== '') {
          this.setState({
            display: String(math.eval(this.state.stack.join('') + this.state.display)),
            stack: [],
            result: true,
            decimal: false
          });
        }
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        if (/[+\-*/]/.test(this.state.stack[this.state.stack.length-1]) &&
            /[+\-*/]/.test(this.state.display)) {
          let newstack = this.state.stack;
          newstack[newstack.length-1] = key;
          this.setState({
            stack: newstack,
            display: String(key),
            result: false
          });
        } else {
          this.setState({
            stack: this.state.stack.concat([this.state.display, key]),
            display: String(key),
            decimal: false,
            result: false
          });
        }
        break;
      default:
        if (key === '.' && this.state.decimal) {
          break;
        } else if (key === '.' && !this.state.decimal) {
          this.setState({
            decimal:true
          })
        }
        if (/[+\-*/]/.test(this.state.display)) {
          this.setState({
            display: String(key)
          })
        } else if (this.state.result) {
          this.setState({
            display: String(key),
            result: false
          });
        } else {
          if (String(this.state.display).match(/([0-9])/g).length <= 8) {
            this.setState({
              display: this.state.display.concat(key)
            });
          }
        }
        break;
    }
  }

  render() {
    return (
      <div>
        <h1>{/[+\-*/]/.test(this.state.display) ? this.state.display : math.format(math.eval(this.state.display), {notation: 'auto', exponential: {lower:1e-8, upper:1e8}, precision: 8 })}</h1>
        <div>{this.state.stack.join('')}</div>
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
          <Button bsStyle="default" onClick={this.handleClick.bind(this, '.')}>
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
