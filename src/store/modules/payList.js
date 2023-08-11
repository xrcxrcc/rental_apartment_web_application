const state = {
  formDataList: JSON.parse(localStorage.getItem('formDataList')) || []
}
const mutations = {
  updateFormData (state, formData) {
    state.formDataList.push(formData)
    localStorage.setItem('formDataList', JSON.stringify(state.formDataList))
  },
  paidFormData (state, formData) {
    const paylistId = formData.paylistId
    console.log(paylistId)
    const indexToUpdate = state.formDataList.findIndex(
      (item) => item.paylistId === paylistId
    )

    if (indexToUpdate !== -1) {
      state.formDataList.splice(indexToUpdate, 1, formData)
      localStorage.setItem('formDataList', JSON.stringify(state.formDataList))
    }
  }
}
export default {
  namespaced: true,
  state,
  mutations
}
