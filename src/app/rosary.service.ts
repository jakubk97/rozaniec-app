import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RosaryService {
  private mysteries = {
    Monday: 'Radosne',
    Saturday: 'Radosne',
    Tuesday: 'Bolesne',
    Friday: 'Bolesne',
    Wednesday: 'Chwalebne',
    Sunday: 'Chwalebne',
    Thursday: 'Światła',
  };

  getTodayMystery(): string {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    return this.mysteries[today] || 'Radosne';
  }
}
