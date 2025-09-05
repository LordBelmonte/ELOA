<?php
session_start();

$id_empresa = null;
$id_responsavel = null;
$id_colaborador = null;

if (!isset($_SESSION['tipo_usuario']) || !isset($_SESSION['id_usuario'])) {
    header('Location: login_cadastro.html');
    exit;
}

$nome = $_SESSION['nome_usuario'];

if($_SESSION['tipo_usuario'] === 'empresa') {
    $id_empresa = $_SESSION['id_usuario'];
} elseif($_SESSION['tipo_usuario'] === 'responsavel') {
    $id_responsavel = $_SESSION['id_usuario'];
} elseif($_SESSION['tipo_usuario'] === 'colaborador') {
    $id_colaborador = $_SESSION['id_usuario'];
}
?>


<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ELOA - Dashboard</title>
    <!-- Added link to external CSS file -->
    <link rel="stylesheet" href="../CSS/cadastro_servico.css">
    <link rel="stylesheet" href="../NAVEGACAO_WEB/menu.css">
    
</head>
<body>
     
    <div class="container">
        <!-- Aqui vai carregar o nav -->
        <div id="sidebar-container"></div> 

        <!-- Overlay -->
        <div class="overlay" id="overlay"></div>

        <!-- Service Registration Modal -->
        <div class="service-modal" id="serviceModal">
            <button class="close-modal" id="closeModal">×</button>
            <div class="modal-header">
                <h2>Cadastro de serviços</h2>
                <h3>Olá <?= htmlspecialchars($nome) ?></h3>
            </div>
            
            <form id="serviceForm" method="POST" enctype="multipart/form-data" action="../CONTROLLER/cadastro_servico.php">

             
             
                <div class="form-group">
                    <label for="serviceTitle">Título do serviço</label>
                    <input type="text" id="serviceTitle" name="titulo_servico" class="form-input" required>
                </div>
                
                <div class="form-group">
                    <label for="serviceDescription">Descrição do serviço</label>
                    <input type="text" id="serviceDescription" name="desc_servico" class="form-input" required>
                </div>

                <div class="form-group">
                    <label for="serviceCategory">Categoria do serviço</label>
                    <select id="serviceCategory" name="categoria_servico" class="form-input" required>
                        <option value="Administrativo">Administrativo</option>
                        <option value="Financeiro">Financeiro</option>
                        <option value="RecursosHumanos">Recursos Humanos</option>
                        <option value="Marketing">Marketing </option>
                        <option value="Produção">Produção </option>
                        <option value="Logística">Logística </option>
                        <option value="Tecnologia da Informação (TI)">Tecnologia da Informação (TI)</option>
                        <option value="Jurídico">Jurídico</option>
                        <option value="Atendimento ao Cliente">Atendimento ao Cliente</option>
                      </select> 
                </div>                
                
                <div class="form-group">
                    <label for="servicePricing">Precificação</label>
                    <input type="text" id="servicePricing" name="precificacao" class="form-input" required>
                </div>
                
                <div class="form-group">
                    <label for="paymentMethod">Forma de Pagamento</label>
                    <input type="text" id="paymentMethod" name="forma_pagamento" class="form-input" required>
                </div>
                
                <div class="image-section">
                     <label for="serviceImage">Imagem</label>
                     <input type="file" id="serviceImage" name="img_servico" accept="image/*" required>

                     <img id="previewImage" src="" alt="Pré-visualização" style="display:none; max-width: 100%; margin-top:10px; border-radius:10px;">
                    <div class="modal-buttons">
                        <button type="submit" class="modal-btn submit-btn">PRONTO</button>
                    </div>
                </div>

            </form>
        </div>

       

        <!-- Main Content -->
        <main class="main-content" id="mainContent">
           
            <!-- Content -->
            <div class="content">
                <!-- Company Header -->
                <div class="company-header">
                    <div class="company-info">
                        <div class="company-avatar">👤</div>
                        <h2>Nome da empresa</h2>
                    </div>
                    <button class="register-btn">Cadastro de serviços</button>
                </div>

                <!-- Services Section -->
                <section class="services-section">
                    <h2>Serviços cadastrados</h2>
                    
                    <div class="service-card" data-service-id="1" data-title="Consultoria em Marketing Digital" data-description="Estratégias personalizadas para aumentar sua presença online" data-pricing="R$ 500,00/mês" data-payment="Cartão de crédito, PIX">
                        <div class="service-image"></div>
                        <div class="service-info">
                            <h3>Consultoria em Marketing Digital</h3>
                            <p>R$ 500,00/mês</p>
                            <p>Cartão de crédito, PIX</p>
                        </div>
                        <div class="service-actions">
                            <button class="action-btn edit-btn" onclick="editService(this)">✏️ Editar</button>
                            <button class="action-btn delete-btn">✕ Excluir</button>
                        </div>
                    </div>

                    <div class="service-card" data-service-id="2" data-title="Design de Logotipo" data-description="Criação de identidade visual única para sua marca" data-pricing="R$ 800,00" data-payment="À vista, parcelado">
                        <div class="service-image"></div>
                        <div class="service-info">
                            <h3>Design de Logotipo</h3>
                            <p>R$ 800,00</p>
                            <p>À vista, parcelado</p>
                        </div>
                        <div class="service-actions">
                            <button class="action-btn edit-btn" onclick="editService(this)">✏️ Editar</button>
                            <button class="action-btn delete-btn">✕ Excluir</button>
                        </div>
                    </div>

                    <div class="service-card" data-service-id="3" data-title="Desenvolvimento de Website" data-description="Sites responsivos e otimizados para SEO" data-pricing="R$ 2.500,00" data-payment="30% entrada + 70% entrega">
                        <div class="service-image"></div>
                        <div class="service-info">
                            <h3>Desenvolvimento de Website</h3>
                            <p>R$ 2.500,00</p>
                            <p>30% entrada + 70% entrega</p>
                        </div>
                        <div class="service-actions">
                            <button class="action-btn edit-btn" onclick="editService(this)">✏️ Editar</button>
                            <button class="action-btn delete-btn">✕ Excluir</button>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    </div>

    <!-- Added link to external JavaScript file -->
     <script src="../NAVEGACAO_WEB/menu.js"></script>
    <script src="../JS/cadastro_servico.js"></script>

    <script>
const serviceImage = document.getElementById('serviceImage');
const previewImage = document.getElementById('previewImage');

serviceImage.addEventListener('change', () => {
    const file = serviceImage.files[0];
    if(file) {
        const reader = new FileReader();
        reader.onload = e => {
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        previewImage.src = '';
        previewImage.style.display = 'none';
    }
});
</script>
</body>
</html>
