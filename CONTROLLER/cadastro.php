<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    include_once("conexao.php");

    // Função para sanitizar valores
    function limpa($valor) {
        return trim($valor);
    }

    // Função para tratar upload de arquivos
    function uploadArquivo($campo, $indice = null) {
        $nomeFinal = '';
        if ($indice !== null) { // múltiplos arquivos
            if (!empty($_FILES[$campo]['name'][$indice])) {
                $nomeFinal = time() . "_" . basename($_FILES[$campo]['name'][$indice]);
                $destino = "../uploads/" . $nomeFinal;
                if (!move_uploaded_file($_FILES[$campo]['tmp_name'][$indice], $destino)) {
                    throw new Exception("Falha ao fazer upload do arquivo: " . $_FILES[$campo]['name'][$indice]);
                }
            }
        } else { // arquivo único
            if (!empty($_FILES[$campo]['name'])) {
                $nomeFinal = time() . "_" . basename($_FILES[$campo]['name']);
                $destino = "../uploads/" . $nomeFinal;
                if (!move_uploaded_file($_FILES[$campo]['tmp_name'], $destino)) {
                    throw new Exception("Falha ao fazer upload do arquivo: " . $_FILES[$campo]['name']);
                }
            }
        }
        return $nomeFinal;
    }

    mysqli_autocommit($conexao, false); // inicia transação

    try {
 
        //Cadastro da empresa

        $img_empresa = uploadArquivo('img_empresa');
        $empresa_campos = [
            'img_empresa' => $img_empresa,
            'razao_social' => limpa($_POST['razao_social']),
            'area_atuacao' => limpa($_POST['area_atuacao']),
            'nome' => limpa($_POST['nome']),
            'cnpj_mei' => limpa($_POST['cnpj_mei']),
            'insc_estadual' => limpa($_POST['insc_estadual']),
            'insc_municipal' => limpa($_POST['insc_municipal']),
            'cep' => limpa($_POST['cep']),
            'logradouro' => limpa($_POST['logradouro']),
            'numero' => limpa($_POST['numero']),
            'complemento' => limpa($_POST['complemento']),
            'bairro' => limpa($_POST['bairro']),
            'cidade' => limpa($_POST['cidade']),
            'estado' => limpa($_POST['estado'])
        ];

        $placeholders = implode(", ", array_fill(0, count($empresa_campos), "?"));
        $listaCampos = implode(", ", array_keys($empresa_campos));
        $sql = "INSERT INTO cadastro_empresa ($listaCampos) VALUES ($placeholders)";

        $stmt = mysqli_prepare($conexao, $sql);
        if (!$stmt) {
            throw new Exception("Erro na query empresa: " . mysqli_error($conexao));
        }
        mysqli_stmt_bind_param($stmt, str_repeat('s', count($empresa_campos)), ...array_values($empresa_campos));
        mysqli_stmt_execute($stmt);
        $id_empresa = mysqli_insert_id($conexao);
        mysqli_stmt_close($stmt);


        // Cadastro do responsável

        $img_responsavel = uploadArquivo('img_responsavel');
        $resp_campos = [
            'id_empresa' => $id_empresa,
            'img_responsavel' => $img_responsavel,
            'resp_nome' => limpa($_POST['resp_nome']),
            'resp_sobrenome' => limpa($_POST['resp_sobrenome']),
            'resp_cargo' => limpa($_POST['resp_cargo']),
            'resp_departamento' => limpa($_POST['resp_departamento']),
            'resp_genero' => limpa($_POST['resp_genero']),
            'resp_telefone' => limpa($_POST['resp_telefone']),
            'resp_celular' => limpa($_POST['resp_celular']),
            'resp_linkedin' => limpa($_POST['resp_linkedin'])
        ];

        $placeholders = implode(", ", array_fill(0, count($resp_campos), "?"));
        $listaCampos = implode(", ", array_keys($resp_campos));
        $sql = "INSERT INTO cadastro_responsavel ($listaCampos) VALUES ($placeholders)";

        $stmt = mysqli_prepare($conexao, $sql);
        if (!$stmt) {
            throw new Exception("Erro na query responsável: " . mysqli_error($conexao));
        }
        mysqli_stmt_bind_param($stmt, str_repeat('s', count($resp_campos)), ...array_values($resp_campos));
        mysqli_stmt_execute($stmt);
        $id_responsavel = mysqli_insert_id($conexao);
        mysqli_stmt_close($stmt);


        // Cadastro dos colaboradores

        if (!empty($_POST['colab_nome']) && is_array($_POST['colab_nome'])) {
            foreach ($_POST['colab_nome'] as $i => $nome) {
                if (trim($nome) === '') continue;

                if ($_POST['colab_senha'][$i] !== $_POST['colab_confirma_senha'][$i]) {
                    throw new Exception("As senhas do colaborador {$nome} não coincidem.");
                }

                $senha = password_hash($_POST['colab_senha'][$i], PASSWORD_DEFAULT);
                $img_colab = uploadArquivo('img_colaborador', $i);

                $colab_campos = [
                    'id_responsavel' => $id_responsavel,
                    'id_empresa' => $id_empresa,
                    'img_colaborador' => $img_colab,
                    'colab_nome' => limpa($_POST['colab_nome'][$i]),
                    'colab_sobrenome' => limpa($_POST['colab_sobrenome'][$i]),
                    'colab_cargo' => limpa($_POST['colab_cargo'][$i]),
                    'colab_departamento' => limpa($_POST['colab_departamento'][$i]),
                    'colab_genero' => limpa($_POST['colab_genero'][$i]),
                    'colab_email' => limpa($_POST['colab_email'][$i]),
                    'colab_senha' => $senha,
                    'colab_telefone' => limpa($_POST['colab_telefone'][$i]),
                    'colab_celular' => limpa($_POST['colab_celular'][$i]),
                    'colab_linkedin' => limpa($_POST['colab_linkedin'][$i])
                ];

                $placeholders = implode(", ", array_fill(0, count($colab_campos), "?"));
                $listaCampos = implode(", ", array_keys($colab_campos));
                $sql = "INSERT INTO cadastro_colaborador ($listaCampos) VALUES ($placeholders)";

                $stmt = mysqli_prepare($conexao, $sql);
                if (!$stmt) {
                    throw new Exception("Erro na query colaborador: " . mysqli_error($conexao));
                }
                mysqli_stmt_bind_param($stmt, str_repeat('s', count($colab_campos)), ...array_values($colab_campos));
                mysqli_stmt_execute($stmt);
                mysqli_stmt_close($stmt);
            }
        }

        mysqli_commit($conexao);
        echo "<script>alert('Cadastro realizado com sucesso!'); window.location='../index.php';</script>"; // Redireciona para a página 

    } catch (Exception $e) {
        mysqli_rollback($conexao);
        echo "<script>alert('Erro ao cadastrar: ".$e->getMessage()."');</script>";
    }

    mysqli_close($conexao);
}
?>
