import { observable } from '@legendapp/state';
import { syncObservable } from '@legendapp/state/sync';
import persistOptions from './persistConfig';

export const themeStore$ = observable({
  mode: 'system' as 'light' | 'dark' | 'system',
});

syncObservable(
  themeStore$,
  persistOptions({
    persist: {
      name: 'themeStore$',
    },
  }),
);
