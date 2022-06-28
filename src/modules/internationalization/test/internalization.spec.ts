import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  I_INTERNATIONALIZATION_REPOSITORY,
  I_LITERARY_WORK_REPOSITORY,
  I_LITERARY_WORK_SERVICE,
} from '@shared/utils/constants';
import { InternationalizationRepository } from '../infra/database';
import { InternationalizationRepositoryInterface } from '../interfaces';
import { InternationalizationService } from '../services';
import {
  createAndSaveInternationalization,
  createInternationalizationMock,
  internationalizationMock,
  mockLiteraryWork,
  updateInternationalizationData,
} from './internalization.mock';

describe('InternationalizationService', () => {
  let service: InternationalizationService;

  const mockRepository = {
    getInternationalization: jest
      .fn()
      .mockReturnValue(internationalizationMock),
    createAndSaveInternationalization: jest
      .fn()
      .mockReturnValue(internationalizationMock),
    updateInternationalization: jest.fn().mockReturnValue(true),
    deleteInternationalization: jest.fn().mockReturnValue(true),
  };

  const mockLiteraryWorkRepository = {
    getLiteraryWork: jest.fn().mockReturnValue(mockLiteraryWork),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InternationalizationService,
        {
          provide: I_INTERNATIONALIZATION_REPOSITORY,
          useValue: mockRepository,
        },
        {
          provide: I_LITERARY_WORK_SERVICE,
          useValue: mockLiteraryWorkRepository,
        },
        {
          provide: I_LITERARY_WORK_REPOSITORY,
          useValue: mockLiteraryWorkRepository,
        },
      ],
    }).compile();
    service = module.get<InternationalizationService>(
      InternationalizationService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('When create Internalization', () => {
    it('should be create Internalization', async () => {
      const internalizationCreated = await service.createInternationalization(
        createInternationalizationMock,
      );

      expect(mockRepository.createAndSaveInternationalization).toBeCalledWith(
        createAndSaveInternationalization,
      );
      expect(internalizationCreated).toStrictEqual(internationalizationMock);
    });
  });
  describe('When get internalization', () => {
    it('should be get internalization by id', async () => {
      const internalization = await service.getInternationalization(
        internationalizationMock.id,
      );

      expect(mockRepository.getInternationalization).toBeCalledWith(
        internationalizationMock.id,
      );
      expect(internalization).toStrictEqual(internationalizationMock);
    });
    it('Should return a exception when does not to find a internalization', async () => {
      mockRepository.getInternationalization.mockReturnValue(null);

      const internalization = service.getInternationalization(
        internationalizationMock.id,
      );

      expect(mockRepository.getInternationalization).toHaveBeenCalledWith(
        internationalizationMock.id,
      );
      expect(internalization).rejects.toThrow(NotFoundException);
    });
  });
  describe('When update internalization', () => {
    it('Should update a internalization', async () => {
      mockRepository.getInternationalization.mockReturnValue(
        internationalizationMock,
      );

      const internalizationUpdated = await service.updateInternationalization(
        updateInternationalizationData,
      );

      expect(mockRepository.getInternationalization).toHaveBeenCalledWith(
        updateInternationalizationData.id,
      );
      expect(mockRepository.updateInternationalization).toHaveBeenCalledWith(
        internationalizationMock,
      );
      expect(internalizationUpdated).toBe('Internationalization updated');
    });
  });
  describe('When delete internalization', () => {
    it('Should delete internalization', async () => {
      mockRepository.getInternationalization.mockReturnValue(
        internationalizationMock,
      );

      const internalizationDeleted = await service.deleteInternationalization(
        internationalizationMock.id,
      );

      expect(mockRepository.getInternationalization).toHaveBeenCalledWith(
        internationalizationMock.id,
      );
      expect(mockRepository.deleteInternationalization).toHaveBeenCalledWith(
        internationalizationMock.id,
      );
      expect(internalizationDeleted).toBe(true);
    });
    it('Should return a exception when atempt delete internalization not register', async () => {
      mockRepository.getInternationalization.mockReturnValue(null);

      const internalizationDeleted = service.deleteInternationalization('213');
      expect(internalizationDeleted).rejects.toThrow(NotFoundException);
    });
  });
});
