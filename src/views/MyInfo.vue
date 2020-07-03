<template>
        <div class="content" :v-model="myuserInfo">
            <div class="focusbloglist">
                <Publish>
                </Publish>
                <div style="margin-bottom: 10px">
                <Card class="select">
                <Tabs style="width: 100%">
                    <TabPane label = "个人信息" icon="md-person" name="0"></TabPane>
                </Tabs>
                 <List>
                <ListItem>
                <div>
			          姓名：{{ this.$route.query.username }}
                </div>
                </ListItem>
                <ListItem>
                 <div>
			          性别：{{ this.$route.query.sex }}
                </div>
                 </ListItem>
                <ListItem>
                 <div>
			          简介：{{ this.$route.query.intro }}
                </div>
                 </ListItem>
                <ListItem>
                 <div>
			          注册时间：{{ this.$route.query.registertime.substring(0,10) }}
                </div>
                </ListItem>
                 </List>
                </Card>
                </div>
            </div>
               <div class="usercard">
                <Affix :offset-top="75">
                    <UserCard></UserCard>
                </Affix>
                </div>
            </div>
</template>

<script>
  import Storage from "@/utils/storage";
  import commonApi from "../api/commonApi";
  import Blog from "@/components/Blog/Blog";
  import UserInfo from "@/components/User/UserInfo";
  import UserCard from "../components/UserCard";
  import RecentMsg from "../components/RecentMsg";
  

	export default {
	name: "myinfo",
	components: { UserInfo, Blog, RecentMsg, UserCard },	
	data() {
	  return {
	  };
	},
	create(){
	  this.getName();
	},
	methods: {
	  async getName(){
		console.log("ssds");
		console.log(this.$route.query.sex);
		let self = this;
		var sex = this.$route.query.sex;
		self.myuserInfo = {sex};
		console.log(this.myuserInfo.sex);
	  },
	},
	mounted() {
		this.getName();
	}
  };
</script>

<style scoped>
    .content {
        max-width: 910px;
        margin: 0 auto;
    }
    .scroll{
        max-width: 1920px;

    }

    .focusbloglist {
        float: left;
        min-width: 600px;
        margin-top: 10px;
    }

    .usercard {
        float: right;
    }

    .select{
        text-align: center;
    }

    .select >>> .ivu-card-body {
        padding: 0 16px;
    }
    .ivu-affix{
      /* margin-left: 22px; */
    }
    .getmyinfo{
      background-color: aliceblue;
    }
</style>