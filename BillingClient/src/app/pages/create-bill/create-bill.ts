import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MobilePhotoSection } from '../mobile-photo-section/mobile-photo-section';
import { StudioPhotoSection } from '../studio-photo-section/studio-photo-section';
import { LaminationPhotoSection } from './../lamination-photo-section/lamination-photo-section';

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

    constructor(private router: Router) {}

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
        console.log('Save bill');
    }
}
