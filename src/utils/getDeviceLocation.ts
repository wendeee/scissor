// const { SuperfaceClient } = require('@superfaceai/one-sdk');

import { SuperfaceClient } from '@superfaceai/one-sdk';


// You can manage tokens here: https://superface.ai/insights
const sdk = new SuperfaceClient({ sdkAuthToken: 'sfs_0da83df6de5c68a86ac0ac9f16baaaf418e001741af1bafc0db55284bd5a23b3d3ead174fba9fc283d9ab15a96bc169afee4df1c2975e2223643322170908feb_36d54f26' });

export async function run(ip) {
  // Load the profile
  const profile = await sdk.getProfile('address/ip-geolocation@1.0.1');

  // Use the profile
  const result = await profile
    .getUseCase('IpGeolocation')
    .perform({
        ipAdrdress: ip
    //   ipAddress: '8.8.8.8'
    }, {
      provider: 'ipdata',
      security: {
        apikey: {
          apikey: process.env.IP_DATA_API_KEY
        }
      }
    });

  // Handle the result
  try {
    const data = result.unwrap();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

// run();