import './stylesheet.css'

import React from 'react'

const Finished = () => {
  return (
    <div className='last-page'>
      <div className='completion-message'>
        <span className="thank-you">Thank you for your participation!</span><br/>
        You are done with the experiment. <br /> We will be in touch with you soon.
      </div>
    </div>
  )
}

export default Finished