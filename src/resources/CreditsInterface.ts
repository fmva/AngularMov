export interface CastsInterface {
  cast_id?: number;
  character?: string;
  credit_id?: string;
  gender?: number;
  id?: number;
  name?: string;
  order?: number;
  profile_path?: string;
}

export interface CrewsInterface {
  credit_id?: number;
  department?: string;
  gender?: number;
  id?: number;
  job?: string;
  name?: string;
  profile_path?: string;
}

export interface CreditsInterface {
  id?: number;
  cast?: Array<CastsInterface>;
  crew?: Array<CrewsInterface>;
}
