<template>
  <v-card
    outlined
    style="border-radius: 10px"
    @mouseover="dihover = true"
    @mouseleave="dihover = false"
  >
    <v-card-title style="margin-bottom: 20px">
      <v-avatar
        class="avatar-header-post"
        :color="listWarna[warnaLogic(dataForum.nama_user)].color"
        size="35"
        style="color: white"
      >
        <small>{{ limitDuaKarakter(akronim(dataForum.nama_user)) }}</small>
        <br />
      </v-avatar>
      &nbsp;
      <v-row style="margin-top: -5px; margin-left: -7px">
        <v-col
          cols="12"
          style="
            padding-top: 0px !important;
            padding-bottom: 0px !important;
            line-height: 1rem !important;
          "
        >
          {{ dataForum.nama_user }}
        </v-col>
        <v-col
          cols="12"
          style="
            padding-top: 2px !important;
            padding-bottom: 0px !important;
            line-height: 1rem !important;
          "
        >
          <small style="font-size: 11px; font-weight: 400; color: #787878">
            {{ dataForum.waktu_indonesia }}
          </small>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <v-menu v-if="user.nomor == dataForum.user || dosen" offset-y>
        <template #activator="{ on, attrs }">
          <v-btn v-bind="attrs" icon v-on="on">
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-if="user.nomor == dataForum.user"
            class="menunya-dihover"
            @click="editPostForum"
          >
            <v-list-item-title>Edit</v-list-item-title>
          </v-list-item>
          <v-list-item class="menunya-dihover" @click="hapusPostForum">
            <v-list-item-title>Hapus</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-title>
    <!-- <v-card-text>
      <div style="margin-left: 46px; margin-top: -26px">
       
      </div>
    </v-card-text> -->
    <!-- eslint-disable vue/no-v-html -->
    <v-card-text v-html="dataForum.narasi"></v-card-text>
    <!--eslint-enable-->
    <v-card-text v-if="dataForum.lampiran.length != 0">
      <v-row>
        <v-col
          v-for="(dl, index) in dataForum.lampiran"
          :key="index"
          cols="12"
          md="6"
          sm="6"
        >
          <CardFile
            :nama-file="dl.pathFile"
            :path="dl.pathFile"
            icon="mdi-download"
            :hover="false"
            @aksiicon="downloadFile"
          />
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text
      v-if="dataKomentar.length != 0"
      style="margin-bottom: 10px; margin-top: -20px; padding: 25px"
    >
      <div v-if="modeLimit == true">
        <v-row
          v-for="(dk, index) in dataKomentarLimit"
          :key="index"
          style="margin-top: 26px"
        >
          <v-col cols="12">
            <v-row>
              <v-col cols="1">
                <v-avatar
                  :color="listWarna[warnaLogic(dk.nama_user)].color"
                  size="25"
                  style="color: white"
                >
                  <small>{{ limitDuaKarakter(akronim(dk.nama_user)) }}</small>
                </v-avatar>
              </v-col>
              <v-col
                cols="10"
                style="
                  padding: 5px 6px 5px 9px;
                  background-color: #f1f1f1;
                  border-radius: 10px;
                "
              >
                <div>
                  <b>{{ dk.nama_user }}</b>
                  <br />
                  {{ dk.narasi }}
                </div>
              </v-col>
              <v-col cols="1">
                <v-menu v-if="user.nomor == dk.user || dosen" offset-y>
                  <template #activator="{ on, attrs }">
                    <v-btn v-bind="attrs" icon v-on="on">
                      <v-icon>mdi-dots-horizontal</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      class="menunya-dihover"
                      @click="hapusPostKomentar(dk)"
                    >
                      <v-list-item-title>Hapus </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <br />
        <v-row>
          <v-col cols="12">
            <center>
              <div class="btn-lihat-selengkapnya" @click="modeLimit = false">
                <v-btn icon color="grey"><v-icon>mdi-arrow-down</v-icon></v-btn>
                <p>Lihat Selengkapnya</p>
              </div>
            </center>
          </v-col>
        </v-row>
      </div>
      <div v-else-if="modeLimit == false">
        <v-row
          v-for="(dk, index) in dataKomentar"
          :key="index"
          style="margin-top: 26px"
        >
          <v-col cols="12">
            <v-row>
              <v-col cols="1">
                <v-avatar
                  :color="listWarna[warnaLogic(dk.nama_user)].color"
                  size="25"
                  style="color: white"
                >
                  <small>{{ limitDuaKarakter(akronim(dk.nama_user)) }}</small>
                </v-avatar>
              </v-col>
              <v-col
                cols="10"
                style="
                  padding: 5px 6px 5px 9px;
                  background-color: #f1f1f1;
                  border-radius: 10px;
                "
              >
                <div>
                  <b>{{ dk.nama_user }}</b>
                  <br />
                  {{ dk.narasi }}
                </div>
              </v-col>
              <v-col cols="1">
                <v-menu v-if="user.nomor == dk.user || dosen" offset-y>
                  <template #activator="{ on, attrs }">
                    <v-btn v-bind="attrs" icon v-on="on">
                      <v-icon>mdi-dots-horizontal</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      class="menunya-dihover"
                      @click="hapusPostKomentar(dk)"
                    >
                      <v-list-item-title>Hapus </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </v-card-text>
    <v-card-text v-else>
      <p>Belum ada komentar !</p>
    </v-card-text>
    <v-divider></v-divider>
    <transition name="fade">
      <v-card-text
        style="
          transition: visibility 0s, opacity 0.5s linear;
          padding-bottom: 0px !important;
        "
      >
        <v-textarea
          v-model="komentar"
          placeholder="Tulis komentar anda, (enter) untuk mengirim ..."
          rows="1"
          filled
          @keydown.enter.exact.prevent="kirimKomentar"
          @keydown.enter.shift.exact.prevent="komentar += '\n'"
        >
          <template slot="prepend-inner">
            <v-avatar
              v-if="loadingKomentar == false"
              :color="listWarna[warnaLogic(user.nama)].color"
              size="25"
              style="color: white"
            >
              <small>{{ limitDuaKarakter(akronim(user.nama)) }}</small>
            </v-avatar>
            <v-progress-circular
              v-else-if="loadingKomentar"
              :width="2"
              color="grey"
              indeterminate
              sma
            ></v-progress-circular>
            &nbsp;&nbsp;
          </template>
        </v-textarea>
      </v-card-text>
    </transition>
    <DialogDelete
      :dialog="dialogHapusKomentar"
      :loading="loadingDialogHapusKomentar"
      @close="sembunyikanDialogHapusKomentar"
      @delete="prosesHapusDataKomentar"
    />
  </v-card>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import DialogDelete from '@/components/utils/dialog-delete.vue'
