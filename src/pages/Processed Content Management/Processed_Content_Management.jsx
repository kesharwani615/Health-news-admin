import React, { useEffect, useMemo, useState } from "react";
import Total_Pending_Articles from "./total_pending_articles/Total_Pending_Articles";
import Total_Approved_Arcticles from "./total_approved_arcticles/Total_Approved_Arcticles";
import Total_Rejected_Articles from "./total_rejected_articles/Total_Rejected_Articles";
import AddArticle from "./Add Article/AddArticle";
import { useDispatch, useSelector } from "react-redux";
import {
  GetImportedArticleSlice,
  NavigateMainRoute,
} from "../../redux/features/ProcessContentManagement";
import { LoaderForPendingApi } from "../../common/Loader/LoaderPendingAPI";
import { toast } from "react-toastify";
import DropdownWithScrollbar from "../../common/Custom DropDown/DropDown";

const Processed_Content_Management = () => {
  const [state, setState] = useState("total_pending_articles");

  const { selectedTab, Importloading} = useSelector(
    (state) => state.proccessContentManagement
  );

  const dispatch = useDispatch();

  const [getSearch, setGetSearch] = useState({
    name: "",
    search: "",
  });
  const [searchStr, setSearchStr] = useState({
    search: "",
    fromDate: "",
    toDate: "",
  });

  const [reset, setReset] = useState(false);

  useEffect(() => {
    setSearchStr({
      search: "",
      fromDate: "",
      toDate: "",
    });
  }, [state]);

  useEffect(() => {
    if (selectedTab.length > 0) setState(selectedTab);
  }, [selectedTab]);

  useEffect(() => {
    dispatch(NavigateMainRoute("/Processed_Content_Management"));
  }, []);

  const handleSearch = () => {
    //search=h&fromDate=2024-12-05&toDate=2024-12-19&
    //search=hello&fromDate=2024-12-05&toDate=2024-12-19&
    let dataSet = "";
    for (const [name, searchData] of Object.entries(searchStr)) {
      dataSet = `${dataSet}${name}=${searchData}&`;
    }
    setGetSearch({
      name: state,
      search: dataSet,
    });
  };

  const handleReset = () => {
    setSearchStr({
      search: "",
      fromDate: "",
      toDate: "",
    });
    setReset((prev) => !prev);
  };

  // const handleGetImportedData = (e) => {
  //   const {name,value} = e.target;
  //   if(![value?.length].includes(0)){
  //     console.log("value:",value);

  //     dispatch(GetImportedArticleSlice(value)).then((res) => {
  //       console.log("Res:", res);
  //     });
  //     setState("total_pending_articles");
  //   }else{
  //     toast.error('please select a category first!');
  //   } 
  // };

  return (
    <>
      <>
        {Importloading && <LoaderForPendingApi />}
        <div className="WrapperArea">
          <div className="WrapperBox">
            <div className="TitleBox">
              <h4 className="Title">Dashboard/ Processed Content Management</h4>
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
                <li className="nav-item mb-2">
                  <a
                    className={`nav-link  ${
                      state === "total_pending_articles" ? "active" : ""
                    }`}
                    data-toggle="tab"
                    onClick={() => setState("total_pending_articles")}
                  >
                    Total Pending Articles
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      state === "total_approved_arcticles" ? "active" : ""
                    }`}
                    data-toggle="tab"
                    onClick={() => setState("total_approved_arcticles")}
                  >
                    Total Approved Articles
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      state === "total_rejected_articles" ? "active" : ""
                    }`}
                    data-toggle="tab"
                    onClick={() => setState("total_rejected_articles")}
                  >
                    Total Rejected Articles
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      state === "Add Article" ? "active" : ""
                    }`}
                    data-toggle="tab"
                    onClick={() => setState("Add Article")}
                  >
                    Add Article
                  </a>
                </li>
                <li className="nav-item">
                  {/* <select
                    className="form-select nav-link"
                    aria-label="Default select example"
                    style={{backgroundColor:'#007bff',color:'white',width:`150px`,height:'48px',outline:'none',borderRadius:'5px'}}
                    onChange={handleGetImportedData}
                    name="SelectedCatgory"
                  >
                    <option selected>Import Article</option>
                    {Array.isArray(Category) && Category?.map((data) => (
                          <option value={data?.catName}>{data?.catName}</option>
                    ))}
                  </select> */}
                  <DropdownWithScrollbar setState={setState}/>
                  {/* <button type="button" onClick={handleGetImportedData} class="btn btn-primary" style={{padding:'10px'}}>Import Articles</button> */}
                </li>
              </ul>
            </div>
            <div className="Small-Wrapper">
              <div className="tab-content">
                {state === "total_pending_articles" && (
                  <Total_Pending_Articles getSearch={getSearch} reset={reset} />
                )}
                {state === "total_approved_arcticles" && (
                  <Total_Approved_Arcticles
                    getSearch={getSearch}
                    reset={reset}
                  />
                )}
                {state === "total_rejected_articles" && (
                  <Total_Rejected_Articles
                    getSearch={getSearch}
                    reset={reset}
                  />
                )}
                {state === "Add Article" && <AddArticle />}
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

export default Processed_Content_Management;
