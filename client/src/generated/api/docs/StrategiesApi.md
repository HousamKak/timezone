# StrategiesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getStrategiesApiV1StrategiesGet**](#getstrategiesapiv1strategiesget) | **GET** /api/v1/strategies/ | Get Strategies|
|[**getStrategyApiV1StrategiesStrategyIdGet**](#getstrategyapiv1strategiesstrategyidget) | **GET** /api/v1/strategies/{strategy_id} | Get Strategy|

# **getStrategiesApiV1StrategiesGet**
> Array<StrategyResponse> getStrategiesApiV1StrategiesGet()

Get all active strategies

### Example

```typescript
import {
    StrategiesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StrategiesApi(configuration);

const { status, data } = await apiInstance.getStrategiesApiV1StrategiesGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<StrategyResponse>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getStrategyApiV1StrategiesStrategyIdGet**
> StrategyResponse getStrategyApiV1StrategiesStrategyIdGet()

Get a specific strategy by ID

### Example

```typescript
import {
    StrategiesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StrategiesApi(configuration);

let strategyId: number; // (default to undefined)

const { status, data } = await apiInstance.getStrategyApiV1StrategiesStrategyIdGet(
    strategyId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **strategyId** | [**number**] |  | defaults to undefined|


### Return type

**StrategyResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

