import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EditAboutUsSlice, GetAboutUsSlice, HandleOpenTextAreaForEdit, handleStaticContentTabForEdit } from '../../../redux/features/staticContentManagement';
import {Loader} from '../../../common/Loader/Loader.jsx'
import Editor from '../../../components/Editor/Editor.js';

const AboutUs = () => {

    const {loading,OpenTextAreaForEdit} = useSelector((state)=>state.StatiContentSlice);

  console.log("OpenTextAreaForEdit:",OpenTextAreaForEdit);

    const dispatch = useDispatch();
    const [data,setData] = useState([]);

    const [editItem,setEditItem] = useState({
      id:'',
      Content:'',
    });

    useEffect(()=>{
      setEditItem((Prev)=>({...Prev,Content:data}));
    },[data])

    useEffect(()=>{
      dispatch(handleStaticContentTabForEdit('About Us'));
    },[])

    useEffect(()=>{
        dispatch(GetAboutUsSlice()).then((res)=>{
          if(Array.isArray(res?.payload?.data) && res?.payload?.data?.length > 0)
            setEditItem((Prev)=>({...Prev,id:res?.payload?.data[1]?._id}));
            setData(res?.payload?.data[1]?.details);
        })
    },[OpenTextAreaForEdit]);

    const handleEdit = ()=>{
      console.log("edit:",editItem)
      dispatch(EditAboutUsSlice(editItem)).then((res)=>{
        dispatch(HandleOpenTextAreaForEdit({
          'About Us':false,
          'Terms & Conditions':false,
          'Privacy & policy':false,
        }))
      })
    }

  return (
    <>
            <div className="TableList">
              { loading ?  
               <>
                <div
                  colSpan="10"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  <Loader/>
                </div>
              </> 
              :
              !OpenTextAreaForEdit['About Us'] 
              ?
              <div dangerouslySetInnerHTML={{ __html: data }} />
              // <div>
              //   {data}
              // </div>
              :
              <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              {/* <textarea name="" id="" value={editItem?.Content} rows={10} style={{border:'none'}} onChange={(e)=>setEditItem((prev)=>({...prev,Content:e.target.value}))}>
               
              </textarea> */}
              <Editor content={editItem?.Content} setEditItem={setEditItem}/>
              <button type="button" class="btn btn-primary" onClick={handleEdit}>Save</button>
              </div>
              
              }
              <table style={{ width: "100%" }}></table>
            </div>
 
    </>
  )
}

export default AboutUs
