import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateBillItemPayload } from '../../models/bill.model';

interface LaminationPricing {
    size: string;
    type: string;
    finish: string;
    price: number;
}

@Component({
    selector: 'app-lamination-photo-section',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './lamination-photo-section.html',
    styleUrl: './lamination-photo-section.css',
})
export class LaminationPhotoSection {
    @Output() subtotalChange = new EventEmitter<number>();
    @Output() itemsChange = new EventEmitter<CreateBillItemPayload[]>();
    emitChanges() {
        this.itemsChange.emit(this.items);
    }

    open = true;

    sizes = ['4x6', '5x7', '6x9', '8x10'];
    types = ['Frame', 'Bit'];
    finishes = ['Glossy', 'Matte'];

    pricingRules: LaminationPricing[] = [
        { size: '4x6', type: 'Frame', finish: 'Glossy', price: 50 },
        { size: '4x6', type: 'Frame', finish: 'Matte', price: 60 },
        { size: '4x6', type: 'Bit', finish: 'Glossy', price: 80 },
        { size: '4x6', type: 'Bit', finish: 'Matte', price: 90 },

        { size: '5x7', type: 'Frame', finish: 'Glossy', price: 70 },
        { size: '5x7', type: 'Frame', finish: 'Matte', price: 80 },
        { size: '5x7', type: 'Bit', finish: 'Glossy', price: 100 },
        { size: '5x7', type: 'Bit', finish: 'Matte', price: 110 },

        { size: '6x9', type: 'Frame', finish: 'Glossy', price: 100 },
        { size: '6x9', type: 'Frame', finish: 'Matte', price: 110 },
        { size: '6x9', type: 'Bit', finish: 'Glossy', price: 200 },
        { size: '6x9', type: 'Bit', finish: 'Matte', price: 300 },

        { size: '8x10', type: 'Frame', finish: 'Glossy', price: 150 },
        { size: '8x10', type: 'Frame', finish: 'Matte', price: 160 },
        { size: '8x10', type: 'Bit', finish: 'Glossy', price: 250 },
        { size: '8x10', type: 'Bit', finish: 'Matte', price: 280 },
    ];

    items: any[] = [];
    sum: any;

    toggle() {
        this.open = !this.open;
    }

    calculate(item: any) {
        const rule = this.pricingRules.find(
            (r) => r.size === item.size && r.type === item.type && r.finish === item.finish,
        );

        if (rule) {
            item.unitPrice = rule.price;
            item.total = rule.price * item.qty;
        } else {
            item.unitPrice = 0;
            item.total = 0;
        }

        this.emitSubtotal();
    }

    addRow() {
        const item = {
            size: this.sizes[0],
            type: this.types[0],
            finish: this.finishes[0],
            qty: 1,
            unitPrice: 0,
            total: 0,
        };

        this.calculate(item); // 🔥 auto price on add
        this.items.push(item);
        this.emitSubtotal();
        this.emitChanges(); // 🔥 emit changes on add
    }

    remove(index: number) {
        this.items.splice(index, 1);
        this.emitSubtotal();
        this.emitChanges(); // 🔥 emit changes on remove
    }

    emitSubtotal() {
        this.sum = this.items.reduce((s, i) => s + i.total, 0);
        this.subtotalChange.emit(this.sum);
    }
}
