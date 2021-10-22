import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IUserRepository } from '../interfaces';
import { UserService } from '../services';
import {
  userMock,
  mockCreateUserParams,
  updateUserData,
  userMockUpdated,
  tokenData,
} from './user.mock';

describe('UserService', () => {
  let service: UserService;
  let repository: IUserRepository;
  const mockRepository = {
    findOne: jest.fn().mockReturnValue(userMock),
    save: jest.fn().mockReturnValue(userMock),
    create: jest.fn().mockReturnValue(userMock),
    update: jest.fn().mockReturnValue(userMockUpdated),
    delete: jest.fn().mockReturnValue({ affected: 1 }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'IUserRepository',
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<IUserRepository>('IUserRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
  describe('When create user', () => {
    it('should be create user', async () => {
      const userCreated = await service.createUser(mockCreateUserParams);

      expect(mockRepository.create).toBeCalledWith(
        mockCreateUserParams.email,
        mockCreateUserParams.name,
        mockCreateUserParams.password,
      );
      expect(userCreated).toBe(userMock);
    });
  });
  describe('When get user', () => {
    it('should be get user by data', async () => {
      const data = { id: userMock.id, email: userMock.email };
      const user = await service.getUser(data);

      expect(mockRepository.findOne).toBeCalledWith(data);
      expect(user).toBe(userMock);
    });
    it('should be get user by token data', async () => {
      const user = service.getUser(null, tokenData);

      expect(mockRepository.findOne).toBeCalledWith(tokenData);
      expect(user).resolves.toBe(userMock);
    });
    it('Should return a exception when does not to find a user', async () => {
      mockRepository.findOne.mockReturnValue(null);

      const user = service.getUser({ id: userMock.id });

      expect(mockRepository.findOne).toHaveBeenCalledWith({ id: userMock.id });
      expect(user).rejects.toThrow(NotFoundException);
    });
  });
  describe('When update User', () => {
    it('Should update a user', async () => {
      service.getUser = jest.fn().mockReturnValue(userMock);

      const userUpdated = await service.updateUser(updateUserData, tokenData);

      expect(service.getUser).toHaveBeenCalledWith({ id: tokenData.id });
      expect(mockRepository.update).toHaveBeenCalledWith(userMockUpdated);
      expect(userUpdated).toBe('User updated');
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
      const userDeleted = service.deleteUser({ id: '213' });
      expect(userDeleted).rejects.toThrow(NotFoundException);
    });
    it('Should delete user', async () => {
      mockRepository.findOne = jest.fn().mockReturnValue(userMock);
      const userDeleted = await service.deleteUser({ id: tokenData.id });

      expect(mockRepository.findOne).toHaveBeenCalledWith({ id: tokenData.id });
      expect(mockRepository.delete).toHaveBeenCalledWith(userMock);
      expect(userDeleted).toBe(true);
    });
  });
});
