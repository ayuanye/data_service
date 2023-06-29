<template>
  <div id="box">
    <div style="display:flex">
        <p style="background-color: #5e5757;width:20px;height:15px"></p><span style="margin-right:10px"> : VO,DTO,Enum,Utils的方法等;</span>
        <p style="background-color: #9233ac;width:20px;height:15px"></p><span style="margin-right:10px"> : (调用)接口实现的方法;</span>
        <p style="background-color: #b87a44;width:20px;height:15px"></p><span style="margin-right:10px"> : control层的方法;</span>
        <p style="background-color: #3ad606;width:20px;height:15px"></p><span style="margin-right:10px"> : 根节点</span>
    </div>
    <div id="cy" :style="idBackground"></div>
    <div class="box-bot" v-if="nodeDatas.id">
        <span style="font-weight: bold;">id:</span>{{nodeDatas.id}}
        <span style="font-weight: bold;margin-left:10px">名称:</span>{{nodeDatas.name}}
        <span style="font-weight: bold;margin-left:10px">执行到的代码行数:</span>{{nodeDatas.doLines}}
        <span style="font-weight: bold;margin-left:10px">代码行数:</span>{{nodeDatas.lines}}
        <span style="font-weight: bold;margin-left:10px">代码覆盖率:</span>{{nodeDatas.coverageRate}}%
        <span style="font-weight: bold;margin-left:10px">圈复杂度V(G):</span>{{nodeDatas.cyclo}}
    </div>
  </div>
</template>

<script>
import cytoscape from 'cytoscape'
import cydagre from 'cytoscape-dagre'
import dagre from 'dagre'
cydagre(cytoscape, dagre)

export default {
  name: 'cytoscape',
  props:['relationshipImg','modal7'],
  components: {
  },
  data () {
    return {
        idBackground: {backgroundColor: "white"},
        nodes:[],
        lines:[],
        nodeDatas:{}
    }
  },
  watch:{
    relationshipImg:{
        handler(val) {
            if (val) {
                this.nodes = val.nodes
                this.lines = val.lines
                this.$nextTick(() => {
                    document.getElementById('cy').addEventListener('DOMContentLoaded', this.createCytoscape(), true)
                })
            }
        },
        deep: true,
        immediate: true,
    },
    modal7:{
      handler(val){
        if(!val){
          this.nodeDatas={}
        }
      }
    }
  },
  created(){
    this.nodeDatas={}
  },
  methods: {
    createCytoscape () {
        var cy = cytoscape({
            container: document.getElementById('cy'),
            boxSelectionEnabled: false,
            autounselectify: true,
            layout: {
                name: 'dagre',
                padding: 10
            },
            minZoom: 0.1,
            style: [
                {
                    selector: 'node',
                    style: {
                        content:'data(name)',
                        'text-opacity': 0.2,
                        'pie-size': '100%',
                        'text-valign': 'center',
                        'text-halign': 'right',
                        'background-color': '#5e5757',
                        'pie-1-background-color': '#E8747C',
                        'pie-1-background-size': 'mapData(occupy, 0, 10, 0, 100)'
                    },
                },
                {
                    selector: 'node[weight=10]',
                    style: {
                        'text-opacity': 0.2,
                        'pie-size': '100%',
                        'text-valign': 'center',
                        'text-halign': 'right',
                        'background-color': '#5e5757',
                        'pie-1-background-color': '#E8747C',
                        'pie-1-background-size': 'mapData(occupy, 0, 10, 0, 100)'
                    },
                },
                {
                    selector: 'node[weight=20]',
                    style: {
                        'text-opacity': 0.2,
                        'pie-size': '100%',
                        'text-valign': 'center',
                        'text-halign': 'right',
                        'background-color': '#9233ac',
                        'pie-1-background-color': '#E8747C',
                        'pie-1-background-size': 'mapData(occupy, 0, 10, 0, 100)'
                    },
                },
                {
                    selector: 'node[weight=30]',
                    style: {
                        'text-opacity': 0.2,
                        'pie-size': '100%',
                        'text-valign': 'center',
                        'text-halign': 'right',
                        'background-color': '#b87a44',
                        'pie-1-background-color': '#E8747C',
                        'pie-1-background-size': 'mapData(occupy, 0, 10, 0, 100)'
                    },
                },
                {
                    selector: 'node[weight=40]',
                    style: {
                        'text-opacity': 0.2,
                        'pie-size': '100%',
                        'text-valign': 'center',
                        'text-halign': 'right',
                        'background-color': '#3ad606',
                        'pie-1-background-color': '#E8747C',
                        'pie-1-background-size': 'mapData(occupy, 0, 10, 0, 100)'
                    },
                },
                {
                    selector: 'edge',
                    style: {
                        width: 2,
                        'target-arrow-shape': 'triangle',
                        'line-color': '#5e5757',
                        'target-arrow-color': '#5e5757',
                        'curve-style': 'bezier'
                    }
                }
            ],
            elements: {
                nodes: this.nodes,
                edges: this.lines
            },
        })
        cy.nodes().on('click', (evt) => {
            this.nodeDatas = evt.target._private.data
        });
    }
  },
  mounted () {
    
  }
}
</script>

<style>
  body {
    font-family: helvetica;
    font-size: 14px;
  }
  #box{
    width: 100%;
    height: 800px;
  }
  #cy {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
  .__________cytoscape_container{
    position: relative !important;
  }
  canvas{
    left: 0 !important;
  }

  h1 {
    opacity: 0.5;
    font-size: 1em;
  }
  .box-bot{
    position: fixed;
    width: 650px;
    height: 125px;
    background-color: white;
    border: 1px solid #e6e2e2;
    z-index: 999;
    bottom: 10px;
    padding: 10px;
  }
</style>
