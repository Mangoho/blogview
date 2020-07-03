import axios from "axios";
import request from "@/utils/baseRequest/json";

const blog = {
  //发布纯文字微博

  //发布图片文字微博
  publish_img(form, handle) {
    var request = axios.create({
      baseURL: process.env.BASE_URL, // api 的 base_url
      timeout: 5000, // 请求超时时间
      headers:{"Content-Type":"multipart/form-data"}
    });
	
    let formData = new FormData();
    let x;
	for(x in form){
		formData.append(x,form[x]);
	}
	/*
    form.filelist.forEach(file => {
      formData.append("filelist", file);
    });
	*/
   
    request.post("/weiboService/publishWeibo", formData).then(function(res) {
      handle(res);
    });
  },
  //发布视频文字微博
  publish_vedio(content, vediopath) {
    return request({
      url: "/publish_vedio",
      method: "post",
      params: {
        content: content,
        vediopath: vediopath
      }
    });
  },
  
  //转发微博
  forwardBlog(userid,username,blogid,content){
	  return request({
		  url: "/weiboService/forwardWeibo",
		  method: "get",
		  params: {
			  userid:userid,
			  username:username,
			  weiboid:blogid,
			  forward_content:content
		  }
	  });
  },
  //评论
  comment(form) {
    return request({
      url: "/comment",
      method: "post",
      params: form
    });
  },

  //获取微博byUserid
  getBlogByUserid(userid, pageNum, pageSize) {
    return request({
      url: "/weiboService/getFollowWeibo",
      method: "get",
      params: {
        userid: userid,
		    pageNum: pageNum,
		    pageSize: pageSize
      }
    });
  },
  getUseridBlog(userid, pageNum, pageSize) {
    return request({
      url: "/weiboService/getUserWeibo",
      method: "get",
      params: {
        userid: userid,
		    pageNum: pageNum,
		    pageSize: pageSize
      }
    });
  },
  getFollowUser(userid, pageNum, pageSize){
    return request({
      url: "/userService/getFollowUser",
      method: "get",
      params: {
        userid: userid,
		    pageNum: pageNum,
		    pageSize: pageSize
      }
    });
  },
  getBlog(query, pagination) {
    return request({
      url: "/getblog",
      method: "get",
      params: {
        query: query,
        pagination: pagination
      }
    });
  },
  getBlogById(blogid) {
    return request({
      url: "/getblogbyid",
      method: "post",
      params: {
        blogid: blogid
      }
    });
  },

  getBlogDetail(blogid) {
    return request({
      url: "/getCount",
      method: "post",
      params: {
        blogid: blogid
      }
    });
  },
  likeBlog(blogid) {
    return request({
      url: "/weiboService/dianZan",
      method: "get",
      params: {
        weiboid: blogid
      }
    });
  },
  isLiked(blogid) {
    return request({
      url: "/isliked",
      method: "post",
      params: {
        queryid: blogid,
        type: 0
      }
    });
  }
};
export default blog;
