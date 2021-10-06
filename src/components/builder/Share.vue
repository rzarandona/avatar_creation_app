<template>
  <div>
    <button @click="initiateShare">SHARE NOW</button>
    <div v-if="is_shareable" class="share-popup">
      <ShareNetwork
        network="facebook"
        url="http://vps-582f91.stackvps.com/page.php"
        title="Check out my GitLab Avatar!"
        description="Check out my GitLab Avatar!"
        quote="Check out my GitLab Avatar!"
        hashtags="gitlabavatar"
      >
        Share on Facebook
      </ShareNetwork>

      <ShareNetwork
        network="twitter"
        url="http://vps-582f91.stackvps.com/page.php"
        title="Check out my GitLab Avatar!"
        description="Check out my GitLab Avatar!"
        quote="Check out my GitLab Avatar!"
        hashtags="gitlabavatar"
      >
        Share on Twitter
      </ShareNetwork>

      <ShareNetwork
        network="linkedin"
        url="http://vps-582f91.stackvps.com/page.php"
        title="Check out my GitLab Avatar!"
        description="Check out my GitLab Avatar!"
        quote="Check out my GitLab Avatar!"
        hashtags="gitlabavatar"
      >
        Share on LinkedIn
      </ShareNetwork>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import domtoimage from "dom-to-image";

export default {
  data() {
    return {
      is_shareable: false,
    };
  },
  methods: {
    initiateShare() {
      domtoimage
        .toPng(document.getElementById("preview-container"))
        .then((dataUrl) => {
          console.log(dataUrl);
        });

      // axios
      //   .get("http://vps-582f91.stackvps.com/api/avatar_save.php", {
      //     params: {
      //       base64image: base64image,
      //     },
      //   })
      //   .then((res) => {
      //     console.log(res.data);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
  },
};
</script>
