<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

    include_once("conexao.php");

    $email_login = $_POST['email_login'];
    $senha_login = $_POST['senha_login'];

        try {
            
            $stmt = $conexao->prepare('SELECT * FROM cadastro_colaborador WHERE colab_senha = ? AND colab_email = ?');

            $stmt->bind_param('ss', $senha_login, $email_login);

            $stmt->execute();
    
            $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

            $stmt->close();

            if (count($result)) {

                echo "<script> 
                        window.alert('Login como Colaborador realizado com sucesso!');
                        window.location.href='../VIEW/login.html';
                    </script>";
            } 
            else {

                $stmt2 = $conexao->prepare('SELECT * FROM cadastro_responsavel WHERE resp_senha = ? AND resp_email = ?');

                $stmt2->bind_param('ss', $senha_login, $email_login);

                $stmt2->execute();

                $result = $stmt2->get_result()->fetch_all(MYSQLI_ASSOC);

                $stmt2->close();

                if(count($result)) {

                    echo "<script>
                            window.alert('Login como Responsavel realizado com sucesso!');
                            window.location.href='../VIEW/login.html';
                        </script>";
                }
                else {
                    echo "<script>
                            window.alert('Falha no Login, email ou senha incorretos!');
                            window.location.href='../VIEW/login.html';
                        </script>";
                }
            }
        } catch (mysqli_sql_exception $e) {
            echo 'Erro MySQLi: ' . $e->getMessage();
        }
}
?>
