# OpenFDA Food Enforcement API Integration

This project includes integration with the **openFDA Food Enforcement API**, which provides access to FDA food recall and enforcement data.

## 📁 Files Created

1. **Types**: `src/types/FdaApi.ts` - TypeScript interfaces for API responses
2. **Service**: `src/libs/FdaApi.ts` - API client with helper methods
3. **Demo Page**: `src/app/[locale]/(auth)/fda-enforcement/page.tsx` - Example usage page

## 🚀 Quick Start

### 1. Optional: Get an API Key

While not required, an API key is recommended for regular usage:

1. Visit: https://open.fda.gov/apis/authentication/
2. Request an API key
3. Add to your `.env.local` file:

```env
NEXT_PUBLIC_FDA_API_KEY=your_api_key_here
```

### 2. View the Demo Page

Start your development server and navigate to:
```
http://localhost:3000/en/fda-enforcement
```

This page demonstrates different search capabilities.

## 💻 How to Use the API in Your Code

### Basic Usage

```typescript
import { fdaApi } from '@/libs/FdaApi';

// Search for nationwide recalls
const response = await fdaApi.searchByDistributionPattern('nationwide', 10);
console.log(response.results);
```

### Search by Product Description

```typescript
import { fdaApi } from '@/libs/FdaApi';

const results = await fdaApi.searchByProductDescription('chicken', 20);
```

### Search by Recalling Firm

```typescript
const results = await fdaApi.searchByRecallingFirm('Company Name', 10);
```

### Get Recent Recalls

```typescript
const recentRecalls = await fdaApi.getRecentRecalls(25);
```

### Search by Classification

```typescript
// Class I = Most serious
// Class II = Moderate risk
// Class III = Least serious
const classIRecalls = await fdaApi.searchByClassification('Class I', 10);
```

### Search by State

```typescript
const californiaRecalls = await fdaApi.searchByState('CA', 15);
```

### Advanced Custom Search with Pagination

```typescript
const results = await fdaApi.searchWithPagination(
  'product_description:salad AND state:CA',
  1, // page number
  20 // page size
);
```

### Custom Search Query

```typescript
const results = await fdaApi.search({
  search: 'classification:"Class I" AND state:NY',
  limit: 50,
  sort: 'report_date:desc'
});
```

## 🔧 Using in React Components

### Client Component Example

```tsx
'use client';

import { useState, useEffect } from 'react';
import { fdaApi } from '@/libs/FdaApi';
import type { FdaEnforcementRecord } from '@/types/FdaApi';

export default function FdaRecallsList() {
  const [recalls, setRecalls] = useState<FdaEnforcementRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecalls() {
      try {
        const response = await fdaApi.getRecentRecalls(10);
        setRecalls(response.results);
      } catch (error) {
        console.error('Error fetching recalls:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecalls();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {recalls.map((recall) => (
        <div key={recall.recall_number}>
          <h3>{recall.recalling_firm}</h3>
          <p>{recall.product_description}</p>
          <p>{recall.reason_for_recall}</p>
        </div>
      ))}
    </div>
  );
}
```

### Server Component Example (Next.js App Router)

```tsx
import { fdaApi } from '@/libs/FdaApi';

export default async function RecallsPage() {
  const response = await fdaApi.getRecentRecalls(10);

  return (
    <div>
      <h1>Recent FDA Recalls</h1>
      {response.results.map((recall) => (
        <div key={recall.recall_number}>
          <h3>{recall.recalling_firm}</h3>
          <p>{recall.product_description}</p>
        </div>
      ))}
    </div>
  );
}
```

### API Route Example

```typescript
// src/app/api/fda-recalls/route.ts
import { NextResponse } from 'next/server';
import { fdaApi } from '@/libs/FdaApi';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '10');

  try {
    const response = await fdaApi.getRecentRecalls(limit);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch FDA data' },
      { status: 500 }
    );
  }
}
```

## 🔍 Available Search Fields

The API supports searching on these fields:

- `address_1`, `address_2`
- `center_classification_date`
- `city`, `state`, `country`, `postal_code`
- `classification` (Class I, Class II, Class III)
- `code_info`
- `distribution_pattern`
- `event_id`
- `initial_firm_notification`
- `product_description`, `product_quantity`, `product_type`
- `reason_for_recall`
- `recall_initiation_date`, `recall_number`
- `recalling_firm`
- `report_date`
- `status`
- `termination_date`
- `voluntary_mandated`

## 📖 Search Query Syntax

### Exact Match
```typescript
search: 'recalling_firm:"Company Name"'
```

### Wildcard
```typescript
search: 'product_description:chicken*'
```

### AND/OR Operators
```typescript
search: 'state:CA AND classification:"Class I"'
search: 'state:CA OR state:NY'
```

### Date Ranges
```typescript
search: 'report_date:[2024-01-01 TO 2024-12-31]'
```

### NOT Operator
```typescript
search: 'state:CA NOT classification:"Class III"'
```

## 📊 Response Structure

```typescript
{
  meta: {
    disclaimer: string;
    terms: string;
    license: string;
    last_updated: string;
    results: {
      skip: number;
      limit: number;
      total: number;
    };
  },
  results: [
    {
      recalling_firm: string;
      product_description: string;
      reason_for_recall: string;
      classification: string;
      distribution_pattern: string;
      recall_number: string;
      recall_initiation_date: string;
      // ... more fields
    }
  ]
}
```

## ⚠️ Important Notes

- **Rate Limits**: Without an API key, you're limited to 240 requests per minute and 1000 requests per day
- **With API Key**: 240 requests per minute, 120,000 requests per day
- **Maximum Limit**: You can request up to 1000 records per API call
- **Default Limit**: If no limit is specified, the API returns only 1 record

## 🔗 Additional Resources

- [Official FDA API Documentation](https://open.fda.gov/apis/)
- [Food Enforcement Endpoint](https://open.fda.gov/food/enforcement/)
- [API Query Syntax](https://open.fda.gov/apis/query-syntax/)
- [Interactive API Explorer](https://open.fda.gov/apis/try-the-api/)

## 🛠️ Troubleshooting

### CORS Issues
If you encounter CORS errors in the browser, create a Next.js API route to proxy requests:

```typescript
// src/app/api/fda/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fdaUrl = `https://api.fda.gov/food/enforcement.json?${searchParams}`;
  
  const response = await fetch(fdaUrl);
  const data = await response.json();
  
  return NextResponse.json(data);
}
```

### Type Safety
All responses are fully typed. Use TypeScript autocomplete to explore available fields:

```typescript
import type { FdaEnforcementRecord, FdaApiResponse } from '@/types/FdaApi';
```

## 📝 Example Queries

1. **Recent Class I recalls**: `classification:"Class I"` sorted by `report_date:desc`
2. **Nationwide distribution**: `distribution_pattern:"nationwide"`
3. **Specific product**: `product_description:salad`
4. **By location**: `state:CA AND city:Los Angeles`
5. **Date range**: `report_date:[2024-01-01 TO 2024-12-31]`
