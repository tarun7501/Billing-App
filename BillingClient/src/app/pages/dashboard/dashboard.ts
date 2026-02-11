import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { DashboardService } from '../../services/dashboard.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, NgxChartsModule],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
    monthlyBills = 0;
    totalRevenue = 0;
    pendingAmount = 0;

    revenueTrendData: any[] = [];
    statusData: any[] = [];

    isLoading: boolean = true;

    view: [number, number] = [500, 300];

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

    constructor(
        private dashboardService: DashboardService,
        private cdr: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.loadDashboard();
    }

    loadDashboard() {
        this.dashboardService.getSummary().subscribe({
            next: (data: any) => {
                this.monthlyBills = data.monthlyBills;
                this.totalRevenue = data.totalRevenue;
                this.pendingAmount = data.pendingAmount;

                this.revenueTrendData = [
                    {
                        name: 'Revenue',
                        series: data.revenueTrend.map((m: any) => ({
                            name: m.month,
                            value: m.amount,
                        })),
                    },
                ];

                this.statusData = [
                    { name: 'Cleared', value: data.statusDistribution.cleared },
                    { name: 'Pending', value: data.statusDistribution.pending },
                ];

                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: (err) => {
                alert('Failed to load dashboard data. Please try again later.');
                this.isLoading = false;
                this.cdr.detectChanges();
            },
        });
    }
}
