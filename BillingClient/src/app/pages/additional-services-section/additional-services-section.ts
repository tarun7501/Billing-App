import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateBillItemPayload } from '../../models/bill.model';

interface AdditionalServiceUIItem {
    description: string;
    qty: number;
    unitPrice: number;
    total: number;
}

@Component({
    selector: 'app-additional-services-section',
    imports: [CommonModule, FormsModule],
    templateUrl: './additional-services-section.html',
    styleUrl: './additional-services-section.css',
})
export class AdditionalServicesSection {
    @Output() subtotalChange = new EventEmitter<number>();
    @Output() itemsChange = new EventEmitter<CreateBillItemPayload[]>();

    open = true;
    photoServiceId = 4;

    items: AdditionalServiceUIItem[] = [];
    sum = 0;

    toggle() {
        this.open = !this.open;
    }

    addRow() {
        const item: AdditionalServiceUIItem = {
            description: '',
            qty: 1,
            unitPrice: 0,
            total: 0,
        };

        this.items.push(item);
        this.emitAll();
    }

    remove(index: number) {
        this.items.splice(index, 1);
        this.emitAll();
    }

    calculate(item: AdditionalServiceUIItem) {
        item.total = (item.qty || 0) * (item.unitPrice || 0);
        this.emitAll();
    }

    onTotalChange(item: AdditionalServiceUIItem) {
        item.total = Number(item.total) || 0;

        if (item.qty > 0) {
            item.unitPrice = item.total / item.qty;
        }

        this.emitAll();
    }

    emitAll() {
        this.sum = this.items.reduce((s, i) => s + (i.total || 0), 0);
        this.subtotalChange.emit(this.sum);

        const payload: CreateBillItemPayload[] = this.items.map((i) => ({
            photoServiceId: this.photoServiceId,

            // ✅ Important for backend
            photoSizeId: null,

            laminationTypeId: null,
            laminationFinishId: null,
            snapNumber: undefined,

            quantity: i.qty,
            unitPrice: i.unitPrice,
            total: i.total,

            // ✅ Backend mapping
            itemName: i.description,
        }));

        this.itemsChange.emit(payload);
    }
}
