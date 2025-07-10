# RecommendationResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** |  | [default to undefined]
**analyst_id** | **number** |  | [default to undefined]
**security_id** | **number** |  | [default to undefined]
**trade_direction** | **string** |  | [default to undefined]
**current_price** | **string** |  | [default to undefined]
**target_price** | **string** |  | [default to undefined]
**time_horizon** | **string** |  | [default to undefined]
**expected_exit_date** | **string** |  | [default to undefined]
**analyst_score** | **number** |  | [default to undefined]
**notes** | **string** |  | [default to undefined]
**status** | **string** |  | [default to undefined]
**is_draft** | **boolean** |  | [default to undefined]
**created_at** | **string** |  | [default to undefined]
**updated_at** | **string** |  | [default to undefined]
**security** | [**SecurityResponse**](SecurityResponse.md) |  | [optional] [default to undefined]
**strategies** | [**Array&lt;StrategyResponse&gt;**](StrategyResponse.md) |  | [optional] [default to undefined]

## Example

```typescript
import { RecommendationResponse } from './api';

const instance: RecommendationResponse = {
    id,
    analyst_id,
    security_id,
    trade_direction,
    current_price,
    target_price,
    time_horizon,
    expected_exit_date,
    analyst_score,
    notes,
    status,
    is_draft,
    created_at,
    updated_at,
    security,
    strategies,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
