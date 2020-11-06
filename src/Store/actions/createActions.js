import { UPDATE_FORM } from '../types/types';

export const updateForm = (updatedForm) => {
  return {
    type: UPDATE_FORM,
    payload: updatedForm,
  };
};
