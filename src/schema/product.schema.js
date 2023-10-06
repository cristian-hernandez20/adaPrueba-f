export const Product = () => {
  return {
    id: null,
    name: null,
    quantity: null,
    descript: null,
    price: null,
  };
};
export const ProductSchema = () => {
  return {
    name: {
      id: "name",
      label: "Nombre",
      require: true,
      maxlength: 50,
    },
    quantity: {
      id: "quantity",
      label: "Cantidad",
      tipo: "number",
      require: true,
      maxlength: 3,
    },
    descript: {
      id: "descript",
      label: "Descripción del producto",
      require: true,
      maxlength: 100,
    },
    price: {
      id: "price",
      label: "Precio",
      tipo: "number",
      require: true,
      maxlength: 15,
    },
  };
};
