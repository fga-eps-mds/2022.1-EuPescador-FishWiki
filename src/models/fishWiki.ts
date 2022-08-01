/* eslint-disable import/prefer-default-export */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('fishWiki')
export class FishWiki {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column({ nullable: true })
  largeGroup?: string;

  @Column({ nullable: true })
  group?: string;

  @Column({ nullable: true })
  commonName?: string;

  @Column({ nullable: true })
  scientificName?: string;

  @Column({ nullable: true })
  family?: string;

  @Column({ nullable: true })
  food?: string;

  @Column({ nullable: true })
  habitat?: string;

  @Column({ nullable: true, type: 'real' })
  maxSize?: string;

  @Column({ nullable: true, type: 'real' })
  maxWeight?: string;

  @Column({ nullable: true })
  isEndemicInfo?: string;

  @Column({ nullable: true })
  isEndemic?: boolean;

  @Column({ nullable: true })
  isThreatenedInfo?: string;

  @Column({ nullable: true })
  isThreatened?: boolean;

  @Column({ nullable: true })
  hasSpawningSeasonInfo?: string;

  @Column({ nullable: true })
  hasSpawningSeason?: boolean;

  @Column({ nullable: true })
  wasIntroducedInfo?: string;

  @Column({ nullable: true })
  wasIntroduced?: boolean;

  @Column({ nullable: true })
  funFact?: string;

  @Column({ nullable: true })
  photo?: string;
}
