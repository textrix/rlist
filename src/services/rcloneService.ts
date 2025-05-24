import axios, { AxiosError } from 'axios';

interface FsInfo {
  [key: string]: any; // Define a more specific type if you know the structure of fsInfo
}

interface RcloneResponse {
  fsInfo: FsInfo;
}

export async function getStorages(): Promise<string[]> {
  const rcloneApiUrl = 'http://localhost:5572/operations/fsinfo';
  const username = 'user';
  const password = 'pass';

  try {
    const response = await axios.post<RcloneResponse>(
      rcloneApiUrl,
      {},
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
        }
      }
    );

    if (response.data && response.data.fsInfo) {
      return Object.keys(response.data.fsInfo);
    } else {
      console.error('Error: Invalid response format from Rclone API');
      return [];
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Rclone API Error:', axiosError.response.status, axiosError.response.data);
      } else if (axiosError.request) {
        // The request was made but no response was received
        console.error('Network Error: No response received from Rclone API', axiosError.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', axiosError.message);
      }
    } else {
      // Handle non-Axios errors
      console.error('An unexpected error occurred:', error);
    }
    return []; // Return an empty array or throw the error, depending on how you want to handle it
  }
}
