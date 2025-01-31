import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'
import { UserLoginSlice } from '../../redux/features/authUser';
import { useDispatch } from 'react-redux';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [validate, setValidate] = useState({
    email:'',
    password:'',
    passwordVisible:false,
    errorEmail:''
  });

  const onSubmit = ()=>{
    if(!emailRegex.test(validate.email)){
       setValidate((prev)=>({...prev,errorEmail:"Please enter correct email"}))
       return
    }
    const {email,password} = validate
    
    dispatch(UserLoginSlice({email,password})).then((res)=>{
      navigate('/');
    })
  }
  return (
    <div className="LoginArea">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-sm-6 col-l-8 w-150">
          <div className="LoginLeft">
            <figure>
              <img src={require('../../assets/images/Logo.jpg')} alt="Logo" />
            </figure>
            <h3>Login</h3>
            <p>Enter your email address and password to access admin panel.</p>
            <form>
              <div className="form-group">
                <label>Email ID/Username</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={validate.email}
                  onChange={(e)=>{
                    setValidate((prev)=>({...prev,email:e.target.value}))}
                  }
                />
                {validate.errorEmail.length > 0 &&
                <div style={{color:'red'}}>
                 {validate.errorEmail} 
                </div>}
              </div>
              <div className="form-group">
                <label>Password</label>
                <div className="position-relative">
                  <input
                    type={validate.passwordVisible ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    onChange={(e)=>setValidate((prev)=>({...prev,password:e.target.value}))}
                  />
                  {/* Eye icon for toggling password visibility */}
                  <span
                    className="position-absolute"
                    style={{
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                    onClick={()=>setValidate((prev)=>({...prev,passwordVisible:!validate.passwordVisible}))}
                  >
                    {validate.passwordVisible ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>
              <div className="form-group">
                <div className="Checkboxs">
                  <div  onClick={onSubmit} style={{cursor:'pointer'}} className="Button">
                    Sign In
                  </div>
                </div>
              </div>
              <Link to="/forgotPassword" className="forgot-password">
                Forgot password?
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login
