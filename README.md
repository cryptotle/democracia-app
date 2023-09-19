# Proyecto Democracia DAO🕊️ - Crypto por la Transparencia Electoral

> :warning: **¡Importante!** Los desarrolladores no son responsables del uso que se le dé a este código.

> :warning: **¡Important!** Developers are not responsible for the use given to this software.

## Descripción

Este repositorio contiene una aplicación basada en Next.js, NextAuth, Prisma y PostgreSQL, diseñada para permitir el registro de fiscales voluntarios de mesa y de votantes que quieran reportar su experiencia votando. El objetivo del registro es que los fiscales puedasn ser premiados por elecciones justas y transparentes.

## Características Clave

- **Registro de Ciudadanos**: Los ciudadanos pueden crear cuentas con un correo electrónico y contraseña.
- **Autenticación Segura**: La autenticación de usuarios se maneja utilizando NextAuth, lo que garantiza un proceso seguro y confiable.
- **Donación a la DAO**: Esta app no maneja las donaciones mas allá de presentar la dirección ETH para las donaciones. Las donaciones son en ETH y se realizan en la red ethereum depositando en un contrato inteligente.
- **Registro de Fiscales**: Los fiscales interesados pueden registrarse en la plataforma utilizando su información personal y detalles relacionados con su mesa asignada.

## Tecnologías Utilizadas

- **Next.js**: Framework de React para aplicaciones web modernas con renderizado del lado del servidor (SSR) y renderizado del lado del cliente (CSR).
- **NextAuth**: Librería de autenticación que simplifica flujos seguros de autenticación en aplicaciones Next.js.
- **Prisma**: ORM (Mapeo Objeto-Relacional) para interacción con la base de datos y modelado de datos declarativo.
- **PostgreSQL**: Sistema de gestión de bases de datos relacional de código abierto y potente.

## Configuración

1. **Clonar el Repositorio**: `git clone <URL_DEL_REPOSITORIO>`
2. **Instalar Dependencias**: `cd democracia` y luego `yarn install`
3. **Configurar la Base de Datos**: Actualiza la cadena de conexión en `.env.*env*`.
4. **Ejecutar Migraciones**: `yarn run migrate:dev`
5. **Iniciar la Aplicación**: `yarn dev`
6. **Para probar y ver la base de datos**: `yarn run prisma:studio`

## Contribución

¡Apreciamos tus contribuciones! Sigue estos pasos:

1. Haz un *fork* y clona en tu máquina.
2. Crea una nueva rama: `git checkout -b nombre-de-la-rama`.
3. Realiza cambios y verifica que todo funcione correctamente.
4. Haz commit y envía un *pull request* detallado.

## Licencia

Este proyecto está bajo una Licencia Pública [GNU Affero General Public License v3.0](https://www.gnu.org/licenses/agpl-3.0.en.html).

## Contacto

Si tienes preguntas o necesitas ayuda, unite al discord de Democracia DAO https://discord.gg/uqvebUXp3z

¡Gracias por contribuir a **Democracia DAO**!
