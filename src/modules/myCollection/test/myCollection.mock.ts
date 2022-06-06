import { Role } from '@modules/auth/jwt/role.enum';
import { User } from '@modules/user/infra/database';
import { mockCreateUserParams, userMock } from '@modules/user/test/user.mock';
import { MyCollection } from '../infra/database';

export const myCollectionUserMock: User = {
  ...userMock,
  createdAt: new Date('2021-09-29T23:40:24.198Z'),
  updatedAt: new Date('2021-09-29T23:40:24.198Z'),
  role: Role.User,
  authorsRegistered: [],
  authorsUpdated: [],
  myCollection: new MyCollection(),
  literaryWorkRegistered: null,
  literaryWorkUpdated: null,
};
export const myCollectionMock = {
  id: 'ea957a2d-b91c-48b5-9d8b-05a4fa5e4c75',
  totalLiteraryWorks: 0,
  completeLiteraryWorks: 0,
  collectionValue: 0,
  createdAt: new Date('2021-09-29T23:40:24.198Z'),
  updatedAt: new Date('2021-09-29T23:40:24.198Z'),
};

export const updateMyCollectionData = {
  id: myCollectionMock.id,
  imageUrl: 'http://top.com',
  name: 'fofoide',
  adminId: '12313123123131',
};

export const MyCollectionMockUpdated = Object.assign(
  myCollectionMock,
  updateMyCollectionData,
);
