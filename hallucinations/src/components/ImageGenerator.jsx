import React, { useRef, useState } from 'react';
import axios from 'axios';
import './stylesheet.css';
import default_image from '../assets/default_image.jpg';

const ImageGenerator = ({onNoClick}) => {

    const [showSearchBox, setShowSearchBox] = useState(true);
    const [showYesNoBtns, setShowYesNoBtns] = useState(false);
    const [isFirstIteration, setIsFirstIteration] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isInputEmpty, setIsInputEmpty] = useState(false);
    const [imageURL, setImageURL] = useState("");
    let inputRef = useRef(null);

    const handleYesClick = () => {
        setShowYesNoBtns(false);
        setShowSearchBox(true);
    };

    // generates image
    const generateImage = async () => {
        // if no input is given, an error is shown
        if (!inputRef.current.value.trim()) { 
            setIsInputEmpty(true)
            return
        }
        setIsInputEmpty(false);
        setLoading(true) 
        
        try {
            const response = await axios.post("http://localhost:5300/openai/generate", { description: inputRef.current.value });
            setImageURL(response.data.imageURL)
        } catch (err) {
            console.log(err);
        }
        
        // continues to ask the use if they want to modify the generated image
        setShowYesNoBtns(true)
        setShowSearchBox(false)
        setLoading(false)
        setIsFirstIteration(false)
    }

    // modifies the given image
    const modifyImage = async () => {
        // if no input is given, an error is shown
        if (!inputRef.current.value.trim()) {
            setIsInputEmpty(true)
            return
        }
        setIsInputEmpty(false);
        setLoading(true)

        try {
            const response = await axios.post("http://localhost:5300/openai/modify", { description: inputRef.current.value });
            setImageURL(response.data.imageURL)
        } catch (err) {
            console.log(err);
        }

        setShowYesNoBtns(true)
        setShowSearchBox(false)
        setLoading(false)
    }

    return (
        <div className='image-generator'>
            <div className='header'>
                {isFirstIteration ? 'Please describe what you see in your hallucinations' : (showYesNoBtns ? 'Would you like to make any changes to the image?' : 'Describe the changes you want to make.')}
            </div>
            <div className="image-loading">
                <div className="image"><img src={ imageURL || default_image} /></div>
            </div>

            {showYesNoBtns && (<div className='yes-no-btns'>
                <div className='no-btn' onClick={onNoClick}>No</div>
                <div className='yes-btn' onClick={handleYesClick}>Yes</div>
            </div>)}

            {showSearchBox && (
                <div className='search-box'>
                    {isInputEmpty ? (
                        <input type="text" ref={inputRef} className="search-input-error" placeholder='Input cannot be empty!' />
                    ) : (
                        <input type="text" ref={inputRef} className="search-input" placeholder='describe what you want to make' />
                    )}
                    {isFirstIteration ? (
                        <div className="generate-btn" onClick={modifyImage}>
                            {loading ? 'Generating' : 'Generate'}
                        </div>
                    ) : (
                        <div className="modify-btn" onClick={modifyImage}>
                            {loading ? 'Modifying' : 'Modify'}
                        </div>
                    )}
                </div>)}
        </div>
    );
}

export default ImageGenerator;