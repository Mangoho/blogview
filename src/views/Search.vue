<template>
    <div style="width: 800px;">
        <Card class="searchbar">
            <Input v-model="query" :placeholder="输入用户名关键字" style="width: 650px"/>
            <Button style="margin-left: 40px" type="primary" @click="search_fun">搜索</Button>
        </Card>
        <div style="margin-bottom: 10px">
            <Card class="select">
                <Tabs v-model="select" style="width: 100%">
                    <TabPane label="查询结果" icon="md-person" name="0"></TabPane>
                </Tabs>
            </Card>
        </div>
        <div class="conentlist">
            <div style="width:600px;float: left">
                <template v-for="item in userList">
                    <UserInfo :userinfo="item"></UserInfo>
                </template>
            </div>
            <div style="width: 180px;float: right;">
                <Card>
                    <p slot="title">搜索历史</p>
                    <template v-for="item in search_history">
                        <a class="serach_history" @click="click_history(item)">
                            <p>{{item}}</p>

                        </a>
                    </template>
                </Card>
            </div>
        </div>

    </div>
</template>

<script>
  import Storage from "@/utils/storage";
  import commonApi from "../api/commonApi";
  import Blog from "@/components/Blog/Blog";
  import UserInfo from "@/components/User/UserInfo";
  
  var l=JSON.parse(Storage.get("search_list"));
  if (l!=null)
	l=l.reverse();
	
  export default {
    name: "Search",
    components: { UserInfo, Blog },	
    data() {
      return {
        search_history:[], //l 加载搜索历史
        select: "0",
        search: this.$route.query.search,
        query: this.$route.query.search,
        searchres: new Map(),
        blogList: [],
        userList:[],
        filterList:[]
      };
    },
    async mounted(){
      // let res0 = await commonApi.search(1, "");
      // console.log(res0);
      // //this.searchres.set("user", data);
      // this.userList = res0;
    },
    methods: {
      async search_fun() {
        if(this.query.length==0)
          return
        let liststr = Storage.get("search_list");
        let list = JSON.parse(liststr)
        if(list == null)
          list = new Array()
        if (list.length>=10) {
          list = list.slice(list.length-10,list.length)
        }

		    if(list.indexOf(this.query)==-1)
		  	list.push(this.query);

        this.search_history = list.reverse()
        Storage.set("search_list", list);
        this.selected(this.select);
      },
      click_history(item){
      console.log("asdadads");
      this.query = item;
      this.search_fun();
      },
      
      async selected(select) {
        if (this.searchres == null) {
          this.searchres = new Map();
        }

        switch (select) {
          case "0":
            console.log("0")
            let res0 = await commonApi.search(1, this.query);
            console.log(res0);
            this.searchres.set("user", data);
            this.userList = res0;
            break;
          case "1":
            console.log("1")
            let data = await commonApi.search(1, this.query);
            this.searchres.set("user", data);
            this.userList = data;
            break;
          case "2":
            console.log("2")
            this.filterList = this.blogList.filter((item)=>{
              return item.mediaType == 1
            }) ;
            break;
          case "3":
            this.filterList = this.blogList.filter((item)=>{
              return item.mediaType ==2
            }) ;
            break;
          case "4":
            this.filterList = this.blogList.filter((item)=>{
              return item.mediaType == 3
            });
            break;
          default :

            break;
        }
      }
    },
	beforeDestroy() {
		Storage.set("search_list", []);
	},
    watch: {
      select(val, oldVal){//普通的watch监听
        this.selected(val)
      }
    }
  };
</script>

<style scoped>

    .serach_history{
        width: 100%;
        height: 100%;
    }

    .serach_history p:hover{
        background-color: hsl(240, 13%, 95%);
    }

    .conentlist {
        width: 800px;
    }

    .searchbar {
        margin-bottom: 10px;
    }

    .select {
        text-align: center;
    }

    .select >>> .ivu-card-body {
        padding-bottom: 0px;
    }

    .select >>> .ivu-tabs-tab {
        width: 130px;
    }

    .select >>> .ivu-tabs-ink-bar {
        width: 140px;
    }
</style>