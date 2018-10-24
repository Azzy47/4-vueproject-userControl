<template>
  <div id="app">
    <!-- <HelloWorld/> -->
    <User/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import User from './components/User'

export default {
  name: 'App',
  components: {
    HelloWorld,
    User
  }
}
</script>

<style>
html {
  font: normal normal 14px '微软雅黑';
}
</style>