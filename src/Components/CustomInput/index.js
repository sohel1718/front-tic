const CustomInput = ({ handleChange, name, setError }) => {
    return (
        <div className="form-box__wrapper__game-name">
            <input onFocus={() => setError(null)} onChange={ (e) => handleChange('name', e.target.value) } value={name} type="text" placeholder="Display Name" />
        </div>
    )
}

export default CustomInput