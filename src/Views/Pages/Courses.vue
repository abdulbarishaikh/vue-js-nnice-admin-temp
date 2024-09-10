<script setup lang="ts">
import { ref } from 'vue';
import CourseInterface from '../../Interfaces/CourseInterface';
import { deleteRequest, getRequest } from '../../Config/axios';
import { courseReq } from '../../Config/apiRoutes';
import { onMounted } from 'vue';
import CourseModal from '../Modals/CourseModal.vue';
import Spinner from '../../components/Spinner.vue';
const selectedCourse = ref<CourseInterface>();
const courses = ref<CourseInterface[] | undefined>([]);
const modelOpen = ref(false);
const editId = ref(0);
const currentPage = ref(1);
const isLoading = ref(true);

const getCourses = async () => {
    const { data: response, meta: metaData } = await getRequest<CourseInterface[]>(courseReq);
    courses.value = response;
    if (metaData) {
        currentPage.value = metaData?.currentPage;
    }
}
const deleteAction = async (id: number) => {
    if (confirm('Do you want delete id ' + id)) {
        await deleteRequest(courseReq + '/' + id);
        await getCourses();

    }

}
const setProperties = () =>{
    modelOpen.value = true;
    selectedCourse.value = <CourseInterface>{};
}
onMounted(() => {
    getCourses();
});
</script>
<template>
    <div class="pagetitle">
        <h1>Coursees</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/">Dashboard</router-link></li>
                <li class="breadcrumb-item">Coursees</li>
            </ol>
        </nav>
    </div><!-- End Page Title -->

    <section class="section">
        <div class="row">
            <div class="col-lg-12">

                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Coursees</h5>
                        <!-- Form Modal -->
                        <button type="button" class="btn btn-primary float-end" data-bs-toggle="modal"
                            data-bs-target="#courseModel" @click="setProperties()">
                            Add Course
                        </button>
                        <CourseModal :course="selectedCourse" :modelOpen="modelOpen" @formSubmitted="getCourses" />
                        <!-- Default Table -->
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Sr No</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                <tr v-if="courses && courses.length>0" v-for="(course, index) in courses" :key="1 + index">
                                    <td>{{ 1 + index }}</td>
                                    <td>{{ course.title }}</td>
                                    <td>
                                        <button class="btn btn-primary" @click="selectedCourse = course"
                                            data-bs-toggle="modal" data-bs-target="#courseModel">

                                            <i class="bi bi-pencil"></i>
                                        </button>
                                        <button class="btn btn-danger ms-2" @click="deleteAction(course?.id)">
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
                        <!-- <DataTable :data="courses || []" :columns="columns" /> -->
                        <!-- End Default Table Example -->
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>