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
      decimal: false,
      memory: '0'
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
      case 'M+':
        if (!/^[+\-*/]$/.test(this.state.display) && this.state.display !== ''){
          this.setState({
            memory: String(math.eval(this.state.memory + '+' + this.state.display))
          });
        }
        break;
      case 'M-':
        if (!/^[+\-*/]$/.test(this.state.display) && this.state.display !== ''){
          this.setState({
            memory: String(math.eval(this.state.memory + '-' + this.state.display))
          });
        }
        break;
      case 'MR':
        this.setState({
          display: String(this.state.memory)
        });
        break;
      case 'MC':
        this.setState({
          memory: '0'
        });
        break;
      case 'negate':
        if (!/^[+\-*/]$/.test(this.state.display) && this.state.display !== ''){
          this.setState({
            display: String(math.eval(this.state.display + '* -1'))
          });
        }
        break;
      case 'sqrt':
        if (!/^[+\-*/]$/.test(this.state.display)){
          this.setState({
            display: String(math.sqrt(this.state.display))
          });
        }
        break;
      case 'percent':
        if (!/^[+\-*/]$/.test(this.state.display)){
          this.setState({
            display: String(math.eval(this.state.display + '/ 100'))
          });
        }
        break;
      case 'inv':
        if (!/^[+\-*/]$/.test(this.state.display && this.state.display !== '')){
          this.setState({
            display: String(math.eval('1/' + this.state.display))
          });
        }
        break;
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
        if (!/^[+\-*/]$/.test(this.state.display) && this.state.display !== '') {
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
        if (/^[+\-*/]$/.test(this.state.stack[this.state.stack.length-1]) &&
            /^[+\-*/]$/.test(this.state.display)) {
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
            decimal: true
          })
        }
        if (/^[+\-*/]$/.test(this.state.display)) {
          this.setState({
            display: '0' + String(key)
          })
        } else if (this.state.result) {
          this.setState({
            display: '0' + String(key),
            result: false
          });
        } else {
          if (String(this.state.display).match(/([0-9])/g).length <= 8) {
            this.setState({
              display: String(this.state.display.concat(key))
            });
          }
        }
        break;
    }
  }

  render() {
    return (
      <div>
      <div>{this.state.stack.join('')}</div><br/>
      <div>{this.state.display}</div>
        <div id="braun">
          <img alt="BRAUN" id="logo" src="https://upload.wikimedia.org/wikipedia/commons/1/16/Braun_Logo.svg" />
          <div id="window">
            <div id="digits">{
              /^[\.+\-*/]$/.test(this.state.display)
                ? this.state.display
                : math.format(math.eval(this.state.display), {
                  notation: 'auto',
                  exponential: {
                    lower:1e-9,
                    upper:1e9
                  },
                  precision: 8
                })
            }</div>
          </div>
          <button className="darkGray" onClick={this.handleClick.bind(this, 'M+')}>M+</button>
          <button className="darkGray" onClick={this.handleClick.bind(this, 'M-')}>M-</button>
          <button className="darkGray" onClick={this.handleClick.bind(this, 'MR')}>MR</button>
          <button className="darkGray" onClick={this.handleClick.bind(this, 'MC')}>MC</button>
          <button className="darkGray" onClick={this.handleClick.bind(this, 'negate')}>+/-</button><br/>
          <button className="darkGray" onClick={this.handleClick.bind(this, 'sqrt')}>√</button>
          <button className="lightGray" onClick={this.handleClick.bind(this, 7)}>7</button>
          <button className="lightGray" onClick={this.handleClick.bind(this, 8)}>8</button>
          <button className="lightGray" onClick={this.handleClick.bind(this, 9)}>9</button>
          <button className="darkGray" onClick={this.handleClick.bind(this, '/')}>÷</button><br/>
          <button className="darkGray" onClick={this.handleClick.bind(this, 'percent')}>%</button>
          <button className="lightGray" onClick={this.handleClick.bind(this, 4)}>4</button>
          <button className="lightGray" onClick={this.handleClick.bind(this, 5)}>5</button>
          <button className="lightGray" onClick={this.handleClick.bind(this, 6)}>6</button>
          <button className="darkGray" onClick={this.handleClick.bind(this, '*')}>x</button><br/>
          <button className="darkGray" onClick={this.handleClick.bind(this, 'inv')}>1/x</button>
          <button className="lightGray" onClick={this.handleClick.bind(this, 1)}>1</button>
          <button className="lightGray" onClick={this.handleClick.bind(this, 2)}>2</button>
          <button className="lightGray" onClick={this.handleClick.bind(this, 3)}>3</button>
          <button className="darkGray" onClick={this.handleClick.bind(this, '-')}>-</button><br/>
          <button className="darkGray" onClick={this.handleClick.bind(this, 'CE')}>CE</button>
          <button className="lightGray" onClick={this.handleClick.bind(this, 0)}>0</button>
          <button className="darkGray" onClick={this.handleClick.bind(this, '.')}>&bull;</button>
          <button className="yellow" onClick={this.handleClick.bind(this, '=')}>=</button>
          <button className="darkGray" onClick={this.handleClick.bind(this, '+')}>+</button><br/>
        </div>

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
