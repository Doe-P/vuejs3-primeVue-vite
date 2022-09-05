<template>
  <div class="nav-bar-container">
    <div class="menus-sidebar-icon">
      <button @click="isToogle = true" class="icon-bar-btn">
        <i class="pi pi-bars"> </i>
      </button>
    </div>
    <div class="menus-side-bar">
      <Sidebar
        v-model:visible="isToogle"
        :baseZIndex="1000"
        :showCloseIcon="false"
        class="p-sidebar-sm"
      >
        <template v-slot:header>
          <div class="app-logo-section">
            <i class="pi pi-shopping-bag"></i>
            <span class="app-title">App name</span>
          </div>
        </template>
        <Divider align="center" type="dashed">
          <span style="font-size:12px; color: grey">Menus</span>
        </Divider>
        <div class="side-bar-menus">
            <div class="side-bar-main-menus">
              
            </div>
            
            <div class="side-bar-account">
                <Avatar label="P" shape="circle" size="large"/>
                <div class="user-name-status">
                    <span class="name">Jonh doe</span>
                    <span class="status">Super Admin</span>
                </div>
            </div>
        </div>
      </Sidebar>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const isToogle = ref(false);

    return { isToogle };
  },
};
</script>

<style></style>
