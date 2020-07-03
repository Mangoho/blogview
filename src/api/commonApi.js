import request from "@/utils/baseRequest/json";
import axios from "axios";
import Vue from "vue";

const commonApi = {
  //注册 type->查询信息的类型
  search(type, name) {
    return request({
      url: "/userService/findUserByName",
      params: {
        name:name
      }
    });
  },

  getFocusList(userid, pageNum, pageSize) {
    return request({
      url: "/userService/getFollowUser",
      params: {
        userid: userid,
        pageNum: pageNum,
		pageSize:pageSize
      }
    });
  },

  //注册
  register(form,handle) {
	console.log("commonApi.register")
	let formData=new FormData();
	//声明
	let x;
	for(x in form){
		formData.append(x,form[x]);
	}		
	//console.log(formData.get("file"));
	//console.log(process.env);
	
	/*
	//axios中的请求转换器，允许在向服务器发送前，修改数据，只能用在'PUT','POST'和'PATCH'这几个请求方法
	axios.defaults.transformRequest=[function(data,config){
		if (!config['Content-Type']) return Qs.stringify(data);
		switch(config['Content-Type'].toLowerCase()){
			case 'application/json':{
				return JSON.stringify(data);
			}
			case 'multipart/form-data':{
				return data;
			}
			default:{
				return Qs.stringfy(data);
			}
		}
	}]
	*/
	
	/*
	//(1)
	//multipart/form-data变为application/json
	axios({
	  baseURL: process.env.BASE_URL, // api 的 base_url
	  url:"/loginService/register",
	  timeout: 5000000, //请求超时时间
	  method: "post",
	  params:formData,	  
	  headers:{
		  "Content-Type": "multipart/form-data"
		  }
	}).then(function(response){
			//handle(response);
			return response.data.stateCode;
	})
	*/
   
   /*
   //(2)
   //multipart/form-data变为application/json
    request({
		url:"/loginService/register",
		method: "post",
		params:formData,
		headers:{
			  "Content-Type": "multipart/form-data"
			  }
		}).then(function(response){
				//handle(response);
				return response.data.stateCode;
		})
	*/
   
   
    var request=axios.create({
		baseURL:process.env.BASE_URL,
		timeout:5000,
		headers:{"Content-Type":"multipart/form-data"}
	});
	
	return request.post("/loginService/register",formData)
	.then(function(response)
	{
		console.log('response:',response);
		handle(response);
		return response;
	});
	
  },

  //
  getInfoById(userid) {
    return request({
      url: "/getuserInfo",
      method: "post",
      params: {
        userid: userid
      }
    });
  },

  //
  getUserbyCommentId(commentid) {
    return request({
      url: "/getuserInfobyCom",
      method: "post",
      params: {
        commentid: commentid
      }
    });
  }
};
export default commonApi;
