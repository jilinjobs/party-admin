<template>
  	<div>
	  	<transition name="form-fade" mode="in-out">
	  		<el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>流动党员信息确认</span>
          </div>
		    	<el-form class="main" :model="partyForm" :rules="rules" ref="partyForm" :status-icon="true" :show-message="false" size="small">
						<el-form-item prop="xh" label="序号">
							<el-input v-model="partyForm.xh" :readonly="true"></el-input>
						</el-form-item>
						<el-form-item prop="xm" label="姓名">
							<el-input v-model="partyForm.xm"></el-input>
						</el-form-item>
						<el-form-item prop="szdzb" label="所在党支部">
							<el-input v-model="partyForm.szdzb"></el-input>
						</el-form-item>
						<el-form-item prop="sfzh" label="公民身份证号">
							<el-input v-model="partyForm.sfzh"></el-input>
						</el-form-item>
						<el-form-item prop="xb" label="性别">
							<el-input v-model="partyForm.xb"></el-input>
						</el-form-item>
						<el-form-item prop="mz" label="民族">
							<el-input v-model="partyForm.mz"></el-input>
						</el-form-item>
						<el-form-item prop="csrq" label="出生日期">
							<el-input v-model="partyForm.csrq"></el-input>
						</el-form-item>
						<el-form-item prop="xl" label="学历">
							<el-input v-model="partyForm.xl"></el-input>
						</el-form-item>
						<el-form-item prop="rylb" label="人员类别">
							<el-input v-model="partyForm.rylb"></el-input>
						</el-form-item>
						<el-form-item prop="rdrq" label="加入党组织日期">
							<el-input v-model="partyForm.rdrq"></el-input>
						</el-form-item>
						<el-form-item prop="zzrq" label="转为正式党员日期">
							<el-input v-model="partyForm.zzrq"></el-input>
						</el-form-item>
						<el-form-item prop="gzgw" label="工作岗位">
							<el-input v-model="partyForm.gzgw"></el-input>
						</el-form-item>
						<el-form-item prop="sjh" label="手机号">
							<el-input v-model="partyForm.sjh"></el-input>
						</el-form-item>
						<el-form-item prop="gddh" label="固定电话">
							<el-input v-model="partyForm.gddh"></el-input>
						</el-form-item>
						<el-form-item prop="jtzz" label="家庭住址">
							<el-input v-model="partyForm.jtzz"></el-input>
						</el-form-item>
						<el-form-item prop="djzt" label="党籍状态">
							<el-input v-model="partyForm.djzt"></el-input>
						</el-form-item>
						<el-form-item prop="sfld" label="是否为流动党员">
							<el-input v-model="partyForm.sfld"></el-input>
						</el-form-item>
						<el-form-item prop="wclx" label="外出流向">
							<el-input v-model="partyForm.wclx"></el-input>
						</el-form-item>
              <el-radio-group v-model="type" size="small">
                <el-radio-button label="0">党组织关系在中心</el-radio-button>
                <el-radio-button label="1">党组织关系已迁走</el-radio-button>
              </el-radio-group>              
						<el-form-item prop="qwdmc" label="迁往地党组织名称" v-if="type==1" :required="true">
							<el-input v-model="partyForm.qwdmc"></el-input>
						</el-form-item>
						<el-form-item prop="qwdlxr" label="迁往地联系人" v-if="type==1" :required="true">
							<el-input v-model="partyForm.qwdlxr"></el-input>
						</el-form-item>
						<el-form-item prop="qwdlxdh" label="迁往地联系电话" v-if="type==1" :required="true">
							<el-input v-model="partyForm.qwdlxdh"></el-input>
						</el-form-item>
              
						<el-form-item prop="image" label="确认函" :required="true">
							<el-upload
                class="avatar-uploader"
                :action="'/party/api/upload?id='+partyForm._id"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <p>上传确认函照片</p>
              </el-upload>
						</el-form-item>

						<el-form-item>
								<el-button type="primary" @click="submitForm('partyForm')" :style="{width: '100%'}">确认无误提交</el-button>
							</el-form-item>
					</el-form>
	  		</el-card>
	  	</transition>
  	</div>
</template>

<script>
import api from '@/api'

const fields = [
  "xm",
  "szdzb",
  "sfzh",
  "xb",
  "mz",
  "csrq",
  "xl",
  "rylb",
  "rdrq",
  "zzrq",
  "gzgw",
  "sjh",
  "gddh",
  "jtzz",
  "djzt",
  "sfld",
  "wclx"
];
const rules = fields.reduce(
  (p, c) => ({
    ...p,
    [c]: [{ required: true, message: "不能为空", trigger: "blur" }]
  }),
  {}
);
const initForm = fields.reduce(
  (p, c) => ({
    ...p,
    [c]: ""
  }),
  { xh: "1" }
);
export default {
  data() {
    return {
      partyForm: initForm,
      rules,
      imageUrl: "",
      type: "0"
    };
  },
  mounted() {
    this.partyForm = this.$root.currentData;
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await api.submit(this.type, this.partyForm);
          console.log(res);
          if (res.errcode === 0) {
          this.$root.finish = true;
          this.$router.push("/finish");
          this.$message({ type: "success", message: "信息提交成功", duration: 3000});
          this.$root.currentData = res.data;
            this.$router.push(this.$route.query.redirect || "/");
          } else {
            this.$notify.error({
              title: "错误",
              message: res.errmsg,
              offset: 140
            });
          }

        } else {
          this.$notify.error({
            title: "错误",
            message: "信息输入有误，请核对后重新提交",
          });
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      console.log({res, file});
      if(res.errcode !== 0){
          this.$notify.error({
            title: "错误",
            message: "文件上传失败",
          });
          return;
      }
      this.imageUrl = URL.createObjectURL(file.raw);
      this.partyForm.image = res.id;
      this.$message({ type: "success", message: "文件上传成功" });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message({ type: "error", message: "上传确认函图片只能是 JPG 格式!", duration: 3000});
      }
      if (!isLt2M) {
        //this.$message.error("上传确认函图片大小不能超过 2MB!");
        this.$message({ type: "error", message: "上传确认函图片大小不能超过 2MB!", duration: 3000});
      }
      return isJPG && isLt2M;
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.container {
  width: 100%;
  min-height: 100%;
  position: relative;
}
.main {
  max-width: 368px;
  margin: 0 auto;
}
.el-card {
  margin-bottom: 48px;
}
.main .el-form-item {
  margin-bottom: 5px;
}
  .avatar-uploader .el-upload {
    border: 2px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin: 20px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
