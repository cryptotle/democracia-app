export const emailContent = (url: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmación de Correo Electrónico</title>
  <style>
    /* Estilos CSS inline para compatibilidad con clientes de correo electrónico */
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .header {
      text-align: center;
      margin-bottom: 20px;
    }

    .header h1 {
      color: #333;
    }

    .content {
      font-size: 16px;
      color: #555;
    }

    .button {
      display: inline-block;
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #007bff;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
    }

    .button:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>¡Bienvenido!</h1>
    </div>
    <div class="content">
      <p>Por favor, haga click en el siguiente enlace para confirmar su correo electrónico:</p>
      <p><a class="button" href="${url}">${url}</a></p>
    </div>
  </div>
</body>
</html>
`;
