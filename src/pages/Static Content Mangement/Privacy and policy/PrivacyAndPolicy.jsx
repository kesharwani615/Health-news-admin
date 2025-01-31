import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  EditPrivacyPolicySlice,
  GetPrivacyPolicySlice,
  HandleOpenTextAreaForEdit,
  handleStaticContentTabForEdit,
} from "../../../redux/features/staticContentManagement";
import { Loader } from "../../../common/Loader/Loader";
import Editor from "../../../components/Editor/Editor";

const PrivacyAndPolicy = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState();

  const { loading, OpenTextAreaForEdit } = useSelector(
    (state) => state.StatiContentSlice
  );

  console.log("OpenTextAreaForEdit:", OpenTextAreaForEdit);

  const [editItem, setEditItem] = useState({
    id: "",
    Content: "",
  });

  useEffect(() => {
    setEditItem((Prev) => ({ ...Prev, Content: data }));
  }, [data]);

  useEffect(() => {
    dispatch(handleStaticContentTabForEdit("Privacy & policy"));
  }, []);

  useEffect(() => {
    dispatch(GetPrivacyPolicySlice()).then((res) => {
      if (Array.isArray(res?.payload?.data) && res?.payload?.data?.length > 0)
        setEditItem((Prev) => ({ ...Prev, id: res?.payload?.data[0]?._id }));
      setData(res?.payload?.data[0]?.details);
    });
  }, [OpenTextAreaForEdit]);

  const handleEdit = () => {
    console.log("edit:", editItem);
    dispatch(EditPrivacyPolicySlice(editItem)).then(() => {
      dispatch(
        HandleOpenTextAreaForEdit({
          "About Us": false,
          "Terms & Conditions": false,
          "Privacy & policy": false,
        })
      );
    });
  };

  return (
    <>
      <div className="TableList">
        {loading ? (
          <>
            <div colSpan="10" style={{ textAlign: "center", padding: "20px" }}>
              <Loader />
            </div>
          </>
        ) : !OpenTextAreaForEdit["Privacy & policy"] ? (
          <div dangerouslySetInnerHTML={{ __html: data }} />
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {/* <textarea name="" id="" rows={10} style={{border:'none'}} value={editItem.Content} 
           onChange={(e) =>
            setEditItem((prev) => ({ ...prev, Content: e.target.value }))
          }
          >
           
          </textarea> */}
            <Editor content={editItem?.Content} setEditItem={setEditItem} />
            <button type="button" onClick={handleEdit} class="btn btn-primary">
              Save
            </button>
          </div>
        )}
        <table style={{ width: "100%" }}></table>
      </div>
    </>
  );
};

export default PrivacyAndPolicy;
