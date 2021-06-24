import React, { useEffect, useState } from 'react';
import Background from '../../Components/Background';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import { io } from 'socket.io-client';
import x from "../../images/cancel.png";
import o from "../../images/o.png";
import xwin from "../../images/x-win.png";
import owin from "../../images/o-win.png";
import bg from "../../images/status-bg.jpg";
import reset from "../../images/refreshing.png";
import './style.scss';

const  socket = io('http://localhost:8000');

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const initialData = [
            {
                id: 1,
                img: null,
            },
            {
                id: 2,
                img: null,
            },
            {
                id: 3,
                img: null,
            },
            {
                id: 4,
                img: null,
            },
            {
                id: 5,
                img: null,
            },
            {
                id: 6,
                img: null,
            },
            {
                id: 7,
                img: null,
            },
            {
                id: 8,
                img: null,
            },
            {
                id: 9,
                img: null,
            }
];

const GamePage = () => {
    const persistData = JSON.parse(localStorage.getItem('state'));
    const gameInfo = JSON.parse(localStorage.getItem('gameInfo'));
    const turnInfo = localStorage.getItem('turnInfo');
    const winnerInfo = localStorage.getItem('winner');
    const [toggle, setToggle] = useState(persistData.toggle);
    const [user, setUser] = useState(persistData.user);
    const [turn, setTurn] = useState(turnInfo || "player1");
    const [gameData, setGameData] = useState(gameInfo || initialData);
    const [winner, setWinner] = useState(winnerInfo || null);

    socket.on('receive-info', data => {
        let temp = {...persistData}
        temp = {...temp, user: data};
        localStorage.setItem('state', JSON.stringify(temp))
        setUser(data);
    })



    useEffect(() => {
        socket.emit('join-room', persistData, cb => {
            console.log("")
        })
    });

    const handleWinner = (newPlayer, changeTemp) => {
        let win = "";
        let temp = [...changeTemp];
        let count = 0;
        for(let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            let a = gameData[winCondition[0]].img;
            let b = gameData[winCondition[1]].img;
            let c = gameData[winCondition[2]].img;
            if (a && b && c) {
                count++;
                if ( a === b && b === c ) {
                    if (a === x) {
                        temp[winCondition[0]]['img'] = xwin;
                        temp[winCondition[1]]['img'] = xwin;
                        temp[winCondition[2]]['img'] = xwin; 
                        win = "player1";
                        setWinner("player1");
                        setGameData(gameData);
                        socket.emit('send-game-info', temp, "", persistData.roomName, win);
                        localStorage.setItem('gameInfo', JSON.stringify(temp));
                        localStorage.setItem('winner', win)
                        localStorage.setItem('turnInfo', "");
                    } else if (a === o) {
                        temp[winCondition[0]]['img'] = owin;
                        temp[winCondition[1]]['img'] = owin;
                        temp[winCondition[2]]['img'] = owin;
                        win = "player2";
                        setWinner("player2"); 
                        setGameData(gameData);
                        socket.emit('send-game-info', temp, "", persistData.roomName, win);
                        localStorage.setItem('gameInfo', JSON.stringify(temp));
                        localStorage.setItem('winner', win)
                        localStorage.setItem('turnInfo', "");
                    }
                } else if (count === 7) {
                    win = "Match Drawn!";
                    setWinner("Match Drawn!");
                    setGameData(gameData);
                    socket.emit('send-game-info', temp, "", persistData.roomName, win);
                    localStorage.setItem('gameInfo', JSON.stringify(temp));
                    localStorage.setItem('winner', win)
                    localStorage.setItem('turnInfo', "");
                }
            }
            
        }
        if (win === "") {
            setGameData(gameData);
            setTurn(newPlayer);
            socket.emit('send-game-info', temp, newPlayer, persistData.roomName);
            localStorage.setItem('gameInfo', JSON.stringify(temp))
            localStorage.setItem('turnInfo', newPlayer)
        }
    }

    

    const sendInfo = () => {
        socket.emit('send-info', persistData);
        let temp = {...persistData}
        temp = {...temp, toggle: true};
        localStorage.setItem('state', JSON.stringify(temp))
        setToggle(true);
    }

    socket.on('receive-game-info', (game, turn, winner) => {
        setGameData(game);
        setTurn(turn);
        localStorage.setItem('gameInfo', JSON.stringify(game))
        localStorage.setItem('turnInfo', turn)
        setWinner(winner);
    })

    const handlePlay = (e) => {
        if (e.target.id) {
            let temp = [...gameData];
            let index = temp.findIndex(data => data.id === +e.target.id);
            if (turn === persistData.player &&  !temp[index]['img']) {
                let newPlayer = "";
                turn === "player1" ? temp[index]['img'] = x : temp[index]['img'] = o;
                turn === "player1" ? newPlayer = "player2" : newPlayer = "player1" 
                handleWinner(newPlayer, temp);
            } 
        }
    }

    const handleReset = () => {
        setGameData(initialData);
        setTurn("player1");
        setWinner("");
        localStorage.setItem('gameInfo', JSON.stringify(initialData))
        localStorage.setItem('turnInfo', "");
        localStorage.setItem('winner', "");
        socket.emit('send-game-info', initialData, "player1", persistData.roomName, "");
    } 
    
    return (
        <Background>
            <div className="container">
                <div className="container__wrapper">
                    <div className="container__wrapper__room-code">
                        <div id="left" onClick={() => navigator.clipboard.writeText(persistData.roomName)}>JoinCode</div>
                        <div id="right">{persistData.roomName}</div>
                    </div>
                    <div className="container__wrapper__game-board">
                        {
                            winner && <div className="winnerImg">
                                <img className="top" src={persistData.avtar} alt="" />
                                <img src={bg} alt="" />
                                <img onClick={() => handleReset()} className="bottom" src={reset} alt="" />
                                {
                                    winner !== "Match Drawn!" && <div className="winnerMessage">{winner === persistData.player ? "You Win!" : "You Lose!"}</div>
                                }
                                {
                                    winner === "Match Drawn!" && <div className="winnerMessage">{winner}</div>
                                }
                            </div>
                        }
                        {
                           !winner && gameData.map(data => {
                                    return (
                                        <div key={data.id} id={data.id} onClick={(e) => handlePlay(e)} className="container__wrapper__game-board__box">
                                           {
                                               data.img &&  <img src={data.img} alt="" />
                                           }
                                        </div>
                                    )
                            })
                        }
                    </div>
                    
                    <div className="container__wrapper__players">
                           <div className="container__wrapper__players__info">
                                {
                                    turn === persistData.player && (
                                        <div className="container__wrapper__players__info__turn">
                                            <img src="./images/down.png" alt="" />
                                        </div>
                                    )
                                }
                                <div className="container__wrapper__players__info__one">
                                    <img src={persistData.avtar} alt="" />
                                    <span>{persistData.name}</span>
                                    <div id="sel-x">
                                        <img src="/images/cancel.png" alt="" />
                                    </div>
                                </div>
                                {
                                    turn === persistData.player && (
                                        <div id="turn-info">Your Turn</div>
                                    )
                                }   
                           </div>
                        {
                           !toggle && <img id="power-btn" onClick={() => sendInfo()} src="/images/power-button.png" alt="" />  
                        }
                        {
                            !user && toggle && (
                                <Loader
                                    type="Puff"
                                    color="#00BFFF"
                                    height={100}
                                    width={100}
                                />
                            )
                        }
                        {
                            (user && toggle) && (
                                 <div className="container__wrapper__players__info">
                                    <div className="container__wrapper__players__info__one">
                                        <img src={user.avtar} alt="" />
                                        <span>{user.name}</span>
                                        <div id="sel-x">
                                            <img src="/images/o.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </Background>
    )
}

export default GamePage