<script setup lang="ts">
</script>
<template>
    <aside id="sidebar" class="sidebar">

        <ul class="sidebar-nav" id="sidebar-nav">

            <li class="nav-item">
                <router-link to="/" class="nav-link collapsed">
                    <i class="bi bi-grid"></i>
                    <span>Dashboard</span>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/batch" class="nav-link collapsed">
                    <i class="bi bi-grid"></i>
                    <span>Batch</span>
                </router-link>
            </li>

            
        </ul>

    </aside>
</template>