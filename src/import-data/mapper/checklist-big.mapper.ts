export const ChecklistBigMappers = {
  '1. OSA': (rowValues: any) => ({
    sku: rowValues[1],
    name: rowValues[2],
    price: parseFloat(rowValues[3]),
  }),
  Sheet_Kho_Hang: (rowValues: any) => ({
    warehouseId: rowValues[1],
    quantity: parseInt(rowValues[2]),
  }),
  // ... đủ 6 sheet
};
