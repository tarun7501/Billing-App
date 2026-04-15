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
    currentPage = 1;
    pageSize = 10;
    totalRecords = 0;
    totalPages = 0;
    searchTimeout: any;
    totalCustomers: number = 0;

    constructor(
        private router: Router,
        private customersService: CustomersService,
        private cdr: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        this.loadCustomers();
        this.loadTotals();
    }

    loadCustomers() {
        this.isLoading = true;

        this.customersService.getCustomerSummary(this.currentPage, this.pageSize, this.searchQuery).subscribe({
            next: (res: any) => {
                this.customers = res.data;
                this.filteredCustomers = [...this.customers];

                this.totalRecords = res.totalCount;
                this.totalPages = Math.ceil(this.totalRecords / this.pageSize);

                // this.calculateTotals();

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

    loadTotals() {
    this.customersService.getCustomerTotals().subscribe({
        next: (res) => {
            this.totalCustomers = res.totalCustomers;
            this.totalBills = res.totalBills;
            this.totalPending = res.totalPending;
            this.cdr.detectChanges();
        }
    });
}

    calculateTotals() {
        this.totalBills = this.customers.reduce((sum, c) => sum + c.totalBills, 0);
        this.totalPending = this.customers.reduce((sum, c) => sum + c.pendingBalance, 0);
    }

    onSearchChange() {
        clearTimeout(this.searchTimeout);

        this.searchTimeout = setTimeout(() => {
            this.currentPage = 1;
            this.loadCustomers();
        }, 400);
    }

    nextPage() {
        if (this.currentPage * this.pageSize < this.totalRecords) {
            this.currentPage++;
            this.loadCustomers();
        }
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.loadCustomers();
        }
    }

    onViewCustomer(id: string) {
        this.router.navigate(['/customers', id]);
    }
}
