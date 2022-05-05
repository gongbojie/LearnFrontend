<template>
  <div class="about">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="goodName"
          name="产品名称"
          label="产品名称"
          placeholder="产品名称"
          :rules="[{ required: true, message: '请填写产品名称' }]"
        />
        <van-field
          v-model="goodsIcon"
          name="图标"
          label="图标"
          placeholder="请选择图标"
          :rules="[{ required: false, message: '请选择图标' }]"
        />

        <van-field
          v-model="typeValue"
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
            @confirm="onTypeConfirm"
          />
        </van-popup>

        <!-- <van-field
          v-model="value"
          is-link
          readonly
          label="单位"
          placeholder="选择单位"
          @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" round position="bottom">
          <van-picker
            :columns="goodTypes"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
        </van-popup> -->

        <van-field name="stepper" label="当前数量">
          <template #input>
            <van-stepper v-model="currentValue" />
          </template>
        </van-field>

        <van-field name="stepper" label="提醒数量">
          <template #input>
            <van-stepper v-model="notificateValue" />
          </template>
        </van-field>

        <van-field name="radio" label="是否发送补货提醒">
          <template #input>
            <van-radio-group v-model="notifiedChecked" direction="horizontal">
              <van-radio name="1">是</van-radio>
              <van-radio name="2">否</van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <van-field name="radio" label="是否发送临期提醒">
          <template #input>
            <van-radio-group v-model="overtimedChecked" direction="horizontal">
              <van-radio name="1">是</van-radio>
              <van-radio name="2">否</van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <van-field name="stepper" label="预估每袋持续几天">
          <template #input>
            <van-stepper v-model="currentValue" />
          </template>
        </van-field>

        <van-field
          v-model="message"
          rows="1"
          autosize
          label="备注"
          type="textarea"
          placeholder="请输入备注"
        />
        
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
    // 产品名称
    const goodName = ref('');
    // 图标
    const goodsIcon = ref('');
    // 分类
    const goodTypes = ref(const_value.tabArray);

    const result = ref('');
    const showPicker = ref(false);

    const typeValue = ref('')

    const onTypeConfirm = (selectedOption) => {
      showPicker.value = false;
      typeValue.value = selectedOption.text;
    };

    

    // 当前数量
    const currentValue = ref(2);
    // 提醒数量
    const notificateValue = ref(3);
    // 是否补货提醒
    const notifiedChecked = ref('1');
    // 是否发送临期提醒
    const overtimedChecked = ref('1');

    // 提交方法
    const onSubmit = (values) => {
      console.log('submit', values);
    };

    return {
      goodName,
      goodsIcon,
      goodTypes,
      result,
      typeValue,
      
      onTypeConfirm,
      showPicker,
      
      currentValue,
      notificateValue,
      notifiedChecked,
      overtimedChecked,
      onSubmit,
    };
  },
};

</script>
