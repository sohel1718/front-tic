import React, { useState } from 'react';
import Background from '../../Components/Background'
import CustomInput from '../../Components/CustomInput'
import AvtarSelection from '../../Components/AvtarSelection'
import './style.scss';

const PlayerPage = ({ history }) => {
    const [data, setData] = useState({name: null, avtar: null, gameType: null, roomName: null});
    const [step, setStep] = useState(1);
    const [selected, setSelected] = useState(false);
    const [play, setPlay] = useState(false);
    const [room, setRoom] = useState(null);
    const [error, setError] = useState(null);

    const handleNext = (type) => {
        if (type === 'back') {     
            if (step === 1) {
                return false
            } else {
                setStep(step - 1);
            }
        } else if (type === 'next') {
            if (step === 1 && !data.name) {
                setError("Please Enter Name");
            } else if (step === 2 && !data.avtar) {
                setError("Please Select Your avtar");
            } else {
                setStep(step + 1);
            }
        }
    }

    const handleChange = (name, type, id = undefined) => {
        setData({...data, [name]: type});
        if (id) {
            setSelected(id);
            setError("");
        }
    }

    const createRoom = () => {
        history.push('/game-page')
    }

    return (
       <Background>
           <div className="form-box">
               <div className="form-box__logo">
                  <img src="/images/tic-tac.png" alt="" />
               </div>
                {
                    step !== 3 && (
                        <div className="form-box__wrapper">
                            <div className="form-box__wrapper__back">
                                <img onClick={() => handleNext('back')} src="/images/undo.png" alt="" />
                            </div>
                            {
                                step === 1 && (
                                        <CustomInput setError={setError} handleChange={handleChange} name={data.name} />
                                )
                            }
                            <div className="form-box__wrapper__select-avtar">
                            {
                                step === 2 && (
                                    <AvtarSelection handleChange={handleChange} data={data} selected={selected} />
                                )
                            }
                            <div className="form-box__wrapper__error">{error}</div>
                                <div className="form-box__wrapper__select-avtar__btn">
                                        <button onClick={() => handleNext('next')}>Next</button>
                                    </div>
                            </div>
                        </div>
                    )
                }
                {
                    step === 3 && (
                        !data.gameType ? (
                            <div className="form-box__selectPlayer">
                                <div className="form-box__selectPlayer__types">
                                    <div className="form-box__selectPlayer__types__name-1">Single Player</div>
                                    <div onClick={() => handleChange('gameType', 'multiplayer')} className="form-box__selectPlayer__types__name-2">MultiPlayer</div>
                                    <div onClick={() => handleNext('back')} className="form-box__selectPlayer__types__name-3">back</div>
                                </div>
                            </div>
                        ) :
                        data.gameType && !room && (
                            <div className="form-box__joinRoom">
                                <div className="form-box__joinRoom__btn">
                                    <button onClick={() => setRoom('create')}>Create Room</button>
                                </div>
                                <span>OR</span>
                                <div className="form-box__joinRoom__btn">
                                    <button onClick={() => setRoom('join')}>Join Room</button>
                                </div>
                            </div>
                        )
                    )
                }
                {
                   room === 'create' && (
                        <div className="form-box__create">
                            <input onChange={(e) => handleChange('roomName', e.target.value)} type="text" placeholder="Enter room name" />
                            <button onClick={() => createRoom()}>Create</button>
                        </div>
                   ) 
                }
                {
                    room === 'join' && (
                        <div className="form-box__create">
                            <input onChange={(e) => handleChange('roomName', e.target.value)} type="text" placeholder="Enter room name" />
                            <button onClick={() => createRoom()}>Join</button>
                        </div>
                    )
                }
           </div>
       </Background>
    )
}

export default PlayerPage