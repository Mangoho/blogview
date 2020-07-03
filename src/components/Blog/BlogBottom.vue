<template>
  <div style="margin-bottom: 6px">
    <Divider class="divider" />
    <Row class="blog_bottom">
	  <!--
      <Col span="6" class="boder">
		
        <a type="text">
          <Icon type="ios-star-outline" size="18" />
          收藏
        </a>
		
      </Col>
	  -->
      <Col span="8" class="boder">
        <a type="text" @click="isforward=true">
          <Icon type="ios-share-alt-outline" size="18" />
          {{ blog.forward == 0 ? "" : blog.forward }}
		  <Modal
			  v-model="isforward"
			  title="转发"
			  @on-ok="forwardBlog"
			  @on-cancel="">
			  <Input v-model="content" type="textarea" maxlength="100" show-word-limit/>
			  <div class="emojiselect">
			    <twemoji-picker
			      class="emoji"
			      :emojiData="emojiDataAll"
			      :emojiGroups="emojiGroups"
			      :skinsSelection="false"
			      :searchEmojisFeat="true"
			      searchEmojiPlaceholder="查找表情"
			      searchEmojiNotFound="Emojis not found."
			      isLoadingLabel="Loading..."
			      :randomEmojiArray="['😀']"
			      @emojiUnicodeAdded="append"
			    ></twemoji-picker>
			    <span style="margin-left: -6px">表情</span>
			  </div>
		  </Modal>
        </a>	  
      </Col>
      <Col span="8" class="boder">
        <a type="text" @click="">
          <Icon type="ios-chatboxes-outline" size="18" />
          {{ blog.comment == 0 ? "" : blog.comment }}
        </a>
      </Col>
      <Col span="8">
        <a type="text" @click="likeBlog">
          <Icon v-if="isliked" color="red" type="ios-thumbs-up" size="18" />
          <Icon v-else type="ios-thumbs-up-outline" size="18" />
          {{ blog.zan == 0 ? "" : blog.zan }}
        </a>
      </Col>
    </Row>
    <Divider class="divider" />
    <!--<Divider style="margin: 6px 0px 0px 0px"/>-->
  </div>
</template>

<script>
import blogApi from "../../api/blogApi.js";
import { TwemojiPicker } from "@kevinfaguiar/vue-twemoji-picker";
import EmojiAllData from "@kevinfaguiar/vue-twemoji-picker/emoji-data/zh/emoji-all-groups.json";
import EmojiGroups from "@kevinfaguiar/vue-twemoji-picker/emoji-data/emoji-groups.json";
export default {
  name: "BlogBottom",
  props: {
    blog: {
      type: Object,
      require: true
    }
  },
  components:{
	  "twemoji-picker": TwemojiPicker
  },
  data() {
    return {
      isliked: false,
	  isforward: false,
	  content: ""
	  /*
      count: {
        shareCount: 0,
        stars: 0,
        commentCount: 0
      }
	  */
    };
  },
  methods: {
	/*
    comment() {
      this.$emit("Comment");
    },
	
    async getCount() {
      let res = await blogApi.getBlogDetail(this.blogid);
      if (res.code == 0) {
        this.count = res.data;
      }
    },
    async isLiked() {
      let res = await blogApi.isLiked(this.blogid);
      if (res.code == 0) {
        this.isliked = res.data.isliked;
      }
    },
	*/
    async likeBlog() {
      let res = await blogApi.likeBlog(this.blog.weiboid);
      if (res === 1) {
        if (this.isliked == false) {
          this.isliked = true;
          this.blog.zan++;
        } else {
          this.isliked = false;
          this.blog.zan--;
        }
      }
    },
	async forwardBlog(){
		let res = await blogApi.forwardBlog(
			this.$store.state.user.userinfo.userid,
			this.$store.state.user.userinfo.username,
			this.blog.weiboid,
			this.content
		)
		if (res===1){
			this.blog.forward++;
			this.content="";
			this.$Message.info('转发成功');
		}
	},
	append(emoji) {
	  this.content += emoji;
	  console.log(this.content.toString());
	}
  },
  mounted() {
    //this.getCount();
    //this.isLiked();
  },
  computed: {
    emojiDataAll() {
      return EmojiAllData;
    },
    emojiGroups() {
      return EmojiGroups;
    }
  }
};
</script>

<style scoped>
.divider {
  margin: 6px 0px;
}
.emojiselect {
  display: inline-block;
  margin-right: 20px;
  height: 30px;
}

.emoji {
  display: inline-block;
  margin-top: -12px;
}
.blog_bottom {
  text-align: center;
  -webkit-user-select: none;
}
.blog_bottom .boder {
  border: 1px solid #d9d9d9;
  border-top: none;
  border-bottom: none;
  border-left: none;
}
.blog_bottom a {
  color: #808080;
  width: 100%;
  height: 100%;
  display: inline-block;
}
</style>
