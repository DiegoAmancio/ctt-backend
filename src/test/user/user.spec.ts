import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { UserService } from '@service/user';
import { USER_REPOSITORY } from '@shared/utils/constants';
import {
  userMock,
  userMockUpdated,
  mockCreateUserParams,
  tokenData,
  updateUserData,
} from './user.mock';

describe('UserService', () => {
  let service: UserService;
  const mockRepository = {
    getUser: jest.fn().mockReturnValue(userMock),
    createAndSaveUser: jest.fn().mockReturnValue(userMock),
    updateUser: jest.fn().mockReturnValue(userMockUpdated),
    deleteUser: jest.fn().mockReturnValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: USER_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('When create user', () => {
    it('should be create user', async () => {
      const userCreated = await service.createUser(mockCreateUserParams);

      expect(mockRepository.createAndSaveUser).toBeCalledWith(
        mockCreateUserParams,
      );
      expect(userCreated).toStrictEqual(userMock);
    });
  });
  describe('When get user', () => {
    it('should be get user by data', async () => {
      const data = { id: userMock.id, email: userMock.email };
      const user = await service.getUser(data.id);

      expect(mockRepository.getUser).toHaveBeenCalledWith(data.id);
      expect(user).toStrictEqual(userMock);
    });
    it('should be get user by token data', async () => {
      const user = await service.getUser(tokenData.id);

      expect(mockRepository.getUser).toHaveBeenCalledWith(tokenData.id);
      expect(user).toStrictEqual(userMock);
    });
    it('Should return a exception when does not to find a user', async () => {
      mockRepository.getUser.mockReturnValue(null);

      const user = service.getUser(userMock.id);

      expect(mockRepository.getUser).toHaveBeenCalledWith(userMock.id);
      expect(user).rejects.toThrow(NotFoundException);
    });
  });
  describe('When update User', () => {
    it('Should update a user', async () => {
      service.getUser = jest.fn().mockReturnValue(userMock);

      const userUpdated = await service.updateUser(updateUserData, tokenData);

      expect(service.getUser).toHaveBeenCalledWith(tokenData.id);
      expect(mockRepository.updateUser).toHaveBeenCalledWith(userMockUpdated);
      expect(userUpdated).toStrictEqual('User updated');
    });
    it('Should return a exception when user atempt update another user', async () => {
      const userUpdated = service.updateUser(
        { ...updateUserData, id: '' },
        tokenData,
      );
      expect(userUpdated).rejects.toThrow(UnauthorizedException);
    });
  });
  describe('When delete User', () => {
    it('Should return a exception when atempt delete user not register', async () => {
      const userDeleted = service.deleteUser('213');
      expect(userDeleted).rejects.toThrow(NotFoundException);
    });
    it('Should delete user', async () => {
      mockRepository.getUser = jest.fn().mockReturnValue(userMock);
      const userDeleted = await service.deleteUser(tokenData.id);

      expect(mockRepository.getUser).toHaveBeenCalledWith(tokenData.id);
      expect(mockRepository.deleteUser).toHaveBeenCalledWith(userMock.id);
      expect(userDeleted).toStrictEqual(true);
    });
  });
});
