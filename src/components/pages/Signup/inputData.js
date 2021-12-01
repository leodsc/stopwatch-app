const data = [
  {
    name: "name",
    type: "text",
    placeholder: "Nome",
    minLength: 3,
    maxLength: 15,
    pattern: "[a-zA-Z]+",
    requirements: [
      {
        name: "apenas letras",
        checkValidity: function (content) {
          const result = content.match("[a-zA-Z]+");
          if (result !== null && result[0].length === content.length)
            return true;
          return false;
        },
      },
      {
        name: "Minimo de 3 letras",
        checkValidity: function (content) {
          if (content.length >= 3) return true;
          return false;
        },
      },
    ],
  },
  {
    name: "email",
    type: "email",
    placeholder: "Email",
    minLength: null,
    maxLength: null,
    pattern: null,
    requirements: [
      {
        name: "email invalido",
        checkValidity: function (content) {
          // regex from https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
          const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          if (content.match(re)) {
            return true;
          } return false;
        },
      },
    ],
  },
  {
    name: "password",
    type: "password",
    placeholder: "Senha",
    minLength: 8,
    maxLength: 25,
    pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,25}$",
    requirements: [
      {
        name: "Mínimo de 8 caracteres",
        checkValidity: function (content) {
          if (content.length >= 8) return true;
          return false;
        },
      },
      {
        name: "1 letra minúscula",
        checkValidity: function (content) {
          if (content.match("[a-z]+")) return true;
          return false;
        },
      },
      {
        name: "1 letra maiúscula",
        checkValidity: function (content) {
          if (content.match("[A-Z]+")) return true;
          return false;
        },
      },
      {
        name: "1 caracter especial",
        checkValidity: function (content) {
          if (content.match("[!@#$%&¨*_=]+")) return true;
          return false;
        },
      },
      {
        name: "1 digito",
        checkValidity: function (content) {
          if (content.match("[0-9]+")) return true;
          return false;
        },
      },
    ],
  },
  {
    name: "confirm-password",
    type: "password",
    placeholder: "Confirmar Senha",
    minLength: null,
    maxLength: 25,
    pattern: null,
    requirements: [
      {
        name: "senha e confirmação diferentes",
        checkValidity: function (content) {
          const password = document.querySelector("input[type='password']");
          return password.value == content;
        }
      },
    ],
  },
];

export default data;
