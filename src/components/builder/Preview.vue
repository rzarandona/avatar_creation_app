<template>
  <div class="preview">
    <div class="preview-container" id="preview-container">
      <div v-if="is_img_loading" class="imgloading-loader-overlay">
        <div class="imgloading-loader-spinner"></div>
      </div>
      <img class="background" :src="parsedBackground" alt="" />
      <img :src="parsedHairBack" alt="" />
      <img :src="parsedBody" alt="" />
      <img :src="parsedEar" alt="" />

      <img :src="parsedShoes" alt="" />
      <img :src="parsedPants" alt="" />
      <img :src="parsedShirt" alt="" />

      <img :src="parsedJacket" alt="" />
      <img :src="parsedHead" alt="" />

      <img :src="parsedEyes" alt="" />
      <img :src="parsedEyebrows" alt="" />
      <img :src="parsedNose" alt="" />
      <img :src="parsedGlasses" alt="" />
      <img :src="parsedMouth" alt="" />
      <img :src="parsedHairFront" alt="" />
      <img :src="parsedHat" alt="" />
      <img :src="parsedFacialhair" alt="" />
      <img :src="parsedAccessories" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "parsedBody",
    "parsedHead",
    "parsedEar",
    "parsedEyes",
    "parsedEyebrows",
    "parsedHairFront",
    "parsedHairBack",
    "parsedNose",
    "parsedGlasses",
    "parsedMouth",
    "parsedFacialhair",
    "parsedPants",
    "parsedShirt",
    "parsedJacket",
    "parsedShoes",
    "parsedHat",

    "parsedAccessories",
    "parsedBackground",

    "is_img_loading",
  ],
  created() {
    window.addEventListener(
      "resize",
      function (event) {
        let preview = document.getElementById("preview-container");
        preview.style.height = preview.offsetWidth + "px";
      },
      true
    );
  },
  mounted() {
    let preview = document.getElementById("preview-container");
    preview.style.height = preview.offsetWidth + "px";
  },
};
</script>

<style lang="scss">
.preview-container {
  position: relative;
  background: rgba(153, 153, 153, 0.116);

  img {
    width: 90%;
    position: absolute;
    top: 30px;
    left: 30px;
  }
  .background {
    top: 0;
    left: 0;
    width: 100%;
  }
}

.imgloading-loader-overlay {
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  top: 0;
  left: 0;
}
.imgloading-loader-spinner {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 4px solid #fff;
  border-right-color: transparent;
  transform-origin: center;
  animation: rotate 1s linear infinite;
}

@media (max-width: 610px) {
  .preview-container {
    background: none;
    position: sticky;
    bottom: 20px !important;
  }
}
</style>
