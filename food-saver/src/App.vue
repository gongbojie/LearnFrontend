<template>
  <header>
    <router-link to="/">
      <p class="nav-title">首页</p>
    </router-link>
  </header>
  
  <router-view/>
</template>

<style>
/* 消除顶部和左右边距 */
* {
   margin: 0px;
   padding: 0px;
}

header {
  /* background: blue; */
  color: white;
  /* box-sizing: border-box; */
  text-align: center;
  margin-top: 15px;
  margin-bottom: 10px;
}

.nav-title {
  text-decoration: none;
  color: rgb(37, 41, 53);
}
</style>
