import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import LogoutModal from '../Logout Modal/LogoutModal';



const Sidenavbar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
  };

  const location  = useLocation().pathname;
  
  return (
    <>
      <div className="SidenavBar">
  <ul>
    <li className={`${location === '/' && 'active'}`}>
      <Link to={'/'}>
        {/* <span><i class="fa fa-tachometer"></i></span> */}
        Dashboard
      </Link>
    </li>
    <li  className={`${location === '/Processed_Content_Management'&& 'active'}`}>
      <Link to={'/Processed_Content_Management'}>
        {/* <span><i class="fa fa-money"></i></span> */}
        Processed Content Management
      </Link>
    </li>
    <li className={`${location === '/Published_Article_Management'&& 'active'}`}>
      <Link to={'/Published_Article_Management'}>
        {/* <span><i class="fa fa-scissors"></i></span>  */}
        Published Article Management
      </Link>
    </li>
    <li  className={`${location === '/Static_Content_Mangement'&& 'active'}`}>
      <Link to={'/Static_Content_Mangement'}>
        {/* <span><i class="fa fa-user"></i></span> */}
        Static Content Management
      </Link>
    </li>
    <li>
      <a onClick={handleShow}>
        <span>
          <i className="fa fa-sign-out" />
        </span>{" "}
        Logout
      </a>
    </li>
  </ul>
  <LogoutModal
  show={show}
  handleClose={handleClose}
  setShow={setShow}
  />
</div>

    </>
  )
}

export default Sidenavbar
