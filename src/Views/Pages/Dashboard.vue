<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CounterCard from '../../components/CounterCard.vue';
import { getRequest } from '../../Config/axios';
import DashboardCounterInterface from '../../Interfaces/DashboardInterface';
import { dashboardCounterReq } from '../../Config/apiRoutes';
const dashboardCounts = ref<any>({})

const fetchCount = async () => {
    const { data:response } = await getRequest<DashboardCounterInterface>(dashboardCounterReq);
    dashboardCounts.value = response;
}

onMounted(() => {
    fetchCount();
});

</script>
<template>
    <div class="pagetitle">
        <h1>Dashboard</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item active">Dashboard</li>
            </ol>
        </nav>
    </div><!-- End Page Title -->

    <section class="section dashboard">
        <div class="row">

            <!-- Left side columns -->
            <div class="col-lg-12">
                <div class="row">

                    <!-- Sales Card -->
                    <div class="col-xxl-4 col-md-6" v-if="dashboardCounts" v-for="(item, index) in dashboardCounts" :key="1 + index" >
                        <CounterCard :title="`${index}`" :count="item" />
                    </div><!-- End Sales Card -->

                </div>
            </div><!-- End Left side columns -->

        </div>
    </section>
</template>