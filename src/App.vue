<template>
  <div id="app">
    <transition name="fade">
      <div v-if="parts_preload_flag == false" class="preloading-loader-overlay">
        <div class="preloading-loader-spinner"></div>
        <small class="text-white"
          >Preloading parts {{ preloaded_parts }}/{{ parts_to_preload }}</small
        >
      </div>
    </transition>

    <NavigationBar />
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;
}

// Materialize CSS Override
.container {
  max-width: 1140px !important;
}

// Loader CSS
.preloading-loader-overlay {
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.preloading-loader-spinner {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 4px solid #fff;
  border-right-color: transparent;
  transform-origin: center;
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

<script>
import NavigationBar from "./components/NavigationBar.vue";
import axios from "axios";

export default {
  data() {
    return {
      is_preloading: false,

      parts_to_preload: 0,
      preloaded_parts: 0,
      parts_preload_flag: false,
    };
  },
  components: {
    NavigationBar,
  },
  methods: {
    preloadParts(urls, allImagesLoadedCallback) {
      let instance = this;
      var loadedCounter = 0;
      var toBeLoadedNumber = urls.length;
      urls.forEach(function (url) {
        preloadImage(url, function () {
          loadedCounter++;
          instance.preloaded_parts = instance.preloaded_parts + 1;
          console.log("Preloaded parts: " + instance.preloaded_parts);
          if (loadedCounter == toBeLoadedNumber) {
            allImagesLoadedCallback();
          }
        });
      });
      function preloadImage(url, anImageLoadedCallback) {
        var img = new Image();
        img.onload = anImageLoadedCallback;
        img.src = url;
      }
    },
  },
  created() {
    let instances_arr_filtered = [];
    let parts_arr_filtered = [];

    axios
      .get("http://vps-582f91.stackvps.com/assets/preload_images.php")
      .then((res) => {
        let parts = res.data.parts;
        let parts_arr = Object.values(parts);
        this.parts_to_preload = parts_arr.length;
        parts_arr.forEach((part) => {
          parts_arr_filtered.push(
            "http://vps-582f91.stackvps.com/assets/parts/" + part
          );
        });

        this.preloadParts(parts_arr_filtered, () => {
          this.parts_preload_flag = true;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
