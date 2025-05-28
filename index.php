<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST["username"] ?? '';
    $password = $_POST["password"] ?? '';

    // Lista de usuarios válidos (nombre => contraseña)
    $validUsers = [
        "Edwin" => "edwinzoe2207",
        "Diego" => "diegocr7"
    ];

    // Verificar si el usuario y la contraseña coinciden
    if (array_key_exists($username, $validUsers) && $validUsers[$username] === $password) {
        $_SESSION["user"] = $username;
        header("Location: pages/MainScreen.php");
        exit();
    } else {
        $error = "Usuario o contraseña incorrectos";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Inicio de Sesión</title>
    <link rel="stylesheet" type="text/css" href="css/index.css">
</head>
<body>
    <div class="login-container">
        <h1>Iniciar Sesión</h1>

        <?php if (!empty($error)): ?>
            <p class="error"><?php echo $error; ?></p>
        <?php endif; ?>

        <form method="POST" action="">
            <input type="text" name="username" placeholder="Usuario" required>
            <input type="password" name="password" placeholder="Contraseña" required>
            <button type="submit">Iniciar sesión</button>
        </form>
    </div>
</body>
</html>
