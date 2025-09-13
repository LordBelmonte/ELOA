<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Serviços - ELOA</title>
    <link rel="stylesheet" href="../CSS/lista_servico.css">
    <link rel="stylesheet" href="../NAVEGACAO_WEB/menu.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="dashboard-container">

    <!-- Aqui vai carregar o nav -->
    <div id="sidebar-container"></div>   

    <!-- Main Content -->
    <main class="main-content" id="mainContent">
        <div class="services-header">
            <h1 class="services-title">Serviços</h1>
            <button class="view-all-btn">Ver todos →</button>
        </div>

            <div class="services-grid" id="servicesGrid">
            <?php
                include_once("../CONTROLLER/conexao.php");

                $sql = "SELECT * FROM cadastro_servicos";

                $result = $conexao->query($sql);

                while($servico = $result->fetch_assoc()){
                    echo '<div class="service-card">';
                    echo '<div class="service-image">'.$servico["img_servico"].'</div>';
                    echo '<h3 class="service-title">'.$servico["titulo_servico"].'</h3>';
                    echo '<p class="service-description">'.$servico["desc_servico"].'</p>';
                    echo '<div class="service-footer" id="'.$servico["id_empresa"].'">';
                    echo '<button class="company-btn">Empresa</button>';
                    echo '<svg class="whatsapp-icon" viewBox="0 0 24 24" fill="#25D366">';
                    echo '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />';
                    echo '</svg>';
                    echo '</div>';
                    echo '</div>';
                }
            ?>
            </div>
        </main>
    </div>
    <script src="../NAVEGACAO_WEB/menu.js"></script>
    <script src="../JS/rec_empresabt.js"></script>
</body>
</html>
