<template>
  <div>
    <div id="main" style="width: 1000px;height:600px;"></div>
  </div>
</template>
<script src="echarts.min.js"></script>
<script>
import { mapGetters, mapActions } from "vuex";
import echarts from "echarts";
export default {
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList",
    }),
  },
  watch: {
    list: {
      handler() {
        if (this.list.length > 0) {
          //画图
          let myChart = echarts.init(document.getElementById("main"));

          var option = {
            xAxis: {
              type: "category",
              data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: "line",
              },
            ],
          };

          myChart.setOption(option);
        }
      },
      deep: true,
    },
  },

  mounted() {
    this.reqList();
  },
};
</script>
<style scoped>
</style>