import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AboutUs from './About us/AboutUs';
import TermsAndConditions from './terms and conditions/TermsAndConditions';
import PrivacyAndPolicy from './Privacy and policy/PrivacyAndPolicy';
import { useDispatch } from 'react-redux';
import { HandleOpenTextAreaForEdit, handleStaticContentTabForEdit } from '../../redux/features/staticContentManagement';

const Static_Content_Mangement = () => {

  const {state} = useLocation();
  
  const [Tab,setTab] = useState( state ?? 'About Us');

  // useEffect(()=>setTab(state),[state])
  const dispatch = useDispatch()


  return (
<>
  <div className="WrapperArea">
    <div className="WrapperBox">
      <div className="TitleBox">
        <h4 className="Title">Dashboard/ Static Content Management</h4>
      </div>
      <div
        className="CommonTabs d-flex"
        style={{ justifyContent: "space-between" }}
      >
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className={`nav-link ${Tab === 'About Us' && 'active'}`} data-toggle="tab" 
             onClick={()=>setTab('About Us')}
            >
              About Us
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${Tab === 'Terms & Conditions' && 'active'}`}
              data-toggle="tab"
              onClick={()=>setTab('Terms & Conditions')}
              >
              Terms &amp; Conditions
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${Tab === 'Privacy & policy' && 'active'}`}
              data-toggle="tab"
              onClick={()=>setTab('Privacy & policy')}
            >
             Privacy &amp; policy
            </a>
          </li>
        </ul>
        <ul className=" nav-tabs">
          <li className="nav">
            <Link onClick={()=>dispatch(HandleOpenTextAreaForEdit({
              'About Us':Tab === 'About Us',
              'Terms & Conditions':Tab === 'Terms & Conditions',
              'Privacy & policy':Tab === 'Privacy & policy',
            }))}>
              {/* <i class="fa fa-pencil"></i> */}
              Edit
            </Link>
          </li>
        </ul>
      </div>
      <div className="Small-Wrapper">
        <div className="tab-content">
          {Tab === 'About Us' &&
             <AboutUs/>
          }
          {Tab === 'Terms & Conditions' &&
           <TermsAndConditions/>
          }
         {Tab === 'Privacy & policy' &&
          <PrivacyAndPolicy/>
         }
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

  )
}

export default Static_Content_Mangement
