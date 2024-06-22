import React from 'react';
import { Modal, Box, TextField, Button, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  product_name: Yup.string().required('Required'),
  quantity: Yup.number().required('Required').positive().integer(),
  amount: Yup.number().required('Required').positive(),
  product_type_id: Yup.string().required('Required'),
});

const SalesFormModal = ({ open, onClose, initialValues, onSubmit, productTypes }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyle }}>
      <Typography fontWeight={"bold"} marginBottom={"10px"}>{initialValues.product_name ? "UBAH":"TAMBAH"} SALES PRODUK</Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, handleChange, values }) => (
            <Form>
              <Field name="product_name" as={TextField} label="Product Name" fullWidth margin="normal" error={touched.product_name && !!errors.product_name} helperText={touched.product_name && errors.product_name} />
              <Field name="quantity" as={TextField} label="Quantity" type="number" fullWidth margin="normal" error={touched.quantity && !!errors.quantity} helperText={touched.quantity && errors.quantity} />
              <Field name="amount" as={TextField} label="Amount" type="number" fullWidth margin="normal" error={touched.amount && !!errors.amount} helperText={touched.amount && errors.amount} />
              <FormControl fullWidth margin="normal">
                <InputLabel>Product Type</InputLabel>
                <Select
                  name="product_type_id"
                  value={values.product_type_id}
                  onChange={handleChange}
                  error={touched.product_type_id && !!errors.product_type_id}
                >
                  {productTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box sx={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
                <Button type="submit" variant="contained" color="secondary">
                  Cancel
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default SalesFormModal;
