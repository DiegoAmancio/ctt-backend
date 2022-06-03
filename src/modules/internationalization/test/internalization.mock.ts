export const createInternationalizationMock = {
  language: 'pt-BR',
  value: 'opa',
};

export const internationalizationMock = {
  id: 'ea957a2d-b91c-48b5-9d8b-05a4fa5e4c75',
  ...createInternationalizationMock,
  createdAt: new Date('2021-09-29T23:40:24.198Z'),
  updatedAt: new Date('2021-09-29T23:40:24.198Z'),
};

export const updateInternationalizationData = {
  ...internationalizationMock,
  language: 'pt-BR',
  value: 'opa1',
};

export const MyCollectionMockUpdated = Object.assign(
  internationalizationMock,
  updateInternationalizationData,
);
