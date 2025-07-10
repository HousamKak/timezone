# RecommendationCreate


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**security_id** | **number** |  | [default to undefined]
**trade_direction** | **string** |  | [default to undefined]
**current_price** | [**CurrentPrice**](CurrentPrice.md) |  | [optional] [default to undefined]
**target_price** | [**TargetPrice**](TargetPrice.md) |  | [default to undefined]
**time_horizon** | **string** |  | [default to undefined]
**expected_exit_date** | **string** |  | [optional] [default to undefined]
**analyst_score** | **number** |  | [default to undefined]
**notes** | **string** |  | [optional] [default to undefined]
**strategy_ids** | **Array&lt;number&gt;** |  | [optional] [default to undefined]
**fund_ids** | **Array&lt;number&gt;** |  | [optional] [default to undefined]

## Example

```typescript
import { RecommendationCreate } from './api';

const instance: RecommendationCreate = {
    security_id,
    trade_direction,
    current_price,
    target_price,
    time_horizon,
    expected_exit_date,
    analyst_score,
    notes,
    strategy_ids,
    fund_ids,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
