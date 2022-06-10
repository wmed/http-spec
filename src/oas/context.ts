import { createContext as _createContext } from '../context';
import { hash } from '../hash';
import type { Fragment } from '../types';
import { resolveRef as _resolveRef } from './resolver';

export function createContext<T extends Fragment>(document: T, resolveRef = _resolveRef) {
  return _createContext<T>(document, resolveRef, hash);
}
