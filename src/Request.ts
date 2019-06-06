'use strict';

import * as _ from 'lodash';
import fetch from 'node-fetch';

const httpMethods = {
    POST: 'POST',
    GET: 'GET',
    DELETE: 'DELETE',
    PUT: 'PUT',
    PATCH: 'PATCH'
};

class Request {

    public static get(url: string, params: object = {}): Promise<object> {
        const defaultParams = {
            method: httpMethods.GET
        };
        const requestParams = _.merge(defaultParams, params);
        return fetch(url, requestParams)
            .then(Request.processStatus)
            .then(Request.toJson);
    }

    private static processStatus(response: any): Promise<object> {
        if (response.ok) {
            return Promise.resolve(response);
        } else {
            return Request.toJson(response)
                .then((resp: any) => {
                    return Promise.reject(resp);
                });
        }
    }

    private static toJson(response: any): Promise<object> {
        return response.text()
            .then((text: string) => {
                return text ? JSON.parse(text) : {};
            });
    }

}

export { Request };
