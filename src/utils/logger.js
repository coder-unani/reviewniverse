import { Client } from '@elastic/elasticsearch';

import { SETTINGS } from '@/config/settings';

const client = new Client({
  node: SETTINGS.ES_API_URL,
  auth: {
    apiKey: SETTINGS.ES_API_KEY,
  },
});

const dataset = [
  {
    timestamp: new Date().toISOString(),
    level: 'info',
    message: '',
  },
];

// Index with the bulk helper
const result = await client.helpers.bulk({
  datasource: dataset,
  onDocument(doc) {
    return { index: { _index: 'rvvs_frontend_log' } };
  },
});

console.log(result);
