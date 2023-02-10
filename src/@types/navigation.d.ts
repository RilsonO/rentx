import { CarDTO } from '../dtos/CarDTO';
import { Car } from '../database/model/Car';

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      SignIn: undefined;
      SignUpFirstStep: undefined;
      SignUpSecondStep: {
        user: {
          name: string;
          email: string;
          driverLicense: string;
        };
      };
      Home: undefined;
      CarDetails: {
        car: Car;
      };
      Scheduling: {
        car: Car;
      };
      SchedulingDetails: {
        car: CarDTO;
        dates: string[];
      };
      Confirmation: {
        title: string;
        message: string;
        nextScreenRoute: string;
      };
      MyCars: undefined;
    }
  }
}
