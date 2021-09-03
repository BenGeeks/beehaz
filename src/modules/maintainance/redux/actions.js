import {
    FETCH_DATA_API,
    POST_DATA_API
} from './types';

const BACKEND_API="BACKEND_API";
// export const getDataMock = ()=>{
//    return(dispatch)=>{
//        axios.get('/posts')
//        .then((res)=>{
//            console.log(res);
//            dispatch({
//                type:FETCH_DATA_API,
//                data:res.data
//            })
//        })
//    }
// }
//get request
export const getDataMock = () => ({
    type: BACKEND_API,
    payload: Object.assign(
      {
        type:FETCH_DATA_API,
        method: 'get',
        url: '/posts'
      },
    )
});

//post request
export const addPost = data => ({
  type: BACKEND_API,
  payload: {
    method: 'post',
    url: '/posts',
    data,
    type:POST_DATA_API
  }
});