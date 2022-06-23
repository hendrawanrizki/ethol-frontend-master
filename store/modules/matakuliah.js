import createPersistedState from 'vuex-persistedstate'
export const plugins = () => [createPersistedState()]
export const state = () => ({
  matakuliahMahasiswa: [],
  matakuliahDosen: [],
})
export const mutations = {
  ASSIGN_MATKUL_MAHASISWA(state, dataParams) {
    state.matakuliahMahasiswa = dataParams
  },
  DELETE_MATKUL_MAHASISWA(state) {
    state.matakuliahMahasiswa = []
  },

  ASSIGN_MATKUL_DOSEN(state, dataParams) {
    state.matakuliahDosen = dataParams
  },
  DELETE_MATKUL_DOSEN(state) {
    state.matakuliahDosen = []
  },
}
export const actions = {
  simpan_matkul_mahasiswa({ commit }, dataParams) {
    commit('ASSIGN_MATKUL_MAHASISWA', dataParams)
  },
  hapus_matkul_mahasiswa({ commit }) {
    commit('DELETE_MATKUL_MAHASISWA')
  },

  simpan_matkul_dosen({ commit }, dataParams) {
    commit('ASSIGN_MATKUL_DOSEN', dataParams)
  },
  hapus_matkul_dosen({ commit }) {
    commit('DELETE_MATKUL_DOSEN')
  },
}
