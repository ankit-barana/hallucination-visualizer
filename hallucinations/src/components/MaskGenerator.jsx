import { useState, useEffect } from 'react'
import image from '/image.png'
import './stylesheet.css'

const MaskGenerator = () => {

    const [eraserSize, setEraserSize] = useState(20)
    const [showCircle, setShowCircle] = useState(false)

    useEffect(() => {
        if (showCircle) {
            const timer = setTimeout(() => {
                setShowCircle(false)
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [showCircle])

    // sets eraser size or circle radius to the current slider value
    const handleSlider = (e) => {
        setEraserSize(parseInt(e.target.value, 10))
        if (!showCircle) {
            setShowCircle(true)
        }
    }
    
    const handleMouseMove = (e) => {
        console.log('mouse moved!!');
        const { clientX, clientY } = e;
    
        // position relative to the image container
        const containerRect = document.querySelector('.image-loading').getBoundingClientRect();
        const containerX = clientX - containerRect.left;
        const containerY = clientY - containerRect.top;
    
        let circle = document.querySelector('.circle');
    
        if (!circle) {
            // Create the circle if it doesn't exist
            circle = document.createElement('div');
            circle.className = 'circle';
            document.querySelector('.image-loading').appendChild(circle);
        }
    
        circle.style.left = `${containerX}px`;
        circle.style.top = `${containerY}px`;
    
        setShowCircle(true);
    };
    

    const handleMouseLeave = (e) => {
        console.log("mouse left!")
        if (showCircle) {
            setShowCircle(false)
        }
    }


    const handleMouseDown = () => {
        const imageContainer = document.querySelector('.image-loading')
        const circle = document.querySelector('.circle')

        if (imageContainer && circle) {
            // creates a canvas and its 2d rendering
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d')

            // sets canvas dimentions to be the same as that of the image
            canvas.width = imageContainer.offsetWidth
            canvas.height = imageContainer.offsetHeight
            
            context.drawImage(imageContainer.querySelector('img'), 0, 0)
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height)

            // cooridnates of the circle's centre
            const circleX = parseFloat(circle.style.left)
            const circleY = parseFloat(circle.style.top)

            // iterates through the pixels within circle and sets their alpha value to 0
            // for () {

            // }

            // puts the edited image back on canvas
            context.putImageData(ImageData, 0, 0)

            // save and download the image
            

                

        }
    }

    return (
        <div className='image-generator'>
            <div className='image-loading' onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                {showCircle && (<div
                    className="circle"
                    style={{
                        width: `${eraserSize}px`,
                        height: `${eraserSize}px`
                    }}>
                </div>)}
                <img src={image} alt="surreal planet with an elephant flying without wings" draggable="false"/>
            </div> 
            <div className='slider-container'>
                <label htmlFor="">Eraser Size</label>
                <input
                    id='sizeSlider'
                    type="range"
                    min={20}
                    max={60}
                    step={1}
                    value={eraserSize}
                    onChange={handleSlider} />
            </div>
            <button id='myButton'>Submit</button>
        </div>
    )
}

export default MaskGenerator

