import { UserRepository } from '@modules/user/infra/database';
import { mockCreateUserParams } from '@modules/user/test/user.mock';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { I_USER_SERVICE } from '@shared/utils/constants';
import { MyCollectionRepository } from '../infra/database';
import { IMyCollectionRepository } from '../interfaces';
import { MyCollectionService } from '../services';
import {
  myCollectionMock,
  updateMyCollectionData,
  myCollectionUserMock,
} from './myCollection.mock';

describe('MyCollectionService', () => {
  let service: MyCollectionService;

  let repository: IMyCollectionRepository;

  const mockRepository = {
    getMyCollection: jest.fn().mockReturnValue(myCollectionMock),
    createAndSaveMyCollection: jest.fn().mockReturnValue(myCollectionMock),
    updateMyCollection: jest.fn().mockReturnValue(true),
    deleteMyCollection: jest.fn().mockReturnValue(true),
  };
  const mockUserRepository = {
    getUser: jest.fn().mockReturnValue(mockCreateUserParams),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MyCollectionService,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
        {
          provide: MyCollectionRepository,
          useValue: mockRepository,
        },
        {
          provide: I_USER_SERVICE,
          useValue: mockUserRepository,
        },
      ],
    }).compile();
    service = module.get<MyCollectionService>(MyCollectionService);
    repository = module.get<IMyCollectionRepository>(MyCollectionRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
  describe('When create MyCollection', () => {
    it('should be create MyCollection', async () => {
      const myCollectionCreated = await service.createMyCollection(
        myCollectionUserMock,
      );

      expect(mockRepository.createAndSaveMyCollection).toBeCalledWith({
        collectionValue: 0,
        completeLiteraryWorks: 0,
        totalLiteraryWorks: 0,
        user: myCollectionUserMock,
      });
      expect(myCollectionCreated).toStrictEqual(myCollectionMock);
    });
  });
  describe('When get MyCollection', () => {
    it('should be get MyCollection by id', async () => {
      const myCollection = await service.getMyCollection(myCollectionMock.id);

      expect(mockRepository.getMyCollection).toBeCalledWith(
        myCollectionMock.id,
      );
      expect(myCollection).toStrictEqual(myCollectionMock);
    });
    it('Should return a exception when does not to find a MyCollection', async () => {
      mockRepository.getMyCollection.mockReturnValue(null);

      const MyCollection = service.getMyCollection(myCollectionMock.id);

      expect(mockRepository.getMyCollection).toHaveBeenCalledWith(
        myCollectionMock.id,
      );
      expect(MyCollection).rejects.toThrow(NotFoundException);
    });
  });
  // describe('When update MyCollection', () => {
  //   it('Should update a MyCollection', async () => {
  //     mockRepository.getMyCollection.mockReturnValue(myCollectionMock);

  //     const MyCollectionUpdated = await service.updateMyCollection(
  //       updateMyCollectionData,
  //     );

  //     expect(mockRepository.getMyCollection).toHaveBeenCalledWith(
  //       updateMyCollectionData.id,
  //     );
  //     expect(mockRepository.updateMyCollection).toHaveBeenCalledWith(
  //       myCollectionMock,
  //     );
  //     expect(MyCollectionUpdated).toBe('MyCollection updated');
  //   });
  // });
  // describe('When delete MyCollection', () => {
  //   it('Should delete MyCollection', async () => {
  //     mockRepository.getMyCollection.mockReturnValue(getMyCollectionMock);

  //     const MyCollectionDeleted = await service.deleteMyCollection(
  //       myCollectionMock.id,
  //     );

  //     expect(mockRepository.getMyCollection).toHaveBeenCalledWith(
  //       myCollectionMock.id,
  //     );
  //     expect(mockRepository.deleteMyCollection).toHaveBeenCalledWith(
  //       myCollectionMock.id,
  //     );
  //     expect(MyCollectionDeleted).toBe(true);
  //   });
  //   it('Should return a exception when atempt delete MyCollection not register', async () => {
  //     mockRepository.getMyCollection.mockReturnValue(null);

  //     const MyCollectionDeleted = service.deleteMyCollection('213');
  //     expect(MyCollectionDeleted).rejects.toThrow(NotFoundException);
  //   });
  // });
});
