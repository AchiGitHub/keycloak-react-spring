import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";

var instance: any = null;

export const setAuth = () => {

    instance = axios.create({
        baseURL: "",
        timeout: 120000,
        headers: {
            Authorization: "Bearer " + localStorage.jwt,
            "Content-Type": "application/json"
        }
    });

    instance.interceptors.response.use(
        function (response: any) {
            return response;
        },
        function (error: any) {
            if (error.response.data.path === "/v1/login") {
                return Promise.reject(error);
            } else if (
                error.response.status !== undefined &&
                (error.response.status === 401 || error.response.status === 403)
            ) {
                // localStorage.clear();
                // window.location = "/login";
            } else if (error.response.status === 500) {
                return Promise.reject("Something went wrong, please contact your service provider");
            } else {
                return Promise.reject(error);
            }
        }
    );
};

export const Get = (route: any, data: any) => {
    instance || setAuth();
    return instance.get(route, data);
};

export const Post = (route: any, data: any) => {
    instance || setAuth();
    return instance.post(route, JSON.stringify(data));
};

export const Put = (route: any, data: any) => {
    instance || setAuth();
    return instance.put(route, JSON.stringify(data));
};

export const Delete = (route: any, data: any) => {
    instance || setAuth();
    return instance.delete(route, {
        data: data
    });
};

export const Patch = (route: any, data: any) => {
    instance || setAuth();
    return instance.patch(route, JSON.stringify(data));
};