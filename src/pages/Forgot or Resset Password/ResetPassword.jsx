import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ResetPasswordSlice } from "../../redux/features/authUser";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState({
    newPassword: "",
    ConfirmPassword: "",
  });
  const [error, setError] = useState({
    newPassword: false,
    newPasswordMessage: "",
    ComfirmPassword: false,
    ComfirmPasswordMessage: "",
  });
  const [togle, setTogle] = useState({
    newPassword: false,
    ConfirmPassword: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();

    if (
      [password.newPassword?.length, password.ConfirmPassword?.length].includes(
        0
      )
    ) {
      setError((prev) => ({
        ...prev,
        newPassword: true,
        newPasswordMessage: "Please Enter Password",
        ConfirmPassword: true,
        ConfirmPasswordMessage: "Please Enter Confirm Password",
      }));
      toast.error("Please fill all fields!");
      return;
    }
    if (password.newPassword !== password.ConfirmPassword) {
      setError((prev) => ({
        ...prev,
        ConfirmPassword: true,
        ConfirmPasswordMessage: "Please Confirm the Password",
      }));
      toast.error("Please Confirm the password, thanks!");
      return;
    }

    dispatch(
      ResetPasswordSlice({ token, password: password.newPassword })
    ).then((res) => {
      navigate("/login");
    });
  };

  return (
    <>
      <div className="LoginArea">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-sm-6">
              <div className="LoginLeft">
                <figure>
                  <img src="images/Logo.svg" />
                </figure>
                <h3>Reset Password</h3>
                <p>
                  Enter your email address and password to access admin panel.
                </p>
                <form>
                  <div className="form-group">
                    <label>Enter new password</label>
                    <div style={{ display: "flex", position: "relative" }}>
                      <input
                        type={`${togle.newPassword ? 'text' : 'password'}`}
                        className="form-control"
                        placeholder="New Password"
                        value={password.newPassword}
                        onChange={(e) =>
                          setPassword((prev) => ({
                            ...prev,
                            newPassword: e.target.value,
                          }))
                        }
                        style={{
                          border: `${error.newPassword && "1px solid red"}`,
                        }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "16px",
                        }}
                        onClick={() =>
                          setTogle((prev) => ({
                            ...prev,
                            newPassword: !prev["newPassword"],
                          }))
                        }
                      >
                        {togle.newPassword ? <FaEye/> : <FaEyeSlash />}
                      </span>
                    </div>
                    {error.newPassword && (
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {error.newPasswordMessage}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <div style={{ display: "flex", position: "relative" }}>
                      <input
                        type={`${togle.ConfirmPassword ? 'text' : 'password'}`}
                        className="form-control"
                        placeholder="Confirm Password"
                        value={password.ConfirmPassword}
                        onChange={(e) =>
                          setPassword((prev) => ({
                            ...prev,
                            ConfirmPassword: e.target.value,
                          }))
                        }
                        style={{
                          border: `${error.ConfirmPassword && "1px solid red"}`,
                        }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "16px",
                        }}
                        onClick={() =>
                          setTogle((prev) => ({
                            ...prev,
                            ConfirmPassword: !prev["ConfirmPassword"],
                          }))
                        }
                      >
                        {togle.ConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                      </span>{" "}
                    </div>
                    {error.ConfirmPassword && (
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {error.ConfirmPasswordMessage}
                      </span>
                    )}
                  </div>
                  <button onClick={Submit} className="Button">
                    Submit
                  </button>
                  {/* <button class="Button">Send Email</button> */}
                </form>
              </div>
            </div>
            {/* <div class="col-sm-6">
              <div class="LoginRight"> 
                  <figure> 
                      <img src="images/Login.png">
                  </figure>
                  <h4>Manage your orders</h4>
                  <p>It is a long established fact that a reader will be distracted by the readable content.</p>
              </div>
          </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
