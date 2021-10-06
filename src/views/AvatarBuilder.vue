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
            :parsedEar="parsedEar"
            :parsedEyes="parsedEyes"
            :parsedEyebrows="parsedEyebrows"
            :parsedNose="parsedNose"
            :parsedMouth="parsedMouth"
            :parsedFacialhair="parsedFacialhair"
            :parsedHairFront="parsedHairFront"
            :parsedHairBack="parsedHairBack"
            :parsedShirt="parsedShirt"
            :parsedPants="parsedPants"
            :parsedShoes="parsedShoes"
            :parsedAccessories="parsedAccessories"
            :parsedBackground="parsedBackground"
          />

          <div class="customizer">
            <ParentOptionPills
              @setActiveParentPill="setActiveParentPill"
              :active_parent_pill="active_parent_pill"
            />
            <div class="options">
              <div class="tab-pills">
                <button
                  v-if="active_parent_pill == 'face'"
                  @click="setActivePill('skin_tone')"
                  :class="{
                    'tab-pill': true,
                    active: active_pill == 'skin_tone',
                  }"
                >
                  Skin Tone
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
                  @click="setActivePill('ear')"
                  :class="{ 'tab-pill': true, active: active_pill == 'ear' }"
                >
                  Ear
                </button>

                <button
                  v-if="active_parent_pill == 'face'"
                  @click="setActivePill('hair')"
                  :class="{ 'tab-pill': true, active: active_pill == 'hair' }"
                >
                  Hair
                </button>

                <button
                  v-if="active_parent_pill == 'face'"
                  @click="setActivePill('eyebrows')"
                  :class="{
                    'tab-pill': true,
                    active: active_pill == 'eyebrows',
                  }"
                >
                  Eyebrows
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
                  v-if="active_parent_pill == 'face'"
                  @click="setActivePill('facialhair')"
                  :class="{
                    'tab-pill': true,
                    active: active_pill == 'facialhair',
                  }"
                >
                  Facial Hair
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
                <button
                  v-if="active_parent_pill == 'garments'"
                  @click="setActivePill('shoes')"
                  :class="{
                    'tab-pill': true,
                    active: active_pill == 'shoes',
                  }"
                >
                  Shoes
                </button>
              </div>

              <!-- OPTIONS LIST -->

              <div
                v-if="active_pill == 'skin_tone'"
                class="option-list skin_tone-options my-3"
              >
                <div
                  v-for="item in avatar.skin_tone"
                  @click="setSkinTone(item)"
                  :class="{ 'option-item': true, active: skin_tone == item }"
                >
                  <img :src="getSkinTone(item)" alt="" />
                </div>
              </div>

              <div
                v-if="active_pill == 'head'"
                class="option-list head-options my-3"
              >
                <div
                  v-for="item in avatar.head"
                  @click="setPart('head', item, true)"
                  :class="{
                    'option-head': true,
                    'option-item': true,
                    active: head == item,
                  }"
                  :style="{ background: 'url(' + getPart(item) + ')' }"
                ></div>
              </div>

              <div
                v-if="active_pill == 'ear'"
                class="option-list ear-options my-3"
              >
                <div
                  v-for="item in avatar.ear"
                  @click="setPart('ear', item, true)"
                  :class="{ 'option-item': true, active: ear == item }"
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
                  <img :src="getHair(item)" alt="" />
                </div>
              </div>

              <div
                v-if="active_pill == 'eyebrows'"
                class="option-list eyebrows-options my-3"
              >
                <div
                  v-for="item in avatar.eyebrows"
                  @click="setPart('eyebrows', item, true)"
                  :class="{ 'option-item': true, active: eyebrows == item }"
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

              <div
                v-if="active_pill == 'facialhair'"
                class="option-list facialhair-options my-3"
              >
                <div
                  v-for="item in avatar.facialhair"
                  @click="setPart('facialhair', item, true)"
                  :class="{ 'option-item': true, active: facialhair == item }"
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
                v-if="active_pill == 'shoes'"
                class="option-list shoes-options my-3"
              >
                <div
                  v-for="item in avatar.shoes"
                  @click="setPart('shoes', item, true)"
                  :class="{ 'option-item': true, active: shoes == item }"
                >
                  <img :src="getPart(item)" alt="" />
                </div>
              </div>

              <div
                v-if="active_parent_pill == 'accessories'"
                class="option-list accessories-options my-3"
              >
                <div
                  v-for="item in avatar.accessories"
                  @click="setPart('accessories', item, true)"
                  :class="{ 'option-item': true, active: accessories == item }"
                >
                  <img :src="getPart(item)" alt="" />
                </div>
              </div>

              <div
                v-if="active_parent_pill == 'background'"
                class="option-list background-options my-3"
              >
                <div
                  v-for="item in avatar.background"
                  @click="setPart('background', item, true)"
                  :class="{ 'option-item': true, active: background == item }"
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
          <!-- <button class="share">
            <font-awesome-icon icon="share" /> Share
          </button> -->
          <button @click="download" class="download">
            <font-awesome-icon icon="download" /> Download Avatar!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import domtoimage from "dom-to-image";
