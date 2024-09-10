<script setup lang="ts">

const props = defineProps({
    title: {
        type:String,
        default:''
    },
    count: {
        type:Number,
        default:0
    },
});
</script>
<template>
    <div class="card info-card sales-card">

        <div class="card-body">
            <h5 class="card-title text-capitalize">{{ props.title }}</h5>

            <div class="d-flex align-items-center">
                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i class="bi bi-bar-chart"></i>
                </div>
                <div class="ps-3">
                    <h6>{{ $props.count }}</h6>

                </div>
            </div>
        </div>

    </div>
</template>