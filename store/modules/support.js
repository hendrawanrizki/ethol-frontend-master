import createPersistedState from 'vuex-persistedstate'
export const plugins = () => [createPersistedState()]
export default {
  state: () => {
    return {
      supportDetail: {},
    }
  },
  mutations: {
    ASSIGN_SUPPORT(state, dataParams) {
      state.supportDetail = dataParams
    },
    DELETE_SUPPORT(state) {
      state.supportDetail = {}
    },
  },
  actions: {
    simpan_support({ commit }, dataParams) {
      commit('ASSIGN_SUPPORT', dataParams)
    },
    hapus_support({ commit }) {
      commit('DELETE_SUPPORT')
    },
  },
}