import FileSaver from "file-saver";

import Loader from "../components/Loader.vue";
import GenderPicker from "../components/builder/GenderPicker.vue";
import Preview from "../components/builder/Preview.vue";
import ParentOptionPills from "../components/builder/ParentOptionsPills.vue";

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
        skin_tone: [
          "tone1",
          "tone2",
          "tone3",
          "tone4",
          "tone5",
          "tone6",
          "tone7",
          "tone8",
        ],
        head: [
          "fs-1.PNG$tone1",
          "fs-2.PNG$tone1",
          "fs-3.PNG$tone1",
          "fs-4.PNG$tone1",
          "fs-5.PNG$tone1",
          "fs-6.PNG$tone1",
          "fs-7.PNG$tone1",
          "fs-8.PNG$tone1",
          "fs-9.PNG$tone1",
          "fs-10.PNG$tone1",
        ],
        ear: [
          "ea-1.PNG$tone1",
          "ea-2.PNG$tone1",
          "ea-3.PNG$tone1",
          "ea-4.PNG$tone1",
          "ea-5.PNG$tone1",
          "ea-6.PNG$tone1",
          "ea-7.PNG$tone1",
          "ea-8.PNG$tone1",
          "ea-9.PNG$tone1",
          "ea-10.PNG$tone1",
        ],
        shirt: ["st-1", "st-2", "st-3", "st-4", "st-5", "st-6"],
        pants: ["pt-1", "pt-2"],
        shoes: ["sh-1", "sh-2"],

        eyes: [
          "ey-1",
          "ey-2",
          "ey-3",
          "ey-4",
          "ey-5",
          "ey-6",
          "ey-7",
          "ey-8",
          "ey-9",
          "ey-10",
          "ey-11",
          "ey-12",
          "ey-13",
          "ey-14",
          "ey-15",
          "ey-16",
          "ey-17",
          "ey-18",
        ],
        eyebrows: [
          "eb-1",
          "eb-2",
          "eb-3",
          "eb-4",
          "eb-5",
          "eb-6",
          "eb-7",
          "eb-8",
          "eb-9",
          "eb-10",
        ],
        nose: [
          "ns-1",
          "ns-2",
          "ns-3",
          "ns-4",
          "ns-5",
          "ns-6",
          "ns-7",
          "ns-8",
          "ns-9",
          "ns-10",
        ],
        mouth: [
          "mt-1",
          "mt-2",
          "mt-3",
          "mt-4",
          "mt-5",
          "mt-6",
          "mt-7",
          "mt-8",
          "mt-9",
          "mt-10",
        ],
        facialhair: [
          "fh-1",
          "fh-2",
          "fh-3",
          "fh-4",
          "fh-5",
          "fh-6",
          "fh-7",
          "fh-8",
          "fh-9",
          "fh-10",
          "fh-11",
        ],

        hair: [
          "bk-s1",
          "bk-s2",
          "bk-s3",
          "bk-s4",
          "bk-s5",
          "bk-s6",
          "bk-s7",
          "bk-s8",
          "bk-s9",
          "bk-s10",
          "lb-s1",
          "lb-s2",
          "lb-s3",
          "lb-s4",
          "lb-s5",
          "lb-s6",
          "lb-s7",
          "lb-s8",
          "lb-s9",
          "lb-s10",
          "db-s1",
          "db-s2",
          "db-s3",
          "db-s4",
          "db-s5",
          "db-s6",
          "db-s7",
          "db-s8",
          "db-s9",
          "db-s10",
          "bl-s1",
          "bl-s2",
          "bl-s3",
          "bl-s4",
          "bl-s5",
          "bl-s6",
          "bl-s7",
          "bl-s8",
          "bl-s9",
          "bl-s10",
          "rh-s1",
          "rh-s2",
          "rh-s3",
          "rh-s4",
          "rh-s5",
          "rh-s6",
          "rh-s7",
          "rh-s8",
          "rh-s9",
          "rh-s10",
          "gr-s1",
          "gr-s2",
          "gr-s3",
          "gr-s4",
          "gr-s5",
          "gr-s6",
          "gr-s7",
          "gr-s8",
          "gr-s9",
          "gr-s10",
        ],

        accessories: [
          "ac-2",
          "ac-1",
          "ac-3",
          "ac-4",
          "ac-5",
          "ac-6",
          "ac-7",
          "ac-8",
          "ac-9",
          "ac-10",
          "ac-11",
          "ac-12",
        ],
        background: ["bg-2", "bg-1", "bg-3", "bg-4", "bg-5"],
      },

      gender: "",

      // Avatar set parts
      skin_tone: "tone1",
      body: "bd-1.PNG$tone1",
      head: "fs-1.PNG$tone1",
      ear: "ea-1.PNG$tone1",

      eyes: "ey-1",
      eyebrows: "eb-1",
      nose: "ns-1",
      mouth: "mt-1",
      facialhair: "fh-1",

      hair: "bl-s1",
      hairFront: "bl-s1-front",
      hairBack: "bl-s1-back",

      shirt: "st-1",
      pants: "pt-1",
      shoes: "sh-1",

      accessories: "ac-1",
      background: "bg-1",

      // Controls the tab
      active_parent_pill: "face",
      active_pill: "skin_tone",

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
    parsedHairFront() {
      return this.base_url + this.hairFront + ".PNG";
    },
    parsedHairBack() {
      return this.base_url + this.hairBack + ".PNG";
    },
    parsedHead() {
      return this.base_url + this.head + ".PNG";
    },
    parsedEar() {
      return this.base_url + this.ear + ".PNG";
    },
    parsedEyes() {
      return this.base_url + this.eyes + ".PNG";
    },
    parsedEyebrows() {
      return this.base_url + this.eyebrows + ".PNG";
    },
    parsedNose() {
      return this.base_url + this.nose + ".PNG";
    },
    parsedMouth() {
      return this.base_url + this.mouth + ".PNG";
    },
    parsedFacialhair() {
      return this.base_url + this.facialhair + ".PNG";
    },
    parsedShirt() {
      return this.base_url + this.shirt + ".PNG";
    },
    parsedPants() {
      return this.base_url + this.pants + ".PNG";
    },
    parsedShoes() {
      return this.base_url + this.shoes + ".PNG";
    },

    parsedAccessories() {
      return this.base_url + this.accessories + ".PNG";
    },
    parsedBackground() {
      return this.base_url + this.background + ".PNG";
    },
  },
  methods: {
    getSkinTone(skin_tone) {
      return this.base_url + "bd-1.PNG$" + skin_tone + ".PNG";
    },
    setSkinTone(skin_tone) {
      this.skin_tone = skin_tone;
      // Change body color
      let new_body_value =
        this.body.slice(0, this.body.search("tone")) + skin_tone;
      this.body = new_body_value;

      // Update all head values skin_tone
      let head_counter = 0;
      this.avatar.head.forEach((head) => {
        let new_avatar_head_value =
          head.slice(0, head.search("tone")) + skin_tone;
        this.$set(this.avatar.head, head_counter, new_avatar_head_value);
        head_counter++;
      });

      // Change head color with the same head type
      let new_head_value =
        this.head.slice(0, this.head.search("tone")) + skin_tone;
      this.head = new_head_value;

      // Update all ear values skin_tone
      let ear_counter = 0;
      this.avatar.ear.forEach((ear) => {
        let new_avatar_ear_value = ear.slice(0, ear.search("tone")) + skin_tone;
        this.$set(this.avatar.ear, ear_counter, new_avatar_ear_value);
        console.log(new_avatar_ear_value);
        ear_counter++;
      });
      // Change ear color with the same ear type
      let new_ear = this.ear.slice(0, this.ear.search("tone")) + skin_tone;
      this.ear = new_ear;
    },
    getPart(part) {
      return this.base_url + part + ".PNG";
    },
    getHair(hair_code) {
      return this.base_url + hair_code + "-front.PNG";
    },
    setPart(part, value, persist_as_snapshot) {
      this[part] = value;
      if (part == "hair") {
        this.hairFront = value + "-front";
        this.hairBack = value + "-back";
      }
      if (persist_as_snapshot) {
        if (this.action_observer != 0) {
          let avatar_snapshots_reference = [...this.avatar_snapshots];
          let new_avatar_snapshots_reference = avatar_snapshots_reference.slice(
            this.action_observer
          );
          new_avatar_snapshots_reference.unshift({
            body: this.body,
            head: this.head,
            ear: this.ear,
            eyes: this.eyes,
            eyebrows: this.eyebrows,
            nose: this.nose,
            mouth: this.mouth,
            facialhair: this.facialhair,
            hair: this.hair,

            shirt: this.shirt,
            pants: this.pants,
            shoes: this.shoes,
            hair: this.hair,

            accessories: this.accessories,
            background: this.background,
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
        console.log(mapped_snapshot);
      }
    },
    redo() {
      if (this.action_observer != 0) {
        this.action_observer = this.action_observer - 1;
        let mapped_snapshot = this.avatar_snapshots[this.action_observer];
        this.applySnapshot(mapped_snapshot);
        console.log(mapped_snapshot);
      }
    },
    saveCurrentSnapshot() {
      let avatar_snapshot = {
        body: this.body,
        head: this.head,
        ear: this.ear,
        eyes: this.eyes,
        eyebrows: this.eyebrows,
        nose: this.nose,
        mouth: this.mouth,
        facialhair: this.facialhair,
        hair: this.hair,

        shirt: this.shirt,
        pants: this.pants,
        shoes: this.shoes,
        hair: this.hair,

        accessories: this.accessories,
        background: this.background,
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
        // If block is so that skin_tone will not be included in the randomiser
        if (key != "skin_tone") {
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
        }
      });
    },
    reset() {
      let avatar_keys = Object.keys(this.avatar);
      avatar_keys.forEach((key) => {
        // If block is so that skin_tone will not be included in the reset
        if (key != "skin_tone") {
          if (this[key] != this.avatar[key][0]) {
            this.setPart(key, this.avatar[key][0], true);
          }
        }
      });
      this.avatar_snapshots = [];
      this.saveCurrentSnapshot();
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
    ParentOptionPills,
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
    max-height: 336px;
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

    .option-head {
      background-size: 270% !important;
      background-position: -70px 225px !important;
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
