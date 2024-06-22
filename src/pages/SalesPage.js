import React, { useState, useEffect } from "react";
import DataTable from "../components/Datatable";
import SalesFormModal from "../components/SalesFormModal";
import ProductTypeFormModal from "../components/ProductTypeFormModal";
import { Button, Box, Typography } from "@mui/material";
import {
  getSales,
  getProductTypes,
  createSale,
  updateSale,
  deleteSale,
  createProductType,
  updateProductType,
} from "../api/api";

const SalesPage = () => {
  const [salesData, setSalesData] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [isSalesModalOpen, setIsSalesModalOpen] = useState(false);
  const [isProductTypeModalOpen, setIsProductTypeModalOpen] = useState(false);
  const [currentSale, setCurrentSale] = useState(null);
  const [currentProductType, setCurrentProductType] = useState(null);

  useEffect(() => {
    fetchSales();
    fetchProductTypes();
  }, []);

  const fetchSales = async () => {
    const sales = await getSales();
    setSalesData(sales);
  };

  const fetchProductTypes = async () => {
    const types = await getProductTypes();
    setProductTypes(types);
  };

  const handleOpenSalesModal = (sale = null) => {
    setCurrentSale(sale);
    setIsSalesModalOpen(true);
  };

  const handleCloseSalesModal = () => {
    setIsSalesModalOpen(false);
  };

  const handleOpenProductTypeModal = (productType = null) => {
    setCurrentProductType(productType);
    setIsProductTypeModalOpen(true);
  };

  const handleCloseProductTypeModal = () => {
    setIsProductTypeModalOpen(false);
  };

  const handleSalesSubmit = async (values) => {
    if (currentSale) {
      await updateSale(currentSale.id, values);
    } else {
      await createSale(values);
    }
    fetchSales();
    handleCloseSalesModal();
  };

  const handleProductTypeSubmit = async (values) => {
    if (currentProductType) {
      await updateProductType(currentProductType.id, values);
    } else {
      await createProductType(values);
    }
    fetchProductTypes();
    handleCloseProductTypeModal();
  };

  const handleDeleteSale = async (id) => {
    await deleteSale(id);
    fetchSales();
  };

  const handleSearchProduct = async (params) => {

      const sales = await getSales(params);
      setSalesData(sales);


  };

  const salesColumns = [

    { field: "product_name", headerName: "Nama Produk", width: 350 },
    { field: "quantity", headerName: "Stok", width: 150 },
    { field: "amount", headerName: "Total Terjual", width: 150 },
    {
      field: "product_type",
      headerName: "Tipe Produk",
      width: 350,
      renderCell: (params) => (
        <Box height={"100%"} display={"flex"} alignItems={"center"}>
          <Typography>
            {params.row.ProductType.name ? params.row.ProductType.name : ""}
          </Typography>
        </Box>
      ),
    },
    {
      field: "actions",

      headerName: "Aksi",

      width: 250,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            sx={{ marginRight: "10px" }}
            color="primary"
            onClick={() => handleOpenSalesModal(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDeleteSale(params.row.id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box padding={"1rem"}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenSalesModal()}
        sx={{ mb: 2 }}
      >
        Add Sale
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleOpenProductTypeModal()}
        sx={{ mb: 2, ml: 2 }}
      >
        Add Product Type
      </Button>
      <DataTable onSearch={handleSearchProduct} rows={salesData} columns={salesColumns} />
      <SalesFormModal
        open={isSalesModalOpen}
        onClose={handleCloseSalesModal}
        productTypes={productTypes}
        initialValues={
          currentSale || {
            product_name: "",
            quantity: 0,
            amount: 0,
            product_type: "",
          }
        }
        onSubmit={handleSalesSubmit}
      />
      <ProductTypeFormModal
        open={isProductTypeModalOpen}
        onClose={handleCloseProductTypeModal}
        initialValues={currentProductType || { name: "" }}
        onSubmit={handleProductTypeSubmit}
      />
    </Box>
  );
};

export default SalesPage;
