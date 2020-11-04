import { UPDATE_FORM, CREATE_CARD } from '../types/types';

export const updateForm = (updatedForm) => {
    return {
      type: UPDATE_FORM,
      payload: updatedForm,
    };
  };
