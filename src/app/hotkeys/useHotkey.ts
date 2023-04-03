import { useEffect, useRef } from 'react';
import { Hotkey, registerHotkeys } from './hotkeys';

/**
 * A hook for registering a single global hotkey that will appear in the hotkey help screen.
 *
 * @param  {(string | string[])} combo - A key, key combo or array of combos according to Mousetrap documentation.
 * @param  { function } callback - A function that is triggered on key combo catch. This doesn't need to be memoized - the most recent instance of it will be called when the hotkey is triggered.
 * @param  { string } action - A string that specifies the type of event to listen for. It can be 'keypress', 'keydown' or 'keyup'.
 */
export function useHotkey(
  combo: string,
  description: string,
  callback: (event: KeyboardEvent) => void
) {
  const actionRef = useRef<(event: KeyboardEvent) => void>();
  actionRef.current = callback;

  useEffect(() => {
    const keys: Hotkey[] = [
      {
        combo,
        description,
        callback: (evt: KeyboardEvent) => {
          typeof actionRef.current === 'function' && actionRef.current(evt);
        },
      },
    ];
    return registerHotkeys(keys);
  }, [combo, description]);
}

/**
 * A hook for registering a dynamic list of global hotkeys that will appear in the hotkey help screen. Prefer useHotkey if you can.
 *
 * While you could memoize the list of hotkeys, you'll likely want to be able to update them when language changes.
 */
export function useHotkeys(hotkeyDefs: Hotkey[]) {
  useEffect(() => registerHotkeys(hotkeyDefs), [hotkeyDefs]);
}
