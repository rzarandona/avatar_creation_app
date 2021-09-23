<template>
  <div id="app">
    <NavigationBar/>
    <router-view/>
  </div>
</template>



<style lang="scss">
  #app {
    font-family: Poppins, Helvetica, Arial, sans-serif;
  }

  // Materialize CSS Override
  .container{
		max-width:920px !important
	}
  .card{
    box-shadow: 0 10px 15px 0 rgba(0,0,0,.05) !important;
    border-radius: 5px !important;
    border:none !important
  }

</style>

<script>
import NavigationBar from "./components/NavigationBar.vue";

export default {
  components: {
    NavigationBar
  }
}
</script>