import React, { useState, useEffect } from "react";

import InventoryTable from "../InventoryTable";
import Api from "../../services/api";
import InventoryInfoModal from "../InventoryInfoModal";

function InventoryPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [inventory, setInventory] = useState(null);
  const [showInventory, setShowInventory] = useState(false);
  const handleCloseInventory = () => setShowInventory(false);
  const handleShowInventory = () => setShowInventory(true);

  const getSuppliedInventory = (params) =>
    Api.getSuppliedInventory(params).then((suppliersList) => {
      setSuppliers(suppliersList);
    });

  useEffect(() => {
    getSuppliedInventory();
  }, []);


  useEffect(() => {
    if (inventory) {
      handleShowInventory();
    }
  }, [inventory]);

  return (
    <div>
      <InventoryTable suppliers={suppliers} setInventory={setInventory} />
      {inventory ? (
        <InventoryInfoModal inventory={inventory} show={showInventory} handleClose={handleCloseInventory} />
      ) : null}
    </div>
  );
}

export default InventoryPage;
