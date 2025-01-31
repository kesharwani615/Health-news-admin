import React from 'react'
import { Link } from 'react-router-dom'

const Static_Content_Mangement_Content_Edit = () => {
  return (
<div className="WrapperArea">
  <div className="WrapperBox">
    <div className="TitleBox">
      <h4 className="Title">Dashboard/ Static Content Management</h4>
    </div>
    <div className="CommonTabs d-flex" style={{ justifyContent: "space-between" }}>
  <ul className="nav nav-tabs">
    <li className="nav-item">
      <Link className="nav-link" endPoint={'AboutUs'} state={"About Us"} to={'/Static_Content_Mangement'}>
        About Us
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link"  to={'/Static_Content_Mangement'} state={"Terms & Conditions"}>
        Terms &amp; Conditions
      </Link>
    </li>
    <li className="nav-item">
    <Link className="nav-link"  to={'/Static_Content_Mangement'} state={'Privacy & policy'}>
             Privacy &amp; policy
            </Link>
          </li>
  </ul>
  <ul className=" nav-tabs"> 
    <li className="nav">
        <Link  className="nav-link active" to={'/Static_Content_Mangement_Content_Edit'}>
          {/* <i class="fa fa-pencil"></i> */}
            Edit
        </Link>
    </li>
  </ul>
</div>

    <div className="Small-Wrapper">
      
      <div className="CommonForm">
        <h4>Update Content</h4>
        <div className="form-group">
          <div className="row">
            <div className="col">
              <label>Description</label>
              <textarea
                className="form-control"
                id="editor"
                defaultValue={""}
              />
              <button className="Button" style={{ marginTop: 10, width: 100 }}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default Static_Content_Mangement_Content_Edit
