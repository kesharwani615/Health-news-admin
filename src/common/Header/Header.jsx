import React, { useState } from 'react'
import LogoutModal from '../Logout Modal/LogoutModal';

const Header = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
  };

  return (
    <>
     <div className="Header">
  <div className="Logo">
  <img src={require('../../assets/images/Logo.jpg')} />
  </div>
  <div className="Navigation">
    <div className="Avater">
      <a href="javascript:void(0);">
        <figure>
        <img src={require('../../assets/images/profile.jpg')} />
          {/* <img src="images/profile.jpg" /> */}
        </figure>
        Admin
      </a>
      <ul>
        {/* <li>
          <figure>
          <img src={require('../../assets/images/profile.jpg')} />
          </figure>
          <h4> Admin </h4>
          <span>Administrator</span>
        </li> */}
        <li>
        <div style={{cursor:'pointer',color:'white'}} onClick={handleShow}>
        <span>
          <i className="fa fa-sign-out" />
        </span>{" "}
        Logout
      </div>
        </li>
      </ul>
    </div>
    <div className="clear" />
  </div>
</div>

  <LogoutModal
  show={show}
  handleClose={handleClose}
  setShow={setShow}
  />
    </>
  )
}

export default Header
