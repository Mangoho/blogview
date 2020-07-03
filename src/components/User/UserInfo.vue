<template>
  <Card class="userinfo" style="margin-bottom: 4px" v-if="userinfo">
    <div>
      <div style="float: left;">
        <!--
		<router-link
          :to="{path: '/MyInfo', query: {userid: userinfo.userid, username: userinfo.username, sex: userinfo.sex, intro: userinfo.intro, registertime: userinfo.registertime, log: userinfo.logo}}"
        >-->
		<router-link :to="'/user/' + userinfo.userid">
          <Avatar size="40" :src="userinfo.logo" />
        </router-link>
      </div>
      <div style="margin-left: 50px">
        <div class="name">
          <!--跳转-->
		  <!--
          <router-link
            :to="{path: '/MyInfo', query: {userid: userinfo.userid, username: userinfo.username, sex: userinfo.sex, intro: userinfo.intro, registertime: userinfo.registertime, log: userinfo.logo}}"
          >
		  -->
		  <router-link :to="'/user/' + userinfo.userid">
            {{
            userinfo.username
            }}
          </router-link>

          <div v-if="this.userid != this.$store.state.user.userinfo.userid" class="focus">
            <Button
              style="margin-right: 10px;width: 80px"
              v-show="panelShow1" :panelShow1="panelShow1"
              @click="focusOrnot"
              type="success"
              ghost
            >取消关注</Button>
            <Button v-show="panelShow2" :panelShow2="panelShow2" @click="focusOrnot" type="primary" ghost>关注</Button>
          </div>
        </div>

        <div class="detail">
          <div>性别：{{ userinfo.sex }}</div>
          <div>简介：{{ userinfo.intro }}</div>
          <div>注册时间：{{ userinfo.registertime.substring(0,10) }}</div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import userApi from "../../api/userApi";

export default {
  name: "UserInfo",
  props: {
    userinfo: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      isfocus: false,
      panelShow1:true,
      panelShow2:false
    };
  },
  created() {
    this.isFocus();
  },
  methods: {
    async isFocus() {
      let res = await userApi.getFocusList(
        this.$store.state.user.userinfo.userid,
        0,
        100
      );
      let flag = 0;
      let dic;
      console.log(this.userinfo.userid);
      for (dic of res) {
        //console.log(dic);
        if (dic.userid == this.userinfo.userid) {
          console.log(dic);
          this.isFocus = true;
          this.panelShow1=true;
          this.panelShow2=false;
          flag = 1;
          break;
        }
      }
      if (flag == 0) {
        this.isFocus = false;
        this.panelShow1=false;
        this.panelShow2=true;
      }
    },
    //关注 取关
    async focusOrnot() {
      let res = await userApi.focus(
        this.$store.state.user.userinfo.userid,
        this.userinfo.userid,
        this.isfocus
      );
      console.log(
        this.$store.state.user.userinfo.userid +
          "\n" +
          this.userinfo.userid +
          "\n" +
          this.isfocus +
          "\n"
      );
      if (res == 1) {
        this.isfocus = !this.isfocus;
      }
    }
  },
};
</script>

<style scoped>
.userinfo{
	width:600px;
}
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
