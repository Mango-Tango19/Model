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
    this.setState({ param })
    //console.log(this.state.param)
  }

  onIdChange = e => {
    const id = e.target.value
    this.setState({ id })
    //console.log(this.state.id)
  }

  handleState = () => {
    this.props.getParam(this.state)
  }

  render() {
    return (
      <div>
        <input type="number" placeholder="enter ID" name="id" value={this.state.id} onChange={this.onIdChange} />
        <label htmlFor="id">Enter ID</label>
        <input
          type="text"
          placeholder="enter param"
          name="param"
          value={this.state.param}
          onChange={this.onParamChange}
        />
        <label htmlFor="param">Enter Param</label>
        <button onClick={this.handleState}>update Param</button>
      </div>
    )
  }
}

class ParamValue extends Component {
  state = {
    paramValue: '',
  }

  onParamValueChange = e => {
    const paramValue = e.target.value
    this.setState({ paramValue })
  }

  handleState = () => {
    this.props.getParamValue(this.state)
  }

  render() {
    return (
      <div>
        <input type="text" placeholder="enter paramValue" name="paramValue" onChange={this.onParamValueChange} />
        <label htmlFor="paramValue">Enter Param</label>
        <button onClick={this.handleState}>update ParamValue</button>
      </div>
    )
  }
}

class Model extends Component {
  renderParamValue = () => {
    return this.props.paramsValues.map(item => {
      return <span key={item.id}>{item.value}</span>
    })
  }
  render() {
    return <div>{this.renderParamValue(this.props.paramsValues)}</div>
  }
}

class ParamEditor extends Component {
  state = {
    paramValue: [],
    param: [],
  }

  getParam = val => {
    debugger
    this.setState((state, val) => ({
      param: [...state.param, val],
    }))
    console.log(this.state)
  }

  getParamValue = val => {
    this.setState({
      paramValue: val,
    })
    //console.log(this.state)
  }
  render() {
    return (
      <div>
        <Param getParam={this.getParam} />
        <ParamValue getParamValue={this.getParamValue} />
        {this.props.render(this.state.paramValue)}
      </div>
    )
  }
}

class App extends Component {
  render() {
    return <ParamEditor render={paramsValues => <Model paramsValues={paramsValues} />} />
    //return <ParamEditor />
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
