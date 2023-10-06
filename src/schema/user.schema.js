export const User = () => {
  return {
    name: null,
    lastName: null,
    addres: null,
    phone: null,
    nameUser: null,
    identification: null,
    password: null,
  };
};
export const UserSchema = () => {
  return {
    name: {
      id: "name",
      label: "Nombres",
      maxlength: 50,
    },
    lastName: {
      id: "lastName",
      label: "Apellidos",
      maxlength: 50,
    },
    addres: {
      id: "addres",
      label: "Dirección",
      maxlength: 100,
    },
    phone: {
      id: "phone",
      label: "Teléfono",
      tipo: "number",
      maxlength: 10,
    },
    identification: {
      id: "identification",
      label: "Identificación",
      maxlength: 15,
    },
    nameUser: {
      id: "nameUser",
      label: "usuario",
      maxlength: 10,
      prependInnerIcon: "mdi-account",
    },
    password: {
      id: "password",
      label: "Contraseña",
      type: "password",
      maxlength: 10,
      rules: [
        (value) => {
          if (value) return true;
          return "You must enter a first name.";
        },
      ],
      prependInnerIcon: "mdi-lock",
    },
  };
};
