import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../model/custom-http-response';
import { Vehicle } from '../model/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private host = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getVehicles(): Observable<Vehicle[]> {
    return this.httpClient.get<Vehicle[]>(`${this.host}/vehicle/all`);
  }

  addVehicle(vehicleForm: FormData): Observable<Vehicle> {
    return this.httpClient.post<Vehicle>(`${this.host}/vehicle/add`, vehicleForm)
  }

  updateVehicle(formData: FormData): Observable<Vehicle> {
    return this.httpClient.post<Vehicle>(`${this.host}/vehicle/add`, formData)
  }

  deleteVehicle(registeredNumber: string): Observable<CustomHttpRespone> {
    return this.httpClient.delete<CustomHttpRespone>(`${this.host}/vehicle/delete/${registeredNumber}`)
  }

  addVehicleToLocalCache(vehicle: Vehicle[]): void {
    localStorage.setItem('users', JSON.stringify(vehicle));
  }

  addVehicleFormData(loggedIn: string, vehicle: Vehicle) : FormData {
    const formData = new FormData();
    formData.append('currentVehicle', loggedIn);
    formData.append('registeredNumber', vehicle.registeredNumber);
    formData.append('owner', vehicle.owner);
    formData.append('addresses', vehicle.addresses);
    formData.append('brand', vehicle.brand);
    formData.append('productionYear', JSON.stringify(vehicle.productionYear));
    formData.append('cylinderCapacity', JSON.stringify(vehicle.cylinderCapacity));
    formData.append('color', vehicle.color);
    formData.append('fuel', vehicle.fuel);

    return formData;
  }
}
