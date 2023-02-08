import { CarDTO } from '../dtos/CarDTO';

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      CarDetails: {
        car: CarDTO;
      };
      Scheduling: {
        car: CarDTO;
      };
      SchedulingDetails: {
        car: CarDTO;
        dates: string[];
      };
      SchedulingComplete: undefined;
      MyCars: undefined;
    }
  }
}
