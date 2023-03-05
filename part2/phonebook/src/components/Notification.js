const Notification = ({ message }) => {
    if (message[0] !== null) {

        if (message[1] === true) {
            return (
                <div className='info'>
                    {message}
                </div>
            )
        }

        if (message[1] === false) {
            return (
                <div className='error'>
                    {message}
                </div>
            )
        }
    }
  
    
  }
  
  export default Notification