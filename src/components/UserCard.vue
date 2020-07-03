<template>
    <Card class="container">
        <div class="photo-background">
        </div>
		<router-link :to="'/user/' + userid">
        <!--<router-link :to="{path: '/MyInfo', query: {userid: userid, username: username, sex: sex, intro: intro, registertime: register, log: logo}}">-->
			<!--
            <Avatar class="avatar" size="90"
                    :src="'http://'+this.$host+'/static/avatar/'+avatar">
            </Avatar>
			-->
			<Avatar class="avatar" size="60"
			        :src=logo>
			</Avatar>
        </router-link>
        <div class="user-detail">
			<router-link :to="'/user/' + userid">
            <!--<router-link :to="{path: '/MyInfo', query: {userid: userid, username: username, sex: sex, intro: intro, registertime: register, log: logo}}">-->
            <div class="nameBox">
                <a class="name">{{ username }}</a>
            </div>
          </router-link>
            <ul style="list-style: none;text-align: center;margin-top: 6px">
                <Row>
                    <Col span="12">
                        <li>
							<router-link :to="{path: '/user/'+userid, query: {select:0}}">
								<Button type="text">关注</Button>
							</router-link>
                             <!--<Button type="text" @click="getfocuslist">关注</Button>-->
                        </li>
                    </Col>
                    <Col span="12">
                        <li>
							<router-link :to="{path: '/user'+userid, query: {select:1}}">
								<Button type="text">微博</Button>
							</router-link>
							 <!--<Button type="text" @click="getweibo">微博</Button>-->
                        </li>
                    </Col>
                </Row>


            </ul>
        </div>
    </Card>
</template>

<script>
  import userApi from "../api/userApi.js";

  export default {
    name: "UserCard",
    data() {
      return {
        userid:this.$store.state.user.userinfo.userid,
        logo: this.$store.state.user.userinfo.logo,
        username: this.$store.state.user.userinfo.username,
        intro: this.$store.state.user.userinfo.intro,
        register: this.$store.state.user.userinfo.registertime,
        sex: this.$store.state.user.userinfo.sex,
		focus: 123

      };
    },
    methods: {
      async getuserInfo() {
        let res = userApi.getInfo();
      }/*,
      getfocuslist () {
          console.log("getfocuslist\n");
          let intro = this.$store.state.user.userinfo.intro
          console.log(intro);
          this.$router.push("/myfocus");
      },
      getweibo(){
          console.log("getweibo\n");
          this.$router.push("/myweibo");
      }*/
    },
    created() {
        console.log("logo:",logo);
        this.$router.push("/MyInfo");
    }
  };
</script>

<style scoped>
    .container {
        width: 298px;
        height: 228px;
        padding: 0;
        text-align: center;
        /*background: rgba(0, 149, 255, .2)*/
        /*opacity:0.2;*/
    }


    .photo-background {
        height: 114px;
        background: url(https://jyjjj.top/wp-content/themes/kratos-pjax-master/static/images/about.jpg) no-repeat center center;
        -webkit-background-size: cover;
        background-size: cover;
    }

    .avatar {
        margin: -60px auto 0;
    }

    .container >>> .ivu-card-body {
        padding: 0;
    }

    .user-detail {
        height: 74px;
    }

    .user-detail ul li {
        float: left;
        width: 100%;
        height: 100%;
    }

    .user-detail ul li a {
        display: block;
        color: black;
        width: 100%;
        height: 100%;
    }

    .user-detail a:hover {
        color: #cb7350;
    }

    .user-detail ul li a strong {
        display: block;
        font-weight: bold;
        line-height: 14px;
        font-size: 18px;
    }

    .user-detail ul li a span {
        color: #808080;
    }

    .nameBox {
        color: black;
        margin-top: 5px;
    }

    .nameBox a {
        color: black;
        font-size: 14px;
        font-weight: bold;
    }
    .container{
        height: 200px;
    }
</style>