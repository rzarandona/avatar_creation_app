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
            :parsedJacket="parsedJacket"
            :parsedPants="parsedPants"
            :parsedShoes="parsedShoes"
            :parsedHat="parsedHat"
            :parsedAccessories="parsedAccessories"
            :parsedBackground="parsedBackground"
            :is_img_loading="is_img_loading"
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
                  v-if="
                    active_parent_pill == 'face' &&
                    (gender == 'male' || gender == 'non-binary')
                  "
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
                  Top
                </button>
                <button
                  v-if="active_parent_pill == 'garments'"
                  @click="setActivePill('pants')"
                  :class="{
                    'tab-pill': true,
                    active: active_pill == 'pants',
                  }"
                >
                  Bottom
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

                <button
                  v-if="active_parent_pill == 'garments'"
                  @click="setActivePill('hat')"
                  :class="{
                    'tab-pill': true,
                    active: active_pill == 'hat',
                  }"
                >
                  Hat
                </button>
                <button
                  v-if="active_parent_pill == 'garments'"
                  @click="setActivePill('jacket')"
                  :class="{
                    'tab-pill': true,
                    active: active_pill == 'jacket',
                  }"
                >
                  Jacket
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
                  :class="{
                    'option-skintone': true,
                    'option-item': true,
                    active: skin_tone == item,
                  }"
                  :style="{ background: 'url(' + getSkinTone(item) + ')' }"
                ></div>
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
                  :class="{
                    'option-ear': true,
                    'option-item': true,
                    active: ear == item,
                  }"
                  :style="{ background: 'url(' + getPart(item) + ')' }"
                ></div>
              </div>

              <div
                v-if="active_pill == 'hair'"
                class="option-list hair-options my-3"
              >
                <div
                  v-for="item in avatar.hair"
                  @click="setPart('hair', item, true)"
                  :class="{
                    'option-hair': true,
                    'option-item': true,
                    active: hair == item,
                  }"
                  :style="{ background: 'url(' + getHair(item) + ')' }"
                ></div>
              </div>

              <div
                v-if="active_pill == 'eyebrows'"
                class="option-list eyebrows-options my-3"
              >
                <div
                  v-for="item in avatar.eyebrows"
                  @click="setPart('eyebrows', item, true)"
                  :class="{
                    'option-eyebrows': true,
                    'option-item': true,
                    active: eyebrows == item,
                  }"
                  :style="{ background: 'url(' + getPart(item) + ')' }"
                ></div>
              </div>

              <div
                v-if="active_pill == 'eyes'"
                class="option-list eyes-options my-3"
              >
                <div
                  v-for="item in avatar.eyes"
                  @click="setPart('eyes', item, true)"
                  :class="{
                    'option-eyes': true,
                    'option-item': true,
                    active: eyes == item,
                  }"
                  :style="{ background: 'url(' + getPart(item) + ')' }"
                ></div>
              </div>

              <div
                v-if="active_pill == 'nose'"
                class="option-list nose-options my-3"
              >
                <div
                  v-for="item in avatar.nose"
                  @click="setPart('nose', item, true)"
                  :class="{
                    'option-nose': true,
                    'option-item': true,
                    active: nose == item,
                  }"
                  :style="{ background: 'url(' + getPart(item) + ')' }"
                ></div>
              </div>

              <div
                v-if="active_pill == 'mouth'"
                class="option-list mouth-options my-3"
              >
                <div
                  v-for="item in avatar.mouth"
                  @click="setPart('mouth', item, true)"
                  :class="{
                    'option-mouth': true,
                    'option-item': true,
                    active: mouth == item,
                  }"
                  :style="{ background: 'url(' + getPart(item) + ')' }"
                ></div>
              </div>

              <div
                v-if="active_pill == 'facialhair'"
                class="option-list facialhair-options my-3"
              >
                <div
                  v-for="item in avatar.facialhair"
                  @click="setPart('facialhair', item, true)"
                  :class="{
                    'option-facialhair': true,
                    'option-item': true,
                    active: facialhair == item,
                  }"
                  :style="{ background: 'url(' + getPart(item) + ')' }"
                >
                  <img :src="getPart(item)" alt="" />
                </div>
              </div>

              <div
                v-if="active_pill == 'shirt'"
                class="option-list shirt-options my-3"
              >
                <div
                  v-if="gender == 'male' || gender == 'non-binary'"
                  v-for="item in avatar.shirt.male"
                  @click="setPart('shirt', item, true)"
                  :class="{
                    'option-shirt': true,
                    'option-item': true,
                    active: shirt == item,
                  }"
                  :style="{ background: 'url(' + getPart(item) + ')' }"
                ></div>
                <div
                  v-if="gender == 'female' || gender == 'non-binary'"
                  v-for="item in avatar.shirt.female"
                  @click="setPart('shirt', item, true)"
                  :class="{
                    'option-shirt': true,
                    'option-item': true,
                    active: shirt == item,
                  }"
                  :style="{ background: 'url(' + getPart(item) + ')' }"
                ></div>
              </div>

              <div
                v-if="active_pill == 'pants'"
                class="option-list pants-options my-3"
              >
                <div
                  v-if="gender == 'male' || gender == 'non-binary'"
                  v-for="item in avatar.pants.male"
                  @click="setPart('pants', item, true)"
                  :class="{
                    'option-pants': true,
                    'option-item': true,
                    active: pants == item,
                  }"
                  :style="{ background: 'url(' + getPart(item) + ')' }"
                ></div>
                <div
                  v-if="gender == 'female' || gender == 'non-binary'"
                  v-for="item in avatar.pants.female"
                  @click="setPart('pants', item, true)"
                  :class="{
                    'option-pants': true,
                    'option-item': true,
                    active: pants == item,
                  }"
                  :style="{ background: 'url(' + getPart(item) + ')' }"
                ></div>
              </div>
              <div
                v-if="active_pill == 'shoes'"
                class="option-list shoes-options my-3"
              >
                <div
                  v-for="item in avatar.shoes"
                  @click="setPart('shoes', item, true)"
                  :class="{
                    'option-shoes': true,
                    'option-item': true,
                    active: shoes == item,
                  }"
                  :style="{ background: 'url(' + getPart(item) + ')' }"
                ></div>
              </div>

              <div
                v-if="active_pill == 'hat'"
                class="option-list hat-options my-3"
              >
                <div
                  v-for="item in avatar.hat"
                  @click="setPart('hat', item, true)"
                  :class="{
                    'option-hat': true,
                    'option-item': true,
                    active: hat == item,
                  }"
                  :style="{ background: 'url(' + getPart(item) + ')' }"
                ></div>
              </div>

              <div
                v-if="active_pill == 'jacket'"
                class="option-list jacket-options my-3"
              >
                <div
                  v-if="gender == 'male' || gender == 'non-binary'"
                  v-for="item in avatar.jacket.male"
                  @click="setPart('jacket', item, true)"
                  :class="{
                    'option-jacket': true,
                    'option-item': true,
                    active: jacket == item,
                  }"
                  :style="{ background: 'url(' + getPart(item) + ')' }"
                ></div>
                <div
                  v-if="gender == 'female' || gender == 'non-binary'"
                  v-for="item in avatar.jacket.female"
                  @click="setPart('jacket', item, true)"
                  :class="{
                    'option-jacket': true,
                    'option-item': true,
                    active: jacket == item,
                  }"
                  :style="{ background: 'url(' + getPart(item) + ')' }"
                ></div>
              </div>

              <div
                v-if="active_parent_pill == 'accessories'"
                class="option-list accessories-options my-3"
              >
                <div
                  v-for="item in avatar.accessories"
                  @click="setPart('accessories', item, true)"
                  :class="{
                    'option-accessories': true,
                    'option-item': true,
                    active: accessories == item,
                  }"
                  :style="{ background: 'url(' + getPart(item) + ')' }"
                ></div>
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
            <font-awesome-icon icon="undo" /> <span>Undo</span>
          </button>
          <button :disabled="action_observer == 0" @click="redo" class="redo">
            <font-awesome-icon icon="redo" /> <span>Redo</span>
          </button>
          <button @click="randomise" class="randomise">
            <font-awesome-icon icon="random" /> <span>Randomise</span>
          </button>
          <button @click="reset" class="reset">
            <font-awesome-icon icon="trash" /> <span>Reset</span>
          </button>
        </div>
        <div class="set-2">
          <!-- <button class="share">
            <font-awesome-icon icon="share" /> Share
          </button> -->
          <button @click="download" class="download">
            <font-awesome-icon icon="download" /> <span> Download Avatar!</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// for detecting browser
