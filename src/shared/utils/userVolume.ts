import { UserVolume } from '@modules/volumes/infra/database';

export const getMetricsFromUserVolumes = (
  userVolumes: UserVolume[],
  userId?: string,
) => {
  const defaultProps = {
    userAcquisitionDifficultyCount: 0,
    userClassificationCount: 0,
    userClassificationTotal: 0,
    userAcquisitionDifficultyTotal: 0,
    thisUserClassification: null,
    thisAcquisitionDifficulty: null,
  };

  if (!userVolumes) {
    return defaultProps;
  }
  return userVolumes.reduce(
    (
      acc: typeof defaultProps,
      { user, userClassification, userAcquisitionDifficulty },
    ) => {
      if (userAcquisitionDifficulty) {
        acc.userAcquisitionDifficultyCount += 1;
        acc.userAcquisitionDifficultyTotal += userAcquisitionDifficulty;
        if (userId && user && user.id === userId) {
          acc.thisAcquisitionDifficulty = userAcquisitionDifficulty;
        }
      }
      if (userClassification) {
        acc.userClassificationCount += 1;
        acc.userClassificationTotal += userClassification;
        if (userId && user && user.id === userId) {
          acc.thisUserClassification = userClassification;
        }
      }
      return acc;
    },
    defaultProps,
  );
};
