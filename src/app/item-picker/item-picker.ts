import { useCallback, useContext } from 'react';
import { DimItem } from '../inventory/item-types';
import { ItemPickerContext } from './ItemPickerContainer';

export interface ItemPickerOptions {
  /** Override the default "Choose an Item" prompt. */
  prompt?: string;
  /** Optionally restrict items to a particular subset. */
  filterItems?: (item: DimItem) => boolean;
  /** An extra sort function that items will be sorted by (beyond the default sort chosen by the user)  */
  sortBy?: (item: DimItem) => unknown;
  uniqueBy?: (item: DimItem) => unknown;
}

export interface ItemSelectResult {
  item: DimItem;
}

export type ItemPickerState = ItemPickerOptions & {
  onItemSelected: (result: ItemSelectResult) => void;
  onCancel: (reason?: Error) => void;
};

export type ShowItemPickerFn = (options: ItemPickerOptions) => Promise<ItemSelectResult>;

/**
 * Returns a function to show an item picker UI, optionally filtered to a specific set of items. When an item
 * is selected, the promise is resolved with that item. It is rejected if the picker
 * is closed without a selection.
 */
export function useItemPicker(): ShowItemPickerFn {
  const setOptions = useContext(ItemPickerContext);
  return useCallback(
    (options) =>
      new Promise((resolve, reject) => {
        setOptions({ ...options, onItemSelected: resolve, onCancel: reject });
      }),
    [setOptions]
  );
}