import { detect } from "detect-browser";

// for ios, and macos safari support
import FileSaver from "file-saver";
import html2canvas from "html2canvas";
import { canvasToBlob } from "blob-util";

// for chrome and other browsers Support
import domtoimage from "dom-to-image";

import axios from "axios";
import qs from "qs";

import swal from "sweetalert2";

import Loader from "../components/Loader.vue";
import GenderPicker from "../components/builder/GenderPicker.vue";
import Preview from "../components/builder/Preview.vue";
import ParentOptionPills from "../components/builder/ParentOptionsPills.vue";

export default {
  data() {
    return {
      // base_url: "http://localhost/avatar/assets/parts/",
      base_url: "https://charactercreator.online/assets/parts/",

      is_loading: false,
      is_img_loading: false,

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
        shirt: {
          male: [
            "st-0",
            "ml-sh-1",
            "ml-sh-2",
            "ml-sh-3",
            "ml-sh-4",
            "ml-sh-5",
            "ml-sh-6",
            "ml-sh-7",
            "ml-sh-8",
            "ml-sh-9",
            "ml-sh-10",
            "ml-sh-11",
            "ml-sh-12",
            "ml-sh-13",
            "ml-sh-14",
            "ml-sh-15",
            "ml-sh-16",
            "ml-sh-17",
            "ml-sh-18",
            "ml-sh-19",
            "ml-sh-20",
            "ml-sh-21",
            "ml-sh-22",
            "ml-sh-23",
            "ml-sh-24",
            "ml-sh-25",
          ],
          female: [
            "st-0",
            "fm-sh-1",
            "fm-sh-2",
            "fm-sh-3",
            "fm-sh-4",
            "fm-sh-5",
            "fm-sh-6",
            "fm-sh-7",
            "fm-sh-8",
            "fm-sh-9",
            "fm-sh-10",
            "fm-sh-11",
            "fm-sh-12",
            "fm-sh-13",
            "fm-sh-14",
            "fm-sh-15",
            "fm-sh-16",
            "fm-sh-17",
            "fm-sh-18",
            "fm-sh-19",
            "fm-sh-20",
          ],
        },
        jacket: {
          male: ["nb-jk-0", "ml-jk-1", "ml-jk-2", "ml-jk-3", "ml-jk-4"],
          female: ["nb-jk-0", "fm-jk-1", "fm-jk-2"],
        },
        pants: {
          male: [
            "pt-0",
            "ml-pt-1",
            "ml-pt-2",
            "ml-pt-3",
            "ml-pt-4",
            "ml-pt-5",
            "ml-pt-6",
          ],
          female: [
            "pt-0",
            "fm-pt-1",
            "fm-pt-2",
            "fm-pt-3",
            "fm-pt-4",
            "fm-pt-5",
            "fm-pt-6",
            "fm-pt-7",
            "fm-pt-8",
            "fm-pt-9",
            "fm-pt-10",
            "fm-pt-11",
            "fm-pt-12",
            "fm-pt-13",
            "fm-pt-14",
            "fm-pt-15",
          ],
        },
        shoes: [
          "sh-0",
          "sh-1",
          "sh-2",
          "sh-3",
          "sh-4",
          "sh-5",
          "sh-6",
          "sh-7",
          "sh-8",
          "sh-9",
          "sh-10",
          "sh-11",
          "sh-12",
          "sh-13",
          "sh-14",
          "sh-15",
          "sh-16",
          "sh-17",
          "sh-18",
          "sh-19",
          "sh-20",
          "sh-21",
          "sh-22",
          "sh-23",
          "sh-24",
          "sh-25",
          "sh-26",
          "sh-27",
          "sh-28",
          "sh-29",
          "sh-30",
          "sh-31",
          "sh-32",
          "sh-33",
          "sh-34",
          "sh-35",
          "sh-36",
          "sh-37",
          "sh-38",
          "sh-39",
          "sh-40",
          "sh-41",
          "sh-42",
        ],
        hat: [
          "ht-0",
          "ht-1",
          "ht-2",
          "ht-3",
          "ht-4",
          "ht-5",
          "ht-6",
          "ht-7",
          "ht-8",
          "ht-9",
          "ht-10",
        ],

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
          "ey-19",
          "ey-20",
          "ey-21",
          "ey-22",
          "ey-23",
          "ey-24",
          "ey-25",
          "ey-26",
          "ey-27",
          "ey-28",
          "ey-29",
          "ey-30",
          "ey-31",
          "ey-32",
          "ey-33",
          "ey-34",
          "ey-35",
          "ey-36",
          "ey-37",
          "ey-38",
          "ey-39",
          "ey-40",
          "ey-41",
          "ey-42",
          "ey-43",
          "ey-44",
          "ey-45",
          "ey-46",
          "ey-47",
          "ey-48",
          "ey-49",
          "ey-50",
          "ey-51",
          "ey-52",
          "ey-53",
          "ey-54",
          "ey-55",
          "ey-56",
          "ey-57",
          "ey-58",
          "ey-59",
          "ey-60",
          "ey-61",
          "ey-62",
          "ey-63",
          "ey-64",
          "ey-65",
          "ey-66",
          "ey-67",
          "ey-68",
          "ey-69",
          "ey-70",
          "ey-71",
          "ey-72",
          "ey-73",
          "ey-74",
          "ey-75",
          "ey-76",
          "ey-77",
          "ey-78",
          "ey-79",
          "ey-80",
          "ey-81",
          "ey-82",
          "ey-83",
          "ey-84",
          "ey-85",
          "ey-86",
          "ey-87",
          "ey-88",
          "ey-89",
          "ey-90",
          "ey-91",
          "ey-92",
          "ey-93",
          "ey-94",
          "ey-95",
          "ey-96",
          "ey-97",
          "ey-98",
          "ey-99",
          "ey-100",
          "ey-101",
          "ey-102",
          "ey-103",
          "ey-104",
          "ey-105",
          "ey-106",
          "ey-107",
          "ey-108",
          "ey-109",
          "ey-110",
          "ey-111",
          "ey-112",
          "ey-113",
          "ey-114",
          "ey-115",
          "ey-116",
          "ey-117",
          "ey-118",
          "ey-119",
          "ey-120",
          "ey-121",
          "ey-122",
          "ey-123",
          "ey-124",
          "ey-125",
          "ey-126",
          "ey-127",
          "ey-128",
          "ey-129",
          "ey-130",
          "ey-131",
          "ey-132",
          "ey-133",
          "ey-134",
          "ey-135",
          "ey-136",
          "ey-137",
          "ey-138",
          "ey-139",
          "ey-140",
          "ey-141",
          "ey-142",
          "ey-143",
          "ey-144",
          "ey-145",
          "ey-146",
          "ey-147",
          "ey-148",
          "ey-149",
          "ey-150",
          "ey-151",
          "ey-152",
          "ey-153",
          "ey-154",
          "ey-155",
          "ey-156",
          "ey-157",
          "ey-158",
          "ey-159",
          "ey-160",
          "ey-161",
          "ey-162",
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
          "eb-11",
          "eb-12",
          "eb-13",
          "eb-14",
          "eb-15",
          "eb-16",
          "eb-17",
          "eb-18",
          "eb-19",
          "eb-20",
          "eb-21",
          "eb-22",
          "eb-23",
          "eb-24",
          "eb-25",
          "eb-26",
          "eb-27",
          "eb-28",
          "eb-29",
          "eb-30",
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
          "ns-11",
          "ns-12",
          "ns-13",
          "ns-14",
          "ns-15",
          "ns-16",
          "ns-17",
          "ns-18",
          "ns-19",
          "ns-20",
          "ns-21",
          "ns-22",
          "ns-23",
          "ns-24",
          "ns-25",
          "ns-26",
          "ns-27",
          "ns-28",
          "ns-29",
          "ns-30",
          "ns-31",
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
          "fh-0",
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
          "fh-12",
          "fh-13",
          "fh-14",
          "fh-15",
          "fh-16",
          "fh-17",
          "fh-18",
          "fh-19",
          "fh-20",
          "fh-21",
          "fh-22",
          "fh-23",
          "fh-24",
          "fh-25",
          "fh-26",
          "fh-27",
          "fh-28",
          "fh-29",
          "fh-30",
          "fh-31",
          "fh-32",
          "fh-33",
          "fh-34",
          "fh-35",
          "fh-36",
          "fh-37",
          "fh-38",
          "fh-39",
          "fh-40",
          "fh-41",
          "fh-42",
          "fh-43",
          "fh-44",
          "fh-45",
          "fh-46",
          "fh-47",
          "fh-48",
          "fh-49",
          "fh-50",
          "fh-51",
          "fh-52",
          "fh-53",
          "fh-54",
          "fh-55",
          "fh-56",
          "fh-57",
          "fh-58",
          "fh-59",
          "fh-60",
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

      eyes: "ey-36",
      eyebrows: "eb-9",
      nose: "ns-10",
      mouth: "mt-8",
      facialhair: "fh-0",

      hair: "bk-s10",
      hairFront: "bk-s10-front",
      hairBack: "bk-s10-back",

      shirt: "st-5",
      jacket: "nb-jk-0",
      pants: "pt-2",
      shoes: "sh-2",
      hat: "ht-0",

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
    parsedJacket() {
      return this.base_url + this.jacket + ".PNG";
    },
    parsedPants() {
      return this.base_url + this.pants + ".PNG";
    },
    parsedShoes() {
      return this.base_url + this.shoes + ".PNG";
    },
    parsedHat() {
      return this.base_url + this.hat + ".PNG";
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
      this.is_img_loading = false;
      this.is_img_loading = true;

      var url = this.base_url + this.body + ".PNG";
      var img = new Image();
      img.src = url;
      img.onload = () => {
        this.is_img_loading = false;
      };

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
      this.is_img_loading = false;
      this.is_img_loading = true;

      this[part] = value;
      if (part == "hair") {
        this.hairFront = value + "-front";
        this.hairBack = value + "-back";
        var url = this.base_url + value + "-back" + ".PNG";
        var img = new Image();
        img.src = url;
        img.onload = () => {
          this.is_img_loading = false;
        };
      } else {
        var url = this.base_url + value + ".PNG";
        var img = new Image();
        img.src = url;
        img.onload = () => {
          this.is_img_loading = false;
        };
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
            jacket: this.jacket,
            pants: this.pants,
            shoes: this.shoes,
            hat: this.hat,
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
        jacket: this.jacket,
        pants: this.pants,
        shoes: this.shoes,
        hat: this.hat,
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

          if (key == "shirt" || key == "pants" || key == "jacket") {
            let gender = this.gender;
            if (gender != "non-binary") {
              avatar_cursor = this.avatar[key][gender];
            } else {
              avatar_cursor = [
                ...this.avatar[key].male,
                ...this.avatar[key].female,
              ];
            }
          }

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

          if (key == "facialhair" && this.gender == "female") {
            avatar_part = avatar_cursor[0];
          }
          this.setPart(key, avatar_part, true);
        }
      });
      console.log(this.avatar_snapshots);
    },
    reset() {
      let default_avatar = {
        body: "bd-1.PNG$tone1",
        head: "fs-1.PNG$tone1",
        ear: "ea-1.PNG$tone1",

        eyes: "ey-36",
        eyebrows: "eb-9",
        nose: "ns-10",
        mouth: "mt-8",
        facialhair: "fh-0",

        hair: "bk-s10",
        hairFront: "bk-s10-front",
        hairBack: "bk-s10-back",

        shirt: "st-5",
        jacket: "nb-jk-0",
        pants: "pt-2",
        shoes: "sh-2",
        hat: "ht-0",

        accessories: "ac-1",
        background: "bg-1",
      };
      let avatar_keys = Object.keys(default_avatar);
      avatar_keys.forEach((key) => {
        this.setPart(key, default_avatar[key], true);
      });

      this.avatar_snapshots = [];
      this.saveCurrentSnapshot();
    },
    download() {
      this.is_loading = true;
      let node = document.getElementById("preview-container");

      const browser = detect();
      if (browser.name == "ios" || browser.name == "safari") {
        /* SAFARI CODE */
        html2canvas(node).then((canvas) => {
          canvasToBlob(canvas, "image/png").then((blob) => {
            FileSaver.saveAs(blob, "my-avatar.png");
          });
          this.is_loading = false;
        });
      } else if (browser.name == "crios") {
        html2canvas(node).then((canvas) => {
          let base64_string = canvas.toDataURL();
          axios
            .post(
              "https://charactercreator.online/api/avatar_save.php",
              qs.stringify({
                base64_string: base64_string,
              })
            )
            .then((res) => {
              console.log(res.data);
              swal.fire(
                "Awesome!",
                `Since you're on chrome iOS, please manually download your avatar from <a href='${res.data}'>here</a>`,
                "success"
              );
              this.is_loading = false;
            })
            .catch((err) => {
              console.log(err);
              this.is_loading = false;
            });
        });
      } else {
        /* CHROME CODE */
        domtoimage
          .toBlob(node, {
            width: node.clientWidth * 3,
            height: node.clientHeight * 3,
            style: {
              transform: "scale(" + 3 + ")",
              transformOrigin: "top left",
            },
          })
          .then((blob) => {
            console.log(blob);
            FileSaver.saveAs(blob, "my-avatar.png");
            this.is_loading = false;
          });
      }
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
      // background: $lightBlue;
      cursor: pointer;
      height: 95.19px;
      border: 4px solid #ccc;
      transition: 0.1s;
      position: relative;
      border-radius: 5px;

      &.active {
        border: 4px solid $purple;
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
      background-position: -72px 232px !important;
    }
    .option-ear {
      background-size: 377% !important;
      background-position: -117px 299px !important;
    }
    .option-hair {
      background-size: 222% !important;
      background-position: -235px 386px !important;
    }
    .option-eyebrows {
      background-size: 400% !important;
      background-position: -124px 319px !important;
    }
    .option-eyes {
      background-size: 400% !important;
      background-position: -124px 319px !important;
    }
    .option-nose {
      background-size: 500% !important;
      background-position: -167px 369px !important;
    }
    .option-mouth {
      background-size: 500% !important;
      background-position: -172px 369px !important;
    }
    .option-facialhair {
      background-size: 500% !important;
      background-position: -167px 369px !important;
    }
    .option-shirt {
      background-position: -53px -39px !important;
      background-size: 228% !important;
    }
    .option-pants {
      background-size: 180% !important;
      background-position: 119px 87px !important;
    }
    .option-shoes {
      background-position: 167px 819px !important;
      background-size: 306% !important;
    }
    .option-hat {
      background-position: 174px 21px !important;
      background-size: 310% !important;
    }
    .option-jacket {
      background-position: -55px -50px !important;
      background-size: 230% !important;
    }
    .option-accessories {
      background-position: 20px -70px !important;
      background-size: 186% !important;
    }
    .option-skintone {
      background-position: -10px -22px !important;
      background-size: 128% !important;
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
      color: white;
    }
  }
}

