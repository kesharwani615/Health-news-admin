import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetRejected_ProccessContentManagement,
  NavigateLocatedRoute,
  NavigateMainRoute,
  SearchArticleSlice,
  UpdateStatus_ProccessContentManagement,
} from "../../../redux/features/ProcessContentManagement";
import { Link } from "react-router-dom";
import Comfirm from "../../../common/Comfirmation/Comfirm";
import { DeletArticleSlice } from "../../../redux/features/DeleteArticle";
import { toast } from "react-toastify";
import { FaLink } from "react-icons/fa";
import { Loader } from "../../../common/Loader/Loader.jsx";

const Total_Rejected_Articles = ({ getSearch,reset }) => {
  const dispatch = useDispatch();

  const [RejectedData, setRejectedData] = useState([]);
  const [show, setShow] = useState(false);
  const [dataForSend, setDataForSend] = useState();
  const [page, setPage] = useState({limit:30,page:1});
  const [pagination, setPagination] = useState({});
  const [arr, setArr] = useState([]);
  const [handleArrforPage, setHandleArrforPage] = useState(1);
  const [serialNum, setSerialNum] = useState([]);

  const { loading } = useSelector((state) => state.proccessContentManagement);

  console.log("loading", loading);

  useEffect(() => {
    dispatch(GetRejected_ProccessContentManagement(page)).then((data) => {
      setRejectedData(data?.payload?.data);
      setPagination(data?.payload?.pagination);
    });
  },[reset]);

  const changeStatusOfArticle = (id, status) => {
    console.log("id,status:", id, status);
    dispatch(UpdateStatus_ProccessContentManagement({ id, status })).then(
      (res) => {
        const filteredData = RejectedData?.filter(
          (data) => data._id !== res.payload.data?._id
        );
        setRejectedData(filteredData);
      }
    );
  };

  const handleClose = () => {
    changeStatusOfArticle(dataForSend.id, dataForSend.e);
    console.log("called and closed");
    setShow(false);
  };

  const handleShow = (id, e) => {
    setDataForSend({ id, e });
    setShow(true);
  };

  useEffect(() => {
    console.log("pagination:", pagination);
    if (Object.entries(pagination ?? {}).length > 0) {
      setArr(
        [...Array(pagination?.totalPages + 1).keys()]
          .slice(1).slice(handleArrforPage - 1,handleArrforPage + 2));
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
    setPage({limit:30,page:page});
    dispatch(GetRejected_ProccessContentManagement({limit:30,page:page})).then((data) => {
      setRejectedData(data?.payload?.data);
      setPagination(data?.payload?.pagination);
    });
  };

  const deleteArticle = (id) => {
    dispatch(DeletArticleSlice(id)).then((res) => {
      dispatch(GetRejected_ProccessContentManagement(page)).then((data) => {
        setRejectedData(data?.payload?.data);
        setPagination(data?.payload?.pagination);
      });
    });
  };

  useMemo(() => {
    if (getSearch.search.length > 0) {
      const search = `${getSearch.search}filter=rejected&`;
      console.log("search", search);
      dispatch(SearchArticleSlice(search)).then((data) => {
        setRejectedData(data?.payload?.data);
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
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="8"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  <Loader />
                </td>
              </tr>
            ) : Array.isArray(RejectedData) && RejectedData.length > 0 ? (
              RejectedData?.map((item, index) => {
                return (
                  <tr>
                    <td>{serialNum[index]}</td>
                    <td>{item?.article_id}</td>
                    <td>{`${item?.title?.substr(0, 20)}...`}</td>
                    <td>
                      <img src={`${item?.urlToImage}`} width="50px" />
                    </td>
                    <td>{item?.category}</td>
                    <td>
                      <button
                        type="button"
                        onClick={(e) => handleShow(item?._id, "approved")}
                        class="btn btn-primary"
                      >
                        Approve
                      </button>
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
                        <Link
                          className="Blue"
                          title="Blue"
                          to={"/ViewDetails"}
                          state={item?._id}
                          onClick={() =>
                            dispatch(
                              NavigateLocatedRoute("total_rejected_articles")
                            )
                          }
                        >
                          <i className="fa fa-eye" />
                        </Link>

                        <div
                          className="Red"
                          onClick={() => deleteArticle(item?._id)}
                          style={{ cursor: "pointer" }}
                        >
                          <i className="fa fa-trash" />
                        </div>
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
      {Array.isArray(arr) && arr?.length > 0 && 
      <div className="PaginationBox">
        <div className="PaginationLeft">
          {/* <p>Total Records : <span>200</span></p> */}
        </div>
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
            <li onClick={handlePagesIncrease}>
              <a href="javascript:void(0);">
                <i className="fa fa-angle-right" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      }

      <Comfirm show={show} handleClose={handleClose} setShow={setShow} />
    </>
  );
};

export default Total_Rejected_Articles;
