import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { apiEndPoint } from "./apiRoutes";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import ApiResponse, {
  ErrorResponse,
  Response,
} from "../Interfaces/AxiosInterface";

// Define types for API responses

const instance: AxiosInstance = axios.create({
  baseURL: `${apiEndPoint}api/`, // Your API base URL
});

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

export async function postRequest<T = any>(
  url: string,
  data: any
): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await instance.post(
      url,
      data
    );
    const responseData = response.data;
    console.log("response ", responseData);

    if (responseData.status) {
      toast.success(responseData.message ?? "Record Created");
    } else if (responseData.status === "failed") {
      toast.error(responseData.message ?? "Something Wrong");
    }

    return responseData;
  } catch (err) {
    const errors = err as AxiosError<ApiResponse<any>>;
    console.log("catch errors", errors);
    if (errors.response && errors.response.status === 422) {
      return {
        status: "failed",
        message: "Something wrong!!",
        data:<T> errors.response.data,
      };
    }

    handleAxiosError(errors as AxiosError<ErrorResponse>);
    return { status: "failed", message: "Something wrong!!" };
  }
}

export async function putRequest<T = any>(
  url: string,
  data: any
): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await instance.put(
      url,
      data
    );
    const responseData = response.data;

    if (responseData.status) {
      toast.success(responseData.message ?? "Record Updated");
    }

    return responseData;
  } catch (err) {
    const errors = err as AxiosError<ApiResponse<any>>;
    console.log("catch errors", errors);
    if (errors.response && errors.response.status === 422) {
      return {
        status: "failed",
        message: "Something wrong!!",
        data:<T> errors.response.data,
      };
    }

    handleAxiosError(errors as AxiosError<ErrorResponse>);
    return { status: "failed", message: "Something wrong!!" };
  }
}

export async function getRequest<T = any>(
  url: string,
  params?: any
): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await instance.get(url, {
      params,
    });
    return response.data;
  } catch (error:any) {
    handleAxiosError(error as AxiosError<ErrorResponse>);
    return { status: "failed", message: "Something wrong!! tt" };
  }
}

export async function deleteRequest<T = any>(
  url: string,
  params?: any
): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await instance.delete(url, {
      params,
    });
    console.log("response", response);
    if(response.status){
      toast.success(response.data.message ?? "Record Deleted");
    }

    return response.data;
  } catch (error) {
    handleAxiosError(error as AxiosError<ErrorResponse>);
    return { status: "failed", message: "Something wrong!!" };
  }
}

// Handle Axios errors in a unified way
function handleAxiosError(error: AxiosError<ErrorResponse>) {
  if (error) {
    const { status, message } = error;
    console.log('error >>>>',error );
    

    if (error?.response?.status === 401) {
      toast.error(message);
      localStorage.removeItem("token");
      window.location.href = "/login";
    } else if (status === 500) {
      toast.error(message);
    } else if (error.code == "ERR_NETWORK") {
      toast.error(message);
    } else {
      toast.error("Something wrong!!");
    }
  } else {
    toast.error("Something wrong!!");
  }
}

export default instance;
