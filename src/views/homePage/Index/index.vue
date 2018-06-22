<template>
    <div id = "app">
        <Headers />
            <router-view />
        <Footers />
    </div>
</template>

<script>
import Footers from "../../../components/footer.vue";
import Headers from "../../../components/header.vue";
export default {
    name: 'index',
    components: {
        Footers,
        Headers
    }
}
</script>

<style scoped>
#app {
 overflow: hidden;
 display: flex;
 flex-direction: column;
}
</style>
