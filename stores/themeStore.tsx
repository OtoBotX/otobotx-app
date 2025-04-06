import { observable } from '@legendapp/state';

export const themeStore = observable({
  mode: 'system' as 'light' | 'dark' | 'system',
});
