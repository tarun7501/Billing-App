import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateBillItemPayload } from '../../models/bill.model';

interface StudioPricing {
    size: string;
    minCopies: number;
    basePrice: number;
    extraCopyPrice: number;
}

interface StudioUIItem {
    size: string;
    copies: number;
    total: number;
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
    @Output() itemsChange = new EventEmitter<CreateBillItemPayload[]>();
   

    open = true;

    photoServiceId = 2; // Studio Photo

    // 🔥 FULL & CORRECT PRICING MAP
    pricingRules: StudioPricing[] = [
        { size: '4x6', minCopies: 3, basePrice: 150, extraCopyPrice: 20 },
        { size: '5x7', minCopies: 3, basePrice: 180, extraCopyPrice: 30 },
        { size: '6x9', minCopies: 2, basePrice: 150, extraCopyPrice: 70 },
        { size: '8x12', minCopies: 1, basePrice: 150, extraCopyPrice: 130 },
        { size: '10x15', minCopies: 1, basePrice: 300, extraCopyPrice: 250 },
        { size: '12x18', minCopies: 1, basePrice: 400, extraCopyPrice: 350 },
        { size: '10x24', minCopies: 1, basePrice: 800, extraCopyPrice: 700 },
        { size: '20x24', minCopies: 1, basePrice: 900, extraCopyPrice: 900 },
        { size: '20x30', minCopies: 1, basePrice: 1200, extraCopyPrice: 1200 },
        { size: '20x40', minCopies: 1, basePrice: 1400, extraCopyPrice: 1400 },
        { size: '24x24', minCopies: 1, basePrice: 1500, extraCopyPrice: 1500 },
        { size: '24x30', minCopies: 1, basePrice: 1700, extraCopyPrice: 1700 },
        { size: '24x36', minCopies: 1, basePrice: 1800, extraCopyPrice: 1800 },
        { size: '24x40', minCopies: 1, basePrice: 1900, extraCopyPrice: 1900 },
    ];

    items: StudioUIItem[] = [];
    sum = 0;

    toggle() {
        this.open = !this.open;
    }

    getPricing(size: string): StudioPricing {
        return this.pricingRules.find(p => p.size === size)!;
    }

    calculateTotal(item: StudioUIItem) {
        const pricing = this.getPricing(item.size);

        // enforce minimum copies
        if (item.copies < pricing.minCopies) {
            item.copies = pricing.minCopies;
        }

        const extraCopies = item.copies - pricing.minCopies;
        item.total = pricing.basePrice + (extraCopies * pricing.extraCopyPrice);

        this.emitSubtotalAndItems();
    }

    addRow() {
        // Pick default size (first in list)
        const defaultPricing = this.pricingRules[0];

        this.items.push({
            size: defaultPricing.size,
            copies: defaultPricing.minCopies,   // ✅ size-based minimum
            total: defaultPricing.basePrice,    // ✅ correct base price
        });

        this.emitSubtotalAndItems();
    }


    remove(index: number) {
        this.items.splice(index, 1);
        this.emitSubtotalAndItems();
    }

    private emitSubtotalAndItems() {
        this.sum = this.items.reduce((s, i) => s + i.total, 0);
        this.subtotalChange.emit(this.sum);

        const payload: CreateBillItemPayload[] = this.items.map(i => {
            const pricing = this.getPricing(i.size);
            return {
                photoServiceId: this.photoServiceId,
                photoSizeId: this.mapSizeToId(i.size),
                quantity: i.copies,
                unitPrice: pricing.extraCopyPrice,
            };
        });

        this.itemsChange.emit(payload);
    }

    // 🔧 TEMP helper (replace with API later)
    private mapSizeToId(size: string): number {
        const map: Record<string, number> = {
            '4x6': 1,
            '5x7': 2,
            '6x9': 3,
            '8x12': 4,
            '10x15': 5,
            '12x18': 6,
            '10x24': 7,
            '20x24': 8,
            '20x30': 9,
            '20x40': 10,
            '24x24': 11,
            '24x30': 12,
            '24x36': 13,
            '24x40': 14,
        };
        return map[size];
    }

    onSizeChange(item: StudioUIItem) {
        const pricing = this.getPricing(item.size);

        // 🔥 ALWAYS reset copies to new minCopies
        item.copies = pricing.minCopies;
        item.total = pricing.basePrice;

        this.emitSubtotalAndItems();
    }
    onCopiesChange(item: StudioUIItem) {
        const pricing = this.getPricing(item.size);

        if (item.copies < pricing.minCopies) {
            item.copies = pricing.minCopies;
        }

        const extraCopies = item.copies - pricing.minCopies;
        item.total = pricing.basePrice + (extraCopies * pricing.extraCopyPrice);

        this.emitSubtotalAndItems();
    }
}