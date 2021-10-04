<template>
  <div class="preview">
    <div class="preview-container" id="preview-container">
      <img :src="parsedBody" alt="" />
      <img :src="parsedPants" alt="" />
      <img :src="parsedShirt" alt="" />
      <img :src="parsedHead" alt="" />
      <img :src="parsedEyes" alt="" />
      <img :src="parsedHair" alt="" />
      <img :src="parsedNose" alt="" />
      <img :src="parsedMouth" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "parsedBody",
    "parsedPants",
    "parsedShirt",
    "parsedHead",
    "parsedEyes",
    "parsedHair",
    "parsedNose",
    "parsedMouth",
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
