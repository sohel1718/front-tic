import React from 'react';
import './style.scss';

const Home = ({ history }) => {
    return (
        <div className="white">
            <div className="squares">
            <div className="bg">
                <img height="100px" width="100px" src="/images/tic-tac-toe.png" alt="" />
                <span>TIC-TAC-TOE</span>
            </div>
            <div className="dev">
                <div className="btn-box">
                    <button onClick={() => history.push('/player')} >Getting Started</button>
                    <span>#Developed by @_sohel.chhipa</span>
                </div>
                <img height="100px" width="100px" src="/images/bat.png" alt="" />
            </div>
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
            </div>

        </div>
    )   
}

export default Home