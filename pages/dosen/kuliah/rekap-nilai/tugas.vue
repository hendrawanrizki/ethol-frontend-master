<template>
  <div>
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      absolute
      top
      rounded
      color="blue accent-2"
    ></v-progress-linear>
    <v-container>
      <v-card>
        <v-card-title> Rekap Nilai Tugas </v-card-title>
        <v-card-subtitle>
          {{ kuliah.matakuliah ? kuliah.matakuliah.nama : '' }}
          -
          {{ kuliah.kelas }} Kelas {{ kuliah.pararel }}
        </v-card-subtitle>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                placeholder="Cari . . ."
                outlined
              />
            </v-col>
          </v-row>
          <v-row style="margin-top: -26px">
            <v-col cols="12">
              <!-- start table -->
              <table>
                <thead>
                  <tr>
                    <th scope="col" width="3%">NO</th>
                    <th scope="col" width="9%">NRP</th>
                    <th scope="col" nowrap>Nama</th>
                    <template v-for="(ht, index) in headerTable">
                      <th :key="index" scope="col" nowrap>
                        <center>Tugas {{ index + 1 }}</center>
                      </th>
                    </template>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(ld, index) in filteredItems" :key="index">
                    <td scope="row" data-label="NO">{{ index + 1 }}</td>
                    <td data-label="NRP">{{ ld.nrp }}</td>
                    <td data-label="Nama" nowrap>{{ ld.nama }}</td>
                    <template v-for="(ht, td_index) in headerTable">
                      <td :key="td_index" :data-label="tugasKe(td_index)">
                        <center>
                          <div v-if="nilaiNya(ld.data_nilai, ht) != null">
                            <span>{{ nilaiNya(ld.data_nilai, ht) }}</span>
                          </div>
                          <div v-else>
                            <v-chip
                              v-if="checkPengumpulan(ld.data_nilai, ht) == true"
                              color="green"
                              label
                              x-small
                              text-color="white"
                            >
                              <v-icon x-small> mdi-check </v-icon>
                            </v-chip>
                            <v-chip
                              v-else
                              color="red"
                              label
                              x-small
                              text-color="white"
                            >
                              <v-icon x-small>mdi-close</v-icon>
                            </v-chip>
                          </div>
                        </center>
                      </td>
                    </template>
                  </tr>
                </tbody>
              </table>
              <!-- end table -->
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-chip color="green" label x-small text-color="white">
                <v-icon x-small> mdi-check </v-icon>
              </v-chip>
              = Mengumpulkan (belum dinilai)
              <br />
              <v-chip color="red" label x-small text-color="white">
                <v-icon x-small> mdi-close </v-icon>
              </v-chip>
              = Tidak Mengumpulkan
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  layout: 'kuliah',
  middleware: ['auth', 'dosen'],
  transition: 'slide-bottom',
  data() {
    return {
      loading: true,
      listData: [],
      headerTable: [],
      listDataExport: [],
      search: '',
    }
  },
  computed: {
    ...mapState({
      kuliah: (state) => state.modules.kuliah.kuliahDosen,
      user: (state) => state.user,
    }),
    filteredItems() {
      return this.listData.filter((item) => {
        return item.nama.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },
  created() {
    this.ambilData()
  },
  methods: {
    ambilData() {
      this.loading = true
      this.$axios
        .get('/tugas/rekap', {
          params: {
            kuliah: this.kuliah.nomor,
            jenisSchema: this.kuliah.jenisSchema,
          },
        })
        .then((res) => {
          this.loading = false
          this.headerTable = res.data.tugas
          this.listData = res.data.nilai
        })
    },
    checkPengumpulan(nilai, ht) {
      let mengumpulkan = false
      for (let index = 0; index < nilai.length; index++) {
        const element = nilai[index]
        if (element.nomor_t == ht) {
          mengumpulkan = true
        }
      }
      return mengumpulkan
    },

    nilaiNya(nilai, ht) {
      let nilaix = null
      for (let index = 0; index < nilai.length; index++) {
        const element = nilai[index]
        if (element.nomor_t == ht) {
          nilaix = element.nilai
        }
      }
      return nilaix
    },
    tugasKe(idx) {
      const nomor = idx + 1
      return 'Tugas ' + nomor
    },
  },
}
</script>
<style lang="css" scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin: 10px auto;
}

/* Zebra striping */
tr:nth-of-type(odd) {
  background: #eee;
}

th {
  background: #0a5688;
  color: white;
  font-weight: bold;
}

td,
th {
  padding: 6px;
  border: 1px solid #ccc;
  text-align: left;
  font-size: 11pt;
}
td {
  font-size: 10.8pt;
}
@media screen and (max-width: 600px) {
  table {
    border: 0;
  }

  table caption {
    font-size: 1.3em;
  }

  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: 0.625em;
  }

  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: 0.8em;
    text-align: center;
  }

  table td::before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }

  table td:last-child {
    border-bottom: 0;
  }
}
</style>
