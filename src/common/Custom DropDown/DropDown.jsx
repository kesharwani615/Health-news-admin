import React, { useEffect, useState } from "react";
import { CategoryListSlice } from "../../redux/features/PublishArticleManagement";
import { useDispatch } from "react-redux";
import { GetImportedArticleSlice } from "../../redux/features/ProcessContentManagement";
import { toast } from "react-toastify";
// import 'bootstrap/dist/css/bootstrap.min.css';

const DropdownWithScrollbar = ({setState}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Import Article");
  const [Category, setCatgory] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CategoryListSlice()).then((res) => { 
      setCatgory(res.payload.data);
    });
  }, []);


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
    console.log("item:",item);
     if(![item?.length].includes(0)){
          console.log("value:",item);
    
          dispatch(GetImportedArticleSlice(item)).then((res) => {
            console.log("Res:", res);
          });
          setState("total_pending_articles");
        }else{
          toast.error('please select a category first!');
        } 
  };

  return (
    <div
      className="dropdown form-select nav-link"
      style={{ backgroundColor: "#007bff", borderRadius: "5px",height:'50px'}}
    >
      {/* Dropdown Trigger */}
      <button
        className="btn btn-light dropdown-toggle"
        type="button"
        onClick={toggleDropdown}
        style={{
          backgroundColor: "#007bff",
          border: "none",
          color: "white",
          
        }}
        aria-expanded={isOpen} 
      >
        {selectedItem}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="dropdown-menu show  border shadow-sm"
          style={{
            maxHeight: "150px",
            overflowY: "auto",
          }}
        >
          {Category?.map((option, index) => {
          return(
            <button
              key={index}
              className="dropdown-item"
              onClick={() => handleSelect(option.catName)}
            >
              {option.catName}
            </button>
          )})}
        </div>
      )}
    </div>
  );
};

export default DropdownWithScrollbar;
