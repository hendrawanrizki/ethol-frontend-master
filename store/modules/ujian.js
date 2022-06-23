import createPersistedState from 'vuex-persistedstate'
export const plugins = () => [createPersistedState()]
export default {
  state: () => {
    return {
      ujianMahasiswa: {},
      ujianDosen: {},
    }
  },
  mutations: {
    ASSIGN_UJIAN_MAHASISWA(state, dataParams) {
      state.ujianMahasiswa = dataParams
    },
    DELETE_UJIAN_MAHASISWA(state) {
      state.ujianMahasiswa = {}
    },
    ASSIGN_UJIAN_DOSEN(state, dataParams) {
      state.ujianDosen = dataParams
    },
    DELETE_UJIAN_DOSEN(state) {
      state.ujianDosen = {}
    },
  },
  actions: {
    simpan_ujian_mahasiswa({ commit }, dataParams) {
      commit('ASSIGN_UJIAN_MAHASISWA', dataParams)
    },
    hapus_ujian_mahasiswa({ commit }) {
      commit('DELETE_UJIAN_MAHASISWA')
    },

    simpan_ujian_dosen({ commit }, dataParams) {
      commit('ASSIGN_UJIAN_DOSEN', dataParams)
    },
    hapus_ujian_dosen({ commit }) {
      commit('DELETE_UJIAN_DOSEN')
    },
  },
}
