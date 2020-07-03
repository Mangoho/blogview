<template>
    <Scroll loading-text="加载中。。。" class="scroll" height="940" :on-reach-bottom="handleReachBottom">
        <div class="content">
            <div class="focusbloglist">
                <Publish>
                </Publish>
                <div style="margin-bottom: 10px">
                <Card class="select">
                <Tabs style="width: 100%">
                    <TabPane label="关注用户列表" icon="md-person" name="0"></TabPane>
                </Tabs>
                </Card>
                </div>
                <template v-for="it in FocusInfoList">
                    <FocusInfo :FocusInfo ="it"></FocusInfo>
                </template>
                </div>
                <div class="usercard">
                <Affix :offset-top="75">
                    <UserCard></UserCard>
                </Affix>
                </div>
            </div>
    </Scroll>

</template>


<script>
  import blogApi from "@/api/blogApi";
  import commonApi from "@/api/commonApi";
  import UserCard from "../components/UserCard";
  import Publish from "@/components/Blog/Publish";
  import VedioUpload from "@/components/Blog/VedioUpload";
  import VedioPlayer from "@/components/Blog/VedioPlayer";
  import FocusInfo from "@/components/User/focusUerInfo";


  var index=0;
  export default {
    name: "myfocus",
    components: { FocusInfo, Publish, UserCard},	
    data() {
      return {
        FocusInfoList:[]
      };
    },
    methods: {
      async getMYFocus() {
        let res = await commonApi.getFocusList(this.$store.state.user.userinfo.userid, index,10);
        console.log("asdsad" + res);
		    res.forEach((val) => {
        this.FocusInfoList.push(val);
        });
      },
      handleReachBottom() {
        setTimeout(() => {
        index++;
        this.getMYFocus();
        console.log("111111");
        }, 0);
      }
    },
    mounted() {
	    this.getMYFocus();
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

    /*.scroll >>> .ivu-scroll-container::-webkit-scrollbar {*/
        /*width: 0 !important;*/
    /*}*/
</style>