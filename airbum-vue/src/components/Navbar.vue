<template>
  <nav class="navbar">
    <div class="logo-icon">
      <a href="#">
        <img class="primary-icon" src="../assets/logo.png" alt="">
      </a>
    </div>
    <ul class="nav-list" id="navi-list">
      <!-- <li class="list-item"><a href="#">首页</a></li> -->
      <!-- <li class="list-item"><a href="#">品牌故事</a></li> -->
      <!-- <li class="list-item"><a href="#">产品</a></li> -->
      <!-- <li class="list-item"><a href="#">关于</a></li> -->

      <router-link class="list-item" to="/">首页</router-link>
      <router-link class="list-item" to="/productList">产品</router-link>
    </ul>

    <div class="right-icon">
      <a href="#">
        <img class="right-primary-icon" src="../assets/underwear-logo.png" alt="">
      </a>
    </div>

    <div class="menu" v-on:click="toggleClick">
      <div class="menu-line"></div>
      <div class="menu-line"></div>
      <div class="menu-line"></div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    toggleClick: function () {
      const naviList = document.getElementById('navi-list')
      naviList.classList.toggle('active')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.navbar {
  background-color: #ffffff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 20px;
}

.primary-icon {
  width: 100px;
}

.nav-list {
  list-style-type: none;
}

.nav-list .list-item {
  display: inline-block;
  padding: 20px 10px;
}

.navbar a {
  color: black;
  text-decoration: none;
}

.navbar a:hover {
  color: #4d5156;
}

.right-icon {
  display: none;
}

.menu {
  display: none;
}

.menu-line {
  width: 20px;
  height: 3px;
  background-color: black;
  margin-bottom: 4px;
}

@media all and (max-width: 480px) {
  .navbar {
    /* flex-direction: column; */
    position: relative;
    height: 60px;
    justify-content: start;
    align-items: center;
  }

  .menu {
    display: block;
    position: absolute;
    right: 15px;
  }

  .right-icon {
    display: block;
    position: absolute;
    /* right: 15px; */
    /* width: 10px;
    height: 10px; */
  }

  .nav-list {
    list-style-type: none;
    width: 100%;
    text-align: center;
    padding-top: 10px;
    display: none;
  }

  .nav-list .list-item {
    display: block;
    border-top: 1px solid white;
  }

  .primary-icon {
    margin-top: 0px;
    margin-left: 20px;
  }

  .active {
    display: block;
  }

}
</style>
