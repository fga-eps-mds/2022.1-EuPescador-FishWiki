import FishWiki from '../../models/fishWiki';

const excelToJson = require('convert-excel-to-json');
// const request = require('request');

interface IFish {
  largeGroup: string;
  group: string;
  commonName: string;
  scientificName: string;
  family: string;
  food: string;
  habitat: string;
  maxSize: number;
  maxWeight: number;
  isEndemicInfo: string;
  isEndemic: boolean;
  isThreatenedInfo: string;
  isThreatened: boolean;
  hasSpawningSeasonInfo: string;
  hasSpawningSeason: boolean;
  wasIntroducedInfo: string;
  wasIntroduced: boolean;
  funFact: string;
  photo: string;
}
interface ISheet {
  Plan1: object[];
  Plan2: IFish[];
  Plan3: object[];
}

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
    const fishWiki = await FishWiki.find();

    const result: ISheet = await excelToJson({
      sourceFile: 'src/utils/seed/planilha-dados1.xlsx',
      header: {
        rows: 1,
      },
      columnToKey,
    });

    let fish = {
      [Symbol.asyncIterator]() {
        return {
          i: 0,
          next() {
            if (this.i < result.Plan2.length) {
              return new Promise(resolve => {
                let obj = { value:{
                  largeGroup: result.Plan2[this.i].largeGroup,
                  group: result.Plan2[this.i].group,
                  commonName: result.Plan2[this.i].commonName,
                  scientificName: result.Plan2[this.i].scientificName,
                  family: result.Plan2[this.i].family,
                  food: result.Plan2[this.i].food,
                  habitat: result.Plan2[this.i].habitat,
                  maxSize: result.Plan2[this.i].maxSize,
                  maxWeight: result.Plan2[this.i].maxWeight,
                  isEndemicInfo: result.Plan2[this.i].isEndemicInfo,
                  isEndemic: !!(
                    result.Plan2[this.i].isEndemicInfo !== undefined &&
                    result.Plan2[this.i].isEndemicInfo.toLowerCase().includes('sim')
                  ),
                  isThreatenedInfo: result.Plan2[this.i].isThreatenedInfo,
                  isThreatened: !!(
                    result.Plan2[this.i].isThreatenedInfo !== undefined &&
                    result.Plan2[this.i].isThreatenedInfo.toLowerCase().includes('sim')
                  ),
                  hasSpawningSeasonInfo: result.Plan2[this.i].hasSpawningSeasonInfo,
                  hasSpawningSeason: !!(
                    result.Plan2[this.i].hasSpawningSeasonInfo !== undefined &&
                    result.Plan2[this.i].hasSpawningSeasonInfo.toLowerCase().includes('sim')
                  ),
                  wasIntroducedInfo: result.Plan2[this.i].wasIntroducedInfo,
                  wasIntroduced: !!(
                    result.Plan2[this.i].wasIntroducedInfo !== undefined &&
                    result.Plan2[this.i].wasIntroducedInfo.toLowerCase().includes('sim')
                  ),
                  funFact: result.Plan2[this.i].funFact,
                  photo: result.Plan2[this.i].photo,
                }, done:false};
                setTimeout(resolve, 0.01, obj);
              });
            }
            return Promise.resolve({done:true});
          }
        };

      }
    };

  (async function () {
      FishWiki.create(fish);
    
  })();


} catch (error) {
  console.log('Não foi possível popular a planilha!');
  console.log(error);
}

};

export default fishLogSeed;