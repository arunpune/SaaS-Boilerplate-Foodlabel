/**
 * Type definitions for openFDA Food Enforcement API
 * API Documentation: https://open.fda.gov/food/enforcement/
 */

export type FdaEnforcementRecord = {
  address_1?: string;
  address_2?: string;
  center_classification_date?: string;
  city?: string;
  classification?: string;
  code_info?: string;
  country?: string;
  distribution_pattern?: string;
  event_id?: string;
  initial_firm_notification?: string;
  more_code_info?: string;
  openfda?: {
    [key: string]: string[];
  };
  postal_code?: string;
  product_description?: string;
  product_quantity?: string;
  product_type?: string;
  reason_for_recall?: string;
  recall_initiation_date?: string;
  recall_number?: string;
  recalling_firm?: string;
  report_date?: string;
  state?: string;
  status?: string;
  termination_date?: string;
  voluntary_mandated?: string;
};

export type FdaApiMeta = {
  disclaimer: string;
  terms: string;
  license: string;
  last_updated: string;
  results: {
    skip: number;
    limit: number;
    total: number;
  };
};

export type FdaApiResponse = {
  meta: FdaApiMeta;
  results: FdaEnforcementRecord[];
};

export type FdaApiError = {
  error: {
    code: string;
    message: string;
  };
};

export type FdaSearchParams = {
  search?: string;
  limit?: number;
  skip?: number;
  sort?: string;
  count?: string;
};
