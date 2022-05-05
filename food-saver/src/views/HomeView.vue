<template>
  <div class="left-cost">
    <p class="cost-title">预计还够消耗</p>
    <p class="cost-content">
      <span class="day-count">5</span>
      <span class="day-unit">天</span>
    </p>
     <div class="triangle-arrow"></div>
  </div>
  <div class="food-content">
    <van-tabs v-model:active="active">
      <van-tab v-for="(item, index) in tabArray" v-bind:key="index" :title="item.text">
        <!-- 判断是否有数组，无数组显示空数据 -->
        <van-empty v-if="contentArray[index] == undefined || contentArray[index].length <= 0" description="储藏间空空如也" />
        <van-grid :border="false" v-else>
          <van-grid-item v-for="item in contentArray[index]" :key="item.id">
            <p class="item-emoji-icon">{{ item.icon }}</p>
            <p class="item-title">{{ item.titleName }}</p>
            <p class="item-count">
              {{ item.restCount }}
              <span class="item-unit">{{ item.unit }}</span>

            </p>
          </van-grid-item>
        </van-grid>
      </van-tab>
    </van-tabs>
  </div>
  <footer class="add-button">
    <router-link :to="'/addItem/'" class="movie-link">
      <img src="../assets/add_btn.png" alt="addItem" class="add-btn">
    </router-link>
  </footer>
</template>

<script>
import { ref } from 'vue';
import const_value from '@/const.js'

export default {
  setup() {
    const active = ref(0);
    return { active };
  },
  data() {
    return {
      tabArray: const_value.tabArray,
      contentArray:[
        [
          {icon:'🍪', titleName:'饼干', restCount:'5', unit:'袋', id: 1},
          {icon:'🍰', titleName:'蛋糕', restCount:'5', unit:'块', id: 2}
        ],
        [
          {icon:'🥩', titleName:'牛排', restCount:'5', unit:'块', id: 1},
          {icon:'🐟', titleName:'鱼', restCount:'5', unit:'条', id: 2},
          {icon:'🍚', titleName:'大米', restCount:'5', unit:'包', id: 3},
        ]
      ]
    }
  },
  methods: {
    addItemClick() {
      alert('addItemClick')
    }
  }
}
</script>

<style>
.left-cost {
  background: rgb(236, 218, 218);
  height: 190px;
}

.cost-title {
  /* background: red; */
  margin: 0;
  padding-top: 25px;
  padding-bottom: 30px;
  color: rgb(37, 41, 53);
  text-align: center;
}

.cost-content {
  text-align: center;
  position: relative;
  left: 7px;
}

.day-count {
  /* background-color: purple; */
  font-size: 50px;
  font-weight: 600;
}

.day-unit {
  position: relative;
  bottom: 5px;
  left: 5px;
}

.triangle-arrow {
  width: 0;
  height: 0;
  border-bottom: 40px solid #fff;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  /* width: 50%; */
  margin: 0 auto;
  position: relative;
  top: 20px;
}

footer {
  height: 100px;
  width: 100%;
  position: fixed;
  bottom: 0;
}

.add-button {
  text-align: center;
  /* background: yellow; */
}

.add-btn {
  width: 50px;
  height: 50px;
}

.item-emoji-icon {
  font-size: 50px;
}

.item-title {
  font-size: 15px;
}

.item-count {
  margin-top: 10px;
  font-size: 25px;
}

.item-unit {
  font-size: 15px;
}

</style>