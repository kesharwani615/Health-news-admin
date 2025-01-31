import { configureStore } from "@reduxjs/toolkit";
import proccessContentManagementSlice from './features/ProcessContentManagement';
import publishArticleManagementSlice from './features/PublishArticleManagement'
import auth from './features/authUser'
import CounterSlice from './features/DashboardCounter'
import DeletArticle from './features/DeleteArticle'
import StatiContentSlice from './features/staticContentManagement'


const store = configureStore({
  reducer: {
    proccessContentManagement:proccessContentManagementSlice,
    publishArticleManagementSlice:publishArticleManagementSlice,
    StatiContentSlice:StatiContentSlice,
    authUser:auth,
    deleteArticle:DeletArticle,
    Counter:CounterSlice
    },
  });
  
  export default store;