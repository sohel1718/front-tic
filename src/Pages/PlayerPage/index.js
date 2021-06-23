import React,{ useState, useEffect } from 'react';
import Background from '../../Components/Background';
import CustomInput from '../../Components/CustomInput';
import randomstring from 'randomstring';
import AvtarSelection from '../../Components/AvtarSelection';
import './style.scss';

const PlayerPage = ({ history }) => {
    const [data, setData] = useState({name: null, avtar: null, gameType: null, roomName: null, toggle: false, user: null});
    const [joinCode, setJoin] = useState();
    const [step, setStep] = useState(1);
    const [selected, setSelected] = useState(false);
    const [room, setRoom] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const persistData = JSON.parse(localStorage.getItem('state'));
        if (persistData && "avtar" in persistData) {
            setData(persistData);
            setSelected(persistData.selected)
        }
    },[]);

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

    const createRoom = (type) => {
        if (type === "create") {
            let randomNumber = Math.floor((Math.random() * 100000) + 1);
            let randomString = randomstring.generate();
            let roomName = randomNumber + randomString;
            let temp = {...data, roomName, selected, player: "player1"}; 
            setData(temp);
            localStorage.setItem('state', JSON.stringify(temp))
            history.push('/game-page')
        } else if (type === "join") {
            if (!room) {
                setError("Please Enter a Room Name")
            } else {
                let temp = {...data, roomName: joinCode, selected, player: "player2"};
                setData(temp);
                localStorage.setItem('state', JSON.stringify(temp))
                history.push('/game-page')
            }
        } else if (type === "resume") {
            localStorage.setItem('state', JSON.stringify(data))
            history.push('/game-page')
        }
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
                               {
                                   step !== 1 &&  <img onClick={() => handleNext('back')} src="/images/undo.png" alt="" />
                               }
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
                    step === 3 && !data.roomName && (
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
                                    <button onClick={() => createRoom('create')}>Create Room</button>
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
                    step === 3 && data.roomName && (
                        <button className="form-box__resume-btn" onClick={() => createRoom('resume')}>Resume</button>
                    )
                }
                {
                    room === 'join' && (
                        <div className="form-box__create">
                            <input onChange={(e) => setJoin(e.target.value)} type="text" placeholder="Enter room name" />
                            <button onClick={() => createRoom('join')}>Join</button>
                        </div>
                    )
                }
           </div>
       </Background>
    )
}

export default PlayerPage