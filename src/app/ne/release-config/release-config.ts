export class ReleaseConfig {
  id: string;
  neType: string;
  neVersion: string;
  interfaces: string[];
  adaptations: string[];
  alarmObjs: string[];
  objectLoads: string[];
  parentHierarchies: ParentHierarchy[];
  neSize: NeSize;
  select: boolean;
}

export class ParentHierarchy {
  adaptationId: string;
  hierarchy: string;
}

export class NeSize {
  maxNePerNetwork: number;
  avgNePerNetwork: number;
}
