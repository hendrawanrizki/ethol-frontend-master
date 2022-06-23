<template>
  <div style="background-color: #ebebeb; height: 100%">
    <v-container>
      <v-row>
        <v-col cols="12" offset-md="2" offset-lg="2" md="8" lg="8" sm="12">
          <CardBuatForum @opendialog="openDialogBuatPostingan" />
        </v-col>
      </v-row>
      <v-row v-for="(ld, index) in listData" :key="index">
        <v-col cols="12" offset-md="2" offset-lg="2" md="8" lg="8" sm="12">
          <CardPost
            :data-forum="ld"
            @editpost="openDialogEditPostingan"
            @hapuspost="hapusPostingan"
          />
        </v-col>
      </v-row>
      <div v-if="loading">
        <v-row v-for="(ld, index) in loadingData" :key="index">
          <v-col cols="12" offset-md="2" offset-lg="2" md="8" lg="8" sm="12">
            <v-card outlined style="border-radius: 10px">
              <v-card-title>
                <ContentLoader height="25">
                  <circle cx="12" cy="12" r="12" />
                  <rect x="35" y="4" rx="3" ry="3" width="120" height="14" />
                </ContentLoader>
              </v-card-title>
              <v-card-text>
                <br />
                <ContentLoader height="55">
                  <rect x="0" y="0" rx="3" ry="3" width="500" height="8" />
                  <rect x="0" y="17" rx="3" ry="3" width="500" height="8" />
                  <rect x="0" y="34" rx="3" ry="3" width="300" height="8" />
                </ContentLoader>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div
        v-else-if="loading == false && listData.length == 0"
        style="margin: 15px auto"
      >
        <v-row>
          <v-col cols="12" offset-md="2" offset-lg="2" md="8" lg="8" sm="12">
            <v-card outlined>
              <v-card-text>
                <h4 style="font-weight: 400">
                  Belum ada postingan untuk matakuliah ini !
                </h4>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
    <DialogBuatPost
      ref="ref_dialog_buat_post"
      @berhasilsimpan="berhasilSimpan"
    />
    <DialogEditPost ref="ref_dialog_edit_post" @berhasilsimpan="berhasilEdit" />
    <DialogDelete
      :dialog="dialogHapusPostingan"
      :loading="loadingDialogHapusPostingan"
      @close="sembunyikanDialogHapusPostingan"
      @delete="prosesHapusDataPostingan"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import CardPost from '@/components/forum/card-post.vue'
import CardBuatForum from '@/components/forum/card-buat-forum.vue'
import DialogBuatPost from '@/components/forum/dialog-buat-post.vue'
import DialogEditPost from '@/components/forum/dialog-edit-post.vue'
import DialogDelete from '@/components/utils/dialog-delete.vue'
import { ContentLoader } from 'vue-content-loader'
import teks from '~/mixins/teks'
export default {
  components: {
    CardPost,
    CardBuatForum,
    DialogBuatPost,
    DialogEditPost,
    DialogDelete,
    ContentLoader,
  },
  mixins: [teks],
  layout: 'kuliah',
  middleware: ['auth', 'dosen'],
  transition: 'slide-bottom',
  data() {
    return {
      listData: [],
      loadingData: ['', '', ''],
      loading: true,
      dialogHapusPostingan: false,
      loadingDialogHapusPostingan: false,
      postingan: {},
    }
  },
  computed: {
    ...mapState({
      kuliah: (state) => state.modules.kuliah.kuliahDosen,
      user: (state) => state.user,
    }),
  },
  mounted() {
    this.ambilData()
  },
  methods: {
    ambilData() {
      this.loading = true
      this.listData = []
      this.$axios
        .get('/forum', {
          params: {
            kuliah: this.kuliah.nomor,
            jenisSchema: this.kuliah.jenisSchema,
          },
        })
        .then((res) => {
          this.loading = false
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index]
            element.dihover = false
            this.listData.push(element)
          }
        })
    },
    openDialogBuatPostingan() {
      this.$refs.ref_dialog_buat_post.dialog = true
    },
    berhasilSimpan() {
      this.ambilData()
    },
    openDialogEditPostingan(datanya) {
      this.$refs.ref_dialog_edit_post.assignDialog(datanya)
    },
    hapusPostingan(datanya) {
      this.postingan = datanya
      this.dialogHapusPostingan = true
    },
    prosesHapusDataPostingan() {
      this.loadingDialogHapusPostingan = true
      this.$axios.delete(`/forum/${this.postingan.id}`).then((res) => {
        if (res.data.sukses) {
          this.dialogHapusPostingan = false
          this.loadingDialogHapusPostingan = false
          this.ambilData()
        }
      })
    },
    sembunyikanDialogHapusPostingan() {
      this.dialogHapusPostingan = false
    },
    berhasilEdit() {
      this.ambilData()
    },
  },
}
</script>
<style scoped>
.ethol-title-kuliah {
  margin-top: 10px !important;
}
</style>
