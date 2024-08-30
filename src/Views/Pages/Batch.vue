<script setup lang="ts">
import { ref } from 'vue';
import BatchInterface from '../../Interfaces/BatchInterface';
import { deleteRequest, getRequest } from '../../Config/axios';
import { batchReq } from '../../Config/apiRoutes';
import { onMounted } from 'vue';
import BatchModal from '../Modals/BatchModal.vue';
import Spinner from '../../components/Spinner.vue';
const selectedBatch = ref<BatchInterface>();
const batches = ref<BatchInterface[] | undefined>([]);
const modelOpen = ref(false);
const editId = ref(0);
const currentPage = ref(1);
const isLoading = ref(true);

/* const columns = [
    { key: 'id', label: 'ID' },
    { key: 'year', label: 'Year' },
    { key: 'created_at', label: 'Created' },
    {
        key: 'action', label: 'Action', ediAction: (data: BatchInterface) => {
            selectedBatch.value = data;
            let str = `<button type="button" class="btn btn-primary me-2" data-bs-toggle="modal"
                            data-bs-target="#batchModel" >Edit</button>`;
            str += `<button type="button" class="btn btn-danger" @click="deleteAction(${data.id})">Delete</button>`;
            return str;
        }
    }
]; */
console.log('editId', editId.value);
const getBatches = async () => {
    const { data: response, meta: metaData } = await getRequest<BatchInterface[]>(batchReq);
    batches.value = response;
    if (metaData) {
        currentPage.value = metaData?.currentPage;
    }
}
const deleteAction = async (id: number) => {
    if (confirm('Do you want delete id ' + id)) {
        await deleteRequest(batchReq + '/' + id);
        await getBatches();

    }

}
onMounted(() => {
    getBatches();
});
</script>
<template>
    <div class="pagetitle">
        <h1>Batches</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/">Dashboard</router-link></li>
                <li class="breadcrumb-item">Batches</li>
            </ol>
        </nav>
    </div><!-- End Page Title -->

    <section class="section">
        <div class="row">
            <div class="col-lg-12">

                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Batches</h5>
                        <!-- Form Modal -->
                        <button type="button" class="btn btn-primary float-end" data-bs-toggle="modal"
                            data-bs-target="#batchModel" @click="modelOpen = true">
                            Add Batch
                        </button>
                        <BatchModal :batch="selectedBatch" :modelOpen="modelOpen" @formSubmitted="getBatches" />
                        <!-- Default Table -->
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Sr No</th>
                                    <th scope="col">year</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                <tr v-if="batches && batches.length>0" v-for="(batch, index) in batches" :key="1 + index">
                                    <td>{{ 1 + index }}</td>
                                    <td>{{ batch.year }}</td>
                                    <td>
                                        <button class="btn btn-primary" @click="selectedBatch = batch"
                                            data-bs-toggle="modal" data-bs-target="#batchModel">

                                            <i class="bi bi-pencil"></i>
                                        </button>
                                        <button class="btn btn-danger ms-2" @click="deleteAction(batch?.id)">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr v-else>
                                    <td v-if="isLoading" class="text-center" colspan="3">
                                        <Spinner/>
                                    </td>
                                    <td v-else colspan="3" class="text-center">No Records found</td>
                                </tr>
                            </tbody>
                        </table>
                        <!-- Bootstrap 5 Pagination -->
                        <nav aria-label="Page navigation example">
                            <ul class="pagination justify-content-end">
                                <li class="page-item disabled">
                                    <a class="page-link" href="#" tabindex="-1">Previous</a>
                                </li>
                                <li class="page-item"><a class="page-link" href="#">1</a></li>
                                <li class="page-item"><a class="page-link" href="#">2</a></li>
                                <li class="page-item"><a class="page-link" href="#">3</a></li>
                                <li class="page-item">
                                    <a class="page-link" href="#">Next</a>
                                </li>
                            </ul>
                        </nav>
                        <!-- <DataTable :data="batches || []" :columns="columns" /> -->
                        <!-- End Default Table Example -->
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>