/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import {jwtDecode} from 'jwt-decode'; // jwtDecode should not be destructured
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Protected = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [isLoading, setIsLoading] = useState(true); 
  const [diffSeconds, setDiffSeconds] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token')) || false;
    
    if (!token) {
      navigate('/login');
      return;
    }

    // const decodedToken = jwtDecode(token);
    
    // const checkTokenExpiration = () => {
    //   console.log('object')
    //   const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    //   const diffInSeconds = decodedToken.exp - currentTimeInSeconds;
    //   setDiffSeconds(diffInSeconds);
    //   console.log('diffInSeconds:',diffInSeconds);

    //   if (diffInSeconds <= 0) {
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('userDetails');
    //     navigate('/login');
    //   } else {
    //     setIsLoading(false); 
    //   }
    // };

    // checkTokenExpiration();

  }, [navigate, dispatch]);

  return <>{children}</>;
};

export default Protected;