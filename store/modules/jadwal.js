import createPersistedState from 'vuex-persistedstate'
export const plugins = () => [createPersistedState()]
export default {
  state: () => {
    return {
      jadwalMahasiswa: [],
      jadwalDosen: [],
    }
  },
  mutations: {
    ASSIGN_JADWAL_MAHASISWA(state, dataParams) {
      state.jadwalMahasiswa = dataParams
    },
    DELETE_JADWAL_MAHASISWA(state) {
      state.jadwalMahasiswa = {}
    },
    ASSIGN_JADWAL_DOSEN(state, dataParams) {
      state.jadwalDosen = dataParams
    },
    DELETE_JADWAL_DOSEN(state) {
      state.jadwalDosen = {}
    },
  },
  actions: {
    simpan_jadwal_mahasiswa({ commit }, dataParams) {
      commit('ASSIGN_JADWAL_MAHASISWA', dataParams)
    },
    hapus_jadwal_mahasiswa({ commit }) {
      commit('DELETE_JADWAL_MAHASISWA')
    },

    simpan_jadwal_dosen({ commit }, dataParams) {
      commit('ASSIGN_JADWAL_DOSEN', dataParams)
    },
    hapus_jadwal_dosen({ commit }) {
      commit('DELETE_JADWAL_DOSEN')
    },
  },
}
