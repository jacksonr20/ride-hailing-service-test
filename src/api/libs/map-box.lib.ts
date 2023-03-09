import axios, { HttpStatusCode } from 'axios';

import { distanceToKilometers, durationToMinutes } from '../commons';
import { GetDirection } from './interfaces';

export class MapBox {
  /**
   * Return the distance and duration between two points
   *
   * @static
   * @param {string} pickupLocation Latitude and Longitude separated by comma
   * @param {string} dropoffLocation Latitude and Longitude separated by comma
   * @return {*}  {Promise<any>}
   * @memberof MapBox
   */
  static async getDirection(pickupLocation: string, dropoffLocation: string): Promise<GetDirection> {
    try {
      const axiosInstance = axios.create({
        baseURL: process.env.MAP_BOX_BASE_URL,
        params: {
          access_token: process.env.MAP_BOX_ACCESS_TOKEN,
        },
      });

      const response = await axiosInstance.get(`${pickupLocation};${dropoffLocation}`);
      const { distance = 0, duration = 0 } = response?.data?.routes?.[0] ?? {};

      return { distance: distanceToKilometers(Number(distance)), duration: durationToMinutes(Number(duration)) };
    } catch (error) {
      throw HttpStatusCode.Unauthorized;
    }
  }
}
