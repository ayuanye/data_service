<template>
  <!-- <body> -->
  <!-- <head>
    <meta charset="UTF-8">
    <title>Title</title>
  </head> -->
  <div id="bgs"></div>
  <!-- </body> -->
</template>

<script>
import "./js/jquery.min.js";
import THREE from "./js/three.min.js";

export default {
  name: "index",
  mounted() {
    // if (this.$route.path === '/login') {
    this.init(); //初始化
    this.animate(); //动画效果
    // }
  },
  data() {
    return {
      SEPARATION: 100,
      AMOUNTX: 60,
      AMOUNTY: 40,
      container: "",
      camera: null,
      scene: null,
      renderer: null,
      particles: [],
      particle: [],
      count: 0,
      windowHalfX: window.innerWidth / 2,
      windowHalfY: window.innerHeight / 2,
    };
  },
  methods: {
    //初始化
    init() {
      // if (this.$route.path === '/login' || this.$route.path === '/register') {
      this.container = document.createElement("div");
      var element = document.getElementById("bgs");
      element.appendChild(this.container);
      this.camera = new THREE.PerspectiveCamera(
        120,
        window.innerWidth / window.innerHeight,
        1,
        1500
      ); //创建透视相机设置相机角度大小等
      this.camera.position.set(0, 450, 2000);

      this.scene = new THREE.Scene();
      this.particles = new Array();

      var PI2 = Math.PI * 2;
      var material = new THREE.ParticleCanvasMaterial({
        color: 0x0f96ff,
        vertexColors: true,
        size: 4,
        program: function (context) {
          context.beginPath();
          context.arc(0, 0, 0.01, 0, PI2, true); //画一个圆形。此处可修改大小。
          context.fill();
        },
      });
      //设置长条粒子的大小颜色长度等
      var materialY = new THREE.ParticleCanvasMaterial({
        color: 0xffffff,
        vertexColors: true,
        size: 1,
        program: function (context) {
          context.beginPath();
          //绘制渐变色的矩形
          var lGrd = context.createLinearGradient(-0.008, 0.25, 0.016, -0.25);
          lGrd.addColorStop(0, "#16eff7");
          lGrd.addColorStop(1, "#0090ff");
          context.fillStyle = lGrd;
          context.fillRect(-0.008, 0.25, 0.016, -0.25);
          //绘制底部和顶部圆圈
          context.fillStyle = "#0090ff";
          context.arc(0, 0, 0.008, 0, PI2, true); //绘制底部圆圈
          context.fillStyle = "#16eff7";
          context.arc(0, 0.25, 0.008, 0, PI2, true); //绘制顶部圆圈
          context.fill();
          context.closePath();
          //绘制顶部渐变色光圈
          var rGrd = context.createRadialGradient(0, 0.25, 0, 0, 0.25, 0.025);
          rGrd.addColorStop(0, "transparent");
          rGrd.addColorStop(1, "#16eff7");
          context.fillStyle = rGrd;
          context.arc(0, 0.25, 0.025, 0, PI2, true); //绘制一个圆圈
          context.fill();
        },
      });

      //循环判断创建随机数选择创建粒子或者粒子条
      var i = 0;
      for (var ix = 0; ix < this.AMOUNTX; ix++) {
        for (var iy = 0; iy < this.AMOUNTY; iy++) {
          var num = Math.random() - 0.1;
          if (num > 0) {
            this.particle = this.particles[i++] = new THREE.Particle(material);
          } else {
            this.particle = this.particles[i++] = new THREE.Particle(materialY);
          }
          //particle = particles[ i ++ ] = new THREE.Particle( material );
          this.particle.position.x =
            ix * this.SEPARATION - (this.AMOUNTX * this.SEPARATION) / 2;
          this.particle.position.z =
            iy * this.SEPARATION - (this.AMOUNTY * this.SEPARATION) / 2;
          this.scene.add(this.particle);
        }
      }
      this.renderer = new THREE.CanvasRenderer();
      this.renderer.setSize(window.innerWidth - 10, window.innerHeight - 10);
      this.container.appendChild(this.renderer.domElement);
      // window.addEventListener( 'mousemove', this.onDocumentMouseMove, false );
      // window.addEventListener( 'touchstart', this.onDocumentTouchStart, false );
      // window.addEventListener( 'touchmove', this.onDocumentTouchMove, false );
      window.addEventListener("resize", this.onWindowResize, true);
      // }
    },

    //浏览器大小改变时重新渲染
    onWindowResize() {
      this.windowHalfX = window.innerWidth / 2;
      this.windowHalfY = window.innerHeight / 2;
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },

    animate() {
      // if (this.$route.path === '/login'|| this.$route.path === '/register') {
      requestAnimationFrame(this.animate);
      this.render();
      // } else {
      //   document.body.removeChild(this.container);
      // }
    },

    //将相机和场景渲染到页面上
    render() {
      var i = 0;
      //更新粒子的位置和大小
      for (var ix = 0; ix < this.AMOUNTX; ix++) {
        for (var iy = 0; iy < this.AMOUNTY; iy++) {
          this.particle = this.particles[i++];
          //更新粒子位置
          this.particle.position.y =
            Math.sin((ix + this.count) * 0.3) * 50 +
            Math.sin((iy + this.count) * 0.5) * 50;
          //更新粒子大小
          this.particle.scale.x =
            this.particle.scale.y =
            this.particle.scale.z =
              ((Math.sin((ix + this.count) * 0.3) + 1) * 4 +
                (Math.sin((iy + this.count) * 0.5) + 1) * 4) *
              50; //正常情况下再放大100倍*1200
        }
      }

      this.renderer.render(this.scene, this.camera);
      this.count += 0.1;
    },
  },
};
</script>

<style scoped>
#bgs {
  margin: 0;
  overflow: hidden;
  /* background: linear-gradient(to bottom, #19778c, #095f88); */
  background-size: 1400% 300%;
  animation: dynamics 6s ease infinite;
  -webkit-animation: dynamics 6s ease infinite;
  -moz-animation: dynamics 6s ease infinite;
  font-size: 14px;
  color: #ffffff;
  position: absolute;
  display: flex;
  z-index: 1;
  width: 100%;
  height: 100%;
}
</style>
