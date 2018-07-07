import React, { Component } from "react";

import Cells from "./Cells";
import "./App.css";

class App extends Component {
  state = {
    rows: "",
    cols: ""
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  render() {
    return (
      <div className="App">
        <div className="form-row justify-content-center">
          <h3 className="col-md-12">GAME OF LIFE!</h3>
          <div className="input-group col-md-2">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                행
              </span>
            </div>
            <input
              type="number"
              className="form-control no-spinners"
              name="rows"
              value={this.state.rows}
              onChange={this.onChange}
            />
          </div>
          <div className="input-group col-md-2">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                열
              </span>
            </div>
            <input
              type="number"
              className="form-control no-spinners"
              name="cols"
              value={this.state.cols}
              onChange={this.onChange}
            />
          </div>
        </div>

        <div>
          <Cells
            rows={this.state.rows}
            cols={this.state.cols}
            start={this.state.start}
          />
        </div>
      </div>
    );
  }
}

export default App;
