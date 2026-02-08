import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Color, ScaleType } from '@swimlane/ngx-charts';

interface Bill {
    date: string;
    totalAmount: number;
    balanceAmount: number;
    status: 'Cleared' | 'Pending';
}

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, NgxChartsModule],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.css',
})
export class Dashboard {
    bills: Bill[] = [
        { date: '2026-01-10', totalAmount: 1200, balanceAmount: 200, status: 'Pending' },
        { date: '2026-01-12', totalAmount: 800, balanceAmount: 0, status: 'Cleared' },
        { date: '2026-02-05', totalAmount: 1500, balanceAmount: 300, status: 'Pending' },
    ];

    // KPI values
    monthlyBills = 0;
    totalRevenue = 0;
    pendingAmount = 0;

    pieColorScheme: Color = {
        name: 'billStatus',
        selectable: true,
        group: ScaleType.Ordinal,
        domain: ['#10b981', '#f59e0b'],
    };

    lineColorScheme: Color = {
        name: 'revenue',
        selectable: true,
        group: ScaleType.Ordinal,
        domain: ['#3b82f6'],
    };

    // Charts
    revenueTrendData: any[] = [];
    statusData: any[] = [];

    view: [number, number] = [500, 300];

    colorScheme = {
        domain: ['#3b82f6', '#10b981', '#f59e0b'],
    };

    constructor() {
        this.calculateMetrics();
        this.prepareCharts();
    }

    calculateMetrics() {
        const currentMonth = new Date().getMonth();

        this.monthlyBills = this.bills.filter((b) => new Date(b.date).getMonth() === currentMonth).length;

        this.totalRevenue = this.bills.reduce((sum, b) => sum + b.totalAmount, 0);

        this.pendingAmount = this.bills
            .filter((b) => b.status === 'Pending')
            .reduce((sum, b) => sum + b.balanceAmount, 0);
    }

    prepareCharts() {
        // Revenue Trend (last 7 months – mock)
        const months = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
        this.revenueTrendData = [
            {
                name: 'Revenue',
                series: months.map((m) => ({
                    name: m,
                    value: Math.floor(Math.random() * 50000) + 30000,
                })),
            },
        ];

        // Status Distribution
        this.statusData = [
            {
                name: 'Cleared',
                value: this.bills.filter((b) => b.status === 'Cleared').length,
            },
            {
                name: 'Pending',
                value: this.bills.filter((b) => b.status === 'Pending').length,
            },
        ];
    }
}
