<template>
  <div class="ethol-card-choose-us">
    <center>
      <div class="ethol-circle-choose-us">
        <div style="margin-top: 10px">
          <slot name="iconnya"></slot>
        </div>
      </div>
      <br />
      <p style="color: #ffffffa1; margin-top: 20px">{{ title }}</p>
    </center>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>
<style scoped>
.ethol-circle-choose-us {
  background-color: #00000054;
  padding: 30px;
  border-radius: 50%;
  width: 150px;
  height: 150px;
}
.ethol-card-choose-us {
  margin-top: 50px;
  padding: 30px 20px;
  background-color: rgb(255 255 255 / 12%);
  border-radius: 20px;
  width: 90%;
  transition: transform 0.2s;
}
.ethol-card-choose-us:hover {
  box-shadow: -2px 8px 29px 4px rgba(46, 46, 46, 0.15);
  -webkit-box-shadow: -2px 8px 29px 4px rgba(46, 46, 46, 0.15);
  -moz-box-shadow: -2px 8px 29px 4px rgba(46, 46, 46, 0.15);
  transform: scale(1.07);
}

@media all and (max-width: 480px) {
  .ethol-card-choose-us {
    width: 100%;
  }
}
</style>
