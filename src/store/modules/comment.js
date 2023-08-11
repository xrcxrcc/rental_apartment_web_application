export default {
  namespaced: true,
  state () {
    return {
      comments: [
        {
          apart_id: '10001',
          com: [
            {
              com_id: 90001,
              user: 'Chuanqi',
              content: 'Very good, very good facilities, fast internet speed'
            },
            {
              com_id: 90002,
              user: 'Mushroom',
              content: 'Good position and nice staff'
            },
            {
              com_id: 90003,
              user: 'Chicken',
              content: 'Best experience ever!!!'
            }
          ]
        },
        {
          apart_id: '10002',
          com: [
            {
              com_id: 90001,
              user: 'xrcxrcc',
              content: 'Lots of activities in the longue'
            },
            {
              com_id: 90002,
              user: 'Swj',
              content: 'Good position and nice staff'
            },
            {
              com_id: 90003,
              user: 'Kitchen',
              content: 'Good position'
            }
          ]
        }
      ]
    }
  },
  mutations: {},
  actions: {},
  getters: {}
}
