<script setup lang="ts">
import { reactive, ref } from 'vue';
import { postRequest } from '../Config/axios';
import { loginReq } from '../Config/apiRoutes';
import LoginValidationError from '../Interfaces/ValidationInterface';
import LoginFields from '../Interfaces/FormFields';
import { useRouter } from 'vue-router';
import storeLocalStorage from '../Helper';
const errors = ref<LoginValidationError>({});
const isSubmitting = ref(false);
// const success = ref('')
const form = reactive<LoginFields>({});
const router = useRouter(); // Initialize the router
const handleSubmit = async ()  =>{
    isSubmitting.value = true;
    let {data:res,status:status,token:token} = await postRequest(loginReq, form);
    const  validationErrors = res?.errors;
    

    if (validationErrors) {
        
        errors.value = validationErrors;
    }else{
        if(status =="success"){
            await storeLocalStorage('token',token);
            router.push('/');
        }
    }
    setTimeout(() => {
        isSubmitting.value = false;
    }, 300);
}
</script>
<template>
    <main>
        <div class="container">

            <section
                class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                            <div class="d-flex justify-content-center py-4">
                                <a href="index.html" class="logo d-flex align-items-center w-auto">
                                    <img src="./assets/img/logo.png" alt="">
                                    <span class="d-none d-lg-block">NiceAdmin</span>
                                </a>
                            </div><!-- End Logo -->

                            <div class="card mb-3">

                                <div class="card-body">

                                    <div class="pt-4 pb-2">
                                        <h5 class="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                                        <p class="text-center small">Enter your email & password to login</p>
                                    </div>

                                    <form class="row g-3 needs-validation" novalidate
                                        v-on:submit.prevent="handleSubmit()">

                                        <div class="col-12">
                                            <label for="yourUsername" class="form-label">Username</label>
                                            <div class="input-group has-validation">
                                                <span class="input-group-text" id="inputGroupPrepend">@</span>
                                                <input type="text" name="email" class="form-control" id="yourUsername"
                                                    required v-model="form.email">
                                                <div class="invalid-feedback">Please enter your email.</div>
                                            </div>
                                            <span class="text-danger" v-if="errors?.email">{{ errors?.email[0]
                                                }}</span>
                                        </div>

                                        <div class="col-12">
                                            <label for="yourPassword" class="form-label">Password</label>
                                            <input type="password" name="password" class="form-control"
                                                id="yourPassword" required v-model="form.password">
                                            <span class="text-danger" v-if="errors?.password">{{ errors?.password[0]
                                                }}</span>
                                        </div>

                                        <!-- <div class="col-12">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" name="remember"
                                                    value="true" id="rememberMe">
                                                <label class="form-check-label" for="rememberMe">Remember me</label>
                                            </div>
                                        </div> -->
                                        <div class="col-12">
                                            <button class="btn btn-primary w-100" type="submit" :disabled="isSubmitting">{{ isSubmitting ? 'Submitting...' : 'Submit' }}</button>
                                        </div>
                                        <div class="col-12">
                                            <p class="small mb-0">Don't have account? <a
                                                    href="pages-register.html">Create an account</a></p>
                                        </div>
                                    </form>

                                </div>
                            </div>

                            <div class="credits">
                                <!-- All the links in the footer should remain intact. -->
                                <!-- You can delete the links only if you purchased the pro version. -->
                                <!-- Licensing information: https://bootstrapmade.com/license/ -->
                                <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/ -->
                                Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                            </div>

                        </div>
                    </div>
                </div>

            </section>

        </div>
    </main>
</template>