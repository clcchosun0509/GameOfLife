import React, { Component } from "react";
import Cell from "./Cell";

const initialState = {
  row: [],
  col: [],
  cellsArray: []
};

export default class cells extends Component {
  state = initialState;

  onClick = e => this.updateCell(this.state.row, this.state.col);

  setAliveCell = (row, col) => {
    this.setState({
      row: [...this.state.row, row],
      col: [...this.state.col, col]
    });
  };

  initCell = () => {
    let joined = [];
    for (let i = 0; i < this.props.rows; i++) {
      for (let j = 0; j < this.props.cols; j++) {
        joined.push(
          <Cell
            key={String(Math.random() * 100)}
            row={i}
            col={j}
            alive={false}
            setAliveCell={this.setAliveCell}
          />
        );
      }
      joined.push(<br key={i} />);
    }
    this.setState({ cellsArray: [initialState.cellsArray, joined] });
  };

  //탐색 대상 세포 주위에 몇개의 세포가 살아있는지 찾음
  alivedCellFinder = (val, cols, arr) => {
    let numOfAlivedCell = 0;
    if (arr.indexOf(val - cols - 1) !== -1) numOfAlivedCell++;
    if (arr.indexOf(val - cols) !== -1) numOfAlivedCell++;
    if (arr.indexOf(val - cols + 1) !== -1) numOfAlivedCell++;
    if (arr.indexOf(val - 1) !== -1) numOfAlivedCell++;
    if (arr.indexOf(val + 1) !== -1) numOfAlivedCell++;
    if (arr.indexOf(val + cols - 1) !== -1) numOfAlivedCell++;
    if (arr.indexOf(val + cols) !== -1) numOfAlivedCell++;
    if (arr.indexOf(val + cols + 1) !== -1) numOfAlivedCell++;
    return numOfAlivedCell;
  };

  updateCell = (arrayRow, arrayCol) => {
    arrayRow = [...this.state.row];
    arrayCol = [...this.state.col];
    console.log(arrayRow);
    console.log(arrayCol);
    const cols = Number(this.props.cols) + 1; //br태그 포함해서 열에 포함
    let alivedCell = []; //살아있는 세포 배열
    let unsearchedCell = []; //죽어있는 세포 배열도 포함된 탐색에 쓰일 세포 배열
    let nextAlivedCell = []; //다음 기회에 살 수있는 세포 배열
    arrayRow.forEach((row, index) => {
      //살아있는 세포 탐색
      const rowMulCol = row * cols + arrayCol[index];
      alivedCell.push(rowMulCol);
    });

    alivedCell.forEach((val, index) => {
      //살아있는 세포 주위의 세포 탐색
      unsearchedCell.push(val - cols - 1);
      unsearchedCell.push(val - cols);
      unsearchedCell.push(val - cols + 1);
      unsearchedCell.push(val - 1);
      unsearchedCell.push(val + 1);
      unsearchedCell.push(val + cols - 1);
      unsearchedCell.push(val + cols);
      unsearchedCell.push(val + cols + 1);
    });

    //alivedCell 정렬하기
    alivedCell = alivedCell
      .slice()
      .sort((a, b) => {
        return a - b;
      })
      .reduce((a, b) => {
        if (a.slice(-1)[0] !== b) a.push(b);
        return a;
      }, []);
    console.log("alivedCell:" + alivedCell);

    //unsearchedCell 정렬하기
    unsearchedCell = unsearchedCell
      .slice()
      .sort((a, b) => {
        return a - b;
      })
      .reduce((a, b) => {
        if (a.slice(-1)[0] !== b) a.push(b);
        return a;
      }, []);
    console.log("unsearchedCell:" + unsearchedCell);

    //unsearchedCell에 있는 값중 alivedCell에 있는 값을 찾아내서 삭제. 즉, 죽어있는 세포만으로 배열을 구성
    unsearchedCell = unsearchedCell.filter(val => !alivedCell.includes(val));
    console.log("after unsearchedCell:" + unsearchedCell);

    //unsearchedCell에서 다음에 부활할 세포를 탐색
    unsearchedCell.forEach((val, index) => {
      let cell = this.alivedCellFinder(val, cols, alivedCell);
      if (cell === 3) {
        nextAlivedCell.push(val);
      }
    });

    //alivedCell에서 다음에 살 수 있는 세포를 탐색
    alivedCell.forEach((val, index) => {
      let cell = this.alivedCellFinder(val, cols, alivedCell);
      if (cell === 3 || cell === 2) {
        nextAlivedCell.push(val);
      }
    });
    console.log("nextAlivedCell:" + nextAlivedCell);
    let joined = [];
    for (let i = 0; i < this.props.rows; i++) {
      for (let j = 0; j < this.props.cols; j++) {
        joined.push(
          <Cell
            key={String(Math.random() * 100)}
            row={i}
            col={j}
            alive={false}
            setAliveCell={this.setAliveCell}
          />
        );
      }
      joined.push(<br key={i} />);
    }
    let col = [];
    let row = [];
    nextAlivedCell.forEach((val, index) => {
      let tempRow = parseInt(val / cols, 10);
      let tempCol = val % cols;
      row.push(tempRow);
      col.push(tempCol);
      joined.splice(
        val,
        1,
        <Cell
          key={String(Math.random() * 100)}
          row={tempRow}
          col={tempCol}
          alive={true}
          setAliveCell={this.setAliveCell}
        />
      );
    });

    console.log("after col:" + col);
    console.log("after row:" + row);
    this.setState({
      row: [...initialState.row, ...row],
      col: [...initialState.col, ...col],
      cellsArray: [...initialState.cellsArray, joined]
    });
  };

  changeMatrix = () => {
    this.initCell();
  };

  render() {
    return (
      <div className="cells">
        {this.state.cellsArray}
        <button onClick={this.changeMatrix}>바꾸기</button>
        <button onClick={this.onClick}>시작하기</button>
      </div>
    );
  }
}
