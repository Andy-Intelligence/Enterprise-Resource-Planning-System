
import React from "react";
import InventoryItemDisplay from "@/components/InventoryItemDisplay";

const InventoryPage = () => {
  // Dummy data for an inventory item
  const dummyItem = {
    itemName: "Premium Office Chair",
    itemType: "Furniture",
    inventoryCode: "INV-CH-001",
    quantity: 45,
    purchasePrice: 15000, // Purchase price per unit in ₦
    VAT: 7.5, // VAT percentage
    image: "https://via.placeholder.com/400", // Placeholder image URL
    history: [
      {
        date: "2024-01-15",
        action: "Purchased 20 units",
      },
      {
        date: "2024-02-10",
        action: "Sold 5 units",
      },
      {
        date: "2024-03-05",
        action: "Restocked 30 units",
      },
    ],
  };

  return (
    <div>
      <InventoryItemDisplay item={dummyItem} />
    </div>
  );
};

export default InventoryPage;

