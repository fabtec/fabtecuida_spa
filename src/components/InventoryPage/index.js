import React, { useState, useEffect } from "react";

import InventoryTable from "../InventoryTable";
import Api from "../../services/api";
import Modal from "../Modal";

function InventoryPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [supplier, setSupplier] = useState(null);

  const getSuppliedInventory = (params) =>
    Api.getSuppliedInventory(params).then((suppliersList) => {
      setSuppliers(suppliersList);
    });

  useEffect(() => {
    getSuppliedInventory();
  }, []);

  return (
    <div>
      <InventoryTable suppliers={suppliers} setSupplier={setSupplier} />
      {/* {order ? (
        <Modal order={order} show={showOrder} handleClose={handleCloseOrder} />
      ) : null} */}
    </div>
  );
}

export default InventoryPage;
