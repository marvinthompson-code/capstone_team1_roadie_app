import React, { useEffect } from 'react'
import EventForm from './EventForm'
const CreateEvent = () => {


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

    return (
        <div className="createEvent container">
            <EventForm />
            <div className={"description"}>
                
            </div>
        </div>
    )
}

export default CreateEvent
