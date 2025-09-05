<?php
session_start();
include 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die("<script>alert('Acesso inválido.');</script>");
}

// Função para limpar dados
function limpa($valor) {
    return trim($valor);
}

// Função de upload de arquivo
function uploadArquivo($campo) {
    $nomeFinal = 'default.png'; // valor padrão
    if (isset($_FILES[$campo]) && $_FILES[$campo]['error'] === UPLOAD_ERR_OK) {
        $fileName = basename($_FILES[$campo]['name']);
        $nomeFinal = time() . "_" . preg_replace("/[^a-zA-Z0-9.]/", "_", $fileName);
        $destino = "../UPLOADS/SERVICOS/" . $nomeFinal;

        // Cria a pasta caso não exista
        if (!is_dir("../UPLOADS/SERVICOS/")) {
            mkdir("../UPLOADS/SERVICOS/", 0777, true);
        }

        if (!move_uploaded_file($_FILES[$campo]['tmp_name'], $destino)) {
            throw new Exception("Erro ao enviar a imagem.");
        }
    }
    return "UPLOADS/SERVICOS/" . $nomeFinal; // caminho relativo para salvar no banco
}

// Receber dados do formulário
$titulo_servico    = $_POST['titulo_servico'] ?? '';
$desc_servico      = $_POST['desc_servico'] ?? '';
$categoria_servico = $_POST['categoria_servico'] ?? '';
$precificacao      = $_POST['precificacao'] ?? '';
$forma_pagamento   = $_POST['forma_pagamento'] ?? '';

// Definir IDs dependendo do tipo de usuário
$id_empresa     = null;
$id_responsavel = null;
$id_colaborador = null;

switch($_SESSION['tipo_usuario'] ?? '') {
    case 'empresa':
        $id_empresa = $_SESSION['id_usuario'];
        break;

    case 'responsavel':
        $id_responsavel = $_SESSION['id_usuario'];
        $sql = $conexao->prepare("SELECT id_empresa FROM cadastro_responsavel WHERE id_responsavel = ?");
        $sql->bind_param("i", $id_responsavel);
        $sql->execute();
        $sql->bind_result($id_empresa);
        $sql->fetch();
        $sql->close();
        break;

    case 'colaborador':
        $id_colaborador = $_SESSION['id_usuario'];
        $sql = $conexao->prepare("SELECT id_responsavel, id_empresa FROM cadastro_colaborador WHERE id_colaborador = ?");
        $sql->bind_param("i", $id_colaborador);
        $sql->execute();
        $sql->bind_result($id_responsavel, $id_empresa);
        $sql->fetch();
        $sql->close();
        break;

    default:
        die("<script>alert('Tipo de usuário inválido.');</script>");
}

// Upload da imagem
try {
    $img_servico = uploadArquivo('img_servico');
} catch (Exception $e) {
    die("<script>alert('".$e->getMessage()."');</script>");
}

// Inserção no banco
$stmt = $conexao->prepare("INSERT INTO cadastro_servicos 
    (id_colaborador, id_responsavel, id_empresa, titulo_servico, desc_servico, categoria_servico, precificacao, forma_pagamento, img_servico)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

if (!$stmt) {
    die("<script>alert('Erro na preparação da query: ".$conexao->error."');</script>");
}

$stmt->bind_param(
    "iiissssss",
    $id_colaborador,
    $id_responsavel,
    $id_empresa,
    $titulo_servico,
    $desc_servico,
    $categoria_servico,
    $precificacao,
    $forma_pagamento,
    $img_servico
);

if ($stmt->execute()) {
    echo "<script>alert('Serviço cadastrado com sucesso!');</script>";
} else {
    echo "<script>alert('Erro ao cadastrar: ".$stmt->error."');</script>";
}


$stmt->close();
$conexao->close();
?>
