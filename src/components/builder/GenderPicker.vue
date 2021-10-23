<template>
  <div v-if="!gender.length" class="gender-picker">
    <h1 class="main-label text-center mb-5">Pick one!</h1>
    <div class="gender-list">
      <div @click="setGender('male')" class="gender-item male">
        <font-awesome-icon class="gender-icon" icon="mars" />
        <div class="label">Male</div>
      </div>
      <div @click="setGender('female')" class="gender-item female">
        <font-awesome-icon class="gender-icon" icon="venus" />
        <div class="label">Female</div>
      </div>
      <div @click="setGender('non-binary')" class="gender-item non-binary">
        <font-awesome-icon class="gender-icon" icon="venus-mars" />
        <div class="label">Non-Binary</div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  props: ["gender"],
  methods: {
    setGender(gender) {
      this.$emit("setGender", gender);
    },
  },
  components: {
    "font-awesome-icon": FontAwesomeIcon,
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

.gender-picker {
  .gender-list {
    max-width: 860px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;

    .gender-item {
      min-height: 400px;
      width: 100%;
      background: $gray2;
      position: relative;
      display: flex;
      justify-content: center;
      border-radius: 10px;
      transition: 0.5s;
      align-items: center;

      &:hover {
        transform: scale(1.02);
        cursor: pointer;
      }
      .gender-icon {
        font-size: 110px;
      }
      .label {
        background: $orange;
        color: white;
        position: absolute;
        bottom: -20px;
        font-size: 16px;
        padding: 6px 60px;
        border-radius: 5px;
        box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
      }
    }
  }
}

@media (max-width: 970px) {
  .main-label {
    margin: 20px !important;
    font-size: 20px;
  }
  .gender-picker {
    .gender-list {
      grid-gap: 10px;

      .gender-item {
        min-height: 300px;
        .gender-icon {
          font-size: 50px;
        }
        .label {
          bottom: -15px;
          padding: 2px 20px;
        }
      }
    }
  }
}
@media (max-width: 480px) {
  .gender-picker {
    .gender-list {
      grid-gap: 10px;
      grid-template-columns: 1fr;

      .gender-item {
        min-height: 100px;
        max-width: 200px;
        margin: 0 auto;
        margin-bottom: 20px;
        .gender-icon {
          font-size: 50px;
        }
        .label {
          bottom: -15px;
          font-size: 14px;
          padding: 2px 20px;
        }
      }
    }
  }
}
</style>
