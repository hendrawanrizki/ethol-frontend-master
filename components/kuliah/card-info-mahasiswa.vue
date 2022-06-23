<template>
  <v-card outlined>
    <v-card-text>
      <center>
        <img
          v-if="mahasiswa.jk.substr(0, 1) == 'L'"
          src="/img/kuliah/man.png"
          style="height: 70px; min-width: 70px; width: 70px"
          alt=""
        />
        <img
          v-if="mahasiswa.jk.substr(0, 1) == 'P'"
          src="/img/kuliah/woman.png"
          style="height: 70px; min-width: 70px; width: 70px"
          alt=""
        />
        <br />
        <span class="body-2">{{ mahasiswa.nrp }}</span>
        <br />
        <span class="body-2">{{ mahasiswa.name }}</span>
      </center>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    mahasiswa: {
      type: Object,
      required: true,
    },
  },
}
</script>
