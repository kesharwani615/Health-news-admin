import EditContent from "../common/View Details page/EditContent";
import ViewDetails from "../common/View Details page/ViewDetails";
import Dashboard from "../pages/Dashboard/Dashboard";
import Processed_Content_Management from "../pages/Processed Content Management/Processed_Content_Management";
import Published_Article_Management from "../pages/Published Article Management/Published_Article _Management";
import Static_Content_Mangement_Content_Edit from "../pages/Static Content Mangement Content Edit/Static_Content_Mangement_Content_Edit";
import Static_Content_Mangement from "../pages/Static Content Mangement/Static_Content_Mangement";

export const routes = [
    { path: '/', element: <Dashboard /> },
    { path: '/Published_Article_Management', element: <Published_Article_Management /> },
    { path: '/Processed_Content_Management', element: <Processed_Content_Management /> },
    { path: '/Static_Content_Mangement', element: <Static_Content_Mangement /> },
    { path: '/Static_Content_Mangement_Content_Edit', element: <Static_Content_Mangement_Content_Edit /> },
    { path: '/ViewDetails', element: <ViewDetails /> },
    { path: '/EditContent', element: <EditContent /> },
  ];
  