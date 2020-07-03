<template>
  <Card style="margin-bottom: 4px" v-if="FocusInfo">
    <div class="FocusInfo">
      <div style="float: left;">
        <router-link :to="{path: '/MyInfo', query: {userid: FocusInfo.userid, username: FocusInfo.username, sex: FocusInfo.sex, intro: FocusInfo.intro, registertime: FocusInfo.registertime, log: FocusInfo.logo}}">
          <Avatar
            size="40"
            :src=FocusInfo.logo
          />
        </router-link>
      </div>
      <div style="margin-left: 50px">
        <div class="name">
		  <!--跳转-->
          <router-link :to="{path: '/MyInfo', query: {userid: FocusInfo.userid, username: FocusInfo.username, sex: FocusInfo.sex, intro: FocusInfo.intro, registertime: FocusInfo.registertime, log: FocusInfo.logo}}">{{
            FocusInfo.username
          }}</router-link>
        </div>
		
        <div class="detail">
          <div>
			  性别：{{ FocusInfo.sex }}
          </div>
          <div
            >简介：{{ FocusInfo.intro }}
          </div>
		  <div
		    >注册时间：{{ FocusInfo.registertime.substring(0,10) }}	    
		  </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import userApi from "../../api/userApi";

export default {
  name: "FocusInfo",
  props:{
	  FocusInfo:{
		//   type:Object,
		  required:true,
	  }
  },
  
  data() {
    return {
    };
  },
  
  methods: {
  },
  mounted() {
  }
};
</script>

<style scoped>
.name a {
  font-weight: 500;
  font-size: 14px;
  line-height: 18.2px;
  color: black;
}
.detail {
  font-size: 12px;
}
.detail div {
  margin-left: 0px;
  margin-right: 14px;
}
.focus {
  display: inline;
}
.focus button {
  height: 20px;
  width: 60px;
  float: right;
  margin-right: 10px;
}
</style>
