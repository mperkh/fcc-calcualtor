import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import math from 'mathjs';
import './index.css';

class App extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      stack: [],
      display: '',
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
      case 'MR':
      if (this.state.memory !== '0') {
        this.setState({
          display: String(this.state.memory)
        });
      }
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
        if (!/^[+\-*/]$/.test(this.state.display) && this.state.display >= 0){
          this.setState({
            display: String(math.sqrt(this.state.display))
          });
        }
        break;
      case 'percent':
        if (!/^[+\-*/]$/.test(this.state.display)){
          if (this.state.stack[this.state.stack.length - 1] === '+') {
            this.setState({
              display: String(math.eval((this.state.stack[this.state.stack.length - 2] * (1 + this.state.display / 100)))),
              stack: [],
              result: true,
              decimal: false
            });
          } else if (this.state.stack[this.state.stack.length - 1] === '-') {
            this.setState({
              display: String(math.eval((this.state.stack[this.state.stack.length - 2] * (1 - this.state.display / 100)))),
              stack: [],
              result: true,
              decimal: false
            });
          } else if (this.state.stack[this.state.stack.length - 1] === '*') {
            this.setState({
              display: String(math.eval((this.state.stack[this.state.stack.length - 2] * this.state.display / 100))),
              stack: [],
              result: true,
              decimal: false
            });
          } else {
            this.setState({
              display: String(math.eval(this.state.display + '/ 100'))
            });
          }
        }
        break;
      case 'deltapercent':
        if (!/^[+\-*/]$/.test(this.state.display && this.state.display !== '')){
          if (this.state.stack[this.state.stack.length - 1] === '-') {
            this.setState({
              display: String(math.eval((this.state.stack[this.state.stack.length - 2] / this.state.display -1 ) * 100)),
              stack: [],
              result: true,
              decimal: false
            });
          } else if (this.state.stack[this.state.stack.length - 1] === '/')
            this.setState({
              display: String(math.eval(this.state.stack[this.state.stack.length - 2] * 100 / (100 - this.state.display))),
              stack: [],
              result: true,
              decimal: false
            });
        }
        break;
      case 'CE':
        if (!/^[+\-*/]$/.test(this.state.display) && this.state.display) {
          this.setState({
            display: '',
            result: false,
            decimal: false
          })
        } else if (!this.state.display) {
          this.setState({
            stack: [],
            display: '0',
            result: false,
            decimal: false
          })
        }
        break;
      case '=':
      case 'M+':
      case 'M-':
        if (!/^[+\-*/]$/.test(this.state.display) && this.state.display !== '') {
          this.setState({
            display: String(math.eval(this.state.stack.join('') + this.state.display)),
            stack: [],
            result: true,
            decimal: false
          }, function() {
            if (key === 'M+') {
              this.setState({
                memory: String(math.eval(this.state.memory + '+' + this.state.display))
              });
            } else if (key === 'M-') {
              this.setState({
                memory: String(math.eval(this.state.memory + '-' + this.state.display))
              });
            }
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
          if (!this.state.display || String(this.state.display).match(/([0-9])/g).length <= 8) {
            this.setState({
              display: String(this.state.display.concat(key))
            });
          }
        }
        break;
    }
  }

  render() {
    let output;
    if (!this.state.display) {
      output = '0'
    } else if (/^[\.+\-*/]$/.test(this.state.display)) {
      output = this.state.display
    } else {
      output = math.format(math.eval(this.state.display), {
        notation: 'auto',
        exponential: {
          lower: 1e-9,
          upper: 1e9
        },
        precision: 8
      });
      if (/[0-9]\.$/.test(this.state.display)) {
        output = output.concat('.');
      }
    }
    return (
      <div>
        <div id="braun">
          <img alt="BRAUN" id="logo" src="https://upload.wikimedia.org/wikipedia/commons/1/16/Braun_Logo.svg" />
          <div id="window">
            <div id="digits">{output}</div>
            <div id="memory">{this.state.memory === '0' ? '' : 'M'}</div>
          </div>
          <button className="darkGray" onClick={this.handleClick.bind(this, 'M+')}>M+</button>
          <button className="darkGray" onClick={this.handleClick.bind(this, 'M-')}>M-</button>
          <button className="darkGray" onClick={this.handleClick.bind(this, 'MR')}>MR</button>
          <button className="darkGray" onClick={this.handleClick.bind(this, 'MC')}>MC</button>
          <button className="darkGray" onClick={this.handleClick.bind(this, 'negate')}>+/-</button><br/>
          <button className="darkGray" onClick={this.handleClick.bind(this, 'deltapercent')}><span style={{whiteSpace: 'nowrap'}}>Δ%</span></button>
          <button className="lightGray" onClick={this.handleClick.bind(this, 7)}>7</button>
          <button className="lightGray" onClick={this.handleClick.bind(this, 8)}>8</button>
          <button className="lightGray" onClick={this.handleClick.bind(this, 9)}>9</button>
          <button className="darkGray" onClick={this.handleClick.bind(this, '/')}>÷</button><br/>
          <button className="darkGray" onClick={this.handleClick.bind(this, 'sqrt')}>√</button>
          <button className="lightGray" onClick={this.handleClick.bind(this, 4)}>4</button>
          <button className="lightGray" onClick={this.handleClick.bind(this, 5)}>5</button>
          <button className="lightGray" onClick={this.handleClick.bind(this, 6)}>6</button>
          <button className="darkGray" onClick={this.handleClick.bind(this, '*')}>x</button><br/>
          <button className="darkGray" onClick={this.handleClick.bind(this, 'percent')}>%</button>
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
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
