# MMM-neoomAPI
This is a module for the MagicMirror community.

## Functionality
With this module you can access your neoom photovoltaic data. 
You can get following information:
- Current Production
- Current Consumption
- Current Consumption From Grid
- Current Consumption From Storages
- Current State Of Charge (Storages)
- ...

## Installation
1. Navigate into your MagicMirror modules folder
2. Execute: `git clone https://github.com/MartinLoidolt/MMM-neoomAPI.git`
3. 
## Configuration
Get your API Key and Site-ID from the neoom website:

![API Key](https://github.com/MartinLoidolt/MMM-neoomAPI/resources/ApiKey.jpg?raw=true)

### Parameters
| Option        | Configuration                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
|---------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| apiKey        | Your API-Key (don't show it to anybody) <br/><br/> Type: `String`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| siteId        | Your Site-Id <br/><br/> Type: `String`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| fetchInterval | How often you want to update the statistics (in ms) <br/><br/> Type: `Number` <br/> Default: `10000`                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| shownStats    | Array of the statistics you want to show. <br/> For more information go to: https://docs.ntuity.io/reference/get_sites-id-energy-flow-latest <br/><br/> You can add the following ones: <ul><li>power_consumption</li><li>power_consumption_calc</li><li>power_production</li><li>power_storage</li><li>power_grid</li><li>power_charging_stations</li><li>power_heating</li><li>power_appliances</li><li>state_of_charge</li><li>self_sufficiency</li></ul> <br/><br/> Type: `Array of Strings` <br/> Default: `["power_production", "power_consumption_calc"]` |

## Example
![Example](https://github.com/MartinLoidolt/MMM-neoomAPI/resources/Example.jpg?raw=true)