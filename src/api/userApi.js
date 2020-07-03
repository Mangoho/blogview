import request from "@/utils/baseRequest/json";

const user = {
  //登录
  login(form) {
	console.log("userapi.login")
	//发送get请求
    return request({
      url: "/loginService/login",
      method: "get",
      params: form
    });
  },
  //用户信息
  getInfo(userid) {
	//console.log('userid:',userid);
    return request({
      url: "/userService/getMyDetail",
      method: "get",
      params: {
        userid: userid
      }
    });
  },
  //登出
  logOut() {
    return request({
      url: "/logout",
      method: "post",
      params: {}
    });
  },
  focus(userid1, userid2, focus) {
	let url;
	if(focus==true)
		url="/userService/unfollowUser";
	else
		url="/userService/followUser";
    return request({
      url: url,
      method: "get",
      params: {
        userid1: userid1,
        userid2: userid2
      }
    });
  },
  //检查是否关注
  isfocus(userid) {
    return request({
      url: "/isfocus",
      method: "post",
      params: {
        userid: userid
      }
    });
  },
  getFocusList(userid, pageNum=0, pageSize=10) {
    return request({
      url: "/userService/getFollowUser",
      method: "get",
      params: {
        userid: userid,
        pageNum: pageNum,
		  pageSize:pageSize
      }
    });
  },
  //查询关注列表or查询粉丝列表
  //type 10="关注" 20="粉丝"
  getFocusOrFansList(userid, type) {
    return request({
      url: "/getfocusorfanslist",
      method: "post",
      params: {
        userid: userid,
        type: type
      }
    });
  },
  getwholikedmeRecent() {
    return request({
      url: "/wholikedme",
      method: "post",
      params: {}
    });
  },
  //用户信息
  changeName(nickname) {
    return request({
      url: "/changename",
      method: "post",
      params: {
        nickname: nickname
      }
    });
  }
};
export default user;
