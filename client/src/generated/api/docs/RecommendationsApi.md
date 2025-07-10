# RecommendationsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createRecommendationApiV1RecommendationsPost**](#createrecommendationapiv1recommendationspost) | **POST** /api/v1/recommendations/ | Create Recommendation|
|[**deleteRecommendationApiV1RecommendationsRecommendationIdDelete**](#deleterecommendationapiv1recommendationsrecommendationiddelete) | **DELETE** /api/v1/recommendations/{recommendation_id} | Delete Recommendation|
|[**getDraftRecommendationsApiV1RecommendationsDraftsGet**](#getdraftrecommendationsapiv1recommendationsdraftsget) | **GET** /api/v1/recommendations/drafts | Get Draft Recommendations|
|[**getRecommendationApiV1RecommendationsRecommendationIdGet**](#getrecommendationapiv1recommendationsrecommendationidget) | **GET** /api/v1/recommendations/{recommendation_id} | Get Recommendation|
|[**getRecommendationsApiV1RecommendationsGet**](#getrecommendationsapiv1recommendationsget) | **GET** /api/v1/recommendations/ | Get Recommendations|
|[**updateRecommendationApiV1RecommendationsRecommendationIdPut**](#updaterecommendationapiv1recommendationsrecommendationidput) | **PUT** /api/v1/recommendations/{recommendation_id} | Update Recommendation|

# **createRecommendationApiV1RecommendationsPost**
> RecommendationResponse createRecommendationApiV1RecommendationsPost(recommendationCreate)

Create a new trade recommendation

### Example

```typescript
import {
    RecommendationsApi,
    Configuration,
    RecommendationCreate
} from './api';

const configuration = new Configuration();
const apiInstance = new RecommendationsApi(configuration);

let recommendationCreate: RecommendationCreate; //

const { status, data } = await apiInstance.createRecommendationApiV1RecommendationsPost(
    recommendationCreate
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **recommendationCreate** | **RecommendationCreate**|  | |


### Return type

**RecommendationResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteRecommendationApiV1RecommendationsRecommendationIdDelete**
> any deleteRecommendationApiV1RecommendationsRecommendationIdDelete()

Delete a recommendation (only drafts can be deleted)

### Example

```typescript
import {
    RecommendationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RecommendationsApi(configuration);

let recommendationId: number; // (default to undefined)

const { status, data } = await apiInstance.deleteRecommendationApiV1RecommendationsRecommendationIdDelete(
    recommendationId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **recommendationId** | [**number**] |  | defaults to undefined|


### Return type

**any**

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

# **getDraftRecommendationsApiV1RecommendationsDraftsGet**
> Array<RecommendationResponse> getDraftRecommendationsApiV1RecommendationsDraftsGet()

Get all draft recommendations

### Example

```typescript
import {
    RecommendationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RecommendationsApi(configuration);

let analystId: number; //Filter by analyst ID (optional) (default to undefined)

const { status, data } = await apiInstance.getDraftRecommendationsApiV1RecommendationsDraftsGet(
    analystId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **analystId** | [**number**] | Filter by analyst ID | (optional) defaults to undefined|


### Return type

**Array<RecommendationResponse>**

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

# **getRecommendationApiV1RecommendationsRecommendationIdGet**
> RecommendationResponse getRecommendationApiV1RecommendationsRecommendationIdGet()

Get a specific recommendation

### Example

```typescript
import {
    RecommendationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RecommendationsApi(configuration);

let recommendationId: number; // (default to undefined)

const { status, data } = await apiInstance.getRecommendationApiV1RecommendationsRecommendationIdGet(
    recommendationId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **recommendationId** | [**number**] |  | defaults to undefined|


### Return type

**RecommendationResponse**

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

# **getRecommendationsApiV1RecommendationsGet**
> Array<RecommendationResponse> getRecommendationsApiV1RecommendationsGet()

Get all recommendations with optional filters

### Example

```typescript
import {
    RecommendationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RecommendationsApi(configuration);

let analystId: number; //Filter by analyst ID (optional) (default to undefined)
let securityId: number; //Filter by security ID (optional) (default to undefined)

const { status, data } = await apiInstance.getRecommendationsApiV1RecommendationsGet(
    analystId,
    securityId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **analystId** | [**number**] | Filter by analyst ID | (optional) defaults to undefined|
| **securityId** | [**number**] | Filter by security ID | (optional) defaults to undefined|


### Return type

**Array<RecommendationResponse>**

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

# **updateRecommendationApiV1RecommendationsRecommendationIdPut**
> RecommendationResponse updateRecommendationApiV1RecommendationsRecommendationIdPut(recommendationUpdate)

Update a recommendation (only drafts can be updated)

### Example

```typescript
import {
    RecommendationsApi,
    Configuration,
    RecommendationUpdate
} from './api';

const configuration = new Configuration();
const apiInstance = new RecommendationsApi(configuration);

let recommendationId: number; // (default to undefined)
let recommendationUpdate: RecommendationUpdate; //

const { status, data } = await apiInstance.updateRecommendationApiV1RecommendationsRecommendationIdPut(
    recommendationId,
    recommendationUpdate
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **recommendationUpdate** | **RecommendationUpdate**|  | |
| **recommendationId** | [**number**] |  | defaults to undefined|


### Return type

**RecommendationResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

