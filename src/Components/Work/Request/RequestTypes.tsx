export type boardType = 'WORK_REQUEST' | 'WORK_PLAN';

export interface BoardDataRequest {
  type: boardType;
  year: number | string;
  locality: string;
  projecttype: string;
  position?: string | number;
}
