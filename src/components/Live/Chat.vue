<template>
  <Card :padding="8" title="聊天室">
    <div class="box">
      <div class="main" ref="msgs">
        <ul>
          <li v-for="item in msgLists">
            <div class="msg-normal">
              <span class="name">{{ item.name }}</span>
              <span>：</span>
              <span class="msg">{{ item.msg }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <Divider></Divider>
    <div>
      <Input
        v-model="content"
        type="textarea"
        maxlength="30"
        show-word-limit
        placeholder="说点什么吧"
        @keydown.enter.native="sendMsg"
      />
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
      </div>
      <div class="publishbtn">
        <Button :disable="content.length > 0" type="primary" @click="sendMsg"
          >发送</Button
        >
      </div>
    </div>
  </Card>
</template>
<script>
import { TwemojiPicker } from "@kevinfaguiar/vue-twemoji-picker";
import EmojiAllData from "@kevinfaguiar/vue-twemoji-picker/emoji-data/zh/emoji-all-groups.json";
import EmojiGroups from "@kevinfaguiar/vue-twemoji-picker/emoji-data/emoji-groups.json";
import { createSocket, sendWSPush } from "../../utils/webSocket/ws";
import chatApi from "../../api/chatApi";
export default {
  name: "Chat",
  components: {
    "twemoji-picker": TwemojiPicker
  },
  data() {
    return {
      mediaType: 0, //0：仅文字    1：图片    2：视频
      showImg: false,
      content: "",
      msgLists: []
    };
  },
  methods: {
    async sendMsg() {
      if (this.$store.state.user.islogin == false) {
        this.$Message.error("请登录后发言！");
      } else {
        let resultStr = this.content.replace(/[\r\n]/g, ""); //去掉回车换行
        if (resultStr.length == 0) {
          this.$Message.warning("不能发空消息！");
          this.content = "";
          return;
        }
        let res = await chatApi.sendmsg(this.$route.params.roomid, {
          msg: this.content
        });

        if (res.code == 0) {
          this.content = "";
          // this.$Message.success("成功！")
        } else {
          this.$Message.error("出现意外的错误！");
        }
      }
    },
    append(emoji) {
      this.content += emoji;
      console.log(this.content.toString());
    },
    addmsg(e) {
      let msg = JSON.parse(e.detail.data.data);
      this.msgLists.push({
        name: msg.name,
        msg: msg.msg
      });
      if (this.msgLists.length >= 100) {
        this.msgLists = this.msgLists.splice(10, 90);
      }
      this.$nextTick(() => {
        var container = this.$refs.msgs;
        container.scrollTop = container.scrollHeight;
      });
      // this.$nextTick(function() {
      //   // let div = document.getElementById('dialogue_box');
      //   // div.scrollTop = div.scrollHeight;
      //   if (typeof(this.$refs.msgs.scrollHeight) !== undefined){
      //     this.$refs.msgs.scrollTop = this.$refs.msgs.scrollHeight;
      //   }
      // })
    }
  },
  created() {
    console.log(this.$route.params.roomid);
    createSocket("/ws/chat/" + this.$route.params.roomid);
    window.addEventListener("onmessageWS", this.addmsg);
  },
  computed: {
    emojiDataAll() {
      return EmojiAllData;
    },
    emojiGroups() {
      return EmojiGroups;
    }
  },
  mounted() {},
  beforeDestroy() {
    window.removeEventListener("onmessageWS", this.addmsg);
  }
};
</script>
<style scoped>
.box {
  width: 328px;
  height: 589px;
}
.main {
  overflow-x: hidden;
  overflow-y: auto;
  color: #000;
  font-size: 16px;
  height: 100%;
}
.name {
  margin-right: 8px;
  color: #3c9cfe;
}

/*-------滚动条整体样式----*/
.main::-webkit-scrollbar {
  width: 6px;
  height: 8px;
}
/*滚动条里面小方块样式*/
.main::-webkit-scrollbar-thumb {
  border-radius: 100px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background-color: hsl(0, 0%, 67%);
  border-radius: 8px;
  color: hsl(0, 0%, 20%);
  font-size: 12px;
  gap: normal;
  line-height: 18px;
}
/*滚动条里面轨道样式*/
.main::-webkit-scrollbar-track {
  /*-webkit-box-shadow:inset 0 0 5px rgba(0,0,0,0.2);*/
  border-radius: 0;
  color: hsl(0, 0%, 20%);
  /*background:rgba(0,0,0,0.1);*/
}

.publish {
  width: 600px;
}

.emojiselect {
  display: inline-block;
  margin-right: 20px;
  height: 40px;
}

.emoji {
  display: inline-block;
  margin-top: -12px;
}

.imgup {
  /*overflow:hidden;*/
  display: inline-block;
  margin-right: 20px;
  /*margin-bottom: -22px;*/
  /*height: 40px;*/
}

.publishbtn {
  display: inline-block;
  float: right;
  margin: 5px 2px;
  height: 59px;
}
</style>
