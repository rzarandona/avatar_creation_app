<template>
  <div class="preview">
    <div class="preview-container" id="preview-container">
      <img :src="parsedBody" alt="" />
      <img :src="parsedEar" alt="" />
      <img :src="parsedPants" alt="" />
      <img :src="parsedShoes" alt="" />
      <img :src="parsedShirt" alt="" />
      <img :src="parsedHead" alt="" />
      <img :src="parsedEyes" alt="" />
      <img :src="parsedEyebrows" alt="" />
      <img :src="parsedHair" alt="" />
      <img :src="parsedNose" alt="" />
      <img :src="parsedMouth" alt="" />
      <img :src="parsedFacialhair" alt="" />
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
    "parsedHair",
    "parsedNose",
    "parsedMouth",
    "parsedFacialhair",
    "parsedPants",
    "parsedShirt",
    "parsedShoes",
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
}
</style>
