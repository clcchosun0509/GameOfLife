import React, { Component } from "react";

export default class cell extends Component {
  state = {
    alive: this.props.alive
  };

  onClick = () => {
    if (!this.state.alive) {
      this.props.setAliveCell(this.props.row, this.props.col);
    }
    this.setState({
      alive: true
    });
  };

  render() {
    return (
      <div
        className={`cell ${this.state.alive ? "" : "red"}`}
        onClick={this.onClick}
      />
    );
  }
}
