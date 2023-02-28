<template>
  <div class="manage">
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
      <!-- 编辑 -->
      <el-form
        ref="form"
        :inline="true"
        :model="form"
        label-width="80px"
        :rules="rules"
        :before-close="handleclose"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请选择"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1">男</el-option>
            <el-option label="女" :value="0">女</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.birth"
              value-format="yyyy-MM-DD"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>
      <!-- 确认和取消按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 增加和查询按钮 -->
    <div class="manage-header">
      <el-button @click="handleadd" type="primary"> +新增 </el-button>
      <!-- 表单搜索区域 -->
      <el-form :inline="true"  :model="userform">
        <el-form-item>
          <el-input placeholder="请输入查询内容" v-model="userform.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="onsubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <el-table stripe :data="tableData" style="width: 100%" height="90%">
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="age" label="年龄" width="180"></el-table-column>
      <el-table-column prop="sexLabel" label="性别">
        <template slot-scope="scope">
          <span>{{ scope.row.sex == 1 ? "男" : "女" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="birth" label="出生日期"></el-table-column>
      <el-table-column prop="addr" label="地址"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)" type="info"
            >编辑</el-button
          >
          <el-button size="mini" @click="handleDelete(scope.row)" type="danger"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div>
      <!-- 分页 -->
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        @current-change="handelPage"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getUser, addUser, updateUser, deleteUser } from "@/api";
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      // rules表单验证规则
      rules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
          },
        ],
        age: [
          {
            required: true,
            message: "请输入年龄",
          },
        ],
        sex: [
          {
            required: true,
            message: "请输入性别",
          },
        ],
        birth: [
          {
            required: true,
            message: "请输入出生日期",
          },
        ],
        addr: [
          {
            required: true,
            message: "请输入地址",
          },
        ],
      },
      tableData: [],
      modeltype: 0, //0表示新增弹窗,1表示编辑
      total: 0,
      pageData: {
        page: 1,
        limit: 10,
      },
      userform:{
        name:''
      }
    };
  },
  methods: {
    //提交用户表单
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.modeltype === 0) {
            addUser(this.form).then(() => {
              //重新获取列表的接口
              this.getList();
            });
          } else {
            updateUser(this.form).then(() => {
              //重新获取列表的接口
              this.getList();
            });
          }
          //对该表单进行重置
          this.$refs.form.resetFields();
          //关闭弹窗
          this.dialogVisible = false;
        }
      });
    },
    //弹窗关闭的时候
    handleclose() {
      // resetFields重置子组件中的表单字段的值
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    cancel() {
      this.handleclose();
    },
    // 编辑
    handleEdit(row) {
      this.modeltype = 1;
      this.dialogVisible = true;
      //对当前行数据进行深拷贝
      this.form = JSON.parse(JSON.stringify(row));
    },
    // 删除
    handleDelete(row) {
      this.$confirm("此操作将删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          deleteUser({ id: row.id }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getList();
          });
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //新增
    handleadd() {
      this.modeltype = 0;
      this.dialogVisible = true;
    },
    //获取列表的数据
    getList() {
      getUser({...this.userform,...this.pageData}).then(({ data }) => {
        // console.log(data);
        this.tableData = data.list;
        this.total = data.count || 0;
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    handelPage(val) {
      // console.log(val,'val');
      this.pageData.page = val;
      this.getList();
    },
    onsubmit(){
      this.getList()
    }
  },
  mounted() {
    this.getList();
  },
  
};
</script>
<style lang="less">
.manage {
  height: 90%;
  
  // .common-tabel{
  //   position: relative;
  //   height: calc(100%-62px);
  //   .pager{
  //     position:absolute;
  //     bottom:0;
  //     right: 20px;
  //   }
  // }
}
</style>