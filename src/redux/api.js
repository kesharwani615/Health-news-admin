import axios from "axios";

const API = axios.create({
    baseURL: `http://15.206.16.230:4000/api/v1/`
    // baseURL: `${process.env.REACT_APP_BASE_URL}`
})

// Dashboard Couter api 
// *************************************

export const getCounter = () => API.get('admin/getcount-articles',{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});


// Proccess Content Management 
// *************************************

export const GteProcessContentManagement = ({limit,page}) => API.get(`article/pending-article?page=${page}&limit=${limit}`,{
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
    },
  });

export const PutProcessContentManagement = ({id,status}) => API.put(`article/updating-article/${id}`,
    {
    "status":status
    },
    {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
    }
);

export const GetApprovedProcessContentManagement = ({limit,page}) => API.get(`article/approved-article?page=${page}&limit=${limit}`,{
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
    },
  });

export const GetRejectedProcessContentManagement = ({limit,page}) => API.get(`article/rejected-article?page=${page}&limit=${limit}`,{
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
    },
  });

export const GetArticleOnIdBasisProcessContentManagement = (id) => API.get(`article/single-article/${id}`,{
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
    },
  });

export const LoginUser = ({email,password}) => API.post('admin/admin-login',
{
    "email":email,
    "password":password
},{
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
    },
});

export const UpdateContent = ({id,content}) => API.patch(`article/updatesingle-article/${id}`,content,{
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      'Content-Type': 'multipart/form-data',
    },
});

export const DeleteArticle = (id) => API.delete(`article/deleting-article/${id}`,{
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
    },
});

export const CategoryList = () => API.get(`article/published-categorylist`,{
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
    },
});


//Publish Article Management
//**********************************

export const GetPublishArticleManagement = ({limit,page}) => API.get(`article/published-article?page=${page}&limit=${limit}`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const GetPublishActiveArticle = ({limit,page}) => API.get(`article/active-article?page=${page}&limit=${limit}`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const GetPublishHiddenArticle = (page) => API.get(`article/hidden-article?page=${page}`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const ChangePublishArticleStatus = ({id,isActive}) => API.patch(`article/published-articleupdate/${id}`,
  {
    "isActive":isActive
  },
  {
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const CreateArtcle = (data) => API.post(`article/sending-article`,data,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
    'Content-Type': 'multipart/form-data',
  },
});

//Move To trending 
//--------------------------

export const MoveToTrendingArticle = ({id,status}) => API.patch(`article/published-trendingarticles/${id}`,
  {
    "isTrending":status
  },
  {
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

//Static Content page
//-----------------------

export const GetAboutUs = () => API.get(`admin/static-aboutus`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const EditAboutUs = ({id,Content:details}) => API.patch(`admin/static-aboutusupdate/${id}`,{details},{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const GetTermscondition = () => API.get(`admin/static-termcondition`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const EditTermscondition = ({id,Content:details}) => API.patch(`admin/static-termconditionupdate/${id}`,{details},{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const GetPrivacypolicy = () => API.get(`admin/static-privacyget`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

export const EditPrivacyPolicy = ({id,Content:details}) => API.patch(`admin/static-privacyUpdate/${id}`,{details},{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});
//forgot password
//----------------------

export const SendVerifyEmail = (email) => API.post(`admin/verifylinkshare`,email,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

//reset password

export const ResetPasswordApi = ({token,password}) => API.put(`/admin/admin-passwordChange/${token}`,{password},{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

//import article from live api;
//-------------------------------

export const GetImportArticle = (param) => API.get(`admin/firstpromptdata/${param}`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});

// Search API 
//--------------

export const SearchAPIArticle = (search) => API.get(`admin/searchbar?${search}`,{
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});
