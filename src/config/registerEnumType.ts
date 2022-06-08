import { registerEnumType } from '@nestjs/graphql';
import { Edition, Language, PaperType, Status, Type } from '@shared/enum';

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
};

export { registerEnums };
