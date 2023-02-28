<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="8">
        <el-card class="box-card">
          <div class="user">
            <img src="@/assets/img/user.jpg" />
            <div class="userinfo">
              <p class="admin">Admin</p>
              <p class="supadmin">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>
              登录的时间:<span>{{ dateformat(newDate) }}</span>
            </p>
            <p>登录的地点:
              <span>
              <select name="province" id="province" style="width:100px">
                <option value="hunan">湖南</option>
                <option value="hunan">湖北</option>
                <option value="hunan">上海</option>
                <option value="hunan">天津</option>
              </select>
              </span>
          </p>
          </div>
        </el-card>
        <el-card style="height: 430px; margin-top: 20px">
          <el-table :data="tableData">
            <el-table-column
              v-for="(value, key, index) in tablelabel"
              :prop="key"
              :key="index"
              :label="value"
            />
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-row :gutter="10">
          <el-col
            class="num"
            v-for="item in numdata"
            :key="item.name"
            :span="8"
          >
            <el-card :body-style="{ display: 'flex', padding: '0' }">
              <i
                class="icon"
                :class="`el-icon-${item.icon}`"
                :style="{ background: item.color }"
              ></i>
              <div class="order">
                <p class="price">￥{{ item.value }}</p>
                <p class="desc">{{ item.name }}</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-card style="height: 280px">
          <!-- 折线图 -->
          <div ref="echarts1" style="height: 280px"></div>
        </el-card>
        <div class="graph">
          <el-card style="height: 250px">
            <div ref="echarts2" style="height: 250px"></div>
          </el-card>
          <el-card style="height: 250px">
            <div ref="echarts3" style="height: 240px"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getData } from "@/api";
//echarts用于创建各种类型的图表和数据可视化，如折线图、柱状图、饼图、地图
import * as echarts from "echarts";
export default {
  data() {
    return {
      //表格的数据
      tableData: [],
      tablelabel: {
        name: "型号",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总共购买",
      },
      numdata: [
        {
          name: "今日支付订单",
          value: 1000,
          icon: "success",
          color: "#c0d695",
        },
        {
          name: "今日收藏订单",
          value: 334,
          icon: "star-on",
          color: "#d5ebe1",
        },
        {
          name: "今日未支付订单",
          value: 200,
          icon: "error",
          color: "#f9d3e3",
        },
        {
          name: "今日未收藏订单",
          value: 225,
          icon: "star-off",
          color: "#dd7694",
        },
        {
          name: "今日投诉订单",
          value: 345,
          icon: "phone",
          color: "#db9b34",
        },
        {
          name: "今日购买订单",
          value: 113,
          icon: "s-goods",
          color: "#fedc5e",
        },
      ],
      newDate: new Date(),
    };
  },
  mounted() {
    getData().then(({ data }) => {
      const { tableData } = data.data;
      this.tableData = tableData;

      //  折线图
      // 基于准备好的dom，初始化echarts实例
      const myChart1 = echarts.init(this.$refs.echarts1);
      //指定数据
      const echarts1option = {};
      //处理数据xAxis
      const { orderData, userData, videoData } = data.data;
      const xAxis = Object.keys(orderData.data[0]);
      const xAxisData = {
        data: xAxis,
      };
      echarts1option.xAxis = xAxisData;
      echarts1option.yAxis = {};
      echarts1option.legend = xAxisData;
      echarts1option.series = [];
      xAxis.forEach((key) => {
        echarts1option.series.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: "line",
        });
      });
      // console.log(echarts1option);
      myChart1.setOption(echarts1option);

      // 柱状图
      const myChart2 = echarts.init(this.$refs.echarts2);
      //指定数据
      const echarts2option = {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: userData.map((item) => item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: [
          "#2ec7c9",
          "#b6a2de",
          "#5ab1ef",
          "#ffb980",
          "#d87a80",
          "#8d98b3",
        ],
        series: [
          {
            name: "新增用户",
            data: userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: userData.map((item) => item.active),
            type: "bar",
          },
        ],
      };
      console.log(echarts2option);
      myChart2.setOption(echarts2option);

      //饼状图
      const myChart3 = echarts.init(this.$refs.echarts3);
      //指定数据
      const echarts3option = {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [
          {
            data: videoData,
            type: "pie",
          },
        ],
      };
      myChart3.setOption(echarts3option);
    });
    let that = this;
    this.timer = setInterval(function () {
      //表示将当前的时间转换为字符串
      that.newDate = new Date().toLocaleString();
    });
  },
  // 销毁时清除计时器
  beforeDestroy: function () {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods:{
    // 时间格式化
    dateformat () {
    	var date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
        var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        let week = date.getDay() // 星期
        let weekArr = [ '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六' ]
        // 拼接 时间格式处理
        return year + '年' + month + '月' + day + '日 ' + hours + ':' + minutes + ':' + seconds + ' ' + weekArr[week]
    }
  }
};
</script>
<style lang="less" scoped>
.user {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .userinfo {
    .admin {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .supadmin {
      font-size: 16px;
      color: #999;
    }
  }
}
.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  .el-card {
    margin-bottom: 10px;
    width: 100%;
    // margin-left: 10px;
  }
  .icon {
    width: 80px;
    color: #fff;
    height: 80px;
    font-size: 30px;
    line-height: 80px;
    text-align: center;
  }
  .order {
    display: flex;
    margin-left: 15px;
    flex-direction: column;
    justify-content: center;
    .price {
      font-size: 30px;
      height: 30px;
      margin-bottom: 10px;
      line-height: 30px;
    }
    .desc {
      font-size: 16px;
      color: #ccc;
    }
  }
}
.graph {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  .el-card {
    width: 48%;
  }
}
</style>