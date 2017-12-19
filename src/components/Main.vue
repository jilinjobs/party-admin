<template>
  <div style="height: 100%">
	  		<el-container class="container">
          <el-header height="36px" style="line-height:36px;">
            <span>流动党员信息</span>
            <i class="el-icon-refresh" v-on:click="query"></i>
            <el-button icon="el-icon-download" type="text" v-on:click="downCsv">下载表格</el-button>
            <el-button icon="el-icon-download" type="text" v-on:click="downImg">下载图片</el-button>
            <el-button icon="el-icon-printer" type="text" v-on:click="print">打印</el-button>
          </el-header>
          <el-main>
          <el-table v-loading="loading" :data="dataSource" border style="width: 100%;overflow: auto;" size="mini">  
            <el-table-column type="index" width="50"></el-table-column>  
            <el-table-column label="姓名" width="60">
              <template slot-scope="scope">
                <a :href="'/party/admin/image/'+scope.row.id+'/'+scope.row.image" target="_blank">{{scope.row.xm}}</a>
              </template>              
            </el-table-column>
            <el-table-column prop="sfzh" label="身份证号" width="140"></el-table-column>
            <el-table-column prop="szdzb" label="所在党支部" width="180"></el-table-column>
            <el-table-column prop="sjh" label="手机号" width="100"></el-table-column>
            <el-table-column prop="gddh" label="固定电话" width="100"></el-table-column>
            <el-table-column prop="jtzz" label="家庭住址" width="120"></el-table-column>
            <el-table-column prop="wclx" label="外出流向" width="120"></el-table-column>
            <el-table-column prop="type" label="是否迁出" width="80"></el-table-column>
            <el-table-column prop="qwdmc" label="迁往地党组" width="120"></el-table-column>
            <el-table-column prop="qwdlxr" label="迁往地联系人" width="80"></el-table-column>
            <el-table-column prop="qwdlxdh" label="迁往地联系电话" width="100"></el-table-column>
            <el-table-column prop="create_time" label="填报时间" width="100">
              <template slot-scope="scope">
                <span>{{formatDate(scope.row.create_time)}}</span>
              </template>              
            </el-table-column>
          </el-table>
          </el-main>
          <el-footer height="36px"> 
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="page" :page-sizes="[10, 20, 50, 100, 200]" :page-size="size" :total="total"
            layout="total, sizes, prev, pager, next, jumper"></el-pagination>
          </el-footer>
	  		</el-container>
    <div class="printview">
      <div class="paper" v-for="item in dataSource" :key="item.bh">
        <div class="text_box">
        <el-row>
          <el-col :span="24">
            <el-row>
              <el-col :span="3" class="label">编号</el-col>
              <el-col :span="4" class="text">{{item.bh}}</el-col>
              <el-col :span="3" class="label">姓名</el-col>
              <el-col :span="4" class="text">{{item.xm}}</el-col>
              <el-col :span="3" class="label">身份证号</el-col>
              <el-col :span="7" class="text">{{item.sfzh}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="3" class="label">性别</el-col>
              <el-col :span="4" class="text">{{item.xm}}</el-col>
              <el-col :span="3" class="label">民族</el-col>
              <el-col :span="4" class="text">{{item.mz}}</el-col>
              <el-col :span="3" class="label">出生日期</el-col>
              <el-col :span="7" class="text">{{item.csrq}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="3" class="label">手机号</el-col>
              <el-col :span="4" class="text">{{item.sjh}}</el-col>
              <el-col :span="3" class="label">固定电话</el-col>
              <el-col :span="4" class="text">{{item.gddh}}</el-col>
              <el-col :span="3" class="label">家庭住址</el-col>
              <el-col :span="7" class="text">{{item.jtzz}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="3" class="label">学历</el-col>
              <el-col :span="4" class="text">{{item.xl}}</el-col>
              <el-col :span="3" class="label">工作岗位</el-col>
              <el-col :span="14" class="text">{{item.gzgw}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="4" class="label">党籍状态</el-col>
              <el-col :span="3" class="text">{{item.djzt}}</el-col>
              <el-col :span="4" class="label">人员类别</el-col>
              <el-col :span="3" class="text">{{item.rylb}}</el-col>
              <el-col :span="4" class="label">外出流向</el-col>
              <el-col :span="4" class="text">{{item.wclx}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="4" class="label">所在党支部</el-col>
              <el-col :span="20" class="text">{{item.szdzb}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="5" class="label">加入党组织日期</el-col>
              <el-col :span="5" class="text">{{item.rdrq}}</el-col>
              <el-col :span="6" class="label">转为正式党员日期</el-col>
              <el-col :span="5" class="text">{{item.zzrq}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="5" class="label">是否为流动党员</el-col>
              <el-col :span="5" class="text">{{item.sfld}}</el-col>
              <el-col :span="6" class="label">党组织关系是否迁走</el-col>
              <el-col :span="5" class="text">{{item.type==1?'是':'否'}}</el-col>
            </el-row>
            <el-row v-if="item.type==1">
              <el-col :span="4" class="label">迁往地党组织名称</el-col>
              <el-col :span="6" class="text">{{item.qwdmc}}</el-col>
              <el-col :span="4" class="label">迁往地联系人</el-col>
              <el-col :span="3" class="text">{{item.qwdlxr}}</el-col>
              <el-col :span="4" class="label">迁往地联系电话</el-col>
              <el-col :span="3" class="text">{{item.qwdlxdh}}</el-col>
            </el-row>
          </el-col>
        </el-row>
        </div>
        <div class="image_box">
          <img :src="'/party/admin/image/'+item.id+'/'+item.image"/>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import moment from "moment";

moment.locale("zh-cn");

export default {
  data() {
    return {
      loading: false,
      dataSource: [],
      total: 0,
      page: 1,
      size: 20
    };
  },
  mounted() {
    this.query();
  },
  methods: {
    async query() {
      this.loading = true;
      try {
        const res = await api.query({ page: this.page, size: this.size });
        console.log(res);
        if (res.errcode === 0) {
          this.$message({
            type: "success",
            message: "信息查询成功",
            duration: 1000
          });
          this.dataSource = res.data;
          this.total = res.total;
        } else {
          this.$notify.error({
            title: "错误",
            message: res.errmsg
          });
        }
      } catch (err) {
        console.error(err);
        this.$notify.error({
          title: "错误",
          message: err.message || "处理失败"
        });
      } finally {
        this.loading = false;
      }
    },
    down() {
      this.$message({
        type: "warn",
        message: "功能未实现",
        duration: 1000
      });
    },
    downImg() {
      window.open(
        "/party/admin/exportImg?page=" + this.page + "&size=" + this.size,
        "_blank"
      );
    },
    downCsv() {
      window.open("/party/admin/exportCsv", "_blank");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size = val;
      if (this.total == 0) return;
      var pages = Math.floor((this.total + val) / val);
      if (pages < this.page) this.page = pages;
      this.query();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.query();
    },
    formatDate(date) {
      return moment(date).format("lll");
    },
    print() {
      window.print();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.container {
  width: 100%;
  height: 100%;
}
.main {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
.el-table {
  height: 100%;
  overflow: auto;
}
.printview{
  display: none;
}
.label{
  font-weight: bold;
}
.text{
  word-wrap: none;
}
@media print{
  .footer, .container{
    display: none;
  }
  .printview{
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
  }
  html,body{
    width: 100%;
    height: auto;
  }
  .paper{
    height: 100%;
    width: 100%;
    display: inline-block;
    flex-flow: column nowrap;
    page-break-after: always; 
    .text_box{
      display: inline-block;
      width: 100%;
    }
    .image_box{
      align-items: stretch;
      display: inline-block;
      position: relative;
      text-align: center;
      height: 800px;
      width: 100%;
      img{
        max-height: 100%;
        margin: 0 auto;
      }
    }
  }
}
</style>
