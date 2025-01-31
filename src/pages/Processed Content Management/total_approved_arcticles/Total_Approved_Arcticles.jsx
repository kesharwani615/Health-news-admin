import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetApproved_ProccessContentManagement,
  NavigateLocatedRoute,
  NavigateMainRoute,
  SearchArticleSlice,
  UpdateStatus_ProccessContentManagement,
} from "../../../redux/features/ProcessContentManagement";
import { Link } from "react-router-dom";
import Comfirm from "../../../common/Comfirmation/Comfirm";
import { toast } from "react-toastify";
import { DeletArticleSlice } from "../../../redux/features/DeleteArticle";
import { FaLink } from "react-icons/fa";
import { Loader } from "../../../common/Loader/Loader";
import { MoveToTrendingArticleSlice } from "../../../redux/features/PublishArticleManagement";

const Total_Approved_Arcticles = ({ getSearch, reset }) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [dataForSend, setDataForSend] = useState();
  const [page, setPage] = useState({limit:30,page:1});
  const [ApprovedData, setApprovedData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [arr, setArr] = useState([]);
  const [handleArrforPage, setHandleArrforPage] = useState(1);
  const [message, setMessage] = useState({
    msg: "",
    ids: "",
  });
  const [serialNum, setSerialNum] = useState([]);

  const { loading } = useSelector((state) => state.proccessContentManagement);

  useEffect(() => {
    dispatch(GetApproved_ProccessContentManagement(page)).then((data) => {
      setApprovedData(data?.payload?.data);
      setPagination(data?.payload?.pagination);
    });
  }, [reset]);

  const changeStatusOfArticle = (id, status) => {
    dispatch(UpdateStatus_ProccessContentManagement({ id, status })).then(
      (res) => {
        handleTrendingShow();
      }
    );
  };

  const handleClose = () => {
    changeStatusOfArticle(dataForSend.id, dataForSend.e);
    setShow((prev) => !prev);
  };

  const handleShow = (id, e) => {
    console.log("Called", id, e);
    setMessage("do you want change status ?");
    setDataForSend({ id, e });
  };

  const MoveToTrendingArticle = (id, status) => {
    console.log("trending!")
    dispatch(MoveToTrendingArticleSlice({ id, status })).then((res) => {
      console.log("res:",res);
      dispatch(GetApproved_ProccessContentManagement(page)).then((data) => {
        console.log("data:",data);
        setApprovedData(data?.payload?.data);
        setPagination(data?.payload?.pagination);
      });
    });
  };

  const handleTrndingClose = (isActive) => {
    console.log("dataForSend.id:", dataForSend);
    MoveToTrendingArticle(dataForSend.id, isActive);
    setShow(false);
  };

  const handleTrendingShow = () => {
    // console.log("callled handleTrendingShow",show)
    setMessage("do you want move this to trending ?");
  };

  useEffect(() => {
    if (message.length > 0) {
      setShow(true);
    }
  }, [dataForSend, message]);

  useEffect(() => {
    console.log("pagination:", pagination);
    if (Object.entries(pagination ?? {}).length > 0) {
      setArr(
        [...Array(pagination.totalPages + 1).keys()]
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
    if (handleArrforPage + 3 <= pagination?.totalPages) {
      setHandleArrforPage((prev) => prev + 1);
    }
  };

  const handlePagesDecrease = () => {
    if (handleArrforPage > 2) {
      setHandleArrforPage((prev) => prev - 1);
    }
  };

  const FetchDataOnPages = (page) => {
    setPage({limit:30,page:page});
    dispatch(GetApproved_ProccessContentManagement({limit:30,page:page})).then((data) => {
      setApprovedData(data?.payload?.data);
      setPagination(data?.payload?.pagination);
    });
  };

  const deleteArticle = (id) => {
    dispatch(DeletArticleSlice(id)).then((res) => {
      dispatch(GetApproved_ProccessContentManagement(page)).then((data) => {
        setApprovedData(data?.payload?.data);
        setPagination(data?.payload?.pagination);
      });
    });
  };

  useMemo(() => {
    if (getSearch.search.length > 0) {
      const search = `${getSearch.search}filter=approved&`;
      console.log("search", search);
      dispatch(SearchArticleSlice(search)).then((data) => {
        setApprovedData(data?.payload?.data);
        setPagination(data?.payload?.pagination);
      });
    }
  }, [getSearch.search]);

  const handleCheckToPublished = (id,status,item) => {
   console.log("item:",item);
   if(!(item?.category?.length && item?.content?.length && item?.description?.length && item?.title.length)){
     document.getElementById('alterMessage').click();
    return;
   }else{
     handleShow(id,status)
   }
  }

  return (
    <>
      <button
        type="button"
        class="btn btn-primary"
        style={{ display: "none" }}
        id="alterMessage"
        data-toggle="modal"
        data-target=".bd-example-modal-lg"
      >
        Large modal
      </button>

      <div
        class="modal fade bd-example-modal-lg"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div style={{backgroundColor:'#f8d7da'}} class="alert alert-danger">
              <strong>Please Confirm!</strong>
              <br /> All details are mendatory, Please Edit the article then you
              can publish,
              <br /> thanks!
            </div>{" "}
          </div>
        </div>
      </div>

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
            ) : Array.isArray(ApprovedData) && ApprovedData.length > 0 ? (
              ApprovedData?.map((item, index) => {
                return (
                  <tr>
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
                      <button
                        type="button"
                        onClick={() => {
                          handleCheckToPublished(item?._id, "published",item)
                        }}
                        class="btn btn-primary"
                      >
                        Publish
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
                              NavigateLocatedRoute("total_approved_arcticles")
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
                  there is no Article
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
      <Comfirm
        show={show}
        handleClose={handleClose}
        setShow={setShow}
        message={message}
        handleTrendingShow={handleTrendingShow}
        handleTrndingClose={handleTrndingClose}
      />
    </>
  );
};

export default Total_Approved_Arcticles;
