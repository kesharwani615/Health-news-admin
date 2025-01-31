import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import {  useNavigate } from "react-router-dom";

const LogoutModal = ({ show, handleClose,setShow}) => {

    const navigate = useNavigate();
    const [isLogout,setIsLogout] = useState(false);

    useEffect(()=>{
      if(isLogout){
        console.log("called",isLogout);
        localStorage.clear();
        navigate('/login');
        setShow(false);
      }
    },[isLogout])

  return (
    <>
      <Modal show={show} onHide={handleClose}>
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

          <h3>Logout</h3>
          <p style={{fontWeight:'400',fontSize:'16px',color:'roboto'}}>Do you want to Logout ?</p>
          <div className="TwoButton">
            <button onClick={()=> setShow(false)} className="Button" data-dismiss="modal">
              No
            </button>
            <button className="Button Cancel" onClick={()=>setIsLogout(true)}> 
              Yes
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LogoutModal;
