<template>
  <el-row >
    <el-col>
      <div ref="div" class="home">
        <canvas style="overflow: hidden" ref="canvas" id="paopao"></canvas>
      </div>
    </el-col>
  </el-row>
</template>
<style scoped>
  .home {
    height: 100%;
    margin: -20px;
  }
</style>
<script>
  export default {
    data () {
      return {
        canvas: null,
        ctx: null,
        width: null,
        height: null,
        circles: [],
        distroyed: false,
      }
    },
    mounted(){
      this.width = this.$refs['div'].clientWidth;
      this.height = this.$store.state.window.clientHeight-200;
      this.canvas = this.$refs['canvas']
      this.initHeader();
    },
    destroyed(){
      this.distroyed = true
    },
    methods: {
      initHeader(){
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext('2d');
        for (var x = 0; x < this.width * 0.5; x++) {
          var c = this.createCircle()
          this.circles.push(c);
        }
        this.animate();
      },
      animate() {
        if (this.distroyed)return
        this.ctx.clearRect(0, 0, this.width, this.height);
        for (var i in this.circles) {
          this.draw(this.circles[i]);
        }
        requestAnimationFrame(this.animate);
      },
      createCircle(){
        return {
          pos: {
            x: Math.random() * this.width,
            y: this.height + Math.random() * 100
          },
          alpha: 0.1 + Math.random() * 0.3,
          scale: 0.1 + Math.random() * 0.3,
          velocity: Math.random()
        }
      },
      draw(circle){
        if (circle.alpha <= 0) {
          circle.pos = {
            x: Math.random() * this.width,
            y: 0
          },
            circle.alpha = 0.1 + Math.random() * 0.3,
            circle.scale = 0.1 + Math.random() * 0.3,
            circle.velocity = Math.random()
        }
        circle.pos.y += circle.velocity;
        circle.alpha -= 0.0005;
        this.ctx.beginPath();
        this.ctx.arc(circle.pos.x, circle.pos.y, circle.scale * 10, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = 'rgba(255,255,255,' + circle.alpha + ')';
        this.ctx.fill();
      }
    }
  }
</script>
