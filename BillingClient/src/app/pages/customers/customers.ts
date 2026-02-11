import { CustomersService } from './../../services/customers.service';
import { Component, signal, computed, OnInit } from '@angular/core';
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
    imports: [CommonModule, FormsModule, MatIconModule, HttpClientModule],
    templateUrl: './customers.html',
    styleUrl: './customers.css',
    standalone: true,
})
export class Customers implements OnInit {
    constructor(
        private router: Router,
        private CustomersService: CustomersService,
    ) {}

    searchQuery = signal('');
    customers: Customer[] = [];
    isLoading = signal(true);

    ngOnInit(): void {
        this.loadCustomers();
    }

    loadCustomers() {
        this.isLoading.set(true);

        this.CustomersService.getCustomerSummary().subscribe({
            next: (data) => {
                this.customers = data;
                this.isLoading.set(false);
            },
            error: (err) => {
                alert('Failed to load customers. Please try again later.');
                this.isLoading.set(false);
            },
        });
    }

    filteredCustomers = computed(() => {
        const query = this.searchQuery().toLowerCase();

        return this.customers.filter(
            (customer) =>
                customer.name.toLowerCase().includes(query) ||
                customer.phone.includes(query) ||
                customer.email?.toLowerCase().includes(query),
        );
    });

    totalBills = computed(() => this.customers.reduce((sum, c) => sum + c.totalBills, 0));
    totalPending = computed(() => this.customers.reduce((sum, c) => sum + c.pendingBalance, 0));

    onViewCustomer(id: string) {
        this.router.navigate(['/customers', id]);
    }

    onSearchChange(event: Event) {
        const value = (event.target as HTMLInputElement).value;
        this.searchQuery.set(value);
    }
}
