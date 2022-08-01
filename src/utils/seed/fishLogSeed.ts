/* eslint-disable no-restricted-syntax */
import excelToJson from 'convert-excel-to-json';
import { connection } from '../../config/database';
import { FishWiki } from '../../models/fishWiki';

const fishLogSeed = async () => {
  const columnToKey = {
    A: 'largeGroup',
    B: 'group',
    C: 'commonName',
    D: 'scientificName',
    E: 'family',
    F: 'food',
    G: 'habitat',
    H: 'maxSize',
    I: 'maxWeight',
    J: 'isEndemicInfo',
    K: 'isThreatenedInfo',
    L: 'hasSpawningSeasonInfo',
    M: 'wasIntroducedInfo',
    N: 'funFact',
    S: 'photo',
  };

  try {
    const fishWikiRepository = connection.getRepository(FishWiki);

    const fishes = await fishWikiRepository.find({});

    if (fishes && fishes.length > 0) {
      return;
    }

    const result = excelToJson({
      sourceFile: `${__dirname}/planilha-dados.xlsx`,
      header: {
        rows: 1,
      },
      columnToKey,
    });
    for await (const fishInfo of result.Plan2) {
      const fish = new FishWiki();
      fish.largeGroup = fishInfo.largeGroup;
      fish.group = fishInfo.group;
      fish.commonName = fishInfo.commonName;
      fish.scientificName = fishInfo.scientificName;
      fish.family = fishInfo.family;
      fish.food = fishInfo.food;
      fish.habitat = fishInfo.habitat;
      fish.maxSize = fishInfo.maxSize;
      fish.maxWeight = fishInfo.maxWeight;
      fish.isEndemicInfo = fishInfo.isEndemicInfo;
      fish.isEndemic = !!(
        fishInfo.isEndemicInfo !== undefined &&
        fishInfo.isEndemicInfo.toLowerCase().includes('sim')
      );
      fish.isThreatenedInfo = fishInfo.isThreatenedInfo;
      fish.isThreatened = !!(
        fishInfo.isThreatenedInfo !== undefined &&
        fishInfo.isThreatenedInfo.toLowerCase().includes('sim')
      );
      fish.hasSpawningSeasonInfo = fishInfo.hasSpawningSeasonInfo;
      fish.hasSpawningSeason = !!(
        fishInfo.hasSpawningSeasonInfo !== undefined &&
        fishInfo.hasSpawningSeasonInfo.toLowerCase().includes('sim')
      );
      fish.wasIntroducedInfo = fishInfo.wasIntroducedInfo;
      fish.wasIntroduced = !!(
        fishInfo.wasIntroducedInfo !== undefined &&
        fishInfo.wasIntroducedInfo.toLowerCase().includes('sim')
      );
      fish.funFact = fishInfo.funFact;
      fish.photo = fishInfo.photo;

      await fishWikiRepository.save(fish);
    }
    console.log('Planilha populada com sucesso!');
  } catch (error) {
    console.log('Não foi possível popular a planilha!');
    console.log(error);
  }
};

export default fishLogSeed;
