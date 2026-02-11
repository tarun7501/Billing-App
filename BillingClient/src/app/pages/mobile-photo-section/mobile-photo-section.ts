import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateBillItemPayload } from '../../models/bill.model';
import { PhotoSize } from '../../models/photos.model';
import { PhotoService } from '../../services/photo.service';

interface MobileUIItem {
    sizeId: number;
    qty: number;
    unitPrice: number;
    total: number;
}

@Component({
    selector: 'app-mobile-photo-section',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './mobile-photo-section.html',
})
export class MobilePhotoSection implements OnInit {
    @Output() subtotalChange = new EventEmitter<number>();
    @Output() itemsChange = new EventEmitter<CreateBillItemPayload[]>();

    open = true;
    subtotal = 0;
    photoServiceId = 1;
    sizes: PhotoSize[] = [];
    items: MobileUIItem[] = [];

    private priceMap: Record<string, number> = {
        '4x6': 20,
        '5x7': 40,
        '6x9': 80,
        '8x12': 150,
        '10x15': 300,
        '12x18': 400,
        '16x24': 800,
    };

    constructor(private photoService: PhotoService) {}

    ngOnInit() {
        this.photoService.getPhotoSizes().subscribe((sizes) => {
            this.sizes = sizes;
        });
    }

    toggle() {
        this.open = !this.open;
    }

    add() {
        if (this.sizes.length === 0) return;

        const defaultSize = this.sizes[0];
        const unitPrice = this.priceMap[defaultSize.label] ?? 0;

        this.items.push({
            sizeId: defaultSize.id,
            qty: 1,
            unitPrice,
            total: unitPrice,
        });

        this.recalculate();
    }

    onSizeChange(item: MobileUIItem) {
        item.sizeId = Number(item.sizeId);
        const size = this.sizes.find((s) => s.id === item.sizeId);
        if (!size) return;

        item.unitPrice = this.priceMap[size.label] ?? 0;
        item.total = item.qty * item.unitPrice;
        this.recalculate();
    }

    onQtyChange(item: MobileUIItem) {
        item.total = item.qty * item.unitPrice;
        this.recalculate();
    }

    remove(index: number) {
        this.items.splice(index, 1);
        this.recalculate();
    }

    private recalculate() {
        this.subtotal = this.items.reduce((s, i) => s + i.total, 0);
        this.subtotalChange.emit(this.subtotal);
        this.emitPayload();
    }

    private emitPayload() {
        const payload: CreateBillItemPayload[] = this.items.map((i) => ({
            photoServiceId: this.photoServiceId,
            photoSizeId: i.sizeId,
            quantity: i.qty,
            unitPrice: i.unitPrice,
        }));

        this.itemsChange.emit(payload);
    }
}
