<template>
  <div class="container">
    <transition name="fade">
      <div v-if="!picked_gender" class="gender-picker">
        <h1 class="text-center my-5">Pick one!</h1>
        <div class="gender-list">
          <div @click="setGender('male')" class="gender-item male">
            <div class="label">Male</div>
          </div>
          <div @click="setGender('female')" class="gender-item female">
            <div class="label">Female</div>
          </div>
          <div @click="setGender('non-binary')" class="gender-item non-binary">
            <div class="label">Non-Binary</div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="builder-wrapper" v-if="picked_gender">
        <h1 class="text-center my-5">Create Your Avatar!</h1>
        <div class="card">
          <div class="builder-interface">
            <div class="preview">
              <small v-if="is_error" class="my-3 text-danger"
                >Dev warning: Image instance is not found. Please create one for
                this combination</small
              >
              <div class="preview-container">
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

            <div class="options">
              <div class="tab-pills">
                <button
                  @click="setActivePill('hair')"
                  :class="{ 'tab-pill': true, active: active_pill == 'hair' }"
                >
                  Hair
                </button>
                <button
                  @click="setActivePill('head')"
                  :class="{ 'tab-pill': true, active: active_pill == 'head' }"
                >
                  Head
                </button>
                <button
                  @click="setActivePill('shirt')"
                  :class="{ 'tab-pill': true, active: active_pill == 'shirt' }"
                >
                  Shirt
                </button>
                <button
                  @click="setActivePill('pants')"
                  :class="{ 'tab-pill': true, active: active_pill == 'pants' }"
                >
                  Pants
                </button>
                <button
                  @click="setActivePill('eyes')"
                  :class="{ 'tab-pill': true, active: active_pill == 'eyes' }"
                >
                  Eyes
                </button>
                <button
                  @click="setActivePill('nose')"
                  :class="{ 'tab-pill': true, active: active_pill == 'nose' }"
                >
                  Nose
                </button>
                <button
                  @click="setActivePill('mouth')"
                  :class="{ 'tab-pill': true, active: active_pill == 'mouth' }"
                >
                  Mouth
                </button>
              </div>

              <div
                v-if="active_pill == 'hair'"
                class="option-list hair-options my-3"
              >
                <div
                  v-for="item in avatar.hair"
                  @click="setPart('hair', item)"
                  :class="{ 'option-item': true, active: hair == item }"
                >
                  <img :src="getPart(item)" alt="" />
                </div>
              </div>

              <div
                v-if="active_pill == 'head'"
                class="option-list head-options my-3"
              >
                <div
                  v-for="item in avatar.head"
                  @click="setPart('head', item)"
                  :class="{ 'option-item': true, active: head == item }"
                >
                  <img :src="getPart(item)" alt="" />
                </div>
              </div>

              <div
                v-if="active_pill == 'shirt'"
                class="option-list shirt-options my-3"
              >
                <div
                  v-for="item in avatar.shirt"
                  @click="setPart('shirt', item)"
                  :class="{ 'option-item': true, active: shirt == item }"
                >
                  <img :src="getPart(item)" alt="" />
                </div>
              </div>

              <div
                v-if="active_pill == 'pants'"
                class="option-list pants-options my-3"
              >
                <div
                  v-for="item in avatar.pants"
                  @click="setPart('pants', item)"
                  :class="{ 'option-item': true, active: pants == item }"
                >
                  <img :src="getPart(item)" alt="" />
                </div>
              </div>

              <div
                v-if="active_pill == 'eyes'"
                class="option-list eyes-options my-3"
              >
                <div
                  v-for="item in avatar.eyes"
                  @click="setPart('eyes', item)"
                  :class="{ 'option-item': true, active: eyes == item }"
                >
                  <img :src="getPart(item)" alt="" />
                </div>
              </div>

              <div
                v-if="active_pill == 'nose'"
                class="option-list nose-options my-3"
              >
                <div
                  v-for="item in avatar.nose"
                  @click="setPart('nose', item)"
                  :class="{ 'option-item': true, active: nose == item }"
                >
                  <img :src="getPart(item)" alt="" />
                </div>
              </div>

              <div
                v-if="active_pill == 'mouth'"
                class="option-list mouth-options my-3"
              >
                <div
                  v-for="item in avatar.mouth"
                  @click="setPart('mouth', item)"
                  :class="{ 'option-item': true, active: mouth == item }"
                >
                  <img :src="getPart(item)" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="builder-tools">
          <div class="set-1">
            <button @click="undo" class="undo">Undo</button>
            <button @click="redo" class="redo">Redo</button>
            <button class="randomise">Randomise</button>
            <button class="reset">Reset</button>
          </div>
          <div class="set-2">
            <button class="share">Share</button>
            <button class="download">Download Avatar!</button>
          </div>
        </div>
      </div>
    </transition>
    <!-- <small style="color:#ccc" class="mt-5">Picture set: {{instance}}</small> -->
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  data() {
    return {
      // base_url: "http://localhost/avatar/assets/parts/",
      base_url: "http://vps-582f91.stackvps.com/assets/parts/",

      // Flags
      picked_gender: false,

      // Avatar parts list
      avatar: {
        shirt: ["st1", "st2"],
        pants: ["pt1", "pt2"],
        head: ["hd1", "hd2"],
        eyes: ["ey1", "ey2"],
        nose: ["ns1", "ns2"],
        mouth: ["mt1", "mt2"],
        hair: ["hr1", "hr2", "hr3", "hr4"],
      },

      gender: "",

      // Avatar set parts
      body: "bd1",
      head: "hd1",
      shirt: "st1",
      pants: "pt1",
      eyes: "ey1",
      nose: "ns1",
      mouth: "mt1",
      hair: "hr1",

      // Controls the tab
      active_pill: "hair",

      // Controls loading animation
      is_image_loading: false,

      // Set to true when an image is not found
      is_error: false,

      // Undo/Redo Feature
      actions: [],
      action_observer: 0,
    };
  },
  computed: {
    parsedBody() {
      return this.base_url + this.body + ".PNG";
    },
    parsedHair() {
      return this.base_url + this.hair + ".PNG";
    },
    parsedHead() {
      return this.base_url + this.head + ".PNG";
    },
    parsedShirt() {
      return this.base_url + this.shirt + ".PNG";
    },
    parsedPants() {
      return this.base_url + this.pants + ".PNG";
    },
    parsedEyes() {
      return this.base_url + this.eyes + ".PNG";
    },
    parsedNose() {
      return this.base_url + this.nose + ".PNG";
    },
    parsedMouth() {
      return this.base_url + this.mouth + ".PNG";
    },
  },
  methods: {
    getPart(part) {
      return this.base_url + part + ".PNG";
    },
    setPart(part, value) {
      if (this.action_observer != 0) {
        this.actions = [];
        this.action_observer = 0;
      }
      this[part] = value;
      this.actions.unshift({ part: part, value: value });
    },
    setActivePill(active_pill) {
      this.active_pill = active_pill;
    },
    downloadInstance() {
      this.$toastr.defaultPosition = "toast-bottom-left";
      this.$toastr.e("Feature in development!");
    },
    setGender(gender) {
      this.gender = gender;
      this.picked_gender = true;
    },
    undo() {
      if (this.action_observer + 1 != this.actions.length) {
        this.action_observer = this.action_observer + 1;
        // console.log(
        //   this.actions[this.action_observer].part +
        //     ":" +
        //     this.actions[this.action_observer].value
        // );
        this.setObserver();
      }
    },
    redo() {
      if (this.action_observer > 0) {
        this.action_observer = this.action_observer - 1;
        // console.log(
        //   this.actions[this.action_observer].part +
        //     ":" +
        //     this.actions[this.action_observer].value
        // );
        this.setObserver();
      }
    },
    setObserver() {
      let part = this.actions[this.action_observer].part;
      let value = this.actions[this.action_observer].value;
      this[part] = value;
    },
  },
  components: {
    "font-awesome-icon": FontAwesomeIcon,
  },
};
</script>

