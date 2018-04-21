import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import './List.css'
import { fetchData } from '~/actions'
import FilterWorker from '~/workers/filter.worker.js'

const worker = new FilterWorker()

class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pattern: '',
      data: [],
    }
    this.handleInput = this.handleInput.bind(this)
    worker.addEventListener('message', e => this.setState({ data: e.data }))
  }

  componentDidMount() {
    let count = 0
    const interval = setInterval(() => {
      if (count > 200) clearInterval(interval)
      this.props.fetchData()
      count++
    }, 0)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data })
  }

  handleInput(e) {
    const pattern = e.target.value
    this.setState({ pattern })
    worker.postMessage({
      pattern: e.target.value,
      data: this.props.data,
    })
  }

  render() {
    return (
      <div className="List">
        <input
          type="text"
          value={this.state.pattern}
          onChange={this.handleInput}
        />
        <ul>
          {
            this.state.data.map(i => <li key={i.first + i.last}>{i.first}, {i.last}</li>)
          }
        </ul>
      </div>
    )
  }
}

export default connect(state => ({ data: state.sample.data }), { fetchData })(List);
