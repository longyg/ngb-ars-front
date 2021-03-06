export class ObjectClassInfo {
  row: number;
  adaptationId: string;
  name: string;
  nameInOmes: string;
  transient: string;
  presentation: string;
  alarmingObject: boolean;
  measuredObject: boolean;
  cmObject: boolean;
  hasIcon: boolean;
  hasGuiLaunch: boolean;
  tgppObject: string;
  intVersion: string;
  classType: string;
  max: number;
  min: number;
  avg: number;
  avgPerNet: number;
  maxPerNet: number;
  maxPerNE: number;
  maxNePerNet: number;
  avgNePerNet: number;
  maxPerRoot: number;
  mocrNeeded: boolean;
  comment: string;
  supporteredVersions: string[];
  dimensions: string[];
  supportedReleases: string;
  dn: string;
  originalDn: string;
}
