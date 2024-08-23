<script setup lang="ts">
import { RouterView } from 'vue-router';
import Headers from '../components/include/Headers.vue';
import Sidebar from '../components/include/Sidebar.vue';
import Footer from '../components/include/Footer.vue';
</script>

<template>
    <div>

    </div>
    <Headers />
    <Sidebar />
    <main id="main" class="main">
        <RouterView />
    </main>
    <Footer /> <!-- Ensure DashFooter is imported -->
    <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i
            class="bi bi-arrow-up-short"></i></a>
</template>

