import Button from "primevue/button";
import Sidebar from 'primevue/sidebar';
import Divider from 'primevue/divider';
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';

export default function createComponent(Vue){
    Vue.component('Button', Button);
    Vue.component('Sidebar', Sidebar);
    Vue.component('Divider', Divider);
    Vue.component('Avatar', Avatar);
    Vue.component('AvatarGroup', AvatarGroup);
}