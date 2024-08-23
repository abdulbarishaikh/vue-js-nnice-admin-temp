<script setup lang="ts">
</script>
<template>
    <aside id="sidebar" class="sidebar">

        <ul class="sidebar-nav" id="sidebar-nav">

            <li class="nav-item">
                <router-link to="/" class="nav-link ">
                    <i class="bi bi-grid"></i>
                    <span>Dashboard</span>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/blog" class="nav-link ">
                    <i class="bi bi-grid"></i>
                    <span>Blog</span>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/category" class="nav-link ">
                    <i class="bi bi-grid"></i>
                    <span>Category</span>
                </router-link>
            </li>

            
        </ul>

    </aside>
</template>