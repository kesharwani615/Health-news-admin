import React, { useEffect, useState } from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "react-owl-carousel";
import { Link, useLocation } from "react-router-dom";
import { GetArticleUsingID_ProccessContentManagement } from "../../redux/features/ProcessContentManagement";
import { useDispatch, useSelector } from "react-redux";

const ViewDetails = () => {
  const dispatch = useDispatch();

  const { state } = useLocation();

  const {selectedRoute} = useSelector((state)=>state.proccessContentManagement)

  const [singleArticle, setSingleArticle] = useState([]);

  console.log("state:",state);

  useEffect(() => {
    dispatch(GetArticleUsingID_ProccessContentManagement(state)).then((res) => {
      setSingleArticle(res?.payload?.gettingData);
    });
  }, []);

  return (
    <>
      <>
        <div className="WrapperArea">
          <div className="WrapperBox">
            <div className="TitleBox">
              <h4 className="Title">
                Dashboard / {selectedRoute.substring(1)} / Article Details Page
              </h4>
              <div className="backbtn" style={{display:'flex',gap:'5px'}}>
                <Link
                  className="btn btn-sm back"
                  to={selectedRoute}
                >
                  Back
                </Link>
                <Link className="btn btn-sm edit" state={singleArticle} to={"/EditContent"}>
                  Edit
                </Link>
              </div>
            </div>
            <div className="Small-Wrapper">
              <div className="tab-content">
                <div className="tab-pane active" id="total_published_article">
                  <div className="TitleBox">
                    <div>
                      <h4 className="Title">{singleArticle?.title}</h4>
                      <h3 className="content" style={{width:'450px'}}>{singleArticle?.description}</h3>
                    </div>
                    <div row="" style={{ display: "flex" }}>
                      <div col="" className="category">
                        <h4 className="Title">Category</h4>
                        <h3 className="content">{singleArticle?.category}</h3>
                      </div>
                    </div>
                  </div>
                  <hr
                    style={{ border: "1px solid #21005d", marginTop: "-10px" }}
                  />
                  <div className="TableList">
                    <div
                      row=""
                      className="d-flex"
                      style={{ justifyContent: "space-between" }}
                    >
                      <div col="" style={{ width: "55%" }}>
                        <p style={{textAlign:'justify'}}>{singleArticle?.content?.replace("Rephrased Content:", "")}</p>
                      </div>
                      <div col="" style={{ width: "40%" }}>
                        {/* <OwlCarousel className='owl-theme' loop margin={10} nav items={1}> */}
                        <div class="item">
                          <img
                            src={`${singleArticle?.urlToImage}`}
                            alt="internal server error"
                          />
                        </div>
                        {/* </OwlCarousel>; */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ModalBox">
          <div
            id="DeleteModal"
            className="modal fade ExtraSmallModal"
            role="dialog"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="Decline">
                    <a
                      href="javascript:void(0);"
                      className="CloseModal"
                      data-dismiss="modal"
                    >
                      ×
                    </a>
                    <h3>Delete</h3>
                    <p>Do you want to Delete ?</p>
                    <div className="TwoButton">
                      <button className="Button" data-dismiss="modal">
                        No
                      </button>
                      <a
                        href="javascript:void(0);"
                        className="Button Cancel"
                        data-dismiss="modal"
                      >
                        Yes
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            id="LogoutModal"
            className="modal fade ExtraSmallModal"
            role="dialog"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="Decline">
                    <a
                      href="javascript:void(0);"
                      className="CloseModal"
                      data-dismiss="modal"
                    >
                      ×
                    </a>
                    <h3>Logout</h3>
                    <p>Do you want to Logout ?</p>
                    <div className="TwoButton">
                      <button className="Button" data-dismiss="modal">
                        No
                      </button>
                      <a href="login_form.html" className="Button Cancel">
                        Yes
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            id="ActiveModal"
            className="modal fade ExtraSmallModal"
            role="dialog"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="Decline">
                    <a
                      href="javascript:void(0);"
                      className="CloseModal"
                      data-dismiss="modal"
                    >
                      ×
                    </a>
                    <h3>Active</h3>
                    <p>Are you sure you want to active?</p>
                    <div className="TwoButton">
                      <button
                        className="Button"
                        href="JavaScript:Void(0);"
                        data-dismiss="modal"
                      >
                        No
                      </button>
                      <a
                        href="javascript:void(0);"
                        className="Button Cancel"
                        data-dismiss="modal"
                      >
                        Yes
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            id="InactiveModal"
            className="modal fade ExtraSmallModal"
            role="dialog"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="Decline">
                    <a
                      href="javascript:void(0);"
                      className="CloseModal"
                      data-dismiss="modal"
                    >
                      ×
                    </a>
                    <h3>Inactive</h3>
                    <p>Are you sure you want to inactive ?</p>
                    <div className="TwoButton">
                      <button className="Button" data-dismiss="modal">
                        No
                      </button>
                      <a
                        href="javascript:void(0);"
                        className="Button Cancel"
                        data-dismiss="modal"
                      >
                        Yes
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal show" id="EditPassworModal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="Category">
                    <a
                      href="javascript:void(0);"
                      className="CloseModal"
                      data-dismiss="modal"
                    >
                      ×
                    </a>
                    <h3>Change Password</h3>
                    <div className="form-group">
                      <label>New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="xxxxxxxxxx"
                      />
                    </div>
                    <div className="form-group">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="xxxxxxxxxx"
                      />
                    </div>
                    <button className="Button Cancel">Cancel</button>
                    <button className="Button">Save</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default ViewDetails;
