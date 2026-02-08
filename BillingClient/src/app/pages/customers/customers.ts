import { Component, EventEmitter, Output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

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

@Component({
    selector: 'app-customers',
    imports: [CommonModule, FormsModule, MatIconModule],
    templateUrl: './customers.html',
    styleUrl: './customers.css',
    standalone: true,
})
export class Customers {
    constructor(private router: Router) {}

    // 🔹 Search
    searchQuery = signal('');

    // 🔹 Dummy customers data (temporary)
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

    // 🔹 Filtering (same logic as React)
    filteredCustomers = computed(() => {
        const query = this.searchQuery().toLowerCase();

        return this.customers.filter(
            (customer) =>
                customer.name.toLowerCase().includes(query) ||
                customer.phone.includes(query) ||
                customer.email?.toLowerCase().includes(query),
        );
    });

    // 🔹 Stats
    totalBills = computed(() => this.customers.reduce((sum, c) => sum + c.totalBills, 0));

    totalPending = computed(() => this.customers.reduce((sum, c) => sum + c.pendingBalance, 0));

    // 🔹 Action
    onViewCustomer(id: string) {
        this.router.navigate(['/customers', id]);
    }

    onSearchChange(event: Event) {
        const value = (event.target as HTMLInputElement).value;
        this.searchQuery.set(value);
    }
}
