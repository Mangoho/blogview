<template>
    <Card class="card">
        <p slot="title">注册</p>
        <Form ref="formRegist" :model="formRegist" :rules="ruleValidate" label-position="top">
            <FormItem label="手机号" prop="userid">
				<!--prefix文本框样式-->
                <Input prefix="md-phone-portrait" style="width: auto;" v-model="formRegist.userid"></Input>
            </FormItem>
            <FormItem label="设置密码" prop="pwd">
                <Input prefix="ios-lock-outline" style="width: auto;" type="password" v-model="formRegist.password" password></Input>
            </FormItem>
			<FormItem label="确认密码" prop="checkpass">
			    <Input prefix="ios-lock-outline" style="width: auto;" type="password" v-model="formRegist.checkpass" password></Input>
			</FormItem>
            <FormItem label="用户名（昵称）" prop="nickname">
                <Input prefix="ios-contact-outline" style="width: auto;" v-model="formRegist.username"></Input>
            </FormItem>
			<FormItem label="性别" prop="sex" @change="getvaluemethod($event)">
			    <Select style="width: auto;" v-model="formRegist.sex">
					<Option value="male">男</Option>
					<Option value="famale">女</Option>
				</Select>
			</FormItem>
			<FormItem label="简介" prop="intro">
				<Input 
					type="textarea" 
					v-model="formRegist.intro"
					:maxlength="100"
					show-word-limit
					:rows="4"/>
			</FormItem>
			<FormItem label="头像" prop='photo'>
				<photoUpload ref='img'/>
			</FormItem>
            <FormItem>
                <Button long type="success" style="width: auto;" @click="register">注册</Button>
            </FormItem>
        </Form>

    </Card>
</template>

<script>
  import api from "../api/commonApi";
  import photoUpload from "@/components/Blog/photoUpload";  
  export default {
    name: "Register",
	components:{
		photoUpload
	},
    data(){
      const validatePhone = (rule, value, callback) => {
        var reg = new RegExp(
          "^1(3|4|5|7|8)\d{9}$"
        );
        if (value === "") {
          callback(new Error("手机号不能为空！"));
          return false;
        } else if (reg.test(value)) {
          callback(new Error("请输入有效合法的手机号！"));
        } else {
          callback();
        }
      };
	  const validatePass = (rule, value, callback) => {
		  if (value === '') {
			  callback(new Error('请再次输入密码'));
		  } else if (value !== this.formRegist.password) {
			  callback(new Error('两次输入密码不一致!'));
		  } else {
			  callback();
		  }
	  };  
      return {
        formRegist: {
          userid:'',
          password: '',
		  checkpass:'',
          username: '',
		  sex:'male',
		  intro:'',
		  file:''
        },
        ruleValidate: {
          userid: [
            {required:true,validator:validatePhone, trigger: 'blur' }
          ],
          password: [
            {required:true,message: '密码不能少于6位!',min:6, trigger: 'blur' },
			//{ validator: validatePass, trigger: 'blur' }
          ],
		  checkpass: [
		  	{ validator: validatePass, trigger: 'blur' }
		  ],
          username:[
            {required:true,message: '用户名不能为空!',trigger: 'blur'}
          ]

        }
      }
    },
    methods:{
      async register() {
        //this.handleSpinCustom()		
		if (this.$refs.img.fileList.length==1){
			this.formRegist.file=this.$refs.img.fileList[0];
		}
		this.$delete(this.formRegist,'checkpass');
        let code = await api.register(
			this.formRegist,
			res=>{			  
			  this.$refs.img.fileList = [];
			  this.$refs.img.imgBase64 = [];
			}
		);
        if (code.data==1)
        {
          this.$Message.success('注册成功！');
        }
		if (code.data==-1)
		{
		  this.$Message.success('注册失败！用户id已存在');
		}
        this.$Spin.hide();
        //console.log(res);
      },
	  getvaluemethod: function(event) {
	  					//获取当前选中的值，并重新赋值
	  					_this.formRegister.sex = event.target.value;
	  				},
      handleSpinCustom () {
        this.$Spin.show({
          render: (h) => {
            return h('div', [
              h('Icon', {
                'class': 'demo-spin-icon-load',
                props: {
                  type: 'ios-loading',
                  size: 18
                }
              }),
              h('div', 'Loading')
            ])
          }
        });
      }
    }
  };
</script>

<style scoped>
.card{
    width: 700px;
    padding: 0px 16px;
    margin: 50px auto;
}
</style>