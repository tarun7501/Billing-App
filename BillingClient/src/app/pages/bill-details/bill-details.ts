import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BillService } from '../../services/bill.service';
import { ChangeDetectorRef } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
export class BillDetails implements OnInit {
    bill?: Bill;
    isLoading = true;
    billId: string | null | undefined;
    isClearing: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private billService: BillService,
        private cdr: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.billId = params.get('id');

            if (!this.billId) {
                this.bill = undefined;
                this.isLoading = false;
                return;
            }

            this.isLoading = true;
            this.bill = undefined;

            this.loadBill(this.billId);
        });
    }

    loadBill(id: string) {
        this.billService.getBillById(id).subscribe({
            next: (response) => {
                this.bill = {
                    id: response.id.toString(),
                    billNumber: response.billNumber,
                    date: response.billDate,
                    customerName: response.customer.name,
                    phone: response.customer.phoneNumber,
                    email: response.customer.email,
                    status: response.isCleared ? 'Cleared' : 'Pending',
                    subtotal: response.subTotalAmount,
                    discount: response.discountAmount,
                    totalAmount: response.totalAmount,
                    advanceAmount: response.advanceAmount,
                    balanceAmount: response.balanceAmount,
                    mobilePhotoItems: response.items
                        .filter((x: any) => x.photoServiceId === 1)
                        .map((item: any) => this.mapItem(item)),
                    studioPhotoItems: response.items
                        .filter((x: any) => x.photoServiceId === 2)
                        .map((item: any) => this.mapItem(item)),
                    laminationItems: response.items
                        .filter((x: any) => x.photoServiceId === 3)
                        .map((item: any) => this.mapItem(item)),
                };

                this.cdr.detectChanges();
            },
            error: () => {
                this.bill = undefined;
            },
            complete: () => {
                this.isLoading = false;
                this.cdr.detectChanges();
            },
        });
    }

    mapItem(item: any): BillItem {
        return {
            id: item.id.toString(),
            photoSize: item.photoSizeLabel,
            numberOfCopies: item.quantity,
            unitPrice: item.unitPrice,
            total: item.totalPrice,
            laminationType: item.laminationTypeName,
            laminationFinish: item.laminationFinishName,
        };
    }

    goBack() {
        this.router.navigate(['/bills']);
    }

    private async generatePdfBlob(): Promise<Blob | null> {
        const element = document.getElementById('bill-pdf');
        if (!element || !this.bill) return null;

        element.classList.add('pdf-mode');

        const canvas = await html2canvas(element, {
            scale: 1.2,
            backgroundColor: '#ffffff',
            useCORS: true,
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.75);
        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
            compress: true,
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        let heightLeft = pdfHeight;
        let position = 0;

        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();

        while (heightLeft > 0) {
            position = heightLeft - pdfHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
            heightLeft -= pdf.internal.pageSize.getHeight();
        }

        element.classList.remove('pdf-mode');
        return pdf.output('blob');
    }

    async downloadPDF() {
        if (!this.bill) return;

        const blob = await this.generatePdfBlob();
        if (!blob) return;

        const fileName = `${this.bill.billNumber}.pdf`;
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();

        URL.revokeObjectURL(link.href);
    }

    async shareWhatsApp() {
        if (!this.bill) return;

        const blob = await this.generatePdfBlob();
        if (!blob) return;

        const fileName = `${this.bill.billNumber}.pdf`;
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(link.href);
        const message = `Dear ${this.bill.customerName},

✨ Greetings from Rajan Photo Studio! ✨

Your invoice details are below:

🧾 Invoice No: ${this.bill.billNumber}
📅 Date: ${new Date(this.bill.date).toLocaleDateString()}
💰 Total Amount: ₹${this.bill.totalAmount}
💵 Balance Amount: ₹${this.bill.balanceAmount}

We have attached your invoice for your reference.

Your memories are precious to us, and we truly appreciate the trust you place in our studio. 📸❤️

If you have any questions or need any assistance, feel free to reply to this message.

Thank you once again for choosing Rajan Photo Studio.
We look forward to serving you again! 🙏`;

        const formattedPhone = this.bill.phone.startsWith('91') ? this.bill.phone : `91${this.bill.phone}`;
        const whatsappUrl = `https://web.whatsapp.com/send?phone=${formattedPhone}&text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }

    markAsCleared() {
        if (!this.bill) return;

        const confirmClear = confirm(`Are you sure you want to mark Bill ${this.bill.billNumber} as Cleared?`);
        if (!confirmClear) return;

        this.isClearing = true;
        this.billService.markBillAsCleared(this.bill.id).subscribe({
            next: () => {
                if (this.billId) {
                    this.loadBill(this.billId);
                }
            },
            error: (err) => {
                console.error('Error clearing bill', err);
                this.isClearing = false;
            },
            complete: () => {
                this.isClearing = false;
            },
        });
    }
}
