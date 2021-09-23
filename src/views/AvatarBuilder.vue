<template>
  <div class="container">

    
    <p class="mt-5">Picture set: {{instance}}</p>
    
    <div class="card">
      <div class="builder-interface">

        <div class="preview">
          <img class="preview-image" :src="instance" alt="">
          <a download class="btn btn-primary w-100 mt-2" :href="instance"  target="_blank">Download</a>
        </div>

        <div class="options">

            <div class="tab-pills">
              <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                <input v-model="shown_pill" value="head" type="radio" class="btn-check" name="btnradio" id="head-pill" autocomplete="off" checked>
                <label class="btn btn-outline-primary" for="head-pill">Head</label>

                <input v-model="shown_pill" value="eyes" type="radio" class="btn-check" name="btnradio" id="eyes-pill" autocomplete="off">
                <label class="btn btn-outline-primary" for="eyes-pill">Eyes</label>

                <input v-model="shown_pill" value="nose" type="radio" class="btn-check" name="btnradio" id="nose-pill" autocomplete="off">
                <label class="btn btn-outline-primary" for="nose-pill">Nose</label>

                <input v-model="shown_pill" value="mouth" type="radio" class="btn-check" name="btnradio" id="mouth-pill" autocomplete="off">
                <label class="btn btn-outline-primary" for="mouth-pill">Mouth</label>
              </div>
            </div>

              <div v-if="shown_pill == 'head'" class="option-list head-options my-3">
                
                  <div @click="setPart('head', 'h1')" class="option-item option-1">
                    <img :src="getPart('h1')" alt="">
                  </div>
                  <div @click="setPart('head', 'h2')" class="option-item option-2">
                    <img :src="getPart('h2')" alt="">
                  </div>
                
              </div>

                <div v-if="shown_pill == 'eyes'" class="option-list eyes-options my-3">
                    <div @click="setPart('eyes', 'e1')" class="option-item option-1">
                      <img :src="getPart('e1')" alt="">
                    </div>
                    <div @click="setPart('eyes', 'e2')" class="option-item option-2">
                      <img :src="getPart('e2')" alt="">
                    </div>
                </div>

                <div v-if="shown_pill == 'nose'" class="option-list nose-options my-3">
                    <div @click="setPart('nose', 'n1')" class="option-item option-1">
                      <img :src="getPart('n1')" alt="">
                    </div>
                    <div @click="setPart('nose', 'n2')" class="option-item option-2">
                      <img :src="getPart('n2')" alt="">
                    </div>
                </div>

                <div v-if="shown_pill == 'mouth'" class="option-list mouth-options my-3">
                    <div @click="setPart('mouth', 'm1')" class="option-item option-1">
                      <img :src="getPart('m1')" alt="">
                    </div>
                    <div @click="setPart('mouth', 'm2')" class="option-item option-2">
                      <img :src="getPart('m2')" alt="">
                    </div>
                </div>


        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      head: "h2",
      eyes: "e2",
      nose: "n1",
      mouth: "m1",
      shown_pill: "head"
    }
  },
  computed:{
    instance(){
      let base_url = "http://localhost/avatar/assets/instances/";
      return base_url + this.head + "-" + this.eyes + "-" + this.nose + "-" + this.mouth + ".png"
    }
  },
  methods: {
    getPart(part){
      let base_url = "http://localhost/avatar/assets/parts/";
      return base_url + part + ".png";
    },
    setPart(part, value){
      this[part] = value;
    }
  }
}
</script>

<style lang="scss" scoped>

  .builder-interface{
    display:grid;
    grid-template-columns:1fr 2fr;
    grid-gap:20px;
  }
  .card{
    padding:20px;
    margin:50px 0;
  }
  .preview-image{
    width:100%;
  }

  .options{
    .option-list{
      display:grid;
      grid-template-columns:1fr 1fr 1fr 1fr;
      grid-gap:20px;

      .option-item{
        background:white;
        cursor:pointer;
        height: 120px;
        box-shadow:0 10px 15px 0 rgba(0,0,0,.04);
        

        img{
          height:auto;
          width:100%;
          
          border-radius: 5px;
          padding:10px;
        }
      }
    }
  }

  @media screen and (max-width:850px){
    .builder-interface{
      grid-template-columns:1fr;
    }
    .option-list{
      grid-template-columns:1fr 1fr !important;
    }
  }



</style>