import { Edition, Language, PaperType, Type } from '@shared/enum';

export const createInternationalizationMock = {
  language: Language.portuguese,
  synopsis: 'opa',
  edition: Edition.deluxe,
  type: Type.book,
  paperType: PaperType.offset,
  country: 'brazil',
};

export const internationalizationMock = {
  id: 'ea957a2d-b91c-48b5-9d8b-05a4fa5e4c75',
  ...createInternationalizationMock,
  createdAt: new Date('2021-09-29T23:40:24.198Z'),
  updatedAt: new Date('2021-09-29T23:40:24.198Z'),
};

export const updateInternationalizationData = {
  ...internationalizationMock,
  language: Language.portuguese,
  synopsis: 'opa1',
};

export const MyCollectionMockUpdated = Object.assign(
  internationalizationMock,
  updateInternationalizationData,
);
