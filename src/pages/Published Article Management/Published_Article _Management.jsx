import React, { useEffect, useState } from "react";
import Total_Published_Article from "./total_published_article/Total_Published_Article";
import Total_Active_Arcticle from "./total_active_arcticle/Total_Active_Arcticle";
import Total_Hidden_Arcticle from "./total_hidden_arcticle/Total_Hidden_Arcticle";
import { useDispatch, useSelector } from "react-redux";
import { NavigateMainRoute } from "../../redux/features/ProcessContentManagement";

const Published_Article_Management = () => {
  const [state, setState] = useState("total_published_article");

  const dispatch = useDispatch();
  const [reset,setReset] = useState(false);

  const [getSearch, setGetSearch] = useState({
    name: "",
    search: "",
  });

  const [searchStr, setSearchStr] = useState({
    search: "",
    fromDate: "",
    toDate: "",
  });

  useEffect(() => {
    setSearchStr({
      search: "",
      fromDate: "",
      toDate: "",
    });
  }, [state]);

  const { selectedPublishTab } = useSelector(
    (state) => state.publishArticleManagementSlice
  );

  console.log("selectedPublishTab:", selectedPublishTab);

  useEffect(() => {
    dispatch(NavigateMainRoute("/Published_Article_Management"));
  }, []);

  useEffect(() => {
    if (selectedPublishTab?.length > 0) setState(selectedPublishTab);
  }, [selectedPublishTab]);

  const handleSearch= () =>{
    //search=h&fromDate=2024-12-05&toDate=2024-12-19&
    //search=hello&fromDate=2024-12-05&toDate=2024-12-19&
    let dataSet = '';
    for (const [name,searchData] of Object.entries(searchStr)) {
      dataSet = `${dataSet}${name}=${searchData}&`
    }
    console.log("dataSet:",dataSet)
    setGetSearch({
      name: state,
      search:dataSet,
    }); 
  }

  const handleReset = ()=>{
    setSearchStr({
      search:'',
      fromDate:'',
      toDate:'',
    });
  
    setReset((prev)=>!prev)
  }

  return (
    <>
      <>
        <div className="WrapperArea">
          <div className="WrapperBox">
            <div className="TitleBox">
              <h4 className="Title">
                Dashboard / Published Article Management
              </h4>
            </div>
            <div className="form-group">
              <div className="Filter">
                <div style={{ marginRight: "13px" }}>
                  <label>Search</label>
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search Article..."
                    style={{ maxWidth: "250px" }}
                    value={searchStr.search}
                    name="search"
                    onChange={(e) =>
                      setSearchStr((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label>From Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="fromDate"
                    value={searchStr.fromDate}
                    onChange={(e) =>
                      setSearchStr((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label>To Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="toDate"
                    value={searchStr.toDate}
                    onChange={(e) =>
                      setSearchStr((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label>&nbsp;</label>
                  <div style={{ display: "flex" }}>
                    <button
                      className="Button"
                      style={{ maxWidth: "100px", marginRight: "10px" }}
                      onClick={handleSearch}
                    >
                      Apply
                    </button>
                    <button className="Button Cancel" onClick={handleReset}>
                      <i className="fa fa-refresh" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="CommonTabs">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      state === "total_published_article" ? "active" : ""
                    }`}
                    data-toggle="tab"
                    // href="#total_published_article"
                    onClick={() => setState("total_published_article")}
                  >
                    Total Published Articles
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      state === "total_active_article" ? "active" : ""
                    }`}
                    data-toggle="tab"
                    // href="#total_active_arcticle"
                    onClick={() => setState("total_active_article")}
                  >
                    Total Active Articles
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      state === "total_hidden_article" ? "active" : ""
                    }`}
                    data-toggle="tab"
                    // href="#total_hidden_article"
                    onClick={() => setState("total_hidden_article")}
                  >
                    Total Hidden Articles
                  </a>
                </li>
              </ul>
            </div>
            <div className="Small-Wrapper">
              <div className="tab-content">
                {state === "total_published_article" && (
                  <Total_Published_Article getSearch={getSearch} reset={reset}/>
                )}
                {state === "total_active_article" && <Total_Active_Arcticle getSearch={getSearch} reset={reset}/>}
                {state === "total_hidden_article" && <Total_Hidden_Arcticle getSearch={getSearch} reset={reset}/>}
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

export default Published_Article_Management;
