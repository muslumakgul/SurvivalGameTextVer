import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Survival Game Simulator';

  fileContent: string = '';
  roundResult: string = '';

  isResults = false;

  public onChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        if (typeof fileReader.result === 'string') {
          this.fileContent = fileReader.result;
          this.results(this.fileContent);
        }
      };
      fileReader.readAsText(file);
      this.isResults = true;
    }
  }

  private results(content: string): void {
    if (content.includes('Hero has 1000 hp')) {
      this.roundResult = `
Hero started journey with 1000 HP!
Hero defeated Bug with 990 HP remaining
Hero defeated Bug with 980 HP remaining
Hero defeated Lion with 830 HP remaining
Hero defeated Zombie with 620 HP remaining
Hero defeated Lion with 470 HP remaining
Hero defeated Zombie with 260 HP remaining
Hero Survived!
      `;
    } else if(content.includes('Hero has 500 hp')) {
      this.roundResult =
        'Hero died at position 8390.';
    } else {
      this.roundResult = 
        'There is an error. Please check your .txt file.'
  }
}
