/**
 * OpenFDA Food Enforcement API Client
 * https://open.fda.gov/food/enforcement/
 */

import type {
  FdaApiError,
  FdaApiResponse,
  FdaSearchParams,
} from '@/types/FdaApi';

const FDA_BASE_URL = 'https://api.fda.gov/food/enforcement.json';

export class FdaApiClient {
  private apiKey?: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey;
  }

  /**
   * Build query string from search parameters
   */
  private buildQueryString(params: FdaSearchParams): string {
    const queryParams = new URLSearchParams();

    if (params.search) {
      queryParams.append('search', params.search);
    }

    if (params.limit) {
      queryParams.append('limit', params.limit.toString());
    }

    if (params.skip) {
      queryParams.append('skip', params.skip.toString());
    }

    if (params.sort) {
      queryParams.append('sort', params.sort);
    }

    if (params.count) {
      queryParams.append('count', params.count);
    }

    if (this.apiKey) {
      queryParams.append('api_key', this.apiKey);
    }

    return queryParams.toString();
  }

  /**
   * Search food enforcement reports
   * @param params Search parameters
   * @returns FDA API response
   */
  async search(params: FdaSearchParams): Promise<FdaApiResponse> {
    const queryString = this.buildQueryString(params);
    const url = `${FDA_BASE_URL}?${queryString}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        const errorData = (await response.json()) as FdaApiError;
        throw new Error(
          `FDA API Error: ${errorData.error.message} (${errorData.error.code})`,
        );
      }

      const data = (await response.json()) as FdaApiResponse;
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unknown error occurred while fetching FDA data');
    }
  }

  /**
   * Search by distribution pattern
   * @param pattern Distribution pattern to search for
   * @param limit Maximum number of results (default: 10, max: 1000)
   */
  async searchByDistributionPattern(pattern: string, limit = 10) {
    return this.search({
      search: `distribution_pattern:"${pattern}"`,
      limit,
    });
  }

  /**
   * Search by product description
   * @param description Product description to search for
   * @param limit Maximum number of results (default: 10, max: 1000)
   */
  async searchByProductDescription(description: string, limit = 10) {
    return this.search({
      search: `product_description:${description}`,
      limit,
    });
  }

  /**
   * Search by recalling firm
   * @param firm Firm name to search for
   * @param limit Maximum number of results (default: 10, max: 1000)
   */
  async searchByRecallingFirm(firm: string, limit = 10) {
    return this.search({
      search: `recalling_firm:"${firm}"`,
      limit,
    });
  }

  /**
   * Search by classification (Class I, Class II, Class III)
   * @param classification Classification level
   * @param limit Maximum number of results (default: 10, max: 1000)
   */
  async searchByClassification(classification: string, limit = 10) {
    return this.search({
      search: `classification:"${classification}"`,
      limit,
    });
  }

  /**
   * Search by state
   * @param state State abbreviation (e.g., "CA", "NY")
   * @param limit Maximum number of results (default: 10, max: 1000)
   */
  async searchByState(state: string, limit = 10) {
    return this.search({
      search: `state:${state}`,
      limit,
    });
  }

  /**
   * Get recent recalls
   * @param limit Maximum number of results (default: 10, max: 1000)
   */
  async getRecentRecalls(limit = 10) {
    return this.search({
      sort: 'report_date:desc',
      limit,
    });
  }

  /**
   * Search with custom query and pagination
   * @param searchQuery Custom search query
   * @param page Page number (starts at 1)
   * @param pageSize Number of results per page
   */
  async searchWithPagination(
    searchQuery: string,
    page = 1,
    pageSize = 10,
  ) {
    const skip = (page - 1) * pageSize;
    return this.search({
      search: searchQuery,
      limit: pageSize,
      skip,
    });
  }
}

// Export a default instance
export const fdaApi = new FdaApiClient(process.env.NEXT_PUBLIC_FDA_API_KEY);
