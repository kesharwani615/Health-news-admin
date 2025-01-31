import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";

const Comfirm = ({ message,show, handleClose,setShow,handleTrndingClose,handleTrndingShow,handleReset}) => {

  const [state,setState] = useState(false);

  console.log("message:",message);

  const handleFunCall = () =>{
    if(message === 'do you want move this to trending ?')
      handleTrndingClose(state);
    else if('do you want change status ?')
      handleClose();
  }

  if(!handleReset){
    handleReset = ()=>{}
  }

  return (
    <>
     <Modal show={show}>
        <Modal.Body style={{margin:'5px'}}>
        <div
          href="javascript:void(0);"
          className="CloseModal"
          data-dismiss="modal"
          style={{float:'right',cursor:'pointer'}}
          onClick={()=>setShow(false)}
        >
          ×
        </div>

          <h3>Are you sure</h3>
          <p style={{fontWeight:'400',fontSize:'16px',color:'roboto'}}>{message}</p>
          <div className="TwoButton">
            <button onClick={()=> {
              setShow(false)
              setState(false)
              handleReset();
              }} className="Button" data-dismiss="modal">
              No
            </button>
            <button className="Button Cancel" onClick={()=>{
              handleFunCall(true)
              setState(true)
              }}> 
              Yes
            </button>
          </div>
        </Modal.Body>
      </Modal> 
    </>
  )
}

export default Comfirm
