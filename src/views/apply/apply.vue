<template>
  <div class="apply">
    <van-nav-bar fixed title="Applicant Information" left-arrow @click-left="$router.go(-1)" />
    <div class="banner">
      <div class="room-name">{{ room.studio_name }}</div>
      <div class="rent-time">Rental period: {{room.rent_time}}Weeks, ￡{{room.price_min}}/Week</div>
      <div class="period">
        <div class="start">
          <p class="start-note">Starts from</p>
          <p class="start-date">{{room.move_in}}</p>
        </div>
        <van-icon name="arrow" />
        <div class="end">
          <p class="end-note">Ends on</p>
          <p class="end-date">{{room.move_out}}</p>
        </div>
      </div>
    </div>
    <div class="info-blank">Personal Information</div>
    <div class="person-form">
      <van-form ref="form" @submit="onSubmit">
        <van-field v-model="fullName" label="Full Name" placeholder="Enter full name" :rules="[{ required: true, message: 'Please input full name' }]"></van-field>
        <van-field v-model="firstName" label="First Name" placeholder="Enter first name" :rules="[{ required: true, message: 'Please input first name' }]"></van-field>
        <van-field v-model="lastName" label="Last Name" placeholder="Enter last name" :rules="[{ required: true, message: 'Please input last name' }]"></van-field>
        <van-field
          :value="birthDate"
          label="Birth Date"
          readonly
          clickable
          @click="timePicker = true"
          confirm-button-text="Enter"
          placeholder="Select birth date"
          :rules="[{ required: true, message: 'Please select birth date' }]"
        />
        <van-popup v-model="timePicker" round position="bottom">
          <van-datetime-picker
            type="date"
            title="Select Birth Date"
            :min-date="new Date(1980, 0, 1)"
            :max-date="new Date(2024, 10, 1)"
            confirm-button-text="Confirm"
            cancel-button-text="Cancel"
            @confirm="onPickerConfirm" @cancel="onPickerCancel"
          />
        </van-popup>
        <van-field :value="gender" label="Gender" readonly clickable @click="showPicker = true" placeholder="Select gender" :rules="[{ required: true, message: 'Please select gender' }]" />
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker
            show-toolbar
            confirm-button-text="Confirm"
            cancel-button-text="Cancel"
            :columns="['Male', 'Female', 'Other']"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
        </van-popup>
        <van-field v-model="phoneNumber" type="tel" label="Phone Number" placeholder="Enter phone number" :rules="[{ required: true, message: 'Please input phone number' }]"></van-field>
        <van-field v-model="email" type="email" label="Email" placeholder="Enter email" :rules="[{ required: true, message: 'Please input email address' }]"></van-field>
        <van-field v-model="nationality" label="Nationality" placeholder="Enter nationality" :rules="[{ required: true, message: 'Please input nationality' }]"></van-field>
        <van-field v-model="schoolName" label="Study Abroad School" placeholder="Enter school name" :rules="[{ required: true, message: 'Please input university name' }]"></van-field>
        <van-field v-model="studyGrade" label="Study Abroad Grade" placeholder="Enter study grade"></van-field>

        <div class="space"></div>

        <!-- 提交按钮 -->
        <div class="button">
          <van-button type="primary" native-type="submit">Next Step</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'applyIndex',
  data () {
    return {
      fullName: '',
      firstName: '',
      lastName: '',
      birthDate: '',
      gender: '',
      phoneNumber: '',
      email: '',
      nationality: '',
      schoolName: '',
      studyGrade: '',
      showPicker: false,
      timePicker: false,
      paid: false
    }
  },
  computed: {
    ...mapState('apartdetail', ['aparts']),
    ...mapState('user', ['userInfo']),
    apart () {
      const apartId = this.$route.params.id // Assuming the route param is named "apartId"
      return this.aparts.find((apart) => apart.apart_id === apartId)
    },
    room () {
      const apartId = this.$route.params.id // Assuming the route param is named "apartId"
      const apart = this.aparts.find((apart) => apart.apart_id === apartId)
      const roomId = this.$route.params.rmid
      return apart.studio.find((room) => room.studio_id === roomId)
    }
  },
  methods: {
    onSubmit () {
      // 在这里可以进行表单提交操作
      // 示例：输出表单内容
      const formData = {
        paylistId: Date.now(),
        fullName: this.fullName,
        firstName: this.firstName,
        lastName: this.lastName,
        birthDate: this.birthDate,
        gender: this.gender,
        phoneNumber: this.phoneNumber,
        email: this.email,
        nationality: this.nationality,
        schoolName: this.schoolName,
        studyGrade: this.studyGrade,
        userId: this.userInfo.userId, // Assuming this is the userId from the userInfo in the Vuex store
        apartId: this.apart.apart_id,
        studioId: this.room.studio_id,
        paid: this.paid
      }
      this.updateFormData(formData)
      this.$router.push(`/pay/${this.apart.apart_id}/${this.room.studio_id}/${formData.paylistId}`)
    },
    ...mapMutations('payList', ['updateFormData']),

    onConfirm (value) {
      this.gender = value
      this.showPicker = false
    },
    onPickerConfirm (val) {
      this.birthDate = val.toISOString().slice(0, 10)
      this.timePicker = false// 关闭DatetimePicker弹出层
    },
    onPickerCancel () {
      this.timePicker = false // 关闭DatetimePicker弹出层
    }
  }
}
</script>

<style lang="less" scoped>
.apply {
  .banner {
    margin-top: 45px;
    padding: 20px 20px;
    .room-name {
      font-size: 22px;
      font-weight: 600;
    }
    .rent-time {
      margin-top: 10px;
      font-size: 16px;
      color: #666666;
    }
    .period {
      display: flex;
      margin-top: 15px;
      .start {
        .start-note {
          font-size: 14px;
          color: #666666;
        }
        .start-date {
          margin-top: 10px;
          font-size: 14px;
          font-weight: 600;
        }
      }
      .van-icon {
        margin-left: 60px;
        line-height: 40px;
      }
      .end {
        margin: 0 0 0 60px;
        .end-note {
          font-size: 14px;
          color: #666666;
        }
        .end-date {
          margin-top: 10px;
          font-size: 14px;
          font-weight: 600;
        }
      }
    }
  }
  .info-blank {
    height: 30px;
    font-size: 14px;
    line-height: 30px;
    padding-left: 20px;
    width: 100%;
    background-color: #f5f5f5;
    color: #999999;
  }
  .person-form {
    .van-form {
      .button {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 75px;
        background-color: #fff;
        box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.1);
        text-align: center;
        .van-button {
          width: 90%;
          margin-top: 15px;
          font-size: 20px;
          background-color: #376941;
          border: 1px solid #376941;
          border-radius: 5px;
        }
      }
      .space {
        margin-bottom: 75px;
      }
    }
  }
}
</style>
