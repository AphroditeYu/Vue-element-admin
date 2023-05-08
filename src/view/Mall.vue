<template>
  <div>
    <h1>我的购物车</h1>
    <el-card style="width: 1200px">
      <el-tabs v-model="activeName">
        <!-- 购物车商品 -->
        <el-tab-pane label="全部商品" name="first">
          <el-table
            :data="addedGoods"
            @select="handleSum"
            @select-all="handleSum"
            ref="multipleTable"
          >
            <!-- 复选框 -->
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column
              prop="name"
              label="名称"
              width="180"
            ></el-table-column>
            <el-table-column label="数量" width="280">
              <!-- 使用计数器来添加数量，绑定表格数据行对应的count -->
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.count"
                  @change="handleSum"
                  :min="1"
                  :max="10"
                ></el-input-number>
              </template>
            </el-table-column>
            <el-table-column prop="price" label="单价" width="180">
              <template slot-scope="prices">
                <span>￥{{ prices.row.price }}</span>
              </template>
            </el-table-column>
            <el-table-column label="金额" width="180">
              <template slot-scope="money">
                <span>￥{{ money.row.price * money.row.count }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div style="margin: 20px">
            总价：<span style="color: red">￥{{ sum }}</span>
          </div>
          <div class="addcarts">
            <el-popconfirm title="是否加入购物车">
              <el-button slot="reference">加入购物车</el-button>
            </el-popconfirm>
          </div>
        </el-tab-pane>
        <!-- 添加商品 -->
        <el-tab-pane label="添加商品" name="second">
          <el-table :data="goods">
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="price" label="单价"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleAdd(scope.$index)"
                  >添加</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sum: 0,
      activeName: "first",
      // 添加进购物车的商品数组
      addedGoods: [],
      // 设置的商品
      goods: [
        {
          name: "手机",
          price: 1000,
          count: 1,
        },
        {
          name: "电脑",
          price: 2000,
          count: 1,
        },
        {
          name: "平板",
          price: 3000,
          count: 1,
        },
        {
          name: "电视",
          price: 4000,
          count: 1,
        },
        {
          name: "空调",
          price: 5000,
          count: 1,
        },
      ],
    };
  },
  methods: {
    // 计算总额
    handleSum() {
      this.sum = 0;
      this.$nextTick(() => {
        // console.log(this.$refs.multipleTable.selection);
        // this.$refs.multipleTable.selection获取被选中的行
        this.$refs.multipleTable.selection.forEach((item) => {
          this.sum += item.price * item.count;
        });
      });
    },
    // 删除操作
    handleDelete(i) {
      this.addedGoods.splice(i, 1);
      this.handleSum();
    },
    // 添加操作
    handleAdd(i) {
      let flag = false;
      this.addedGoods.forEach((item) => {
        if (item.name == this.goods[i].name) {
          item.count++;
          flag = true;
        }
      });
      if (!flag) this.addedGoods.push(this.goods[i]);
    },
  },
};
</script>
<style>
</style>