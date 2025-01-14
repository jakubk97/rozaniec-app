import { Component, HostListener } from '@angular/core';
import { RosaryService } from '../rosary.service';

@Component({
  selector: 'app-prayer',
  templateUrl: './prayer.component.html',
  styleUrls: ['./prayer.component.scss']
})
export class PrayerComponent {
  private mysteriesSets = {
    Radosne: [
      'Zwiastowanie NMP',
      'Nawiedzenie św. Elżbiety',
      'Narodzenie Pana Jezusa',
      'Ofiarowanie Pana Jezusa w świątyni',
      'Znalezienie Pana Jezusa w świątyni'
    ],
    Światła: [
      'Chrzest Jezusa w Jordanie',
      'Wesele w Kanie Galilejskiej',
      'Głoszenie Królestwa Bożego i wzywanie do nawrócenia',
      'Przemienienie na Górze Tabor',
      'Ustanowienie Eucharystii'
    ],
    Bolesne: [
      'Modlitwa Pana Jezusa w Ogrójcu',
      'Biczowanie Pana Jezusa',
      'Ukoronowanie cierniem Pana Jezusa',
      'Droga krzyżowa',
      'Ukrzyżowanie Pana Jezusa'
    ],
    Chwalebne: [
      'Zmartwychwstanie Pana Jezusa',
      'Wniebowstąpienie Pana Jezusa',
      'Zesłanie Ducha Świętego',
      'Wniebowzięcie NMP',
      'Ukoronowanie w niebie NMP'
    ]
  };

  currentMysterySet: string[];
  currentMysteryIndex = 0;
  currentPrayerIndex = 0;
  currentHailMaryIndex = 1;
  currentCycleIndex = 0; // 0 = Tajemnica, 1 = Modlitwy

  private prayers = [
    'Ojcze Nasz',
    'Zdrowaś Maryjo',
    'Chwała Ojcu'
  ];

  constructor(private rosaryService: RosaryService) {
    const todayMystery = this.rosaryService.getTodayMystery();
    this.currentMysterySet = this.mysteriesSets[todayMystery];
  }

  getCurrentDisplay(): string {
    if (this.currentCycleIndex === 0) {
      return `Tajemnica: ${this.currentMysterySet[this.currentMysteryIndex]}`;
    } else if (this.currentPrayerIndex === 1) {
      return `Zdrowaś Maryjo (${this.currentHailMaryIndex}/10)`;
    } else {
      return this.prayers[this.currentPrayerIndex];
    }
  }

  next() {
    if (this.currentCycleIndex === 0) {
      this.currentCycleIndex = 1; // Przejście do modlitw
    } else {
      if (this.currentPrayerIndex === 1) {
        this.currentHailMaryIndex++;
        if (this.currentHailMaryIndex > 10) {
          this.currentHailMaryIndex = 1;
          this.currentPrayerIndex++;
        }
      } else {
        this.currentPrayerIndex++;
      }

      if (this.currentPrayerIndex >= this.prayers.length) {
        this.currentPrayerIndex = 0;
        this.currentMysteryIndex++;
        if (this.currentMysteryIndex >= this.currentMysterySet.length) {
          this.currentMysteryIndex = 0;
        }
        this.currentCycleIndex = 0;
      }
    }
  }

  previous() {
    if (this.currentCycleIndex === 1 && this.currentPrayerIndex === 1 && this.currentHailMaryIndex > 1) {
      this.currentHailMaryIndex--;
    } else if (this.currentCycleIndex === 1 && this.currentPrayerIndex > 0) {
      this.currentPrayerIndex--;
    } else if (this.currentCycleIndex === 1 && this.currentPrayerIndex === 0) {
      this.currentCycleIndex = 0;
    } else if (this.currentCycleIndex === 0 && this.currentMysteryIndex > 0) {
      this.currentMysteryIndex--;
      this.currentCycleIndex = 1;
      this.currentPrayerIndex = this.prayers.length - 1;
      this.currentHailMaryIndex = 10;
    }
  }

  @HostListener('swipeleft')
  onSwipeLeft() {
    this.next();
  }

  @HostListener('swiperight')
  onSwipeRight() {
    this.previous();
  }
}
