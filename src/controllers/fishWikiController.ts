import { Request, Response } from 'express';
import { FishWiki } from '../models/fishWiki';
import { connection } from '../config/database';

export default class FishController {
  createFish = async (req: Request, res: Response) => {
    try {
      const fishWikiRepository = connection.getRepository(FishWiki);

      const {
        scientificName,
        largeGroup,
        group,
        family,
        commonName,
        food,
        habitat,
        maxSize,
        maxWeight,
        isEndemicInfo,
        isThreatenedInfo,
        isThreatened,
        hasSpawningSeasonInfo,
        hasSpawningSeason,
        wasIntroducedInfo,
        wasIntroduced,
        funFact,
        isEndemic,
      } = await req.body;

      if (await fishWikiRepository.findOne({ where: { scientificName } })) {
        return res.status(409).json({
          message: 'Essa espécie de peixe já foi cadastrada',
        });
      }

      const fishWiki = new FishWiki();
      fishWiki.scientificName = scientificName;
      fishWiki.largeGroup = largeGroup;
      fishWiki.group = group;
      fishWiki.family = family;
      fishWiki.commonName = commonName;
      fishWiki.food = food;
      fishWiki.habitat = habitat;
      fishWiki.maxSize = maxSize;
      fishWiki.maxWeight = maxWeight;
      fishWiki.isEndemicInfo = isEndemicInfo;
      fishWiki.isThreatenedInfo = isThreatenedInfo;
      fishWiki.isThreatened = isThreatened;
      fishWiki.hasSpawningSeasonInfo = hasSpawningSeasonInfo;
      fishWiki.hasSpawningSeason = hasSpawningSeason;
      fishWiki.wasIntroducedInfo = wasIntroducedInfo;
      fishWiki.wasIntroduced = wasIntroduced;
      fishWiki.funFact = funFact;
      fishWiki.isEndemic = isEndemic;

      await fishWikiRepository.save(fishWiki);
      return res.status(200).json(req.body);
    } catch (error) {
      return res.status(500).json({
        message: 'Falha no sistema ao cadastrar, tente novamente!',
      });
    }
  };

  getAllFish = async (req: Request, res: Response) => {
    try {
      const fishWikiRepository = connection.getRepository(FishWiki);

      const entries = Object.entries(req.query);

      const nonEmptyOrNull = entries.filter(
        ([, val]) => val !== '' && val !== null
      );

      if (nonEmptyOrNull && nonEmptyOrNull.length === 0) {
        const allFishWiki = await fishWikiRepository.find({});

        return res.status(200).json(allFishWiki);
      }

      const query = Object.fromEntries(nonEmptyOrNull);

      const allFilteredFishWiki = await fishWikiRepository.find({
        where: query,
      });

      return res.status(200).json(allFilteredFishWiki);
    } catch (error) {
      return res.status(500).json({
        message: 'Falha ao processar requisição',
      });
    }
  };

  getOneFishWiki = async (req: Request, res: Response) => {
    try {
      const fishWikiRepository = connection.getRepository(FishWiki);

      const fishId = req.params.id;
      const fishWiki = await fishWikiRepository.findOne({
        where: { id: Number(fishId) },
      });

      if (!fishWiki) {
        return res.status(404).json({
          message: 'Peixe não encontrado',
        });
      }
      return res.status(200).json(fishWiki);
    } catch (error) {
      return res.status(500).json({
        message: 'Falha ao processar requisição',
      });
    }
  };
}
