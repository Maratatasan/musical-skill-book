import { AdData } from ".././ads/Ad";
import { FilterModel } from "./FilterBar";


export function extractUniqueDataForFilters(
    ads: AdData[],
    filterKeys: string[]
  ): FilterModel {
    const setsForFilters: any = {};
    let ad: any;
    let key: string;
  
    for (ad of ads) {
      for (key of filterKeys) {
        if (ad[key]) {
          if (!setsForFilters.hasOwnProperty(key)) {
            setsForFilters[key] = new Set();
          }
          setsForFilters[key].add(ad[key]);
        }
      }
    }
  
    const uniqueDataForFilters: FilterModel = {};
  
    for (key of filterKeys) {
      uniqueDataForFilters[key] = [...setsForFilters[key]];
    }
  
    return uniqueDataForFilters;
  }
  
  export function extractFilterKeys(
    ads: AdData[],
    removeFromFilterList: string[]
  ) {
    const filterKeys = Object.keys(ads[0]);
    for (let removeItem of removeFromFilterList) {
      if (filterKeys.indexOf(removeItem) > -1) {
        filterKeys.splice(filterKeys.indexOf(removeItem), 1);
      }
    }
    return filterKeys;
  }