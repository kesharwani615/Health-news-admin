import React, { useEffect, useMemo, useState } from "react";
import {
  ChangePublishArticleStatusSlice,
  NavigateLocatedTabPublish,
  publishArticleManagement,
} from "../../../redux/features/PublishArticleManagement";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  NavigateLocatedRoute,
  SearchArticleSlice,
  UpdateStatus_ProccessContentManagement,
} from "../../../redux/features/ProcessContentManagement";
import { FaLink } from "react-icons/fa";
import { DeletArticleSlice } from "../../../redux/features/DeleteArticle";
import { toast } from "react-toastify";
import { Loader } from "../../../common/Loader/Loader";
import { FcCheckmark } from "react-icons/fc";
import { VscClose } from "react-icons/vsc";

const Total_Published_Article = ({ getSearch, reset }) => {
  const dispatch = useDispatch();

  const [PublishedArticle, setPublishedArticle] = useState([]);
  const [page, setPage] = useState({
    page:1,
    limit:30
  });
  const [pagination, setPagination] = useState({});
  const [arr, setArr] = useState([]);
  const [handleArrforPage, setHandleArrforPage] = useState(1);
  const [togle, setTogle] = useState();
  const [serialNum, setSerialNum] = useState([]);

  const { loading } = useSelector(
    (state) => state.publishArticleManagementSlice
  );

  useEffect(() => {
    dispatch(publishArticleManagement(page)).then((res) => {
      setPublishedArticle(res?.payload?.data);
      setPagination(res?.payload?.pagination);
    });
  }, [reset]);

  const handleUpdate = (id, isActive) => {
    dispatch(ChangePublishArticleStatusSlice({ id, isActive }))
      .then((res) => {
        dispatch(publishArticleManagement(page)).then((res) => {
          setPublishedArticle(res.payload.data);
          setPagination(res?.payload?.pagination);
        });
        if (res.payload.data?.isActive) {
          toast.success("Article Unhidden successfully");
        } else {
          toast.success("Article Hidden successfully");
        }
      })
      .catch((error) => {
        toast.error("something went worng!");
      });
  };

  useEffect(() => {
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
    setPage({page:page,limit:30});
    dispatch(publishArticleManagement({page:page,limit:30})).then((data) => {
      setPublishedArticle(data?.payload?.data);
      setPagination(data?.payload?.pagination);
    });
  };

  const deleteArticle = (id) => {
    dispatch(DeletArticleSlice(id)).then((res) => {
      dispatch(publishArticleManagement(page)).then((res) => {
        setPublishedArticle(res.payload.data);
        setPagination(res?.payload?.pagination);
      });
    });
  };

  useMemo(() => {
    if (getSearch.search.length > 0) {
      const search = `${getSearch.search}filter=published&`;
      console.log("search", search);
      dispatch(SearchArticleSlice(search)).then((data) => {
        console.log("data:", data?.payload);
        setPublishedArticle(data.payload.data);
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
              <th>Original URL</th>
              <th>Trending</th>
              <th>Hide</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="10"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  <Loader />
                </td>
              </tr>
            ) : Array.isArray(PublishedArticle) &&
              PublishedArticle.length > 0 ? (
              PublishedArticle?.map((item, index) => {
                return (
                  <tr>
                    <td>{serialNum[index]}</td>
                    <td>{item?.article_id}</td>
                    <td>{`${item?.title?.substr(0, 20)}...`}</td>
                    <td>
                      <img src={item?.urlToImage} width="50px" />
                    </td>
                    <td>{item?.category}</td>
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
                      {item?.isTrending ? (
                        <p>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <FcCheckmark />
                        </p>
                      ) : (
                        <p>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <VscClose color="red" />
                        </p>
                      )}
                    </td>
                    <td>
                      <div className="Actions">
                        <label className="switch ">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleUpdate(item._id, !item.isActive)
                            }
                            checked={!item?.isActive}
                          />
                          <span className="slider" />
                        </label>
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
                              NavigateLocatedTabPublish(
                                "total_published_article"
                              )
                            )
                          }
                        >
                          <i className="fa fa-eye" />
                        </Link>
                        <div
                          className="Red"
                          onClick={() => deleteArticle(item?._id)}
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
                  colSpan="10d"
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
            <li onClick={handlePagesDecrease}>
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
                  key={index}
                >
                  <a
                    onClick={() => FetchDataOnPages(item)}
                    href="javascript:void(0);"
                  >
                    {item}
                  </a>
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
                <i className="fa fa-angle-right" />
              </a>
            </li>
          </ul>
        </div>
      </div>}
    </>
  );
};

export default Total_Published_Article;
