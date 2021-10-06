<template>
  <div class="preview">
    <div class="preview-container" id="preview-container">
      <img class="background" :src="parsedBackground" alt="" />
      <img :src="parsedHairBack" alt="" />
      <img :src="parsedBody" alt="" />
      <img :src="parsedEar" alt="" />
      <img :src="parsedPants" alt="" />
      <img :src="parsedShoes" alt="" />
      <img :src="parsedShirt" alt="" />
      <img :src="parsedHead" alt="" />
      <img :src="parsedEyes" alt="" />
      <img :src="parsedEyebrows" alt="" />
      <img :src="parsedNose" alt="" />
      <img :src="parsedMouth" alt="" />
      <img :src="parsedHairFront" alt="" />
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
    "parsedMouth",
    "parsedFacialhair",
    "parsedPants",
    "parsedShirt",
    "parsedShoes",

    "parsedAccessories",
    "parsedBackground",
  ],
};
</script>

<style lang="scss">
.preview-container {
  height: 500px;
  position: relative;
  background: #999;

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
</style>
