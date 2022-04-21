var app = new Vue ({
  el:"#app",
  data:{
    city:'',
    weatherList:[],
  },
  methods: {
    searchWeather: function() {
      // console.log('xxxx');
      // 调用接口
      var that = this;
      axios.get('http://wthrcdn.etouch.cn/weather_mini?city=' + this.city)
      .then(function(response){
        that.weatherList = response.data.data.forecast;
        console.log(response.data);
      })
      .catch(function(err){
        console.log(err);
      })
    }
  },
})