import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

type BillStatus = 'Cleared' | 'Pending';

interface Customer {
    id: string;
    name: string;
    phone: string;
    email?: string;
    totalBills: number;
    totalSpent: number;
    pendingBalance: number;
    lastBillDate: string;
}

interface Bill {
    id: string;
    billNumber: string;
    customerPhone: string;
    date: string;
    totalAmount: number;
    advanceAmount: number;
    balanceAmount: number;
    status: BillStatus;
}

@Component({
    selector: 'app-customers-bills',
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: './customers-bills.html',
    styleUrl: './customers-bills.css',
})
export class CustomersBills {
    @Input({ required: true }) customerPhone!: string;

    @Output() back = new EventEmitter<void>();
    @Output() viewBill = new EventEmitter<string>();

    /* ---------------- DUMMY DATA ---------------- */

    customers: Customer[] = [
        {
            id: '1',
            name: 'Ravi Kumar',
            phone: '9876543210',
            email: 'ravi.kumar@gmail.com',
            totalBills: 12,
            totalSpent: 24500,
            pendingBalance: 3500,
            lastBillDate: '2025-01-12',
        },
        {
            id: '2',
            name: 'Anita Sharma',
            phone: '9123456780',
            email: 'anita.sharma@gmail.com',
            totalBills: 8,
            totalSpent: 18000,
            pendingBalance: 0,
            lastBillDate: '2025-01-28',
        },
        {
            id: '3',
            name: 'Suresh Reddy',
            phone: '9988776655',
            email: 'suresh.reddy@gmail.com',
            totalBills: 15,
            totalSpent: 36200,
            pendingBalance: 4200,
            lastBillDate: '2025-02-03',
        },
        {
            id: '4',
            name: 'Pooja Mehta',
            phone: '9012345678',
            email: 'pooja.mehta@gmail.com',
            totalBills: 5,
            totalSpent: 9800,
            pendingBalance: 0,
            lastBillDate: '2024-12-20',
        },
    ];

    private billsData: Bill[] = [
        {
            id: 'BILL001',
            billNumber: 'INV-1001',
            customerPhone: '9876543210',
            date: '2025-01-10',
            totalAmount: 3000,
            advanceAmount: 2000,
            balanceAmount: 1000,
            status: 'Pending',
        },
        {
            id: 'BILL002',
            billNumber: 'INV-1002',
            customerPhone: '9876543210',
            date: '2025-01-25',
            totalAmount: 2700,
            advanceAmount: 2700,
            balanceAmount: 0,
            status: 'Cleared',
        },
        {
            id: 'BILL003',
            billNumber: 'INV-1003',
            customerPhone: '9876543210',
            date: '2025-02-02',
            totalAmount: 2500,
            advanceAmount: 2300,
            balanceAmount: 200,
            status: 'Pending',
        },
        {
            id: 'BILL004',
            billNumber: 'INV-2001',
            customerPhone: '9123456789',
            date: '2025-01-18',
            totalAmount: 3000,
            advanceAmount: 3000,
            balanceAmount: 0,
            status: 'Cleared',
        },
        {
            id: 'BILL005',
            billNumber: 'INV-2002',
            customerPhone: '9123456789',
            date: '2025-02-05',
            totalAmount: 2400,
            advanceAmount: 2400,
            balanceAmount: 0,
            status: 'Cleared',
        },
    ];

    /* ---------------- COMPUTED DATA ---------------- */

    customer = computed(() => this.customers.find((c) => c.id === '1'));

    bills = computed(() => this.billsData.filter((b) => b.id === 'BILL005'));

    /* ---------------- ACTIONS ---------------- */

    onBack() {
        this.back.emit();
    }

    onViewBill(billId: string) {
        this.viewBill.emit(billId);
    }

    downloadAllBills() {
        console.log('Downloading all bills for:', this.customer()?.name || 'Unknown Customer');
    }

    shareWhatsApp() {
        const customer = this.customer();
        if (!customer) return;

        const message =
            `Hi ${customer.name},\n\n` +
            `Your billing summary:\n` +
            `Total Bills: ${customer.totalBills}\n` +
            `Total Spent: ₹${customer.totalSpent}\n` +
            `Pending Balance: ₹${customer.pendingBalance}\n\n` +
            `Thank you for your business!\n- Rajan Digital Studio`;

        const url = `https://wa.me/${customer.phone}?text=${encodeURIComponent(message)}`;

        window.open(url, '_blank');
    }
}
