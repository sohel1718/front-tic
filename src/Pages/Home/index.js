import React from 'react';
import Background from '../../Components/Background'
import './style.scss';

const Home = ({ history }) => {
    return (
        <Background>
            <div className="home">
                <div className="home__logo">
                    <img src="/images/tic-tac.png" alt="" />
                    <div className="home__logo__name">Tic Tac Toe</div>
                </div>
                <div className="home__start">
                    <button onClick={() => history.push('/player')}>Let's Start</button>
                </div>
            </div>  
        </Background>
    )   
}

export default Home