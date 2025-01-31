import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  NavigateLocatedRoute,
  UpdateArticleID_ProccessContentManagement,
} from "../../redux/features/ProcessContentManagement";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  CategoryListSlice,
  NavigateLocatedTabPublish,
} from "../../redux/features/PublishArticleManagement";
import { LoaderForPendingApi } from "../Loader/LoaderPendingAPI";

const EditContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ArticleDetails, setArticleDetails] = useState({
    title: "",
    description: "",
    category: "",
    urlToImage: "",
    url: "",
    catImageblack: "",
  });

  const [Category, setCategory] = useState([]);

  const { state } = useLocation();

  console.log("state:",state);

  const [fileImage, setFileImage] = useState("");

  const { loading } = useSelector(
    (state) => state.proccessContentManagement
  );

  const { selectedTab, selectedRoute } = useSelector(
    (state) => state.proccessContentManagement
  );
  const { selectedPublishTab } = useSelector(
    (state) => state.publishArticleManagementSlice
  );

  useEffect(() => {
    console.log(
      "state:",
      state
    );
  }, [state]);

  useEffect(() => {
    dispatch(CategoryListSlice()).then((res) => {
      setCategory(res.payload.data);
    });
  }, []);

  useEffect(() => {
    setArticleDetails({
      title: state?.title,
      description:
        state?.description,
      category: state?.category,
      urlToImage: state?.urlToImage,
      content: state?.content,
      url: state?.url,
    });

    setFileImage(state?.urlToImage);
  }, [state]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFileImage(imageUrl);
      setArticleDetails((prev) => ({ ...prev, urlToImage: file }));
    }
  };

  const handleSubmit = () => {
    console.log("ArticleDetails:", ArticleDetails?.title);
    const formData = new FormData();
    formData.append("title", ArticleDetails?.title);
    formData.append("description", ArticleDetails?.description);
    formData.append("category", ArticleDetails?.category);
    formData.append("urlToImage", ArticleDetails?.urlToImage);
    formData.append("content", ArticleDetails?.content);
    formData.append("url", ArticleDetails?.url);
    formData.append("catImage", Category[0]?.catImageblack);
    dispatch(
      UpdateArticleID_ProccessContentManagement({
        id: state._id,
        content: formData,
      })
    ).then((res) => {
      console.log("res:", res.payload?.errors?.length);
      if (res.payload?.errors?.length > 0) return;
      if (selectedRoute === "/Published_Article_Management") {
        navigate("/Published_Article_Management");
        dispatch(NavigateLocatedTabPublish(selectedPublishTab));
      } else if (selectedRoute === "/Processed_Content_Management") {
        navigate("/Processed_Content_Management");
        dispatch(NavigateLocatedRoute(selectedTab));
      }
    });
  };

  return (
    <>
      <>
      {loading && <LoaderForPendingApi/>}
        <div className="WrapperArea">
          <div className="WrapperBox">
            <div className="TitleBox">
              <h4 className="Title">
                Dashboard / Published Article Management / Article Details Page
                /Edit
              </h4>
              <div className="backbtn">
                <Link
                  className="btn btn-sm back"
                  to={"/ViewDetails"}
                  state={state?._id}
                >
                  Back
                </Link>
              </div>
            </div>
            <div className="Small-Wrapper">
              <div className="tab-content">
                <div className="tab-pane active" id="total_published_article">
                  <div className="CommonForm">
                    <div className="row">
                      <div className="col-3">
                        <div className="form-group">
                          <label>Title</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Title..."
                            value={ArticleDetails?.title}
                            onChange={(e) =>
                              setArticleDetails((prev) => ({
                                ...prev,
                                title: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="form-group">
                          <label>discription</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="description...."
                            value={ArticleDetails?.description}
                            onChange={(e) =>
                              setArticleDetails((prev) => ({
                                ...prev,
                                description: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>
                      <div class="col-4">
                        <div class="form-group">
                          <label>Category</label>
                          <select
                            name="Category"
                            id="Category"
                            form="categoryform"
                            class="form-control"
                            value={ArticleDetails?.category}
                            onChange={(e) =>{
                              const selectedOption = e.target.options[e.target.selectedIndex];
                              const dataKey = selectedOption.getAttribute("data-key");
                              console.log("dataKey:",dataKey);
                              setArticleDetails((prev) => ({
                                ...prev,
                                catImageblack:dataKey,  
                                category: e.target.value,
                              }))}
                            }
                          >
                            <option value="">Select</option>
                            {Category?.map((data) => (
                              <option value={data?.catName} data-key={data?.catImageblack}>
                                {data?.catName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="form-group">
                          <label>Upload Profile Image</label>
                          <div className="UploadBox">
                            {ArticleDetails.urlToImage && (
                              <div className="Preview">
                                <img src={fileImage} alt="Uploaded preview" />
                              </div>
                            )}
                            <div className="Upload">
                              <i className="fa fa-upload" />
                              <span>Upload Icon</span>
                              <input
                                type="file"
                                accept="*"
                                onChange={handleFileChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-7">
                        <div className="form-group">
                          <label>URL</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Original url..."
                            value={ArticleDetails?.url}
                            onChange={(e) =>
                              setArticleDetails((prev) => ({
                                ...prev,
                                url: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Edit Content</label>
                      <textarea
                        className="form-control"
                        rows={5}
                        value={ArticleDetails.content?.replace("Rephrased Content:"," ")}
                        onChange={(e) =>
                          setArticleDetails((prev) => ({
                            ...prev,
                            content: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <button class="Button" onClick={handleSubmit}>
                      Submit
                    </button>
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

export default EditContent;
