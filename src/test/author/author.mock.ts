export const mockCreateUserParams = {
  id: '22222222222222222222222222222',
  email: 'topEmail@gmail.com',
  name: 'eae man',
};
export const mockCreateAuthorParams = {
  imageUrl: 'http://top.com',
  name: 'fofoide',
  adminId: '12313123123131',
  registeredBy: mockCreateUserParams,
  updatedBy: mockCreateUserParams,
};
export const authorMock = {
  ...mockCreateAuthorParams,
  id: 'ea957a2d-b91c-48b5-9d8b-05a4fa5e4c75',
  createdAt: '2021-09-29T23:40:24.198Z',
  updatedAt: '2021-09-29T23:40:24.198Z',
  registeredBy: mockCreateUserParams,
  updatedBy: mockCreateUserParams,
};
export const getAuthorMock = {
  ...mockCreateAuthorParams,
  id: 'ea957a2d-b91c-48b5-9d8b-05a4fa5e4c75',
  createdAt: '2021-09-29T23:40:24.198Z',
  updatedAt: '2021-09-29T23:40:24.198Z',
  registeredBy: mockCreateUserParams.name,
  updatedBy: mockCreateUserParams.name,
};
export const updateAuthorData = {
  id: authorMock.id,
  imageUrl: 'http://top.com',
  name: 'fofoide',
  adminId: '12313123123131',
};

export const authorMockUpdated = Object.assign(authorMock, updateAuthorData);
