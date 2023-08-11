export default {
  namespaced: true,
  state () {
    return {
      aparts: [
        {
          apart_id: '10001',
          apart_name: 'iQ Shoreditch',
          apart_rate: 3.9,
          apart_add: '2 Silicon Wy, East Rd, London N1 6AT',
          city: 'London',
          price_min: '463',
          lat: 51.52761015150446,
          lng: -0.08772708226614748,
          front_image: [
            require('@/assets/10001/front_01.jpg'),
            require('@/assets/10001/front_02.jpg'),
            require('@/assets/10001/front_03.jpg')
          ],
          studio: [
            {
              studio_id: '1000101',
              studio_name: 'Bronze Studio Plus',
              room_size: '19-21',
              bed_size: 'small Double',
              count: 0,
              image: [
                require('@/assets/10001/studio_01_1.jpg'),
                require('@/assets/10001/studio_01_2.jpg'),
                require('@/assets/10001/studio_01_3.jpg')
              ],
              floor: '1-7',
              price_min: '463',
              rent_time: '50',
              move_in: '16-09-2023',
              move_out: '31-08-2023'
            },
            {
              studio_id: '1000102',
              studio_name: 'Platinum Studio',
              room_size: '23-27.5',
              bed_size: 'King double',
              count: 4,
              image: [
                require('@/assets/10001/studio_02_1.jpg'),
                require('@/assets/10001/studio_02_2.jpg'),
                require('@/assets/10001/studio_02_3.jpg')
              ],
              floor: '1-7',
              price_min: '542',
              rent_time: '51',
              move_in: '09-09-2023',
              move_out: '31-08-2023'
            }
          ],
          ensuite: []
        },
        {
          apart_id: '10002',
          apart_name: 'Chapter Islington',
          apart_rate: 4.1,
          apart_add: '2 Silicon Wy, East Rd, London N1 6AT',
          city: 'London',
          price_min: '375',
          lat: 51.52761015150446,
          lng: -0.08772708226614748,
          front_image: [
            require('@/assets/10001/front_01.jpg'),
            require('@/assets/10001/front_02.jpg'),
            require('@/assets/10001/front_03.jpg')
          ],
          studio: [
            {
              studio_id: '1000201',
              studio_name: 'Bronze Studio Plus',
              room_size: '19-21',
              bed_size: 'small Double',
              count: 0,
              image: [
                require('@/assets/10001/studio_01_1.jpg'),
                require('@/assets/10001/studio_01_2.jpg'),
                require('@/assets/10001/studio_01_3.jpg')
              ],
              floor: '1-7',
              price_min: '463',
              rent_time: '50',
              move_in: '16-09-2023',
              move_out: '31-08-2023'
            },
            {
              studio_id: '1000202',
              studio_name: 'Platinum Studio',
              room_size: '23-27.5',
              bed_size: 'King double',
              count: 4,
              image: [
                require('@/assets/10001/studio_02_1.jpg'),
                require('@/assets/10001/studio_02_2.jpg'),
                require('@/assets/10001/studio_02_3.jpg')
              ],
              floor: '1-7',
              price_min: '542',
              rent_time: '51',
              move_in: '09-09-2023',
              move_out: '31-08-2023'
            }
          ],
          ensuite: []
        }
      ]
    }
  },
  mutations: {},
  actions: {},
  getters: {}
}
