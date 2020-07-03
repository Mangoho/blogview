<template>
    <Scroll loading-text="加载中。。。" class="scroll" height="940" :on-reach-bottom="handleReachBottom">
        <div v-if="userinfo" class="cc">
            <UserHeader :userid="userinfo.userid" :avatar="userinfo.logo" :nickname="userinfo.username">
            </UserHeader>
			
					
            <Affix :offset-top="200" class="focusAndBlog" style="width: 280px">
				<Card>
					<Tabs v-model="select" >
						<TabPane  label="关注" name="0"></TabPane>
						<TabPane  label="微博" name="1"></TabPane>
					</Tabs>
				</Card>
				<Card style="margin-top: 20px;">
					<Tabs>
						<TabPane label = "个人信息" icon="md-person" name="0"></TabPane>
					</Tabs>
					<List>
					<ListItem>
					<div>
					      姓名：{{ userinfo.username }}
					</div>
					</ListItem>
					<ListItem>
					 <div>
					      性别：{{ userinfo.sex }}
					</div>
					 </ListItem>
					<ListItem>
					 <div>
					      简介：{{ userinfo.intro }}
					</div>
					 </ListItem>
					<ListItem>
					 <div>
					      注册时间：{{ userinfo.registertime.substring(0,10) }}
					</div>
					</ListItem>
					 </List>
				</Card>
			<!--
                <div class="focusAndFans">
                    <FocusAndFans :focus="userinfo.focus" :fans="userinfo.fans" :blogs="userinfo.blogs">
                    </FocusAndFans>
                </div>
			-->	
            </Affix>
			
			<div v-if="select=='0'" style="float: right">
			    <template v-for="item in focusList">
			        <UserInfo :userinfo="item"></UserInfo>
			    </template>
			</div>
			
            <div v-else-if="select=='1'" style="float: right">
                <template v-for="item in blogList">
                    <Blog :blog="item"></Blog>
                </template>
            </div>

        </div>
    </Scroll>
</template>

<script>
  import UserHeader from "../components/User/UserHeader";
  import blogApi from "@/api/blogApi";
  import userApi from "@/api/userApi";
  import Blog from "@/components/Blog/Blog";
  import UserInfo from "@/components/User/UserInfo";
  import FocusAndFans from "../components/User/FocusAndFans";

  export default {
    name: "User",
    components: { FocusAndFans, UserHeader, Blog, UserInfo },
    data() {
      return {
        blogList: [],
		focusList:[],
        userinfo: null, //记录用户信息
		select:"1",
		focusindex:0,
		blogindex:0
      };
    },
    methods: {
      init() {
		console.log("111111",this.$route.query.select);
		if(this.$route.query.select==0){
			this.select=0;
			this.getFocusList();
		}
		this.getBlog();     
        this.getUserinfo();		
      },
	  async selected(select) {
		  switch(select){
			  case '0':			
			    this.focusindex=0;
			    this.getFocusList();
				break;
			  case '1':
				this.blogindex=0;
				this.getBlog();
				break;
			  default:
				break;
		  }
	  },
      async getBlog() {
        let res = await blogApi.getUseridBlog(Number.parseInt(this.$route.params.userid),this.blogindex,10);
        res.forEach((val) => {
           this.blogList.push(val);
         });
		this.blogindex+=1;
      },
	  async getFocusList(){
		let res = await userApi.getFocusList(Number.parseInt(this.$route.params.userid),this.focusindex,10);		
		res.forEach((val) => {
		   this.focusList.push(val);
		 });
		console.log(res);
		this.focusindex+=1;
	  },
      async getUserinfo() {
        let res = await userApi.getInfo(Number.parseInt(this.$route.params.userid));
        if (res) {
          this.userinfo = res;
          //console.log(res);
        }		
      },	  
      change(status) {
        this.$Message.info(`Status: ${status}`);
      },
      handleReachBottom() {
        setTimeout(() => {
		  if(this.select==0){
			  this.getFocusList();
		  }
		  else{
			  this.getBlog();
		  }         
        }, 1000);
      }
    },

    watch: {
      "$route"(to, from) { //监听路由是否变化
        if (to.params.userid != from.params.userid) {
          this.$router.go(0);
        }
      },
	  select(val, oldVal){//普通的watch监听
		this.selected(val)
	  }
    },
    created() {

    },
    mounted() {
      this.init();
    }
  };
</script>

<style scoped>
    .cc {
        width: 900px;
        margin: 0 auto;
    }
    .scroll{
        max-width: 1920px;

    }
    .focusAndFans {
        /*width: 300px;*/
        float: left;
    }
	.focusAndBlog {
	    /*width: 300px;*/
	    float: left;
	}
</style>