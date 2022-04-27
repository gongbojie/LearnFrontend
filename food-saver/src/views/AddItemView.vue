<template>
  <div class="about">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="产品名称"
          label="产品名称"
          placeholder="产品名称"
          :rules="[{ required: true, message: '请填写产品名称' }]"
        />
        <van-field
          v-model="password"
          name="图标"
          label="图标"
          placeholder="请选择图标"
          :rules="[{ required: false, message: '请选择图标' }]"
        />

        <van-field
          v-model="value"
          is-link
          readonly
          label="分类"
          placeholder="选择分类"
          @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" round position="bottom">
          <van-picker
            :columns="goodTypes"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
        </van-popup>

        <van-field
          v-model="value"
          is-link
          readonly
          label="分类"
          placeholder="选择分类"
          @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" round position="bottom">
          <van-picker
            :columns="goodTypes"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
        </van-popup>
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { ref } from 'vue';
import const_value from '@/const.js'

export default {
  setup() {
    const columns = [
      { text: '杭州', value: 'Hangzhou' },
      { text: '宁波', value: 'Ningbo' },
      { text: '温州', value: 'Wenzhou' },
      { text: '绍兴', value: 'Shaoxing' },
      { text: '湖州', value: 'Huzhou' },
    ];
    const result = ref('');
    const showPicker = ref(false);

    const onConfirm = ({ selectedOptions }) => {
      showPicker.value = false;
      fieldValue.value = selectedOptions[0].text;
    };

    const goodTypes = const_value.tabArray;

    return {
      result,
      columns,
      onConfirm,
      showPicker,
      goodTypes,
    };
  },
};

</script>
