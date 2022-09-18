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

  addVehicle(formData: FormData): Observable<Vehicle> {
    return this.httpClient.post<Vehicle>(`${this.host}/vehicle/add`, formData)
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
}
