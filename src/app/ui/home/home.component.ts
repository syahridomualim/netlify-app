import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Vehicle } from 'src/app/model/vehicle';
import { VehicleService } from 'src/app/service/vehicle.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'vehicle-inventory';

  constructor(private vehicleService: VehicleService) { }
  ngOnInit(): void {
    this.getVehicles()
  }

  vehicles!: Vehicle[] | undefined;
  selectedVehicle: Vehicle | undefined;
  refreshing = false;
  subscribtions = new SubSink();

  getVehicles() {
    this.refreshing = true;
    this.subscribtions.add(
      this.vehicleService.getVehicles().subscribe(response => {
        console.log(response);
        this.vehicleService.addVehicleToLocalCache(response)
        this.vehicles = response;
        this.refreshing = false;

      }, error => {
        this.refreshing = false;
      }
      )
    )
  }

  onSelectedVehicle(selectedVehicle: Vehicle) {
    this.selectedVehicle = selectedVehicle;
    this.clickButton('openVehicleInfo');
  }

  clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }

  addNewVehicle(vehicleForm: NgForm) {
    const formData = this.vehicleService.addVehicleFormData(null!, vehicleForm.value)
    this.subscribtions.add(
      this.vehicleService.addVehicle(formData).subscribe(response => {
        console.log(response);
        this.clickButton('new-vehicle-close');
        vehicleForm.reset()
        this.getVehicles()
      }, error => {
        console.log(error.error.message);
      }
      )
    )
  }

  saveNewVehicle() {
    this.clickButton('new-vehicle-save');
  }
}
