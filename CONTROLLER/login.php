<?php
session_start();
include_once("conexao.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

    $email = $_POST['email_login'];
    $senha = $_POST['senha_login'];

    // Login como colaborador
    $stmt = $conexao->prepare('SELECT * FROM cadastro_colaborador WHERE colab_email = ?');
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $usuario = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    if ($usuario && password_verify($senha, $usuario['colab_senha'])) {
        $_SESSION['id_usuario'] = $usuario['id_colaborador'];
        $_SESSION['tipo_usuario'] = 'colaborador';
        $_SESSION['nome_usuario'] = $usuario['colab_nome'];

        // salvar vínculos
        $_SESSION['id_colaborador'] = $usuario['id_colaborador'];
        $_SESSION['id_responsavel'] = $usuario['id_responsavel'];
        $_SESSION['id_empresa'] = $usuario['id_empresa'];

        header("Location: ../VIEW/cadastro_servico_form.php");
        exit();
    }

    // Login como responsável
    $stmt2 = $conexao->prepare('SELECT * FROM cadastro_responsavel WHERE resp_email = ?');
    $stmt2->bind_param('s', $email);
    $stmt2->execute();
    $usuario = $stmt2->get_result()->fetch_assoc();
    $stmt2->close();

    if ($usuario && password_verify($senha, $usuario['resp_senha'])) {
        $_SESSION['id_usuario'] = $usuario['id_responsavel'];
        $_SESSION['tipo_usuario'] = 'responsavel';
        $_SESSION['nome_usuario'] = $usuario['resp_nome'];

        // salvar vínculos
        $_SESSION['id_responsavel'] = $usuario['id_responsavel'];
        $_SESSION['id_empresa'] = $usuario['id_empresa'];
        $_SESSION['id_colaborador'] = null;

        header("Location: ../VIEW/cadastro_servico_form.php");
        exit();
    }

    // Login como empresa
    $stmt3 = $conexao->prepare('SELECT * FROM cadastro_empresa WHERE email = ?');
    $stmt3->bind_param('s', $email);
    $stmt3->execute();
    $usuario = $stmt3->get_result()->fetch_assoc();
    $stmt3->close();

    if ($usuario && password_verify($senha, $usuario['senha'])) {
        $_SESSION['id_usuario'] = $usuario['id_empresa'];
        $_SESSION['tipo_usuario'] = 'empresa';
        $_SESSION['nome_usuario'] = $usuario['nome'];

        // salvar vínculos
        $_SESSION['id_empresa'] = $usuario['id_empresa'];
        $_SESSION['id_responsavel'] = null;
        $_SESSION['id_colaborador'] = null;

        header("Location: ../VIEW/cadastro_servico_form.php");
        exit();
    }

    // Se não achou em nenhuma tabela ou senha inválida
    echo "<script>
            alert('E-mail ou senha incorretos!');
            window.location.href='../VIEW/login_cadastro.html';
          </script>";
    exit();
}
?>
