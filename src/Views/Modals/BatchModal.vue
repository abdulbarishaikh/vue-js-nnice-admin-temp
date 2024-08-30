<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { BatchValidationError } from '../../Interfaces/ValidationInterface';
import { postRequest, putRequest } from '../../Config/axios';
import { batchReq } from '../../Config/apiRoutes';
import { BatchFormInterface } from '../../Interfaces/BatchInterface';
import { closeModel } from '../../Helper';

const errors = ref<BatchValidationError>({});
const isSubmitting = ref(false);
const modalTitle = ref('Add Batch');
const form = reactive<BatchFormInterface>({});
const props = defineProps({
    modelOpen: Boolean,
    batch: {
        type: Object,
        default: () => ({})
    },
});
const emit = defineEmits();

watch(props, () => {
    form.year = props?.batch?.year;
    form.id = props?.batch?.id;
    if (typeof props.batch?.id != 'undefined') {
        modalTitle.value = 'Edit Batch';
    }

});
if (props?.modelOpen) {
    console.log("prop ", props.batch);
}

const storeBatch = async () => {
    let { data: res, status: status } = await postRequest(batchReq, form);
    const validationErrors = res?.errors;


    if (validationErrors) {

        errors.value = validationErrors;
    } else {
        if (status) {

        }
    }
}
const updateBatch = async () => {
    let { data: res, status: status } = await putRequest(batchReq + '/' + form.id, form);;
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
        await storeBatch();
        form.id = 0;
        form.year = '';
        closeModel('batchModel');
        modalTitle.value = 'Add Batch';
        emit('formSubmitted');
    } else {
        await updateBatch();
        form.id = 0;
        form.year = '';
        closeModel('batchModel');
        modalTitle.value = 'Add Batch';
        emit('formSubmitted');
    }

    setTimeout(() => {
        isSubmitting.value = false;
    }, 300);
}
</script>
<template>
    <div class="modal fade" id="batchModel" tabindex="-1">
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
                                    <label for="batchName">Batch Year</label>
                                    <input type="text" class="form-control" id="batchName" v-model="form.year">
                                    <span class="text-danger" v-if="errors?.year">{{ errors?.year[0]
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