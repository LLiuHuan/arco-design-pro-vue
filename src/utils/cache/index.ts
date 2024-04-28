import { createLocalforage, createStorage } from '@adp/utils';
import type { StorageInterface } from '~/types/storage';

export const localStg = createStorage<StorageInterface.Local>('local');

export const sessionStg = createStorage<StorageInterface.Session>('session');

export const localforage = createLocalforage<StorageInterface.Local>('local');
