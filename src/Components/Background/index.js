import React from 'react';
import './style.scss';

const Background = (props) => {
    return (
       <>
       <div class="page-bg"></div>

        <div class="animation-wrapper">
            <div class="page-wrapper"> 
                {props.children}
            </div>
            <div class="particle particle-1"></div>
            <div class="particle particle-2"></div>
            <div class="particle particle-3"></div>
            <div class="particle particle-4"></div>
        </div>
       </>
    )
}

export default Background