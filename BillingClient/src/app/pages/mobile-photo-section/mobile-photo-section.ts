import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-mobile-photo-section',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './mobile-photo-section.html',
    styleUrl: './mobile-photo-section.css',
})
export class MobilePhotoSection {
    @Output() subtotalChange = new EventEmitter<number>();

    open = true;

    sizes = [
        { size: '4x6', price: 15 },
        { size: '5x7', price: 25 },
        { size: '6x8', price: 20 },
    ];

    items: any[] = [];

    toggle() {
        this.open = !this.open;
    }

    add() {
        this.items.push({
            size: '4x6',
            qty: 1,
            price: 15,
            total: 15,
        });
        this.calculate();
    }

    update(item: any) {
        item.total = item.qty * item.price;
        this.calculate();
    }

    remove(i: number) {
        this.items.splice(i, 1);
        this.calculate();
    }

    calculate() {
        const subtotal = this.items.reduce((s, i) => s + i.total, 0);
        this.subtotalChange.emit(subtotal);
    }
}
