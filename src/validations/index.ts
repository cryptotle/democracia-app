import * as Yup from 'yup'

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


export const fiscalRegisterFormValidation = Yup.object().shape({
    dni: Yup.number().typeError("Solo números")
    .min(1000000, 'El DNI debe tener al menos 7 dígitos')
    .max(99999999, 'El DNI no debe tener más de 8 dígitos')
    .required('Este campo es obligatorio'),
    idPartido: Yup.string()
    .required('Este campo es obligatorio'),
});

export const userDataFormValidation = Yup.object().shape({
    wallet: Yup.string()
    .matches(/^0x[a-fA-F0-9]{40}$/, 'Debe comenzar con "0x" seguido de los 40 caracteres alfanuméricos')
    .required('Este campo es obligatorio')
});

export const fiscalValidationFormValidation = Yup.object().shape({
    nroMesa: Yup.number().typeError("Solo números")
    .required('Este campo es obligatorio'),
    distrito: Yup.number().typeError("Solo números")
    .required('Este campo es obligatorio'),
    seccion: Yup.number().typeError("Solo números")
    .required('Este campo es obligatorio'),
    circ: Yup.number().typeError("Solo números")
    .required('Este campo es obligatorio'),   
});

export const userRegisterFormValidation = Yup.object().shape({
    email:Yup.string()
    .required('Este campo es obligatorio')
    .matches(emailRegex, 'Ingresa una dirección de correo electrónico válida')
    .email('Ingresa una dirección de correo electrónico válida'),
    password: Yup.string()
    .required('Este campo es obligatorio')
    .min(8,"La contraseña debe tener al menos 8 caracteres")
    .matches(/^(?=.*[A-Z])(?=.*\d)/, 'La contraseña debe contener al menos 1 letra mayúscula y 1 número'),
    confirm_password: Yup.string()
    .required('Este campo es obligatorio')
    .test('password confirmation', 'El password no coincide', function (value) {return value === this.parent.password }),
});

export const emailValidation = Yup.object().shape({
    email:Yup.string()
    .email('Ingresa una dirección de correo electrónico válida')
    .matches(emailRegex, 'Ingresa una dirección de correo electrónico válida')    
});

export const passwordValidation = Yup.object().shape({
    password: Yup.string()
    .required('Este campo es obligatorio')
    .min(8,"La contraseña debe tener al menos 8 caracteres")
    .matches(/^(?=.*[A-Z])(?=.*\d)/, 'La contraseña debe contener al menos 1 letra mayúscula y 1 número'),
    confirm_password: Yup.string()
    .required('Este campo es obligatorio')
    .test('password confirmation', 'El password no coincide', function (value) {return value === this.parent.password }),
});

export const registrarDenunciaValidation = Yup.object().shape({
    dni: Yup.number().typeError("Solo números")
    .min(1000000, 'El DNI debe tener al menos 7 dígitos')
    .max(99999999, 'El DNI no debe tener más de 8 dígitos')
    .required("Este campo es obligatorio"),
    distrito: Yup.number().typeError("Solo números")
    .required("Este campo es obligatorio"),
    seccion: Yup.number().typeError("Solo números")
    .required("Este campo es obligatorio"),
    circ: Yup.number().typeError("Solo números")
    .required("Este campo es obligatorio"),
    nroMesa: Yup.number().typeError("Solo números")
    .required("Este campo es obligatorio"),
    pregunta1: Yup.string()
    .required("Este campo es obligatorio"),
    pregunta2: Yup.string()
    .required("Este campo es obligatorio"),
    pregunta3: Yup.string().when("$pregunta1", ([pregunta1], schema) =>
      pregunta1 === "2" || pregunta1 === "3"
        ? schema.required("Este campo es obligatorio")
        : schema
    ),
  });