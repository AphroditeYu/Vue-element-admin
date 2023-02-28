<template>
  <div class="tags">
    <el-tag
      size="small"
      type="success"
      v-for="(item,index) in tags"
      :key="item.path"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click="changetag(item)"
      @close="handleClose(item, index)"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      index:0
    };
  },
  methods: {
    ...mapMutations(["closeTag"]),
    changetag(item) {
      this.$router.push({ name: item.name });
    },
    handleClose(item, index) {
      // 调用store中的mutation
      this.closeTag(item);
      const length = this.tags.length;
      //删除之后的跳转逻辑
      if (item.name !== this.$route.name) {
        return;
      }
      //表示的是删除的最后一项
      if (index === length) {
        this.$router.push({
          name: this.tags[index - 1].name,
        });
      } else {
        this.$router.push({
          name: this.tags[index].name,
        });
      }
    },
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },
};
</script>
<style lang="less" scoped>
.tags {
 padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>