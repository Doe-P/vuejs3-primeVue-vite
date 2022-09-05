<template>
 <div id="app">
   <div class="app-layout" v-if="$route.meta.layout =='admin'">
    <app-layout/>
   </div>
   <default-layout v-else/>
 </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">

</style>
