<template>
  <div class="weather">
    <r-title text="天气情况" />
    <div class="specific">
      <single-weather
        v-for="(item, index) in weatherData"
        :key="index"
        :backUrl="item.backUrl"
        :textColor="item.textColor"
        :day="item.day"
        :weather="item.weather"
        :temper="item.temper"
      />
    </div>
    <r-corner />
  </div>
</template>

<script>
import corner from './components/corner'
import title from './title'
import singleWeather from './components/singleWeather'
import backImg1 from '@/assets/images/weather_1.png'
import backImg2 from '@/assets/images/weather_2.png'
import backImg3 from '@/assets/images/weather_3.png'
import backImg4 from '@/assets/images/weather_4.png'
import { getWeather } from '@/services/index'
export default {
  components: {
    'r-title': title,
    'r-corner': corner,
    'single-weather': singleWeather
  },
  data () {
    return {
      weatherData: [
        {
          backUrl: backImg1,
          textColor: '#7f7f7f',
          day: '昨天',
          weather: '',
          temper: ''
        }, {
          backUrl: backImg2,
          textColor: '#ff8449',
          day: '24h',
          weather: '',
          temper: ''
        }, {
          backUrl: backImg3,
          textColor: '#8e7ded',
          day: '48h',
          weather: '',
          temper: ''
        }, {
          backUrl: backImg4,
          textColor: '#259dd7',
          day: '72h',
          weather: '',
          temper: ''
        }
      ]
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      getWeather().then(res => {
        let yesterday = res.beforedata
        let otherDay = res.nextthreedata
        let data = [...this.weatherData]
        data[0].weather = yesterday.currentWeather
        data[0].temper = `${yesterday.lowTemperature24}℃~${yesterday.highTemperature24}℃`
        data[1].weather = otherDay.currentWeather
        data[1].temper = `${otherDay.lowTemperature24}℃~${otherDay.highTemperature24}℃`
        data[2].weather = otherDay.nextWeather
        data[2].temper = `${otherDay.lowTemperature48}℃~${otherDay.highTemperature48}℃`
        data[3].weather = otherDay.dayAfterNextWeather
        data[3].temper = `${otherDay.lowTemperature72}℃~${otherDay.highTemperature72}℃`
        this.weatherData = data
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.weather
  padding 15px 10px
  width 100%
  box-sizing border-box
  position relative
  background-color white
  .specific
    margin 19px 0 4px 0
    display flex
    justify-content space-around
    align-items center
</style>
