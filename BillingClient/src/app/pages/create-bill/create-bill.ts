import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MobilePhotoSection } from '../mobile-photo-section/mobile-photo-section';
import { StudioPhotoSection } from '../studio-photo-section/studio-photo-section';
import { LaminationPhotoSection } from './../lamination-photo-section/lamination-photo-section';
import { CreateBillItemPayload } from '../../models/bill.model';
import { BillService } from '../../services/bill.service';

@Component({
    selector: 'app-create-bill',
    standalone: true,
    imports: [CommonModule, FormsModule, MobilePhotoSection, StudioPhotoSection, LaminationPhotoSection],
    templateUrl: './create-bill.html',
    styleUrl: './create-bill.css',
})
export class CreateBill {
    customerName = '';
    phone = '';
    email = '';

    billNumber = 'BILL-003';
    billDate = new Date().toISOString().split('T')[0];
    status: 'Pending' | 'Cleared' = 'Pending';

    mobileSubtotal = 0;
    studioSubtotal = 0;
    laminationSubtotal = 0;

    discount = 0;
    advanceAmount = 0;
    private billItems: CreateBillItemPayload[] = [];

    constructor(
        private router: Router,
        private billService: BillService,
    ) {}

    get subtotal() {
        return this.mobileSubtotal + this.studioSubtotal + this.laminationSubtotal;
    }

    get totalAmount() {
        return this.subtotal - this.discount;
    }

    get balanceAmount() {
        return this.totalAmount - this.advanceAmount;
    }

    cancel() {
        this.router.navigate(['/bills']);
    }

    save() {
        if (!this.customerName || !this.phone) {
            alert('Customer name and phone are required');
            return;
        }

        if (this.billItems.length === 0) {
            alert('Please add at least one bill item');
            return;
        }

        const payload = {
            customer: {
                name: this.customerName,
                phoneNumber: this.phone,
                email: this.email || null,
            },
            billDate: this.billDate,
            discountAmount: this.discount || 0,
            advanceAmount: this.advanceAmount || 0,
            items: this.billItems,
        };

        this.billService.createBill(payload).subscribe({
            next: (billId: number) => {
                this.router.navigate(['/bills']);
            },
            error: (err) => {
                alert('Failed to create bill. Please try again.');
            },
        });
    }

    onMobileItemsChange(items: CreateBillItemPayload[], subtotal: number) {
        this.replaceItems(1, items);
        this.mobileSubtotal = subtotal;
    }

    onStudioItemsChange(items: CreateBillItemPayload[], subtotal: number) {
        this.replaceItems(2, items);
        this.studioSubtotal = subtotal;
    }

    onLaminationItemsChange(items: CreateBillItemPayload[], subtotal: number) {
        this.replaceItems(3, items);
        this.laminationSubtotal = subtotal;
    }

    private replaceItems(serviceId: number, items: CreateBillItemPayload[]) {
        this.billItems = this.billItems.filter((x) => x.photoServiceId !== serviceId);
        this.billItems.push(...items);
    }
}
