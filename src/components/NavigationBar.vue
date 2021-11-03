<template>
  <nav class="container">
    <img
      class="my-3"
      src="https://charactercreator.online/assets/gitlab_logo.png"
      alt=""
    />
  </nav>
</template>

<style lang="scss">
nav img {
  width: 150px;
}

@media (max-width: 970px) {
  nav {
    display: grid;
    place-items: center;
    img {
      width: 100px;
    }
  }
}
</style>
