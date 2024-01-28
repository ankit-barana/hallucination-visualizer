import React, { useState } from 'react'
import Instructions from './Instructions'
import ImageGenerator from './ImageGenerator'
import Finished from './Finished'

const Experiment = () => {
  const STEPS = Object.freeze({
    INSTRUCTIONS: '1',
    IMAGE_GENERATOR: '2',
    FINISHED: '3',
  })

  const [currentStep, setCurrentStep] = useState(STEPS.INSTRUCTIONS)

  const handleContinue = () => {
    setCurrentStep(STEPS.IMAGE_GENERATOR)
  }

  const handleImageGeneratorNoClick = () => {
    setCurrentStep(STEPS.FINISHED)
  }

  return (
    <div>
      {currentStep === STEPS.INSTRUCTIONS ? <Instructions onButtonClick={handleContinue} /> : null}
      {currentStep === STEPS.IMAGE_GENERATOR ? <ImageGenerator onNoClick={handleImageGeneratorNoClick} /> : null}
      {currentStep === STEPS.FINISHED ? <Finished/> : null}
    </div>
  )
}

export default Experiment