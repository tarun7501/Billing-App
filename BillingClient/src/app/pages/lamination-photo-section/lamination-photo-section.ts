import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateBillItemPayload } from '../../models/bill.model';

interface LaminationUIItem {
    size: string;
    type: 'Bit' | 'Frame';
    finish: string;
    qty: number;
    unitPrice: number;
    total: number;
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

    open = true;
    photoServiceId = 3;
    sizes = ['6x9', '8x12', '10x15', '12x18', '16x24', '20x24', '20x30', '20x40', '24x24', '24x30', '24x36', '24x40'];

    types: Array<'Frame' | 'Bit'> = ['Frame', 'Bit'];
    finishes = ['Matte', 'Glossy', 'Glitter', '3D', 'Canvas'];
    private basePrice: Record<string, { Bit?: number; Frame: number }> = {
        '6x9': { Bit: 250, Frame: 350 },
        '8x12': { Bit: 400, Frame: 500 },
        '10x15': { Bit: 600, Frame: 800 },
        '12x18': { Bit: 800, Frame: 1200 },
        '16x24': { Frame: 2600 },
        '20x24': { Frame: 3300 },
        '20x30': { Frame: 3600 },
        '20x40': { Frame: 4000 },
        '24x24': { Frame: 4500 },
        '24x30': { Frame: 5000 },
        '24x36': { Frame: 5500 },
        '24x40': { Frame: 6000 },
    };

    private finishExtraBySize: Record<string, number> = {
        '6x9': 100,
        '8x12': 100,
        '10x15': 150,
        '12x18': 200,
        '16x24': 300,
        '20x24': 400,
        '20x30': 400,
        '20x40': 400,
        '24x24': 400,
        '24x30': 400,
        '24x36': 400,
        '24x40': 400,
    };

    items: LaminationUIItem[] = [];
    sum = 0;

    toggle() {
        this.open = !this.open;
    }

    addRow() {
        const item: LaminationUIItem = {
            size: '6x9',
            type: 'Frame',
            finish: 'Matte',
            qty: 1,
            unitPrice: 0,
            total: 0,
        };

        this.calculate(item);
        this.items.push(item);
        this.emitAll();
    }

    remove(index: number) {
        this.items.splice(index, 1);
        this.emitAll();
    }

    calculate(item: LaminationUIItem) {
        if (item.type === 'Bit' && !this.basePrice[item.size].Bit) {
            item.type = 'Frame';
        }

        const base = item.type === 'Bit' ? this.basePrice[item.size].Bit! : this.basePrice[item.size].Frame;
        const finishExtra = item.finish === 'Matte' ? 0 : (this.finishExtraBySize[item.size] ?? 0);
        item.unitPrice = base + finishExtra;
        item.total = item.unitPrice * item.qty;
        this.emitAll();
    }

    private emitAll() {
        this.sum = this.items.reduce((s, i) => s + i.total, 0);
        this.subtotalChange.emit(this.sum);

        const payload: CreateBillItemPayload[] = this.items.map((i) => ({
            photoServiceId: this.photoServiceId,
            photoSizeId: this.mapSizeToId(i.size),
            laminationTypeId: i.type === 'Bit' ? 1 : 2,
            laminationFinishId: this.mapFinishToId(i.finish),
            quantity: i.qty,
            unitPrice: i.unitPrice,
        }));

        this.itemsChange.emit(payload);
    }

    private mapSizeToId(size: string): number {
        const map: Record<string, number> = {
            '6x9': 3,
            '8x12': 4,
            '10x15': 5,
            '12x18': 6,
            '16x24': 7,
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

    private mapFinishToId(finish: string): number {
        const map: Record<string, number> = {
            Matte: 1,
            Glossy: 2,
            Glitter: 3,
            '3D': 4,
            Canvas: 5,
        };
        return map[finish];
    }
}
