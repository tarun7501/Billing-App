import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

interface BillItem {
    id: string;
    photoSize: string;
    numberOfCopies: number;
    unitPrice: number;
    total: number;
    extraCopies?: number;
    laminationType?: string;
    laminationFinish?: string;
}

interface Bill {
    id: string;
    billNumber: string;
    date: string;
    customerName: string;
    phone: string;
    email?: string;
    status: 'Cleared' | 'Pending';
    subtotal: number;
    discount: number;
    totalAmount: number;
    advanceAmount: number;
    balanceAmount: number;
    mobilePhotoItems: BillItem[];
    studioPhotoItems: BillItem[];
    laminationItems: BillItem[];
}

@Component({
    selector: 'app-bill-details',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './bill-details.html',
    styleUrl: './bill-details.css',
})
export class BillDetails {
    bill?: Bill;

    // 🔴 TEMP mock data (replace with API later)
    mockBills: Bill[] = [
        {
            id: '1',
            billNumber: 'BILL-001',
            date: '2026-01-10',
            customerName: 'Roma Sahu',
            phone: '6370657015',
            email: 'ravi@gmail.com',
            status: 'Pending',
            subtotal: 1200,
            discount: 100,
            totalAmount: 1100,
            advanceAmount: 500,
            balanceAmount: 600,
            mobilePhotoItems: [{ id: 'm1', photoSize: '4x6', numberOfCopies: 10, unitPrice: 15, total: 150 }],
            studioPhotoItems: [
                { id: 's1', photoSize: '5x7', numberOfCopies: 5, extraCopies: 2, unitPrice: 150, total: 190 },
            ],
            laminationItems: [
                {
                    id: 'l1',
                    photoSize: '6x9',
                    numberOfCopies: 2,
                    laminationType: 'Bit',
                    laminationFinish: 'Glossy',
                    unitPrice: 200,
                    total: 400,
                },
            ],
        },
    ];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
    ) {
        const billId = this.route.snapshot.paramMap.get('id');
        this.bill = this.mockBills.find((b) => b.id === billId);
    }

    goBack() {
        this.router.navigate(['/bills']);
    }

    downloadPDF() {
        console.log('Downloading PDF for bill:', this.bill?.billNumber);
    }

    shareWhatsApp() {
        if (!this.bill) return;

        const message = `Bill Details:\nBill No: ${this.bill.billNumber}\nCustomer: ${this.bill.customerName}\nTotal: ₹${this.bill.totalAmount}\nBalance: ₹${this.bill.balanceAmount}`;

        const url = `https://wa.me/${this.bill.phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }

    markAsCleared() {
        if (this.bill) {
            this.bill.status = 'Cleared';
            this.bill.balanceAmount = 0;
        }
    }
}
