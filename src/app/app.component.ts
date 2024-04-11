import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  ChangeDetectionStrategy,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';

export type Item = {
  id: number;
  $isActive: WritableSignal<boolean>;
};
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'study-abril-signals';

  itemsSignal: WritableSignal<Item[]> = signal([
    { id: 1, $isActive: signal(true) },
    { id: 2, $isActive: signal(false) },
    { id: 3, $isActive: signal(true) },
  ]);

  //PAI MANJA POUCCCOOOOO
  protected readonly $activeItems = computed(() => {
    const ids = [];
    for (const item of this.itemsSignal()) {
      if (item.$isActive()) {
        ids.push(item.id);
      }
    }
    return ids.join(', ');
  });



  protected addItem() {
    this.itemsSignal.update((v)=>
      [
        ...v,
        {
          id:v.length+1,
          $isActive:signal(false)
        }
      ]
    
    )
  }
}
