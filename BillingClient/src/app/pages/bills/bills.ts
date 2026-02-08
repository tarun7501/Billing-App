import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Bill {
    id: string;
    billNumber: string;
    date: string;
    customerName: string;
    phone: string;
    totalAmount: number;
    balanceAmount: number;
    status: 'Cleared' | 'Pending';
}

@Component({
    selector: 'app-bills',
    imports: [CommonModule, FormsModule],
    templateUrl: './bills.html',
    styleUrl: './bills.css',
})
export class Bills {
    searchQuery = '';

    // TEMP mock data (replace with API later)
    bills: Bill[] = [
        {
            id: '1',
            billNumber: 'BILL-001',
            date: '2026-01-10',
            customerName: 'Ravi Kumar',
            phone: '9876543210',
            totalAmount: 1200,
            balanceAmount: 200,
            status: 'Pending',
        },
        {
            id: '2',
            billNumber: 'BILL-002',
            date: '2026-01-12',
            customerName: 'Anita Sharma',
            phone: '9123456789',
            totalAmount: 800,
            balanceAmount: 0,
            status: 'Cleared',
        },
    ];

    constructor(private router: Router) {}

    get filteredBills(): Bill[] {
        const query = this.searchQuery.toLowerCase();
        return this.bills.filter(
            (bill) =>
                bill.billNumber.toLowerCase().includes(query) ||
                bill.customerName.toLowerCase().includes(query) ||
                bill.phone.includes(query),
        );
    }

    createBill() {
        this.router.navigate(['/bills/create']);
    }

    viewBill(id: string) {
        this.router.navigate(['/bills', id]);
    }
}
