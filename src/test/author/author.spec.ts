import { NotFoundException } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { AuthorService } from '@service/author';
import { AUTHOR_REPOSITORY, USER_SERVICE } from '@shared/utils/constants';
import { mockCreateUserParams } from '../user/user.mock';
import {
  authorMock,
  mockCreateAuthorParams,
  getAuthorMock,
  updateAuthorData,
} from './author.mock';

describe('AuthorService', () => {
  let service: AuthorService;

  const mockRepository = {
    get: jest.fn().mockReturnValue(authorMock),
    create: jest.fn().mockReturnValue(authorMock),
    update: jest.fn().mockReturnValue(true),
    delete: jest.fn().mockReturnValue(true),
    getAuthors: jest.fn().mockReturnValue([authorMock]),
  };
  const mockUserRepository = {
    getUser: jest.fn().mockReturnValue(mockCreateUserParams),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AUTHOR_REPOSITORY,
          useValue: mockRepository,
        },
        {
          provide: USER_SERVICE,
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

      expect(mockRepository.create).toHaveBeenCalledWith({
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

      expect(mockRepository.get).toHaveBeenCalledWith(authorMock.id);
      expect(author).toStrictEqual(getAuthorMock);
    });
    it('Should return a exception when does not to find a Author', async () => {
      mockRepository.get.mockReturnValue(null);

      const Author = service.getAuthor(authorMock.id);

      expect(mockRepository.get).toHaveBeenCalledWith(authorMock.id);
      expect(Author).rejects.toThrow(NotFoundException);
    });
  });
  describe('When update Author', () => {
    it('Should update a Author', async () => {
      mockRepository.get.mockReturnValue(authorMock);

      const authorUpdated = await service.updateAuthor(updateAuthorData);

      expect(mockRepository.get).toHaveBeenCalledWith(updateAuthorData.id);
      expect(mockRepository.update).toHaveBeenCalledWith(authorMock);
      expect(authorUpdated).toStrictEqual('Author updated');
    });
  });
  describe('When delete Author', () => {
    it('Should delete Author', async () => {
      mockRepository.get.mockReturnValue(getAuthorMock);

      const authorDeleted = await service.deleteAuthor(authorMock.id);

      expect(mockRepository.get).toHaveBeenCalledWith(authorMock.id);
      expect(mockRepository.delete).toHaveBeenCalledWith(authorMock.id);
      expect(authorDeleted).toStrictEqual(true);
    });
    it('Should return a exception when atempt delete Author not register', async () => {
      mockRepository.get.mockReturnValue(null);

      const authorDeleted = service.deleteAuthor('213');
      expect(authorDeleted).rejects.toThrow(NotFoundException);
    });
  });
});
