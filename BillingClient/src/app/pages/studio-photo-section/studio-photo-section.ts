import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface StudioPricing {
    size: string;
    minCopies: number;
    basePrice: number;
    extraCopyPrice: number;
}

@Component({
    selector: 'app-studio-photo-section',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './studio-photo-section.html',
    styleUrl: './studio-photo-section.css',
})
export class StudioPhotoSection {
    @Output() subtotalChange = new EventEmitter<number>();

    open = true;

    pricingRules: StudioPricing[] = [
        { size: '4x6', minCopies: 3, basePrice: 150, extraCopyPrice: 20 },
        { size: '5x7', minCopies: 3, basePrice: 150, extraCopyPrice: 20 },
        { size: '6x8', minCopies: 5, basePrice: 300, extraCopyPrice: 30 },
        { size: '8x10', minCopies: 5, basePrice: 400, extraCopyPrice: 40 },
        { size: '10x12', minCopies: 10, basePrice: 800, extraCopyPrice: 50 },
    ];

    items: any[] = [];

    toggle() {
        this.open = !this.open;
    }

    getPricing(size: string): StudioPricing {
        return this.pricingRules.find((p) => p.size === size)!;
    }

    calculateTotal(item: any) {
        const pricing = this.getPricing(item.size);

        if (item.copies < pricing.minCopies) {
            item.copies = pricing.minCopies;
        }

        const extra = item.copies - pricing.minCopies;
        item.total = pricing.basePrice + extra * pricing.extraCopyPrice;

        this.emitSubtotal();
    }

    addRow() {
        const pricing = this.pricingRules[0];

        this.items.push({
            size: pricing.size,
            copies: pricing.minCopies,
            total: pricing.basePrice,
        });

        this.emitSubtotal();
    }

    remove(index: number) {
        this.items.splice(index, 1);
        this.emitSubtotal();
    }

    emitSubtotal() {
        const sum = this.items.reduce((s, i) => s + i.total, 0);
        this.subtotalChange.emit(sum);
    }
}
