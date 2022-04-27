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
    <van-tab title="标签 1">
      <van-empty
        image="https://cdn.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
        image-size="80"
        description="暂时没有库存"
      />

    </van-tab>
    <van-tab title="标签 2">
      <van-grid :column-num="3">
        <van-grid-item v-for="value in 6" :key="value" icon="photo-o" text="文字" />
      </van-grid>

    </van-tab>
    <van-tab title="标签 3">内容 3</van-tab>
    <van-tab title="标签 4">内容 4</van-tab>
    <van-tab title="标签 4">内容 4</van-tab>
    <van-tab title="标签 4">内容 4</van-tab>
    <van-tab title="标签 4">内容 4</van-tab>
</van-tabs>
  </div>
  <footer class="add-button">
    <a href="#">
      <img src="../assets/add_btn.png" alt="addItem" class="add-btn" @click="addItemClick">
    </a>
  </footer>
</template>

<script>
export default {
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

</style>