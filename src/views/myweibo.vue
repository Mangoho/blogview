<template>
    <Scroll loading-text="加载中。。。" class="scroll" height="940" :on-reach-bottom="handleReachBottom">
        <div class="content">
            <div class="bloglist">
                <Publish>
                </Publish>
                <template v-for="item in blogList">
                    <Blog :key="item.blogid" :blog="item"></Blog>
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
  import Blog from "@/components/Blog/Blog";
  import blogApi from "@/api/blogApi";
  import UserCard from "../components/UserCard";
  import Publish from "@/components/Blog/Publish";
  import RecentMsg from "../components/RecentMsg";
  import VedioUpload from "@/components/Blog/VedioUpload";
  import VedioPlayer from "@/components/Blog/VedioPlayer";

  var index=0;
  export default {
    name: "General",
    components: { VedioPlayer, VedioUpload, RecentMsg, Publish, UserCard, Blog },
    props: {},
	
    data() {
      return {
        blogList: []
      };
    },
    methods: {
      async getBlogByFocus() {
        let res = await blogApi.getUseridBlog(this.$store.state.user.userinfo.userid,index,10);
		res.forEach((val) => {
        this.blogList.push(val);
        });
      },
      handleReachBottom() {
        setTimeout(() => {
        index++;
        this.getBlogByFocus();
        console.log("111111");
        }, 0);
      }
    },
    mounted() {
	  this.getBlogByFocus();
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

    .bloglist {
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

    /*.scroll >>> .ivu-scroll-container::-webkit-scrollbar {*/
        /*width: 0 !important;*/
    /*}*/
</style>