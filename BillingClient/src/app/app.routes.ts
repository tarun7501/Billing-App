import { CustomersBills } from './pages/customers-bills/customers-bills';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
    },
    {
        path: 'bills',
        loadComponent: () => import('./pages/bills/bills').then((m) => m.Bills),
    },
    {
        path: 'bills/create',
        loadComponent: () => import('./pages/create-bill/create-bill').then((m) => m.CreateBill),
    },
    {
        path: 'bills/:id',
        loadComponent: () => import('./pages/bill-details/bill-details').then((m) => m.BillDetails),
    },
    {
        path: 'customers',
        loadComponent: () => import('./pages/customers/customers').then((m) => m.Customers),
    },
    {
        path: 'customers/:id',
        loadComponent: () => import('./pages/customers-bills/customers-bills').then((m) => m.CustomersBills),
    },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
