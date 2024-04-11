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
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'study-abril-signals';

  protected readonly items: Item[] = [
    { id: 1, $isActive: signal(true) },
    { id: 2, $isActive: signal(false) },
    { id: 3, $isActive: signal(true) },
  ];

  protected readonly $activeItems = computed(() => {
    const ids = [];
    for (const item of this.items) {
      if (item.$isActive()) {
        ids.push(item.id);
      }
    }
    return ids.join(', ');
  });

  protected addItem() {
    this.items.push({
      id: this.items.length + 1,
      $isActive: signal(false),
    });
  }
}
