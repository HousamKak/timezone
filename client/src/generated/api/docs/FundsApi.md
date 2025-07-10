# FundsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getFundApiV1FundsFundIdGet**](#getfundapiv1fundsfundidget) | **GET** /api/v1/funds/{fund_id} | Get Fund|
|[**getFundByCodeApiV1FundsCodeCodeGet**](#getfundbycodeapiv1fundscodecodeget) | **GET** /api/v1/funds/code/{code} | Get Fund By Code|
|[**getFundsApiV1FundsGet**](#getfundsapiv1fundsget) | **GET** /api/v1/funds/ | Get Funds|

# **getFundApiV1FundsFundIdGet**
> FundResponse getFundApiV1FundsFundIdGet()

Get a specific fund by ID

### Example

```typescript
import {
    FundsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FundsApi(configuration);

let fundId: number; // (default to undefined)

const { status, data } = await apiInstance.getFundApiV1FundsFundIdGet(
    fundId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **fundId** | [**number**] |  | defaults to undefined|


### Return type

**FundResponse**

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

# **getFundByCodeApiV1FundsCodeCodeGet**
> FundResponse getFundByCodeApiV1FundsCodeCodeGet()

Get a fund by its code (e.g., \'OPM\', \'GEN\')

### Example

```typescript
import {
    FundsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FundsApi(configuration);

let code: string; // (default to undefined)

const { status, data } = await apiInstance.getFundByCodeApiV1FundsCodeCodeGet(
    code
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **code** | [**string**] |  | defaults to undefined|


### Return type

**FundResponse**

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

# **getFundsApiV1FundsGet**
> Array<FundResponse> getFundsApiV1FundsGet()

Get all active funds

### Example

```typescript
import {
    FundsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FundsApi(configuration);

const { status, data } = await apiInstance.getFundsApiV1FundsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<FundResponse>**

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

