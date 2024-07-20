import { Component } from '@angular/core';
import { PrincipleDashboardService } from './principle-dashboard.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-principle-dashboard',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule, MatProgressSpinnerModule, CommonModule],
  templateUrl: './principle-dashboard.component.html',
  styleUrl: './principle-dashboard.component.scss'
})
export class PrincipleDashboardComponent {
  disableRegButton = false;
  disableDownButton = true;
  isLoader = false;
  constructor(private principleDashboardSvc: PrincipleDashboardService) { }

  generateIDCardHandler() {
    this.disableRegButton = true;
    this.isLoader = true;
    this.principleDashboardSvc.generatePDF('generate_id_cards').subscribe(res => {
      if (res.status) this.isLoader = false;
    });
  }
  downloadIDCardHandler() {
    this.principleDashboardSvc.downloadPDF('download_id_cards').subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'id_cards.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Download error:', error);
    })
  }
}
