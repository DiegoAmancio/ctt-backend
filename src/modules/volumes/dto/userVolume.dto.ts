import { CreateUserVolumeRepositoryDTO } from './createUserVolumeRepository.dto';

export interface UserVolumeDTO
  extends Omit<CreateUserVolumeRepositoryDTO, 'user'> {
  id: string;

  createdAt: Date;

  updatedAt: Date;
}
