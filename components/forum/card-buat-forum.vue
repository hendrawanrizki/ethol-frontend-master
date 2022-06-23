<template>
  <v-card outlined style="border-radius: 10px" class="card-buat-forum">
    <v-card-title>Buat Postingan</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="1" sm="1">
          <v-avatar
            :color="listWarna[warnaLogic(user.nama)].color"
            size="35"
            style="color: white"
          >
            {{ limitDuaKarakter(akronim(user.nama)) }}
          </v-avatar>
        </v-col>
        <v-col cols="11" sm="11">
          <div class="btn-status" @click="openDialogBuatStatus">
            Silakan tulis disini ...
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'
import teks from '~/mixins/teks'
export default {
  mixins: [teks],
  computed: {
    ...mapState(['user']),
  },
  methods: {
    openDialogBuatStatus() {
      this.$emit('opendialog')
    },
  },
}
</script>
<style scoped>
.btn-status {
  background-color: rgb(214, 213, 213);
  padding: 8px 15px;
  border-radius: 18px;
}
.btn-status:hover {
  background-color: rgb(192, 192, 192);
  cursor: pointer;
}
.card-buat-forum:hover {
  box-shadow: -2px 8px 29px 2px rgba(46, 46, 46, 0.15);
  -webkit-box-shadow: -2px 8px 29px 2px rgba(46, 46, 46, 0.15);
  -moz-box-shadow: -2px 8px 29px 2px rgba(46, 46, 46, 0.15);
}
</style>
