import React, { Component } from 'react'
import ReactDOM from 'react-dom'

// interface Param {
//   id: number;
//   name: string;
//   type: ‘string’;
// }
// interface ParamValue {
//    paramId: number;
//    value: string;
// }
// interface Model {
//    paramValues: ParamValue[];
//    colors: Color[];
// }
// interface Props {
//    params: Param[];
//    model: Model;
// }
// class ParamEditor extends React.Component<Props, State> {
//    public getModel(): Model {
//    }
// }

// const getParam = (param: Param) {
//   console.log(param.id);
// }

class Param extends Component {
  state = {
    id: '',
    param: '',
  }

  onParamChange = e => {
    const param = e.target.value
    this.setState({ param }, this.props.addParam(this.state))
  }

  onIdChange = e => {
    const id = e.target.value
    this.setState({ id })
  }

  render() {
    return (
      <div>
        <input type="number" placeholder="enter ID" name="id" value={this.state.id} onChange={this.onIdChange} />
        <label htmlFor="id">Enter ID</label>
        <br></br>
        <input
          type="text"
          placeholder="enter param"
          name="param"
          value={this.state.param}
          onChange={this.onParamChange}
        />
        <label htmlFor="param">Enter Param</label>
        <ParamValue id={this.state.id} addParamValues={this.props.addParamValues} />
      </div>
    )
  }
}

class ParamValue extends Component {
  state = {
    paramValue: '',
    id: '',
  }

  onParamValueChange = e => {
    const paramValue = e.target.value
    this.setState({ paramValue })
    this.setState({ id: this.props.id })
  }

  clearInput = () => {
    this.setState({ paramValue: '' })
    this.setState({ id: '' })
  }

  handleClick = () => {
    this.props.addParamValues(this.state)
    this.clearInput()
  }

  render() {
    return (
      <div>
        <input type="text" placeholder="enter paramValue" name="paramValue" onChange={this.onParamValueChange} />
        <label htmlFor="paramValue">Enter ParamValue</label> <br></br>
        <button onClick={this.handleClick}>add Params</button>
        <br></br>
      </div>
    )
  }
}

class Model extends Component {
  renderParamValue = arr => {
    return arr.map(item => {
      return (
        <div>
          <span key={item.id}>
            paramId : {item.id}, value: {item.paramValue}
          </span>
        </div>
      )
    })
  }
  render() {
    return (
      <div>
        <span>Model is</span>
        <div>{this.renderParamValue(this.props.paramsValues)}</div>
      </div>
    )
  }
}

class ParamEditor extends Component {
  state = {
    paramValue: [],
    param: [],
    getModel: false,
  }

  addParam = val => {
    this.setState({ param: [...this.state.param, val] }, () => {})
  }

  addParamValues = val => {
    this.setState({ paramValue: [...this.state.paramValue, val] }, () => {})
  }

  handleModel = () => {
    this.setState({ getModel: true }, () => {})
  }

  render() {
    return (
      <div>
        <Param addParam={this.addParam} addParamValues={this.addParamValues} />
        <button onClick={this.handleModel}>Get Model</button>
        {this.state.getModel ? this.props.render(this.state.paramValue) : null}
      </div>
    )
  }
}

class App extends Component {
  render() {
    return <ParamEditor render={paramsValues => <Model paramsValues={paramsValues} />} />
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
