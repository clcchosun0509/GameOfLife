/**
 * 세포 컴포넌트
 */
import React, { Component } from "react";

export default class cell extends Component {
  state = {
    alive: this.props.alive //세포가 살아있다면 alive는 true이다.
  };

  //세포를 클릭했을 경우 Cells 부모 컴포넌트에게 행과 열을 알려주고 alive에 true를 준다.
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
        className={`cell ${this.state.alive ? "" : "red"}`} //만약 세포가 죽어있다면 red 클래스를 부여하고, 아니면 비어있는 String값을 부여한다.
        onClick={this.onClick}
      />
    );
  }
}
