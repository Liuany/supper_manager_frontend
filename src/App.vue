<template>
    <div>
        <div class="mb-1">
            <Header></Header>
        </div>

        <div id="app" class="container context">
            <router-view></router-view>
        </div>

        <!-- <div>
            <Footer></Footer>
        </div> -->
    </div>
</template>

<script>
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

export default {
  name: "App",
  components: { Header, Footer },
};
</script>

<style scoped>
    .container {
        min-height: 500px;
    }
</style>