<style lang="scss" scoped>
.builder-interface {
  display: grid;
  grid-template-columns: 500px 1fr;
  grid-gap: 20px;
}

.card {
  padding: 20px;
  margin: 50px 0;
  border: none;
}

.wat-button {
  background: #3d5afe;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 100px;
  font-size: 14px;
  transition: 0.2s;
}

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
      background: #a8aaae;
      position: relative;
      display: flex;
      justify-content: center;
      border-radius: 10px;
      transition: 0.5s;

      &:hover {
        transform: scale(1.02);
        cursor: pointer;
      }

      .label {
        background: #f96424;
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

.tab-pills {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 10px;

  .tab-pill {
    background: white;
    color: black;
    border: 2px solid orangered;
    padding: 5px;
    border-radius: 5px;
    font-size: 14px;
    transition: 0.2s;

    &.active {
      background: orangered;
      color: white;
    }
  }
}

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

.options {
  .option-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 20px;

    .option-item {
      background: white;
      cursor: pointer;
      height: 95.19px;
      border: 2px solid black;
      transition: 0.1s;
      position: relative;
      border-radius: 5px;

      &.active {
        border: 5px solid purple;
      }

      img {
        height: auto;
        width: 100%;

        border-radius: 5px;
        padding: 10px;
      }

      .part-checked {
        background: #14a800;
        color: white;
        font-size: 10px;
        display: block;
        height: 20px;
        width: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
}

@media screen and (max-width: 850px) {
  .builder-interface {
    grid-template-columns: 1fr;
  }
  .option-list {
    grid-template-columns: 1fr 1fr !important;
  }
}

// Loader CSS
.loader-overlay {
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  backdrop-filter: blur(5px);
}
.loader-spinner {
  position: absolute;
  transform: translate(-50%, -50%);
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
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.builder-tools {
  display: grid;
  grid-template-columns: 2fr 1fr;

  .undo {
    padding: 5px 30px;
    background: white;
    border-radius: 4px;
    border: 2px solid black;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.08);
    margin-right: 10px;
  }
  .redo {
    padding: 5px 30px;
    background: white;
    border-radius: 4px;
    border: 2px solid black;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.08);
    margin-right: 10px;
  }
  .randomise {
    padding: 5px 10px;
    background: white;
    border-radius: 4px;
    border: 2px solid purple;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.08);
    margin-right: 10px;
    color: purple;
  }

  .reset {
    border: none;
    border-bottom: 2px solid red;
    background: white;
    color: red;
    font-weight: bold;
    margin-left: 40px;
  }

  .set-2 {
    display: flex;
    justify-content: flex-end;

    .share {
      padding: 5px 30px;
      background: #888;
      border-radius: 4px;
      border: none;
      box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.08);
      margin-right: 10px;
      color: white;
    }
    .download {
      padding: 5px 30px;
      background: purple;
      border-radius: 4px;
      border: none;
      box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.08);
      margin-right: 10px;
      color: white;
    }
  }
}
</style>
