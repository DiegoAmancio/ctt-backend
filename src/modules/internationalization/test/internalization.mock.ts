import { Edition, Language, PaperType, Status, Type } from '@shared/enum';
import { Internationalization } from '../infra/database';

export const mockLiteraryWork = {
  registeredBy: null,
  updatedBy: null,
  language: Language.ptBR,
  synopsis: '',
  edition: Edition.omnibus,
  type: Type.japaneseComicBook,
  paperType: PaperType.newsPrint,
  country: '',
  id: '',
  name: '',
  bagShape: '',
  publisher: '',
  dimensions: '',
  imageUrl: '',
  status: Status.Complete,
  categories: '',
  createdAt: new Date('2021-09-29T23:40:24.198Z'),
  updatedAt: new Date('2021-09-29T23:40:24.198Z'),
  internationalization: [],
};

export const createInternationalizationMock = {
  language: Language.ptBR,
  synopsis: 'opa',
  country: 'brazil',
  literaryWork: mockLiteraryWork.id,
};

export const createAndSaveInternationalization = {
  ...createInternationalizationMock,
  literaryWork: mockLiteraryWork,
};

export const internationalizationMock: Internationalization = {
  id: 'ea957a2d-b91c-48b5-9d8b-05a4fa5e4c75',
  createdAt: new Date('2021-09-29T23:40:24.198Z'),
  updatedAt: new Date('2021-09-29T23:40:24.198Z'),
  ...createAndSaveInternationalization,
};

export const updateInternationalizationData = {
  ...internationalizationMock,
  language: Language.ptBR,
  synopsis: 'opa1',
  literaryWork: '',
};

export const MyCollectionMockUpdated = Object.assign(
  internationalizationMock,
  updateInternationalizationData,
);
