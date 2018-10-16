<template>
    <!--<div class="home">-->
    <div>
        <!--<img alt="Vue logo" src="../assets/logo.png">-->
        <!--<HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>-->
        <Picker/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import HelloWorld from '@/components/HelloWorld.vue';
    import Picker from '@/components/Picker/Picker.vue';

    @Component({
        components: {
            Picker,
            HelloWorld,
        },
    })
    export default class Home extends Vue {
    }
</script>
