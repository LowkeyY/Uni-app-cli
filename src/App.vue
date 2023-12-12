<!--
 * @Author: Lowkey
 * @Date: 2023-12-11 13:35:43
 * @LastEditors: Lowkey
 * @LastEditTime: 2023-12-12 14:47:28
 * @FilePath: \BK-Protal-App-VUE\src\App.vue
 * @Description: 
-->
<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';

onLaunch(() => {
    console.log('App Launch');
});
onShow(() => {
  
    console.log('App Show');
});
onHide(() => {
    console.log('App Hide');
});
</script>
<style lang="scss">
@import '@/assets/main.scss';
</style>
