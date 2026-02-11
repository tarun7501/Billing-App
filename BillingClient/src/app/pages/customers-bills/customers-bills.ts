import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from '../../services/customers.service';

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
export class CustomersBills implements OnInit {
    customer?: Customer;
    bills: Bill[] = [];

    isLoading: boolean = true;
    customerId: string | null = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private customersService: CustomersService,
        private cdr: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.customerId = params.get('id');

            if (!this.customerId) {
                this.customer = undefined;
                this.bills = [];
                this.isLoading = false;
                return;
            }

            this.isLoading = true;
            this.customer = undefined;
            this.bills = [];

            this.loadCustomerBills(this.customerId);
        });
    }

    private loadCustomerBills(id: string) {
        this.customersService.getCustomerBills(id).subscribe({
            next: (response) => {
                this.customer = response.customer;
                this.bills = response.bills;
                this.cdr.detectChanges();
            },
            error: (err) => {
                alert('Failed to load customer bills. Please try again later.');
                this.customer = undefined;
                this.bills = [];
            },
            complete: () => {
                this.isLoading = false;
                this.cdr.detectChanges();
            },
        });
    }

    onBack() {
        this.router.navigate(['/customers']);
    }

    onViewBill(billId: string) {
        this.router.navigate(['/bills', billId]);
    }
}
