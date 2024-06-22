import React from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
});

const ProductTypeFormModal = ({ open, onClose, initialValues, onSubmit }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyle }}>
        <Typography fontWeight={"bold"} marginBottom={"10px"}>
          TAMBAH TIPE PRODUK
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                name="name"
                as={TextField}
                label="Name"
                fullWidth
                margin="normal"
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />
              <Box sx={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
                <Button type="submit" onClick={onClose} variant="contained" color="secondary">
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
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default ProductTypeFormModal;
