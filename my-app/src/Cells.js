/**
 *  세포들 컴포넌트
 */
import React, { Component } from "react";
import Cell from "./Cell";

//초기상태
const initialState = {
  row: [],
  col: [],
  cellsArray: []
};

export default class cells extends Component {
  state = initialState; //상태는 초기상태로 초기화

  onClick = e => this.updateCell(this.state.row, this.state.col); //계속하기를 클릭했을 때 세포를 업데이트한다.

  //살아있어야 할 세포를 표시하는데(행은 row 열은 col로 구분) 사용한다.
  setAliveCell = (row, col) => {
    this.setState({
      row: [...this.state.row, row],
      col: [...this.state.col, col]
    });
  };

  //세포를 초기화 한다.
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

  //세포를 다음 단계로 발전시키는데 사용하는 함수
  //거의 대부분의 일을 제일 중요한 함수이다.
  updateCell = (arrayRow, arrayCol) => {
    // 초기화가 제대로 안되었을 때가 발생하여 초기에 초기화를 다시 해주었다.
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

    //<br/> 태그를 덮어씌우거나 오버플로우하는 상황을 막기위한 대책
    const overflowVal = this.props.rows * cols - 2;
    let nextnextAlivedCell = [];
    nextAlivedCell = nextAlivedCell.map((val, index) => {
      if (
        val <= overflowVal &&
        val % cols !== Number(this.props.cols) &&
        val !== cols - 1 &&
        val > 0
      ) {
        console.log("Successfully splice: val: " + val + ", index: " + index);
        nextnextAlivedCell.push(val);
      }
      return null;
    });
    console.log("nextnextAlivedCell" + nextnextAlivedCell);

    // 다음 회차에 살아난 세포를 표시한다. 먼저 죽은 세포로 초기화한 후
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
    // 살아남은 세포를 표시한다.
    let col = [];
    let row = [];
    nextnextAlivedCell.forEach((val, index) => {
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

    //상태를 적용한다.
    console.log("after col:" + col);
    console.log("after row:" + row);
    this.setState({
      row: [...initialState.row, ...row],
      col: [...initialState.col, ...col],
      cellsArray: [...initialState.cellsArray, joined]
    });
  };

  //세포판 바꾸기를 누를 때 새로 초기화하는 함수
  changeMatrix = () => {
    this.setState({ ...this.state, ...initialState });
    this.initCell();
  };

  render() {
    return (
      <div className="cells">
        {this.state.cellsArray}
        <div className="btn-group btn-group-lg btn-cus-group fixed-top">
          <button className="btn btn-outline-dark" onClick={this.changeMatrix}>
            세포판 바꾸기
          </button>
          <button className="btn btn-outline-dark" onClick={this.onClick}>
            계속하기
          </button>
        </div>
      </div>
    );
  }
}
