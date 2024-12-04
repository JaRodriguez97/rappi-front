import { Component, OnInit } from '@angular/core';
import { DeviceService } from '@services/device.service';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.css'],
})
export class InfoUserComponent implements OnInit {
  loading = false;
  message = '';

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.getDeviceInfo();
  }

  getDeviceInfo(): void {
    this.loading = true;
    const userAgent = navigator.userAgent;
    console.log("🚀 ~ InfoUserComponent ~ getDeviceInfo ~ navigator:", navigator)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const data = {
          userAgent,
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          },
        };

        this.deviceService.sendDeviceInfo(data).subscribe(
          (response) => {
            this.loading = false;
            this.message = 'Información enviada correctamente.';
            console.log(response);
          },
          (error) => {
            this.loading = false;
            this.message = 'Error al enviar información.';
            console.error(error);
          }
        );
      },
      (error) => {
        this.loading = false;
        this.message = 'No se pudo obtener la ubicación.';
        console.error(error);
      }
    );
  }
}
