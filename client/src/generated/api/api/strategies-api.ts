/* tslint:disable */
/* eslint-disable */
/**
 * OrbiMed Analyst Trade Portal API
 * API for managing trade recommendations and tickets
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, type RequestArgs, BaseAPI, RequiredError, operationServerMap } from '../base';
// @ts-ignore
import type { HTTPValidationError } from '../models';
// @ts-ignore
import type { StrategyResponse } from '../models';
/**
 * StrategiesApi - axios parameter creator
 * @export
 */
export const StrategiesApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Get all active strategies
         * @summary Get Strategies
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getStrategiesApiV1StrategiesGet: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/v1/strategies/`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Get a specific strategy by ID
         * @summary Get Strategy
         * @param {number} strategyId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getStrategyApiV1StrategiesStrategyIdGet: async (strategyId: number, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'strategyId' is not null or undefined
            assertParamExists('getStrategyApiV1StrategiesStrategyIdGet', 'strategyId', strategyId)
            const localVarPath = `/api/v1/strategies/{strategy_id}`
                .replace(`{${"strategy_id"}}`, encodeURIComponent(String(strategyId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * StrategiesApi - functional programming interface
 * @export
 */
export const StrategiesApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = StrategiesApiAxiosParamCreator(configuration)
    return {
        /**
         * Get all active strategies
         * @summary Get Strategies
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getStrategiesApiV1StrategiesGet(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<StrategyResponse>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getStrategiesApiV1StrategiesGet(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['StrategiesApi.getStrategiesApiV1StrategiesGet']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * Get a specific strategy by ID
         * @summary Get Strategy
         * @param {number} strategyId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getStrategyApiV1StrategiesStrategyIdGet(strategyId: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<StrategyResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getStrategyApiV1StrategiesStrategyIdGet(strategyId, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['StrategiesApi.getStrategyApiV1StrategiesStrategyIdGet']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * StrategiesApi - factory interface
 * @export
 */
export const StrategiesApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = StrategiesApiFp(configuration)
    return {
        /**
         * Get all active strategies
         * @summary Get Strategies
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getStrategiesApiV1StrategiesGet(options?: RawAxiosRequestConfig): AxiosPromise<Array<StrategyResponse>> {
            return localVarFp.getStrategiesApiV1StrategiesGet(options).then((request) => request(axios, basePath));
        },
        /**
         * Get a specific strategy by ID
         * @summary Get Strategy
         * @param {number} strategyId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getStrategyApiV1StrategiesStrategyIdGet(strategyId: number, options?: RawAxiosRequestConfig): AxiosPromise<StrategyResponse> {
            return localVarFp.getStrategyApiV1StrategiesStrategyIdGet(strategyId, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * StrategiesApi - object-oriented interface
 * @export
 * @class StrategiesApi
 * @extends {BaseAPI}
 */
export class StrategiesApi extends BaseAPI {
    /**
     * Get all active strategies
     * @summary Get Strategies
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof StrategiesApi
     */
    public getStrategiesApiV1StrategiesGet(options?: RawAxiosRequestConfig) {
        return StrategiesApiFp(this.configuration).getStrategiesApiV1StrategiesGet(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Get a specific strategy by ID
     * @summary Get Strategy
     * @param {number} strategyId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof StrategiesApi
     */
    public getStrategyApiV1StrategiesStrategyIdGet(strategyId: number, options?: RawAxiosRequestConfig) {
        return StrategiesApiFp(this.configuration).getStrategyApiV1StrategiesStrategyIdGet(strategyId, options).then((request) => request(this.axios, this.basePath));
    }
}

