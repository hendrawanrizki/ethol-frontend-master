import createPersistedState from 'vuex-persistedstate'
export const plugins = () => [createPersistedState()]
export default {
  state: () => {
    return {
      kuliahMahasiswa: {},
      kuliahDosen: {},
    }
  },
  mutations: {
    ASSIGN_KULIAH_MAHASISWA(state, dataParams) {
      state.kuliahMahasiswa = dataParams
    },
    DELETE_KULIAH_MAHASISWA(state) {
      state.kuliahMahasiswa = {}
    },
    ASSIGN_KULIAH_DOSEN(state, dataParams) {
      state.kuliahDosen = dataParams
    },
    DELETE_KULIAH_DOSEN(state) {
      state.kuliahDosen = {}
    },
  },
  actions: {
    simpan_kuliah_mahasiswa({ commit }, dataParams) {
      commit('ASSIGN_KULIAH_MAHASISWA', dataParams)
    },
    hapus_kuliah_mahasiswa({ commit }) {
      commit('DELETE_KULIAH_MAHASISWA')
    },

    simpan_kuliah_dosen({ commit }, dataParams) {
      commit('ASSIGN_KULIAH_DOSEN', dataParams)
    },
    hapus_kuliah_dosen({ commit }) {
      commit('DELETE_KULIAH_DOSEN')
    },
  },
}
