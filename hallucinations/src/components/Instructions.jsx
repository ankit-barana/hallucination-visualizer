import React from 'react'
import './stylesheet.css'

const Instructions = ({onButtonClick}) => {
    return (
        <div className="instructions">

            <div className="welcome-msg">Welcome to the Powers Lab <br /> <span className='study-name'>Visual Hallucinations Study!</span></div>
            <div className="message">
                At the start of the experiment, you will be asked to describe what you see in your hallucinations.
                Based on your description, an image will be generated. <br /> <br /> You will then be asked if you want to
                modify the generated image, to which you can reply with 'yes' or 'no'. <br /> <br /> If you say yes, you will be asked to describe how you
                want to modify the image. <br /> <br /> This process will continue until you are satisfied with the generated image and reply with a no.
            </div>
            <div className="continue-btn" onClick={onButtonClick}>Continue</div>
        </div>
    )
}

export default Instructions