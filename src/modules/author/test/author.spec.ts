import { UserRepository } from '@modules/user/infra/database';
import { mockCreateUserParams } from '@modules/user/test/user.mock';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { I_AUTHOR_REPOSITORY, I_USER_SERVICE } from '@shared/utils/constants';
import { AuthorService } from '../services';
import {
  authorMock,
  mockCreateAuthorParams,
  updateAuthorData,
  getAuthorMock,
} from './author.mock';

describe('AuthorService', () => {
  let service: AuthorService;

  const mockRepository = {
    getAuthor: jest.fn().mockReturnValue(authorMock),
    createAndSaveAuthor: jest.fn().mockReturnValue(authorMock),
    updateAuthor: jest.fn().mockReturnValue(true),
    deleteAuthor: jest.fn().mockReturnValue(true),
  };
  const mockUserRepository = {
    getUser: jest.fn().mockReturnValue(mockCreateUserParams),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
        {
          provide: I_AUTHOR_REPOSITORY,
          useValue: mockRepository,
        },
        {
          provide: I_USER_SERVICE,
          useValue: mockUserRepository,
        },
        AuthorService,
      ],
    }).compile();
    service = module.get<AuthorService>(AuthorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('When create Author', () => {
    it('should be create Author', async () => {
      const authorCreated = await service.createAuthor(mockCreateAuthorParams);

      expect(mockRepository.createAndSaveAuthor).toBeCalledWith({
        name: mockCreateAuthorParams.name,
        imageUrl: mockCreateAuthorParams.imageUrl,
        registeredBy: mockCreateUserParams,
        updatedBy: mockCreateUserParams,
      });
      expect(authorCreated).toStrictEqual(getAuthorMock);
    });
  });
  describe('When get Author', () => {
    it('should be get Author by id', async () => {
      const author = await service.getAuthor(authorMock.id);

      expect(mockRepository.getAuthor).toBeCalledWith(authorMock.id);
      expect(author).toStrictEqual(getAuthorMock);
    });
    it('Should return a exception when does not to find a Author', async () => {
      mockRepository.getAuthor.mockReturnValue(null);

      const Author = service.getAuthor(authorMock.id);

      expect(mockRepository.getAuthor).toHaveBeenCalledWith(authorMock.id);
      expect(Author).rejects.toThrow(NotFoundException);
    });
  });
  describe('When update Author', () => {
    it('Should update a Author', async () => {
      mockRepository.getAuthor.mockReturnValue(authorMock);

      const authorUpdated = await service.updateAuthor(updateAuthorData);

      expect(mockRepository.getAuthor).toHaveBeenCalledWith(
        updateAuthorData.id,
      );
      expect(mockRepository.updateAuthor).toHaveBeenCalledWith(authorMock);
      expect(authorUpdated).toBe('Author updated');
    });
  });
  describe('When delete Author', () => {
    it('Should delete Author', async () => {
      mockRepository.getAuthor.mockReturnValue(getAuthorMock);

      const authorDeleted = await service.deleteAuthor(authorMock.id);

      expect(mockRepository.getAuthor).toHaveBeenCalledWith(authorMock.id);
      expect(mockRepository.deleteAuthor).toHaveBeenCalledWith(authorMock.id);
      expect(authorDeleted).toBe(true);
    });
    it('Should return a exception when atempt delete Author not register', async () => {
      mockRepository.getAuthor.mockReturnValue(null);

      const authorDeleted = service.deleteAuthor('213');
      expect(authorDeleted).rejects.toThrow(NotFoundException);
    });
  });
});
