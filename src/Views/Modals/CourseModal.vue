<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { postRequest, putRequest } from '../../Config/axios';
import { courseReq } from '../../Config/apiRoutes';
import { closeModel } from '../../Helper';
import { CourseFormInterface, CourseValidationError } from '../../Interfaces/CourseInterface';

const errors = ref<CourseValidationError>({});
const isSubmitting = ref(false);
const modalTitle = ref('Add Course');
const form = reactive<CourseFormInterface>({});
const props = defineProps({
    modelOpen: Boolean,
    course: {
        type: Object,
        default: () => ({})
    },
});
const emit = defineEmits();

watch(props, () => {
    form.title = props?.course?.title;
    form.id = props?.course?.id;
    if (typeof props.course?.id != 'undefined') {
        modalTitle.value = 'Edit Course';
    }

});
if (props?.modelOpen) {
    console.log("prop ", props.course);
}

const storeCourse = async () => {
    let { data: res, status: status } = await postRequest(courseReq, form);
    const validationErrors = res?.errors;


    if (validationErrors) {

        errors.value = validationErrors;
    } else {
        if (status) {

        }
    }
}
const updateCourse = async () => {
    let { data: res, status: status } = await putRequest(courseReq + '/' + form.id, form);;
    const validationErrors = res?.errors;


    if (validationErrors) {

        errors.value = validationErrors;
    } else {
        if (status) {

        }
    }
}
const handleSubmit = async () => {
    isSubmitting.value = true;

    if (typeof form.id != "number") {
        await storeCourse();
        form.id = 0;
        form.title = '';
        closeModel('courseModel');
        modalTitle.value = 'Add Course';
        emit('formSubmitted');
    } else {
        await updateCourse();
        form.id = 0;
        form.title = '';
        closeModel('courseModel');
        modalTitle.value = 'Add Course';
        emit('formSubmitted');
    }

    setTimeout(() => {
        isSubmitting.value = false;
    }, 300);
}
</script>
<template>
    <div class="modal fade" id="courseModel" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ modalTitle }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form v-on:submit.prevent="handleSubmit()" method="post">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-6">
                                <div class="form-group">
                                    <label for="courseName">Course Title</label>
                                    <input type="text" class="form-control" id="courseName" v-model="form.title">
                                    <span class="text-danger" v-if="errors?.title">{{ errors?.title[0]
                                        }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                            id="closeModal">Close</button>
                        <button type="submit" class="btn btn-primary" :disabled="isSubmitting">{{ isSubmitting ?
                            'Submitting...' : 'Submit' }}</button>
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>