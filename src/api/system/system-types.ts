export interface IStateTypes {
  os: IStateOs;
  cpu: IStateCpu;
  ram: IStateRam;
  disk: IStateDisk;
}

interface IStateOs {
  goos: string;
  numCpu: number;
  compiler: string;
  goVersion: string;
  numGoroutine: number;
}

interface IStateCpu {
  cpus: number[];
  cores: number;
}

interface IStateRam {
  usedMb: number;
  totalMb: number;
  usedPercent: number;
}

interface IStateDisk {
  usedMb: number;
  usedGb: number;
  totalMb: number;
  totalGb: number;
  usedPercent: number;
}
