import React from 'react'
import ReactDOM from 'react-dom'
import SocketIOClient from 'socket.io-client'
import './index.css'

function Square(props) {
    return (
        <button className="square">{props.value}</button>
    )
}

class Board extends React.Component {
    renderSquare(key, i) {
        return <Square key={key} value={i} />
    }
    renderBoard(squares) {
        var board = []
        for (let i = 0; i < 9; i++) {
            var row = []
            for (let j = 0; j < 9; j++) {
                row.push(this.renderSquare(i * 9 + j, squares[i * 9 + j]))
            }
            board.push(
                <div key={i} className="board-row">{row}</div>
            )
        }
        return board
    }
    render() {
        return (
            <div>{this.renderBoard(Array(81).fill(null))}</div>
        )
    }
}

class Game extends React.Component {
    constructor() {
        super()
        this.state = {
            status: 'Connecting to server...'
        }
        console.log('k')
    }

    componentDidMount() {
        const socket = SocketIOClient()
        socket.on('connected', () => {
            this.setState({status: 'Connected to server'})
        })
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{this.state.status}</div>
                    <ol>{/*moves*/}</ol>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Game />, document.getElementById('root'))