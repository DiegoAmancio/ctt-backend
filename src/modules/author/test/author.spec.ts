import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthorRepository } from '../infra/database';
import { IAuthorRepository } from '../interfaces';
import { AuthorService } from '../services';
import {
  authorMock,
  mockCreateAuthorParams,
  updateAuthorData,
  authorMockUpdated,
} from './author.mock';

describe('AuthorService', () => {
  let service: AuthorService;
  let repository: IAuthorRepository;
  const mockRepository = {
    getAuthor: jest.fn().mockReturnValue(authorMock),
    createAndSaveAuthor: jest.fn().mockReturnValue(authorMock),
    updateAuthor: jest.fn().mockReturnValue(authorMockUpdated),
    deleteAuthor: jest.fn().mockReturnValue(true),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorService,
        {
          provide: AuthorRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<AuthorService>(AuthorService);
    repository = module.get<IAuthorRepository>(AuthorRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
  describe('When create Author', () => {
    it('should be create Author', async () => {
      const AuthorCreated = await service.createAuthor(mockCreateAuthorParams);

      expect(mockRepository.createAndSaveAuthor).toBeCalledWith(
        mockCreateAuthorParams.name,
        mockCreateAuthorParams.imageUrl,
      );
      expect(AuthorCreated).toBe(authorMock);
    });
  });
  describe('When get Author', () => {
    it('should be get Author by id', async () => {
      const Author = await service.getAuthor(authorMock.id);

      expect(mockRepository.getAuthor).toBeCalledWith(authorMock.id);
      expect(Author).toBe(authorMock);
    });
    it('Should return a exception when does not to find a Author', async () => {
      mockRepository.getAuthor.mockReturnValue(null);

      const Author = service.getAuthor(authorMock.id);

      expect(mockRepository.getAuthor).toHaveBeenCalledWith(
        authorMock.id,
      );
      expect(Author).rejects.toThrow(NotFoundException);
    });
  });
  describe('When update Author', () => {
    it('Should update a Author', async () => {
      service.getAuthor = jest.fn().mockReturnValue(authorMock);

      const AuthorUpdated = await service.updateAuthor(updateAuthorData);

      expect(service.getAuthor).toHaveBeenCalledWith(updateAuthorData.id);
      expect(mockRepository.updateAuthor).toHaveBeenCalledWith(
        authorMockUpdated,
      );
      expect(AuthorUpdated).toBe('Author updated');
    });
  });
  describe('When delete Author', () => {
    it('Should return a exception when atempt delete Author not register', async () => {
      const authorDeleted = service.deleteAuthor('213');
      expect(authorDeleted).rejects.toThrow(NotFoundException);
    });
    it('Should delete Author', async () => {
      mockRepository.getAuthor = jest.fn().mockReturnValue(authorMock);
      const AuthorDeleted = await service.deleteAuthor(authorMock.id);

      expect(mockRepository.getAuthor).toHaveBeenCalledWith(
        authorMock.id,
      );
      expect(mockRepository.deleteAuthor).toHaveBeenCalledWith(authorMock);
      expect(AuthorDeleted).toBe(true);
    });
  });
});
