import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '../shared/shared.module';
import { LandingRoutingModule } from './landing-routing.module';

import { LandingComponent } from './landing.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [LandingComponent, NotFoundComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    SharedModule,
    LandingRoutingModule,
  ],
})
export class LandingModule {}
