import { Sensor } from './sensor.interface';

export interface Plantation {
  id: number;
  name: string;
  ubication: string;
  country: string;
  province: string;
  city: string;
  coordinates: string;
  plantationType: string;
  sensors: Sensor[];
}

export interface Plantation {
  name: string;
  sensors: Sensor[];
}
