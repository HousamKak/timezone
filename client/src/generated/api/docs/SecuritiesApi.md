# SecuritiesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getSecuritiesApiV1SecuritiesGet**](#getsecuritiesapiv1securitiesget) | **GET** /api/v1/securities/ | Get Securities|
|[**getSecurityApiV1SecuritiesSecurityIdGet**](#getsecurityapiv1securitiessecurityidget) | **GET** /api/v1/securities/{security_id} | Get Security|
|[**searchSecuritiesApiV1SecuritiesSearchGet**](#searchsecuritiesapiv1securitiessearchget) | **GET** /api/v1/securities/search | Search Securities|

# **getSecuritiesApiV1SecuritiesGet**
> Array<SecurityResponse> getSecuritiesApiV1SecuritiesGet()

Get all active securities

### Example

```typescript
import {
    SecuritiesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SecuritiesApi(configuration);

const { status, data } = await apiInstance.getSecuritiesApiV1SecuritiesGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<SecurityResponse>**

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

# **getSecurityApiV1SecuritiesSecurityIdGet**
> SecurityResponse getSecurityApiV1SecuritiesSecurityIdGet()

Get a specific security by ID

### Example

```typescript
import {
    SecuritiesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SecuritiesApi(configuration);

let securityId: number; // (default to undefined)

const { status, data } = await apiInstance.getSecurityApiV1SecuritiesSecurityIdGet(
    securityId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **securityId** | [**number**] |  | defaults to undefined|


### Return type

**SecurityResponse**

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

# **searchSecuritiesApiV1SecuritiesSearchGet**
> Array<SecurityResponse> searchSecuritiesApiV1SecuritiesSearchGet()

Search securities by ticker or name

### Example

```typescript
import {
    SecuritiesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SecuritiesApi(configuration);

let q: string; //Search query (ticker or name) (default to undefined)
let limit: number; //Maximum number of results (optional) (default to 10)

const { status, data } = await apiInstance.searchSecuritiesApiV1SecuritiesSearchGet(
    q,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **q** | [**string**] | Search query (ticker or name) | defaults to undefined|
| **limit** | [**number**] | Maximum number of results | (optional) defaults to 10|


### Return type

**Array<SecurityResponse>**

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

