# RecommendationUpdate


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**trade_direction** | **string** |  | [optional] [default to undefined]
**current_price** | [**CurrentPrice**](CurrentPrice.md) |  | [optional] [default to undefined]
**target_price** | [**TargetPrice1**](TargetPrice1.md) |  | [optional] [default to undefined]
**time_horizon** | **string** |  | [optional] [default to undefined]
**expected_exit_date** | **string** |  | [optional] [default to undefined]
**analyst_score** | **number** |  | [optional] [default to undefined]
**notes** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { RecommendationUpdate } from './api';

const instance: RecommendationUpdate = {
    trade_direction,
    current_price,
    target_price,
    time_horizon,
    expected_exit_date,
    analyst_score,
    notes,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