@media (max-width: 1090px) {
  .card {
    margin: 0;
    .builder-interface {
      grid-template-columns: 1fr;
      margin: 0 auto;
      width: 550px;

      .preview {
        padding: 0 25px;
      }
    }
  }
  .builder-tools {
    grid-template-columns: 1fr auto;
    padding: 10px;
    position: sticky;
    background: white;
    box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.2);
    bottom: 10px;
    border-radius: 10px;
    z-index: 2;
  }
}

@media (max-width: 970px) {
  .main-label {
    margin: 20px !important;
    font-size: 20px;
  }
  .builder-tools {
    .undo {
      span {
        display: none;
      }
    }
    .redo {
      span {
        display: none;
      }
    }
    .randomise {
      span {
        display: none;
      }
    }
    .reset {
      span {
        display: none;
      }
    }
    .download {
      span {
        display: none;
      }
    }
  }
}

@media (max-width: 610px) {
  .preview {
    padding: 0 !important;
    position: sticky;
    top: 0;
    z-index: 2;
  }
  .customizer {
    margin-top: 20px;
  }
  .builder-interface {
    width: 100% !important;
  }
  .tab-pills {
    grid-template-columns: 1fr 1fr 1fr;
  }
  .option-list {
    grid-template-columns: 1fr 1fr 1fr !important;
    place-items: center;
    .option-item {
      width: 92px;
      z-index: 1;
    }
  }
  .builder-tools {
    .undo {
      padding: 5px 10px !important;
    }
    .redo {
      padding: 5px 10px !important;
    }
    .randomise {
      padding: 5px 10px !important;
    }
    .reset {
      padding: 5px 10px !important;
      margin: 0;
    }
    .download {
      padding: 5px 10px !important;
    }
  }
}

@media (max-width: 410px) {
  .card {
    padding: 0;
  }
  .tab-pills {
    grid-template-columns: 1fr 1fr 1fr;
  }
  .option-list {
    grid-template-columns: 1fr 1fr 1fr !important;
  }
}
@media (max-width: 320px) {
  .tab-pills {
    grid-template-columns: 1fr 1fr;
  }
  .option-list {
    grid-template-columns: 1fr 1fr !important;
  }
}
</style>
