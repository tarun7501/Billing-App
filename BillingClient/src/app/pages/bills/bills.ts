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
    currentPage = 1;
    pageSize = 10;
    totalRecords = 0;
    totalPages = 0;
    searchTimeout: any;

    constructor(
        private router: Router,
        private billService: BillService,
        private cdr: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        this.loadBills();
    }

    loadBills() {
        this.isLoading = true;

        this.billService.getBills(this.currentPage, this.pageSize, this.searchQuery).subscribe({
            next: (res) => {
                this.totalRecords = res.totalCount;
                this.totalPages = Math.ceil(this.totalRecords / this.pageSize);

                this.bills = res.data.map(
                    (item: {
                        id: any;
                        billNumber: any;
                        billDate: any;
                        customer: { name: any; phoneNumber: any };
                        totalAmount: any;
                        balanceAmount: number;
                    }): Bill => ({
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
            error: () => {
                alert('Failed to load bills. Please try again later.');
                this.isLoading = false;
                this.cdr.detectChanges();
            },
        });
    }

    nextPage() {
        if (this.currentPage * this.pageSize < this.totalRecords) {
            this.currentPage++;
            this.loadBills();
        }
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.loadBills();
        }
    }

    onSearchChange1() {
        const query = this.searchQuery.toLowerCase();
        this.filteredBills = this.bills.filter(
            (bill) =>
                bill.billNumber.toLowerCase().includes(query) ||
                bill.customerName.toLowerCase().includes(query) ||
                bill.phone.includes(query),
        );
    }

    onSearchChange() {
        clearTimeout(this.searchTimeout);

        this.searchTimeout = setTimeout(() => {
            this.currentPage = 1;
            this.loadBills();
        }, 400);
    }

    createBill() {
        this.router.navigate(['/bills/create']);
    }

    viewBill(id: string) {
        this.router.navigate(['/bills', id]);
    }
}
