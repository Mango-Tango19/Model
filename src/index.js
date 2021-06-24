import React, { Component, useReducer, useCallback, useEffect } from 'react'
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

const initialState = {
  params: [],
  paramValues: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_PARAM':
      return {
        ...state,
        params: [...state.params, action.payload],
      }
    case 'CHANGE_PARAMVALUE':
      return {
        ...state,
        paramValues: [...state.paramValues, action.payload],
      }
    default:
      return state
  }
}

const useModel = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const updateParam = useCallback((param = []) => dispatch({ type: 'CHANGE_PARAM', payload: param }), [])
  const updateParamValue = useCallback(
    (paramValue = []) => dispatch({ type: 'CHANGE_PARAMVALUE', payload: paramValue }),
    []
  )
  useEffect(() => {
    updateParam
  }, [updateParam])

  useEffect(() => {
    updateParamValue
  }, [updateParamValue])

  return {
    ...state,
    updateParam,
    updateParamValue,
  }
}
class Param extends Component {
  state = {
    id: '',
    param: '',
  }

  onParamChange = e => {
    const param = e.target.value
    this.setState({ param })
  }

  onIdChange = e => {
    const id = e.target.value
    this.setState({ id })
  }

  render() {
    updateParam = useModel()

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
        <button onClick={updateParam(this.state)}>update Param</button>
      </div>
    )
  }
}

class ParamValue extends Component {
  state = {
    id: '',
    paramValue: '',
  }

  onParamValueChange = e => {
    const paramValue = e.target.value
    this.setState({ paramValue })
  }

  onIdChange = e => {
    const id = e.target.value
    this.setState({ id })
  }
  render() {
    updateParamValue = useModel()
    return (
      <div>
        <input type="number" placeholder="enter ID" name="id" value={this.state.id} onChange={this.onIdChange} />
        <label htmlFor="id">Enter ID</label>
        <input type="text" placeholder="enter paramValue" name="paramValue" onChange={this.onParamValueChange} />
        <label htmlFor="paramValue">Enter Param</label>
        <button onClick={updateParamValue(this.state)}>update ParamValue</button>
      </div>
    )
  }
}

class Model extends Component {
  state = {
    paramValues: [],
  }

  paramValues = useModel()

  render() {
    return null
  }
}

class ParamEditor extends Component {
  getModel = (model, params) => {}

  render() {
    const { model, params } = this.props
    return <div></div>
  }
}

class App extends Component {
  render() {
    return <ParamEditor params={params} model={model} />
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
