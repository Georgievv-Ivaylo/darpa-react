import * as actionTypes from './actionTypes';

export function set(data) {
  return {
      type: actionTypes.SET,
      data
  };
}

export function unset() {
  return {
      type: actionTypes.UNSET
  };
}
