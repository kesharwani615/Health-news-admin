import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CategoryListSlice } from "../../../redux/features/PublishArticleManagement";
import { useNavigate } from "react-router-dom";
import {
  CreateArticleArticleSlice,
  NavigateLocatedRoute,
} from "../../../redux/features/ProcessContentManagement";

const AddArticle = () => {
  const dispatch = useDispatch();
  const [Category, setCategory] = useState([]);
  const { selectedTab } = useSelector(
    (state) => state.proccessContentManagement
  );
  

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(NavigateLocatedRoute("Add Article")); // update the state 

    dispatch(CategoryListSlice()).then((res) => {
      setCategory(res.payload.data);
    });
  }, []);

  const [ArticleDetails, setArticleDetails] = useState({
    title: "",
    description: "",
    category: "",
    urlToImage: "",
    url: "",
    catImageblack:''
  });

  const [fileImage, setFileImage] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFileImage(imageUrl);
      setArticleDetails((prev) => ({ ...prev, urlToImage: file }));
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("title", ArticleDetails?.title);
    formData.append("description", ArticleDetails?.description);
    formData.append("category", ArticleDetails?.category);
    formData.append("urlToImage", ArticleDetails?.urlToImage);
    formData.append("content", ArticleDetails?.content);
    formData.append("url", ArticleDetails?.url);
    formData.append("catImage", ArticleDetails?.catImageblack);
    dispatch(CreateArticleArticleSlice(formData)).then((res) => {
      console.log("create article:", res);
      console.log("selectedTab:", selectedTab);
      dispatch(NavigateLocatedRoute("total_pending_articles")); // dispatch here for redirect to pending to show new created article
    });
  };
  return (
    <>
      <>
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
                      <label>description</label>
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
                        onChange={(e) =>{
                          const selectedOption = e.target.options[e.target.selectedIndex];
                          const dataKey = selectedOption.getAttribute("data-key");
                          console.log("datakey:",dataKey);
                          setArticleDetails((prev) => ({
                            ...prev,
                            catImageblack:dataKey,
                            category: e.target.value,
                          }))
                        }}
                      >
                        <option value="">Select</option>
                        {Category?.map((data) => (
                          <option value={data?.catName} data-key={data?.catImageblack}>{data?.catName}</option>
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
                        <br />
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
                  <div className="col-4">
                    <div className="form-group">
                      <label>URL</label>
                      <br />
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
                  <label>News Content</label>
                  <textarea
                    className="form-control"
                    rows={5}
                    value={ArticleDetails.content}
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
      </>
    </>
  );
};

export default AddArticle;
