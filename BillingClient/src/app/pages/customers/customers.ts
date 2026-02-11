import { CustomersService } from './../../services/customers.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

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
    standalone: true,
    imports: [CommonModule, FormsModule, MatIconModule, HttpClientModule],
    templateUrl: './customers.html',
    styleUrl: './customers.css',
})
export class Customers implements OnInit {
    searchQuery: string = '';
    customers: Customer[] = [];
    filteredCustomers: Customer[] = [];
    isLoading: boolean = true;

    totalBills: number = 0;
    totalPending: number = 0;

    constructor(
        private router: Router,
        private customersService: CustomersService,
        private cdr: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        this.loadCustomers();
    }

    loadCustomers() {
        this.isLoading = true;

        this.customersService.getCustomerSummary().subscribe({
            next: (data: Customer[]) => {
                this.customers = data;
                this.filteredCustomers = [...this.customers];

                this.calculateTotals();

                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: () => {
                alert('Failed to load customers. Please try again later.');
                this.isLoading = false;
                this.cdr.detectChanges();
            },
        });
    }

    calculateTotals() {
        this.totalBills = this.customers.reduce((sum, c) => sum + c.totalBills, 0);
        this.totalPending = this.customers.reduce((sum, c) => sum + c.pendingBalance, 0);
    }

    onSearchChange() {
        const query = this.searchQuery.toLowerCase();

        this.filteredCustomers = this.customers.filter(
            (customer) =>
                customer.name.toLowerCase().includes(query) ||
                customer.phone.includes(query) ||
                customer.email?.toLowerCase().includes(query),
        );
    }

    onViewCustomer(id: string) {
        this.router.navigate(['/customers', id]);
    }
}
