export interface CreateBillPayload {
    customer: CreateCustomerPayload;
    billDate: string;
    discountAmount: number;
    advanceAmount: number;
    items: CreateBillItemPayload[];
}

export interface CreateCustomerPayload {
    name: string;
    phoneNumber: string;
    email?: string | null;
}

export interface CreateBillItemPayload {
    photoServiceId: number;
    photoSizeId: number | null;
    laminationTypeId?: number | null;
    laminationFinishId?: number | null;
    quantity: number;
    unitPrice: number;
    snapNumber?: number;
    total: number;
    itemName?: string;
}
