<script setup lang="ts">
import { ref } from 'vue';
import CategoryInterface from '../../Interfaces/CategoryInterface';
// import CategoryModal from '../../Modals/CategoryModal.vue';

const categories = ref(<CategoryInterface[]>{});
</script>
<template>
    <div class="pagetitle">
        <h1>General Tables</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                <li class="breadcrumb-item">Tables</li>
                <li class="breadcrumb-item active">General</li>
            </ol>
        </nav>
    </div><!-- End Page Title -->

    <section class="section">
        <div class="row">
            <div class="col-lg-12">

                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Default Table</h5>
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#categoryModel">
                                Large Modal
                            </button>
                            <!-- <CategoryModal /> -->
                        </div>

                        <!-- Default Table -->
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="categories.length > 1" v-for="(category, index) in categories"
                                    :key="category.id">
                                    <td scope="row">{{ index + 1 }}</td>
                                    <td>{{ category.title }}</td>
                                    <td>{{ category.description }}</td>
                                    <td>2016-05-25</td>
                                </tr>
                                <tr v-else>
                                    <td colspan="4" class="text-center">No Records</td>
                                </tr>
                            </tbody>
                        </table>
                        <!-- End Default Table Example -->
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>