import teks from '~/mixins/teks'
import file from '~/mixins/file'
export default {
  components: {
    DialogDelete,
  },
  mixins: [teks, file],
  props: {
    dataForum: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dihover: false,
      loadingKomentar: false,
      komentar: '',
      dataKomentar: [],
      dataKomentarLimit: [],

      dialogHapusKomentar: false,
      loadingDialogHapusKomentar: false,
      komentarObject: {},
      modeLimit: false,
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
      auth: (state) => state.auth,
    }),
    ...mapGetters(['admin', 'baak', 'dosen', 'kaprodi', 'mahasiswa']),
  },
  mounted() {
    const self = this
    setTimeout(function () {
      const dataKomentar = self.dataForum.komentar
      self.dataKomentar = dataKomentar.reverse()

      if (self.dataKomentar.length > 5) {
        self.modeLimit = true
        for (let index = 0; index < self.dataKomentar.length; index++) {
          if (index < 5) {
            const x = self.dataKomentar[index]
            self.dataKomentarLimit.push(x)
          }
        }
      }
    }, 1000)
  },
  methods: {
    kirimKomentar() {
      if (this.komentar != '') {
        if (!this.komentar.replace(/\s/g, '').length) {
          this.komentar = ''
        } else {
          this.loadingKomentar = true
          this.$axios
            .$post('/forum/komentar', {
              idForum: this.dataForum.id,
              narasi: this.komentar,
              tipeAkses: this.auth.hakAktif,
            })
            .finally(() => (this.loadingKomentar = false))
            .then((response) => {
              if (response.success == true) {
                this.komentar = ''
                this.dataKomentar = response.komentar.reverse()
              }
            })
        }
      } else {
        this.komentar = ''
      }
    },
    downloadFile(v) {
      this.downloadFileEthol(v.path)
    },
    editPostForum() {
      const forum = this.dataForum
      this.$emit('editpost', forum)
    },
    hapusPostForum() {
      const forum = this.dataForum
      this.$emit('hapuspost', forum)
    },
    hapusPostKomentar(datanya) {
      this.komentarObject = datanya
      this.dialogHapusKomentar = true
    },
    prosesHapusDataKomentar() {
      this.loadingDialogHapusKomentar = true
      this.$axios
        .delete(
          `/forum/komentar/${this.komentarObject.id}/${this.komentarObject.forum_id}`
        )
        .then((res) => {
          if (res.data.sukses) {
            this.dialogHapusKomentar = false
            this.loadingDialogHapusKomentar = false
            this.dataKomentar = res.data.komentar.reverse()
          }
        })
    },
    sembunyikanDialogHapusKomentar() {
      this.dialogHapusKomentar = false
    },
  },
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.menunya-dihover:hover {
  cursor: pointer !important;
  background-color: rgb(216, 216, 216);
}
.btn-lihat-selengkapnya:hover {
  cursor: pointer;
}
@media all and (max-width: 480px) {
  .avatar-header-post {
    display: none !important;
  }
}
</style>
