import React, { Component } from "react";

export default class cell extends Component {
  state = {
    alive: false
  };

  onClick = () => {
    if (!this.state.alive) {
      this.props.setAliveCell(this.props.row, this.props.col);
    }

    this.setState({
      alive: !this.state.alive
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
