<template>
  <div>
    <svg class="dagre" style="width: 700px; height: 200px; overflow: visible">
      <g class="container" ref="tooltip"></g>
    </svg>
  </div>
</template>
<script>
import dagreD3 from "dagre-d3";
import * as d3 from "d3";
import { getTraceGraphV2, detailV2 } from "@/services/monitoringStationApi";
import { V2 } from "@/services/imageviewApi";
export default {
  name: "dagre",
  props: ["needTraceId", "tellTitle", "needTraceIdss"],
  data() {
    return {
      needTrace: "",
      nodes: [],
      edges: [],
      boxStyle: "fill:#fff;stroke:#515a6e",
      boxStyles: "",
    };
  },
  watch: {
    needTraceId: {
      handler(val) {
        if (val) {
          this.needTrace = val;
          var data = {
            projectId: window.localStorage.getItem("appId"),
            traceId: val,
          };
          if (this.tellTitle == "实时监控") {
            // 我的监控台接口
            getTraceGraphV2(data).then((res) => {
              if (res.data.graphView) {
                this.nodes = res.data.graphView.nodes;
                this.edges = res.data.graphView.edges;
                this.draw();
              }
            });
          } else {
            // 我的快照接口
            V2(data).then((res) => {
              if (res.data) {
                this.nodes = res.data.nodes;
                this.edges = res.data.edges;
                this.draw();
              }
            });
          }
        }
      },
      deep: true,
      immediate: true,
    },
    needTraceIdss: {
      handler(val) {
        if (val) {
          this.needTrace = val;
          // 我的快照接口
          V2({
            projectId: window.localStorage.getItem("appId"),
            traceId: val,
          }).then((res) => {
            if (res.data) {
              this.nodes = res.data.nodes;
              this.edges = res.data.edges;
              this.draw();
            }
          });
        }
      },
    },
  },
  mounted() {},
  methods: {
    // 绘制简单的流程图
    draw() {
      // 创建 Graph 对象
      const g = new dagreD3.graphlib.Graph()
        .setGraph({
          rankdir: "LR",
        })
        .setDefaultEdgeLabel(function () {
          return {};
        });

      // Graph添加节点
      this.nodes.forEach((node) => {
        if (
          node.icon == "server" ||
          node.type == "http server" ||
          node.type == "dubbo server"
        ) {
          var labelVal =
            "<div class='labelContent'>" +
            "<span class='iconfont' style='width:50px;height:50px'>&#xe639;</span>" +
            " " +
            "<span class='labelTitle'>" +
            node.title +
            "</span>" +
            "<br/>" +
            "<span class='subTitle'>" +
            node.subTitle +
            "</span>";
        } else if (node.icon == "desktop" || node.type == "browser") {
          var labelVal =
            "<div class='labelContent'>" +
            "<span class='iconfont' style='width:50px;height:50px'>&#xe61e;</span>" +
            " " +
            "<span class='labelTitle'>" +
            node.title +
            "</span>" +
            "<br/>" +
            "<span class='subTitle'>" +
            node.subTitle +
            "</span>";
        } else {
          var labelVal =
            "<div class='labelContent'>" +
            "<span class='iconfont' style='width:50px;height:50px'>&#xe93a;</span>" +
            " " +
            "<span class='labelTitle'>" +
            node.title +
            "</span>" +
            "<br/>" +
            "<span class='subTitle'>" +
            node.subTitle +
            "</span>";
        }

        g.setNode(node.id, {
          id: node.id,
          label: labelVal,
          labelType: "html",
          shape: "rect",
          style: this.boxStyle,
          labelStyle: "fill: #515a6e;",
          rx: 5,
          ry: 5,
          paddingBottom: 15,
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 5,
        });
      });
      if (this.nodes.length > 1) {
        this.edges.forEach((edge) => {
          g.setEdge(edge.from, edge.to, {
            label: edge.label,
            style: "stroke: #515a6e; fill: none; stroke-width: 2px",
            arrowheadStyle: "fill: #515a6e;stroke: #515a6e;",
            arrowhead: "normal",
          });
        });
      }
      const container = d3.select("svg.dagre").select("g.container");
      const render = new dagreD3.render();
      render(container, g);
      const svg = d3.select("svg.dagre");
      let zoom = d3
        .zoom()
        .scaleExtent([0.5, 2])
        .on("zoom", function () {
          container.attr("transform", d3.event.transform);
        });
      svg.call(zoom);
      const tooltipBox = this.$refs.tooltip;
      svg.selectAll("g.node").on("mouseover", function () {
        // console.log(tooltipBox,'鼠标位置')
        //   tooltipBox.style.display = 'block';
        //   tooltipBox.style.top = 20 + 'px';
        //   tooltipBox.style.color = 'red';
        // }).on('mouseout', function () {
        // //   tooltipBox.style.display = 'none';
      });

      const need = this.needTraceId;
      const _this = this;
      svg.selectAll("g.node").on("click", function (id, index, node) {
        // 选中样式变化
        _this.boxStyle = "stroke: #515a6e; fill: none; stroke-width: 2px";
        _this.$emit("id", id);
        for (var i = 0; i < _this.nodes.length; i++) {
          if (id == _this.nodes[i].id) {
            _this.$emit("clickType", _this.nodes[i].icon);
          }
        }
      });
      return g;
    },
  },
};
</script>
<style>
.container {
  background-color: aqua;
}
</style>

