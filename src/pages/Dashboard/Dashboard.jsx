import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { DashboardCounterSlice } from '../../redux/features/DashboardCounter';
import { Link } from 'react-router-dom';
import { NavigateLocatedTabPublish } from '../../redux/features/PublishArticleManagement';
import { NavigateLocatedRoute } from '../../redux/features/ProcessContentManagement';

const Dashboard = () => {

  const dispatch = useDispatch();

  const [dataToRender,setDataToRender] = useState({});

  useEffect(()=>{
    dispatch(DashboardCounterSlice()).then((res)=>{
      console.log("resss:",res);
      setDataToRender(res?.payload?.data)
    })
  },[])

  return (
    <>
     <>
  <div className="WrapperArea">
    <div className="WrapperBox">
      <div className="TitleBox">
        <h4 className="Title">Dashboard</h4>
      </div>
      <div className="row">
        <div className="col-lg-4">
          <Link to={'/Published_Article_Management'} onClick={()=>dispatch(NavigateLocatedTabPublish('total_published_article'))} className="CountBox">
            {/* <span class="Icon"><i class="fa fa-briefcase"></i></span> */}
            <p>Total Published Articles</p>
            <h4>{dataToRender?.publishedArticlesCount || 0}</h4>
          </Link>
        </div>
        <div className="col-lg-4">
          <Link to={'/Published_Article_Management'} onClick={()=>dispatch(NavigateLocatedTabPublish( "total_hidden_article"))} className="CountBox">
            {/* <span class="Icon"><i class="fa fa-cubes"></i></span> */}
            <p>Total Hidden Articles</p>
            <h4>{dataToRender?.hiddenArticlesCount?.[0]?.count || 0}</h4>
            {/* <span class="Graph"><img src="images/Income-2.png"></span> */}
          </Link>
        </div>
        <div className="col-lg-4">
          <Link to={'/Processed_Content_Management'} onClick={()=>dispatch(NavigateLocatedRoute('total_rejected_articles'))} className="CountBox">
            {/* <span class="Icon"><i class="fa fa-cubes"></i></span> */}
            <p>Total Rejected Articles</p>
            <h4>{dataToRender?.rejectedArticlesCount || 0}</h4>
            {/* <span class="Graph"><img src="images/Income-3.png"></span> */}
          </Link>
        </div>
        <div className="col-lg-4">
          <Link to={'/Processed_Content_Management'}  onClick={()=>dispatch(NavigateLocatedRoute('total_pending_articles'))} className="CountBox">
            {/* <span class="Icon"><i class="fa fa-cubes"></i></span> */}
            <p>Total Pending Articles</p>
            <h4>{dataToRender?.approvedArticlesCount || 0}</h4> 
            {/* <span class="Graph"><img src="images/Income-3.png"></span> */}
          </Link>
        </div>
      </div>
    </div>
  </div>
  <div className="ModalBox">
    <div id="DeleteModal" className="modal fade ExtraSmallModal" role="dialog">
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
    <div id="LogoutModal" className="modal fade ExtraSmallModal" role="dialog">
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
    <div id="ActiveModal" className="modal fade ExtraSmallModal" role="dialog">
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
  )
}

export default Dashboard
