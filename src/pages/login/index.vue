
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">

import { Toast } from '@/utils/uniapi/prompt';
import { login } from '@/services/api/auth';
import { omit } from 'lodash-es';


const pageQuery = ref<Record<string, any> | undefined>(undefined);
onLoad((query) => {
    pageQuery.value = query;
});

const router = useRouter();

const form = reactive({
    userName: 'admin',
    password: '123456',
});


const submit = (e: any) => {
    if (unref(pageQuery)?.redirect) {
        // 如果有存在redirect(重定向)参数，登录成功后直接跳转
        const params = omit(unref(pageQuery), ['redirect', 'tabBar']);
        if (unref(pageQuery)?.tabBar) {
            // 这里replace方法无法跳转tabbar页面故改为replaceAll
            router.replaceAll({ name: unref(pageQuery).redirect, params });
        } else {
            router.replace({ name: unref(pageQuery).redirect, params });
        }
    } else {
        // 不存在则返回上一页
        router.back();
    }
};
</script>

<template>
    <view class="container">
        <view class="title">登录</view>
        <view class="form-wrap">
            <form class="form" @submit="submit">
                <label class="form-item">
                    <view class="form-label">用户名:</view>
                    <view class="form-element"><input name="userName" :value="form.userName" /></view>
                </label>
                <label class="form-item">
                    <view class="form-label">密码:</view>
                    <view class="form-element"><input type="password" name="password" :value="form.password" /></view>
                </label>
                <button form-type="submit" class="submit-btn" hover-class="none">登录</button>
            </form>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  width: 80%;
  .title {
    padding: 320rpx 0 32rpx;
    text-align: center;
  }
  .form-wrap {
    padding: 20rpx 24rpx;
    box-shadow: 16rpx 16rpx 30rpx #e5e7eb;
    .form {
      .form-item {
        display: flex;
        height: 88rpx;
        border-bottom: 2rpx solid #dbeafe;
        align-items: center;
        .form-label {
          min-width: 96rpx;
        }
        .form-element {
          flex-grow: 1;
        }
      }
      .submit-btn {
        margin-top: 44rpx;
        border: 4rpx solid #bfdbfe;
        background-color: #60a5fa;
        border-radius: 8rpx;
        font-size: 28rpx;
        color: #fff;
        :hover {
          background-color: #3b82f6;
        }
      }
    }
  }
}
</style>
