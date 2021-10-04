<template>
  <div class="container">
    <div v-if="is_loading">
      <Loader />
    </div>

    <GenderPicker @setGender="setGender" :gender="gender" />

    <div class="builder-wrapper" v-if="gender.length">
      <h1 class="main-label text-center mb-5">Create Your Avatar!</h1>
      <div class="card">
        <div class="builder-interface">
          <Preview
            :parsedBody="parsedBody"
            :parsedHead="parsedHead"
            :parsedShirt="parsedShirt"
            :parsedPants="parsedPants"
            :parsedEyes="parsedEyes"
            :parsedNose="parsedNose"
            :parsedMouth="parsedMouth"
            :parsedHair="parsedHair"
          />

          <div class="customizer">
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

            <div class="options">
              <div class="tab-pills">
                <button
                  v-if="active_parent_pill == 'face'"
                  @click="setActivePill('hair')"
                  :class="{ 'tab-pill': true, active: active_pill == 'hair' }"
                >
                  Hair
                </button>
                <button
                  v-if="active_parent_pill == 'face'"
                  @click="setActivePill('head')"
                  :class="{ 'tab-pill': true, active: active_pill == 'head' }"
                >
                  Head
                </button>
                <button
                  v-if="active_parent_pill == 'face'"
                  @click="setActivePill('eyes')"
                  :class="{ 'tab-pill': true, active: active_pill == 'eyes' }"
                >
                  Eyes
                </button>
                <button
                  v-if="active_parent_pill == 'face'"
                  @click="setActivePill('nose')"
                  :class="{ 'tab-pill': true, active: active_pill == 'nose' }"
                >
                  Nose
                </button>
                <button
                  v-if="active_parent_pill == 'face'"
                  @click="setActivePill('mouth')"
                  :class="{
                    'tab-pill': true,
                    active: active_pill == 'mouth',
                  }"
                >
                  Mouth
                </button>
                <button
                  v-if="active_parent_pill == 'garments'"
                  @click="setActivePill('shirt')"
                  :class="{
                    'tab-pill': true,
                    active: active_pill == 'shirt',
                  }"
                >
                  Shirt
                </button>
                <button
                  v-if="active_parent_pill == 'garments'"
                  @click="setActivePill('pants')"
                  :class="{
                    'tab-pill': true,
                    active: active_pill == 'pants',
                  }"
                >
                  Pants
                </button>
              </div>

              <div
                v-if="active_pill == 'head'"
                class="option-list head-options my-3"
              >
                <div
                  v-for="item in avatar.head"
                  @click="setPart('head', item, true)"
                  :class="{ 'option-item': true, active: head == item }"
                >
                  <img :src="getPart(item)" alt="" />
                </div>
              </div>
              <div
                v-if="active_pill == 'hair'"
                class="option-list hair-options my-3"
              >
                <div
                  v-for="item in avatar.hair"
                  @click="setPart('hair', item, true)"
                  :class="{ 'option-item': true, active: hair == item }"
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
                  @click="setPart('shirt', item, true)"
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
                  @click="setPart('pants', item, true)"
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
                  @click="setPart('eyes', item, true)"
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
                  @click="setPart('nose', item, true)"
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
                  @click="setPart('mouth', item, true)"
                  :class="{ 'option-item': true, active: mouth == item }"
                >
                  <img :src="getPart(item)" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="builder-tools">
        <div class="set-1">
          <button
            :disabled="action_observer == avatar_snapshots.length - 1"
            @click="undo"
            class="undo"
          >
            <font-awesome-icon icon="undo" />
            Undo
          </button>
          <button :disabled="action_observer == 0" @click="redo" class="redo">
            <font-awesome-icon icon="redo" />
            Redo
          </button>
          <button @click="randomise" class="randomise">
            <font-awesome-icon icon="random" /> Randomise
          </button>
          <button @click="reset" class="reset">
            <font-awesome-icon icon="trash" /> Reset
          </button>
        </div>
        <div class="set-2">
          <button class="share">
            <font-awesome-icon icon="share" /> Share
          </button>
          <button @click="download" class="download">
            <font-awesome-icon icon="download" /> Download Avatar!
          </button>
        </div>
      </div>
    </div>

    <!-- <small style="color:#ccc" class="mt-5">Picture set: {{instance}}</small> -->
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import domtoimage from "dom-to-image";
import FileSaver from "file-saver";

import Loader from "../components/Loader.vue";
import GenderPicker from "../components/builder/GenderPicker.vue";
import Preview from "../components/builder/Preview.vue";

