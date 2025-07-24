export interface Beneficiary {
  id: string;
  name: string;
}

export interface Distribution {
  id: string;
  region: string;
  date: string;
  status: string;
  beneficiaries: number;
  aidType: string;
  deliveryChannel: string;
}

export interface DistributionDetail extends Distribution {
  beneficiaryList: Beneficiary[];
} 