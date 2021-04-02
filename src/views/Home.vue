<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/background-img.png">
        <HelloWorld/>
    </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/Menu.vue'

    export default {
        name: 'Menu',
        components: {
            HelloWorld
        }
    }
</script>
