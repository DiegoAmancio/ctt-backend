import { registerEnumType } from '@nestjs/graphql';
import {
  Categories,
  Coin,
  Edition,
  Language,
  PaperType,
  Status,
  Type,
} from '@shared/enum';

const registerEnums = () => {
  registerEnumType(Edition, {
    name: 'Edition',
  });
  registerEnumType(Language, {
    name: 'Language',
  });
  registerEnumType(PaperType, {
    name: 'PaperType',
  });
  registerEnumType(Status, {
    name: 'Status',
  });
  registerEnumType(Type, {
    name: 'Type',
  });
  registerEnumType(Coin, {
    name: 'Coin',
  });
  registerEnumType(Categories, {
    name: 'Categories',
  });
};

export { registerEnums };
