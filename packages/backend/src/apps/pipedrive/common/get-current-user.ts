import { IGlobalVariable, IJSONObject } from '@automatisch/types';

const getCurrentUser = async ($: IGlobalVariable): Promise<IJSONObject> => {
  const response = await $.http.get(`${$.auth.data.apiDomain}/api/v1/users/me`);
  const currentUser = response.data.data;

  return currentUser;
};

export default getCurrentUser;