export default {
  data() {
    return {
      // base_url: "http://localhost/avatar/assets/parts/",
      base_url: "http://vps-582f91.stackvps.com/assets/parts/",

      is_loading: false,

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
      active_parent_pill: "face",
      active_pill: "hair",

      // Controls loading animation
      is_image_loading: false,

      // Undo/Redo Feature
      avatar_snapshots: [],
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
    setPart(part, value, persist_as_snapshot) {
      this[part] = value;
      if (persist_as_snapshot) {
        if (this.action_observer != 0) {
          let avatar_snapshots_reference = [...this.avatar_snapshots];
          let new_avatar_snapshots_reference = avatar_snapshots_reference.slice(
            this.action_observer
          );
          new_avatar_snapshots_reference.unshift({
            body: this.body,
            head: this.head,
            shirt: this.shirt,
            pants: this.pants,
            eyes: this.eyes,
            nose: this.nose,
            mouth: this.mouth,
            hair: this.hair,
          });
          this.avatar_snapshots = new_avatar_snapshots_reference;
          this.action_observer = 0;
        } else {
          this.saveCurrentSnapshot();
        }
      }
    },
    setActiveParentPill(active_parent_pill, default_active_pill) {
      this.active_parent_pill = active_parent_pill;
      this.setActivePill(default_active_pill);
    },
    setActivePill(active_pill) {
      this.active_pill = active_pill;
    },
    setGender(gender) {
      this.gender = gender;
    },
    undo() {
      if (this.action_observer < this.avatar_snapshots.length - 1) {
        this.action_observer = this.action_observer + 1;
        let mapped_snapshot = this.avatar_snapshots[this.action_observer];
        this.applySnapshot(mapped_snapshot);
      }
    },
    redo() {
      if (this.action_observer != 0) {
        this.action_observer = this.action_observer - 1;
        let mapped_snapshot = this.avatar_snapshots[this.action_observer];
        this.applySnapshot(mapped_snapshot);
      }
    },
    saveCurrentSnapshot() {
      let avatar_snapshot = {
        body: this.body,
        head: this.head,
        shirt: this.shirt,
        pants: this.pants,
        eyes: this.eyes,
        nose: this.nose,
        mouth: this.mouth,
        hair: this.hair,
      };
      this.avatar_snapshots.unshift(avatar_snapshot);
    },
    applySnapshot(snapshot) {
      let snapshot_keys = Object.keys(snapshot);
      snapshot_keys.forEach((key) => {
        this.setPart(key, snapshot[key], false);
      });
    },
    randomise() {
      let avatar_keys = Object.keys(this.avatar);
      avatar_keys.forEach((key) => {
        let avatar_cursor = this.avatar[key];
        let random_number = Math.floor(Math.random() * avatar_cursor.length);
        let avatar_part = avatar_cursor[random_number];

        if (avatar_part == this[key]) {
          while (avatar_part == this[key]) {
            let random_number = Math.floor(
              Math.random() * avatar_cursor.length
            );
            avatar_part = avatar_cursor[random_number];
          }
        }
        this.setPart(key, avatar_part, true);
      });
    },
    reset() {
      let avatar_keys = Object.keys(this.avatar);
      avatar_keys.forEach((key) => {
        if (this[key] != this.avatar[key][0]) {
          this.setPart(key, this.avatar[key][0], true);
        }
      });
    },
    download() {
      this.is_loading = true;
      let node = document.getElementById("preview-container");
      domtoimage.toBlob(node).then((blob) => {
        FileSaver.saveAs(blob, "my-avatar.png");
        this.is_loading = false;
      });
    },
  },
  components: {
    "font-awesome-icon": FontAwesomeIcon,
    Loader,
    GenderPicker,
    Preview,
  },
  created() {
    this.saveCurrentSnapshot();
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

.main-label {
  color: #515151;
}

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
.tab-pills {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 10px;

  .tab-pill {
    background: white;
    color: $gray1;
    border: 2px solid $orange;
    padding: 5px;
    border-radius: 5px;
    font-size: 14px;
    transition: 0.2s;

    &.active {
      background: $orange;
      color: white;
    }
  }
}

.options {
  .option-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
    max-height: 380px;
    overflow-y: auto;
    scrollbar-width: 8px;
    scrollbar-color: orange blue;
    padding-right: 10px;

    &::-webkit-scrollbar {
      width: 11px;
    }
    &::-webkit-scrollbar-track {
      background: #cccccc;
    }
    &::-webkit-scrollbar-thumb {
      background-color: $purple;
      border-radius: 6px;
      border: 3px solid transparent;
    }

    .option-item {
      background: $lightBlue;
      cursor: pointer;
      height: 95.19px;
      border: 2px solid black;
      transition: 0.1s;
      position: relative;
      border-radius: 5px;

      &.active {
        border: 5px solid $purple;
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
    box-shadow: 0 6px 5px 0 rgba(0, 0, 0, 0.09);
    margin-right: 10px;
    transition: 0.3s;

    &:disabled {
      color: #aaa;
      border-color: #aaa;
      box-shadow: none;
    }
  }
  .redo {
    padding: 5px 30px;
    background: white;
    border-radius: 4px;
    border: 2px solid black;
    box-shadow: 0 6px 5px 0 rgba(0, 0, 0, 0.09);
    margin-right: 10px;
    transition: 0.3s;

    &:disabled {
      color: #aaa;
      border-color: #aaa;
      box-shadow: none;
    }
  }
  .randomise {
    padding: 5px 10px;
    background: white;
    border-radius: 4px;
    border: 2px solid $purple;
    box-shadow: 0 6px 5px 0 rgba(0, 0, 0, 0.09);
    margin-right: 10px;
    color: $purple;
  }

  .reset {
    border: none;
    border-bottom: 2px solid $red;
    background: white;
    color: $red;
    font-weight: bold;
    margin-left: 40px;
  }

  .set-2 {
    display: flex;
    justify-content: flex-end;

    .share {
      padding: 5px 30px;
      background: $gray3;
      border-radius: 4px;
      border: none;
      box-shadow: 0 6px 5px 0 rgba(0, 0, 0, 0.09);
      margin-right: 10px;
      color: white;
    }
    .download {
      padding: 5px 30px;
      background: $purple;
      border-radius: 4px;
      border: none;
      box-shadow: 0 6px 5px 0 rgba(0, 0, 0, 0.09);
      margin-right: 10px;
      color: white;
    }
  }
}
</style>
