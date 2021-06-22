const AvtarSelection = ({ selected, handleChange }) => {
    return (
        <>
            <div className="form-box__wrapper__select-avtar__wrapper">
                    <img className={`${selected === 1 ? "selected" : ""}`} onClick={(e) => handleChange('avtar', e.target.src, 1)} src="/images/av1.jfif" alt="" />
                    <img className={`${selected === 2 ? "selected" : ""}`} onClick={(e) => handleChange('avtar', e.target.src, 2)} src="/images/av2.jfif" alt="" />
                    <img className={`${selected === 3 ? "selected" : ""}`} onClick={(e) => handleChange('avtar', e.target.src, 3)} src="/images/av3.jfif" alt="" />
                    <img className={`${selected === 4 ? "selected" : ""}`} onClick={(e) => handleChange('avtar', e.target.src, 4)} src="/images/av4.jfif" alt="" />
                    <img className={`${selected === 5 ? "selected" : ""}`} onClick={(e) => handleChange('avtar', e.target.src, 5)} src="/images/av5.png" alt="" />
                    <img className={`${selected === 6 ? "selected" : ""}`} onClick={(e) => handleChange('avtar', e.target.src, 6)} src="/images/av6.jfif" alt="" />
                    <img className={`${selected === 7 ? "selected" : ""}`} onClick={(e) => handleChange('avtar', e.target.src, 7)} src="/images/av7.jfif" alt="" />
                    <img className={`${selected === 8 ? "selected" : ""}`} onClick={(e) => handleChange('avtar', e.target.src, 8)} src="/images/av8.jfif" alt="" />
                    <img className={`${selected === 9 ? "selected" : ""}`} onClick={(e) => handleChange('avtar', e.target.src, 9)} src="/images/av9.jfif" alt="" />
                    <img className={`${selected === 10 ? "selected" : ""}`} onClick={(e) => handleChange('avtar', e.target.src, 10)} src="/images/av10.jfif" alt="" />
                    <img className={`${selected === 11 ? "selected" : ""}`} onClick={(e) => handleChange('avtar', e.target.src, 11)} src="/images/av11.jfif" alt="" />
            </div>
        </>
    )
}

export default AvtarSelection