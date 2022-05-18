export const mockCreateAuthorParams = {
  imageUrl: 'http://top.com',
  name: 'fofoide',
};
export const authorMock = {
  ...mockCreateAuthorParams,
  id: 'ea957a2d-b91c-48b5-9d8b-05a4fa5e4c75',
  created_at: '2021-09-29T23:40:24.198Z',
  updated_at: '2021-09-29T23:40:24.198Z',
};

export const updateAuthorData = {
  id: authorMock.id,
  imageUrl: 'http://top.com',
  name: 'fofoide1',
};

export const authorMockUpdated = Object.assign(authorMock, updateAuthorData);
