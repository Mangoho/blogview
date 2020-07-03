import Storage from "@/utils/storage";
import userApi from "@/api/userApi";
const user = {
  state: {
    islogin:Storage.get("islogin")==null?false:true,
    userinfo: JSON.parse(Storage.get("userinfo")),
    search_list:Storage.get("search_list")
  },

  mutations: {
    SET_ISLOGIN: (state, islogin) => {
      Storage.set("islogin", islogin);
      state.islogin = islogin;
    },
    SET_USER_INFO: (state, userInfo) => {
      Storage.set("userinfo", userInfo);
      state.userinfo = userInfo;
    }
  },

  actions: {
    setlogin({ commit }, islogin) {
      commit("SET_ISLOGIN", islogin);
    },
    //用户信息
    getUserInfo({ commit },userid) {
      return new Promise((resolve, reject) => {
        //res为请求的返回值
		userApi
          .getInfo(userid)
          .then(res => {
            if (res!=null) {
              commit("SET_USER_INFO", res);
              resolve()
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    //登出
    logOut({ commit }) {
	  Storage.cle();
	  //commit("SET_ISLOGIN", islogin);
	  /*
      return new Promise((resolve, reject) => {
        userApi
          .logOut()
          .then(res => {
            if (res.code === 0)
            {
              Storage.cle();
              resolve()
            }
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
	  */
    }
  }
};
export default user;
