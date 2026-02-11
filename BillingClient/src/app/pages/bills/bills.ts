import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BillService } from '../../services/bill.service';
import { ChangeDetectorRef } from '@angular/core';

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
export class Bills implements OnInit {
    searchQuery = '';
    bills: Bill[] = [];
    filteredBills: Bill[] = [];
    isLoading: boolean = true;

    constructor(
        private router: Router,
        private billService: BillService,
        private cdr: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.billService.getAllBills().subscribe({
            next: (data: any[]) => {
                this.bills = data.map(
                    (item): Bill => ({
                        id: item.id,
                        billNumber: item.billNumber,
                        date: item.billDate,
                        customerName: item.customer?.name ?? '',
                        phone: item.customer?.phoneNumber ?? '',
                        totalAmount: Number(item.totalAmount),
                        balanceAmount: Number(item.balanceAmount),
                        status: item.balanceAmount > 0 ? 'Pending' : 'Cleared',
                    }),
                );

                this.filteredBills = [...this.bills];
                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
                this.cdr.detectChanges();
            },
        });
    }

    onSearchChange() {
        const query = this.searchQuery.toLowerCase();
        this.filteredBills = this.bills.filter(
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
