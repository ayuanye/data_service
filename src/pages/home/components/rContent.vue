<template>
  <div class="wrapper">
    <div class="outer">
      <div class="single-outer">
        <div class="left">
          <load-cap/>
          <elect-fault class="top-distance"/>
          <r-overload class="top-distance"/>
        </div>
      </div>
      <div class="single-outer">
        <div class="right">
          <r-weather />
          <!-- <r-scale class="top-distance"/> -->
          <risk-warning class="top-distance"/>
          <power-overhaul class="top-distance"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loadCap from './LoadCapacity'
import electFault from './electFault'
import powerOverhaul from './powerOverhaul'
import overload from './overload'
import weather from './weather'
// import scale from './scale'
import riskWarning from './riskWarning'
// import { Row, Col } from 'view-design'
export default {
  components: {
    'load-cap': loadCap,
    'elect-fault': electFault,
    'power-overhaul': powerOverhaul,
    'r-overload': overload,
    'r-weather': weather,
    // 'r-scale': scale,
    'risk-warning': riskWarning
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  height calc(100vh - 109px)
  overflow-y auto
  &::-webkit-scrollbar
    width 4px
  &::-webkit-scrollbar-thumb
    background rgb(26, 200, 206)
    border-radius 4px
  .left
    display flex
    flex-direction column
    justify-content flex-start
    align-items flex-start
    width 100%
  .right
    width 100%
    display flex
    flex-direction column
    justify-content flex-start
    align-items flex-start
  .top-distance
    margin-top 15px
</style>
<style scoped>
@media screen and (min-width: 1920px) {
    .outer{
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .outer .single-outer{
      width: calc((100vw - 209px)/2);
    }
    .outer .single-outer:nth-of-type(2) {
      margin-left: 15px;
    }
}
@media screen and (max-width: 1919px) {
  .outer{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .outer .single-outer{
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: flex-start;
  }
  .right {
    margin-top: 15px;
  }
}
</style>
