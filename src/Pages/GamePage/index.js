import Background from '../../Components/Background';
import './style.scss';

const GamePage = () => {
    return (
        <Background>
            <div className="container">
                <div className="container__wrapper">
                    <div className="container__wrapper__game-board">
                        <div className="container__wrapper__game-board__box"></div>
                        <div className="container__wrapper__game-board__box"></div>
                        <div className="container__wrapper__game-board__box"></div>
                        <div className="container__wrapper__game-board__box"></div>
                        <div className="container__wrapper__game-board__box"></div>
                        <div className="container__wrapper__game-board__box"></div>
                        <div className="container__wrapper__game-board__box"></div>
                        <div className="container__wrapper__game-board__box"></div>
                        <div className="container__wrapper__game-board__box"></div>
                    </div>
                    <div className="container__wrapper__turn">
                        <img src="./images/down.png" alt="" />
                    </div>
                    <div className="container__wrapper__players">
                        <div className="container__wrapper__players__one">
                            <img src="/images/tic-1.png" alt="" />
                            <span>Sohel</span>
                            <div id="sel-x">
                                <img src="/images/cancel.png" alt="" />
                            </div>
                        </div>
                        <div className="container__wrapper__players__one">
                            <img src="/images/tic-1.png" alt="" />
                            <span>Rahul</span>
                            <div id="sel-x">
                                <img src="/images/o.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Background>
    )
}

export default GamePage