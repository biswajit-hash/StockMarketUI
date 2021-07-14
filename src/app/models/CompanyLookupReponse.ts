import { Company } from "./Company";

export interface CompanyLookupReponse {
    message?: string;
    companyDtos?:Company[];
  }