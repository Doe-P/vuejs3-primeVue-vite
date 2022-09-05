import {axios, config, apiUrl} from "../store/api/axios";
import createQueryBuilder from "./query-builder";
import createHandler from "./error-handler";
import helpers from "./helpers";

export default function create() {
    return {
        namespaced: true,
        state: {
            listing: {},
        },
        mutations: {},
        actions: {
            listing({rootGetters, dispatch, commit}, payload) {
                const body = {
                    ...payload.options_request,
                };
                const query = createQueryBuilder(body);
                return new Promise((resolve, rejected) => {
                    if (payload.method === 'delete') {
                        axios.delete(`${apiUrl}/${payload.actionUri}?${query}`, config.addTokenHeader(rootGetters['auth/token']))
                            .then((res) => {
                                resolve(res.data)
                            })
                            .catch((err) => {
                                rejected(createHandler(err.response));
                            });
                    } else {
                        axios.get(`${apiUrl}/${payload.actionUri}?${query}`, config.addTokenHeader(rootGetters['auth/token']))
                            .then((res) => {
                                resolve(res.data)
                            })
                            .catch((err) => {
                                rejected(createHandler(err.response));
                            });
                    }
                });
            },
            single({rootGetters, dispatch, commit}, payload) {
                const body = {
                    type: payload.type,
                    subtype: payload.subtype || '',
                };
                const query = createQueryBuilder(body)
                return new Promise((resolve, reject) => {
                    axios.get(`${apiUrl}/${payload.actionUri}?${query}`, config.addTokenHeader(rootGetters['auth/token']))
                        .then((res) => {
                            resolve(res.data)
                        })
                })
            },
            manage({rootGetters, dispatch}, payload) {
                return new Promise((resolve, rejected) => {
                    let apiCall = axios.post;
                    let apiAction;
                    if (payload.method) {
                        apiCall = axios[payload.method];
                    }
                    if (payload.method === 'delete') {
                        apiAction = apiCall(`${apiUrl}/${payload.actionUri}`, config.addTokenHeader(rootGetters['auth/token']));
                    } else {
                        let data;
                        if (payload.formData) {
                            const formData = new FormData();
                            helpers.addDataForm(formData, payload);
                            data = formData;
                        } else {
                            data = payload.data
                        }
                        apiAction = apiCall(`${apiUrl}/${payload.actionUri}`, data,
                            config.addTokenHeader(rootGetters['auth/token'], payload.formData));
                    }
                    apiAction.then((res) => {
                        resolve(res.data);
                    })
                        .catch((err) => {
                            if (err) {
                                dispatch('auth/unauthorized', err.response, {root: true});
                            }
                            rejected(createHandler(err.response));
                        });
                });
            },
        }
    }
}