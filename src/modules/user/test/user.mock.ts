export const mockCreateUserParams = {
  id: '22222222222222222222222222222',
  email: 'topEmail@gmail.com',
  name: 'eae man',
};
export const userMock = {
  ...mockCreateUserParams,
  created_at: '2021-09-29T23:40:24.198Z',
  updated_at: '2021-09-29T23:40:24.198Z',
};

export const updateUserData = {
  id: userMock.id,
  email: 'topEmail@gmail.com',
  name: 'Opa man',
};

export const userMockUpdated = Object.assign(userMock, updateUserData);
export const tokenData = { id: userMock.id, email: userMock.email };
