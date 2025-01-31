import React, { useEffect, useMemo, useState } from "react";
import {
  NavigateLocatedRoute,
  NavigateMainRoute,
  proccessContentManagement,
  SearchArticleSlice,
  UpdateStatus_ProccessContentManagement,
} from "../../../redux/features/ProcessContentManagement.js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Comfirm from "../../../common/Comfirmation/Comfirm.jsx";
import { toast } from "react-toastify";
import { DeletArticleSlice } from "../../../redux/features/DeleteArticle.js";
import { FaLink } from "react-icons/fa";
import { Loader } from "../../../common/Loader/Loader.jsx";

const Total_Pending_Articles = ({ getSearch, reset }) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [dataForSend, setDataForSend] = useState();
  const [ContentData, setContentData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [arr, setArr] = useState([]);
  const [handleArrforPage, setHandleArrforPage] = useState(1);
  const [page, setPage] = useState({
    limit: 30,
    page: 1,
  });
  const [resetValue, setResetValue] = useState({});
  const [message, setMessage] = useState("do you want to change status");
  const [serialNum, setSerialNum] = useState([]);

  const { loading, proccessContentManagement_ImportedData } = useSelector(
    (state) => state.proccessContentManagement
  );

  useEffect(() => {
    dispatch(proccessContentManagement(page)).then((data) => {
      console.log("dataa:", data?.payload);
      setContentData(data?.payload?.data);
      setPagination(data?.payload?.pagination);
    });
  }, [reset, proccessContentManagement_ImportedData]);

  useEffect(() => {
    if (Object.entries(pagination ?? {}).length > 0) {
      console.log("(pagination?.totalPages:", pagination?.totalPages);
      setArr(
        [...Array(pagination?.totalPages + 1).keys()]
          .slice(1)
          .slice(handleArrforPage - 1, handleArrforPage + 2)
      );
      setSerialNum(
        [...Array(pagination?.currentPage * page.limit + 1).keys()]
          .slice(1)
          .slice(
            (pagination?.currentPage - 1) * page.limit,
            pagination?.currentPage * page.limit
          )
      );
    }
  }, [pagination, handleArrforPage]);

  const handlePagesIncrease = () => {
    console.log("handleArrforPage:", handleArrforPage);
    if (handleArrforPage + 3 <= pagination?.totalPages) {
      setHandleArrforPage((prev) => prev + 3);
    }
  };

  const handlePagesDecrease = () => {
    if (handleArrforPage > 2) {
      setHandleArrforPage((prev) => prev - 3);
    }
  };

  const FetchDataOnPages = (page) => {
    setPage({
      limit: 30,
      page: page,
    });
    const param = {
      limit: 30,
      page: page,
    };
    dispatch(proccessContentManagement(param)).then((data) => {
      setContentData(data?.payload?.data);
      setPagination(data?.payload?.pagination);
    });
  };

  const changeStatusOfArticle = (id, e) => {
    setShow(true);
    dispatch(
      UpdateStatus_ProccessContentManagement({ id, status: e.target.value })
    ).then((res) => {
      dispatch(proccessContentManagement(page)).then((data) => {
        setContentData(data?.payload?.data);
        setPagination(data?.payload?.pagination);
      });
    });
  };

  const handleClose = () => {
    changeStatusOfArticle(dataForSend.id, dataForSend.e);
    setShow(false);
  };

  const handleShow = (id, e) => {
    if (e.target.value) {
      setResetValue((prev) => ({ ...prev, [id]: e.target.value }));
      setDataForSend({ id, e });
      setShow(true);
    }
  };

  const deleteArticle = (id) => {
    dispatch(DeletArticleSlice(id))
      .then((res) => {
        dispatch(proccessContentManagement(page)).then((data) => {
          setContentData(data?.payload?.data);
          setPagination(data?.payload?.pagination);
        });
      })
      .catch((error) => {
        toast.error("Article Deleted Successfully");
      });
  };

  useEffect(() => {
    if (Array.isArray(ContentData)) {
      const newResetValue = {};
      ContentData.forEach((item) => {
        newResetValue[item._id] = "";
      });
      setResetValue(newResetValue);
    }
  }, [ContentData]);

  const handleReset = () => {
    if (Array.isArray(ContentData)) {
      const newResetValue = {};
      ContentData.forEach((item) => {
        newResetValue[item._id] = "";
      });
      setResetValue(newResetValue);
    }
  };

  useMemo(() => {
    if (getSearch.search.length > 0) {
      const search = `${getSearch.search}filter=pending&`;
      console.log("search", search);
      dispatch(SearchArticleSlice(search)).then((data) => {
        console.log("data:", data?.payload);
        setContentData(data?.payload?.data);
        setPagination(data?.payload?.pagination);
      });
    }
  }, [getSearch.search]);

  return (
    <>
      <div className="TableList">
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Article ID</th>
              <th>Article Title</th>
              <th>Thumbnail</th>
              <th>Category</th>
              <th>Status</th>
              <th>Original URL</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="9"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  <Loader />
                </td>
              </tr>
            ) : Array.isArray(ContentData) && ContentData.length > 0 ? (
              ContentData?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{serialNum[index]}</td>
                    <td>{item?.article_id}</td>
                    <td>{`${item?.title?.substr(0, 20)}...`}</td>
                    <td>
                      <img
                        src={`${item?.urlToImage}`}
                        alt="internal server error"
                        width="50px"
                      />
                    </td>
                    <td>{item?.category}</td>
                    <td>
                      <select
                        name="status"
                        id="status"
                        onChange={(e) => handleShow(item?._id, e)}
                        style={{ border: "none", outline: "none" }}
                        value={resetValue[item._id]}
                      >
                        <option value="">Select</option>
                        <option value="approved">Approve</option>
                        <option value="rejected">Reject</option>
                      </select>
                    </td>
                    <td>
                      <div className="Actions">
                        {item?.url?.length ? (
                          <a
                            href={item?.url}
                            className="btn btn-primary"
                            target="_blank"
                            style={{ color: "white" }}
                          >
                            <FaLink />
                          </a>
                        ) : (
                          <div>No URL</div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="Actions">
                        <div
                          className="Red"
                          onClick={() => deleteArticle(item?._id)}
                          style={{ cursor: "pointer" }}
                        >
                          <i className="fa fa-trash" />
                        </div>
                        <Link
                          className="Blue"
                          title="Blue"
                          to={"/ViewDetails"}
                          state={item?._id}
                          onClick={() => {
                            dispatch(
                              NavigateLocatedRoute("total_pending_articles")
                            );
                          }}
                        >
                          <i className="fa fa-eye" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="8"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  There is no Article
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {Array.isArray(arr) && arr?.length > 0 && (
        <div className="PaginationBox">
          <div className="PaginationLeft"></div>
          <div className="PaginationRight">
            <ul>
              <li>
                <a href="javascript:void(0);">
                  <i className="fa fa-angle-double-left" />
                </a>
              </li>
              <li onClick={handlePagesDecrease}>
                <a href="javascript:void(0);">
                  <i className="fa fa-angle-left" />
                </a>
              </li>
              {arr?.map((item, index) => {
                return (
                  <li
                    className={`${
                      pagination?.currentPage === item ? "active" : ""
                    } `}
                    onClick={() => FetchDataOnPages(item)}
                    key={index}
                  >
                    <a href="javascript:void(0);">{item}</a>
                  </li>
                );
              })}
              <li onClick={handlePagesIncrease}>
                <a href="javascript:void(0);">
                  <i className="fa fa-angle-right" />
                </a>
              </li>
              <li>
                <a href="javascript:void(0);">
                  <i className="fa fa-angle-double-right" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}

      <Comfirm
        show={show}
        handleClose={handleClose}
        setShow={setShow}
        message={message}
        handleReset={handleReset}
      />
    </>
  );
};

export default Total_Pending_Articles;
