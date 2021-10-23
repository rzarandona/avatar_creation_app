<template>
  <div class="parent-options">
    <div class="parent-tab-pills">
      <button
        @click="setActiveParentPill('face', 'head')"
        :class="{
          'parent-tab-pill': true,
          active: active_parent_pill == 'face',
        }"
      >
        <span>1</span>
        Face
      </button>
      <button
        @click="setActiveParentPill('garments', 'shirt')"
        :class="{
          'parent-tab-pill': true,
          active: active_parent_pill == 'garments',
        }"
      >
        <span>2</span>
        Garments
      </button>
      <button
        @click="setActiveParentPill('accessories', '')"
        :class="{
          'parent-tab-pill': true,
          active: active_parent_pill == 'accessories',
        }"
      >
        <span>3</span>
        Accessories
      </button>
      <button
        @click="setActiveParentPill('background', '')"
        :class="{
          'parent-tab-pill': true,
          active: active_parent_pill == 'background',
        }"
      >
        <span>4</span>
        Background
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["active_parent_pill"],
  methods: {
    setActiveParentPill(active_parent_pill, default_active_pill) {
      this.$emit(
        "setActiveParentPill",
        active_parent_pill,
        default_active_pill
      );
    },
  },
};
</script>

<style lang="scss" scoped>
$lightBlue: #e3eeff;
$orange: #f96424;
$red: #db3b21;
$purple: #380d75;
$purple2: #6e49cb;
$purple3: #d3c9e1;
$gray1: #2e2e2e;
$gray2: #8a8a8a;
$gray3: #8c929d;

.parent-tab-pills {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 0;
  margin-bottom: 20px;

  .parent-tab-pill {
    border-color: $purple2;
    border-style: solid;
    border-top-width: 2px;
    border-bottom-width: 2px;
    border-left-width: 1px;
    border-right-width: 1px;
    padding: 10px 0;
    background: $purple3;

    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s;

    span {
      font-size: 13px;
      font-weight: bold;
      display: inline-block;
      height: 18px;
      width: 18px;
      background: white;
      color: $purple2 !important;
      border-radius: 100%;
      margin-right: 10px;
    }

    &:nth-of-type(1) {
      border-left-width: 2px;
      border-radius: 10px 0 0 10px;
    }
    &:nth-of-type(4) {
      border-right-width: 2px;
      border-radius: 0 10px 10px 0;
    }
    &.active {
      background: $purple2;
      color: white;
    }
  }
}

@media (max-width: 610px) {
  .parent-tab-pills {
    grid-template-columns: 1fr 1fr;
    font-size: 14px;
    .parent-tab-pill {
      border-radius: 0 !important;
      border-width: 1px !important;
    }
  }
}
</style>
