<?php
    include_once("../CONTROLLER/conexao.php");

    $id_empresa = $_GET['id_empresa'] ?? 'Desconhecido';

    if($id_empresa != "Desconhecido"){
        $sql = "SELECT * FROM cadastro_empresa WHERE id_empresa = $id_empresa";

        $result = $conexao->query($sql);

        $empresa = $result->fetch_assoc();
    }
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil da Empresa</title>
    <link rel="stylesheet" href="../CSS/perfil_empresa.css">
</head>
<body>
      <!-- Overlay -->
      <div class="overlay" id="overlay"></div>

      <!-- Sidebar -->
      <div class="sidebar" id="sidebar">
          <div class="sidebar-header">
              <div class="logo">E</div>
              <h2>ELOA</h2>
          </div>
          
          <nav class="sidebar-nav">
              <a href="../VIEW/home.html" class="nav-item active">
                  <div class="nav-icon">🏠</div>
                  <span>Home</span>
              </a>
      
              <a href="#" class="nav-item">
                  <div class="nav-icon">⚙️</div>
                  <span>Serviços</span>
                  <span class="arrow">▶</span>
              </a>
  
              <div class="sub-nav">
                  <a href="../VIEW/lista_servico.html" class="sub-nav-item">Lista serviço</a>
                  <a href="../VIEW/cadastro_servico.html" class="sub-nav-item">Cadastrar</a>
              </div>

              <a href="#" class="nav-item">
                  <div class="nav-icon">📋</div>
                  <span>Projetos</span>
              </a>

              <a href="#" class="nav-item">
                  <div class="nav-icon">📅</div>
                  <span>Calendário</span>
              </a>
          </nav>

          <button class="logout-btn">
              <span>🚪</span>
              <span>Logout</span>
          </button>
      </div>

      <!-- Main Content -->
      <div class="main-content" id="mainContent">
          <!-- Header -->
          <header class="header">
              <button class="menu-toggle" id="menuToggle">☰</button>
              
              <div class="header-right">
                  <div class="add-members">
                      <div class="user-avatars">
                          <div class="avatar"></div>
                          <div class="avatar"></div>
                          <div class="avatar"></div>
                          <div class="avatar"></div>
                      </div>
                      <span>ADD MEMBROS</span>
                  </div>
                  
                  <div class="header-icons">
                      <div class="header-icon">🔍</div>
                      <div class="header-icon">🔔</div>
                      <div class="header-icon">👤</div>
                  </div>
              </div>
          </header>
    <div class="container">
        <!-- Header da Empresa -->
        <div class="company-header">
            <div class="company-avatar">
                <svg viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
            </div>
            <div class="company-info">
                <h1><?php echo $empresa["nome"] ?></h1>
                <p><?php echo $empresa["tel_empresa"] ?></p>
                <p><?php echo $empresa["email"] ?></p>
            </div>
            <button class="partnership-btn" onclick="handlePartnership()">Parceria</button>
        </div>

        <!-- Descrição da Empresa -->
        <div class="description-section">
            <h2>DESCRIÇÃO DA EMPRESA...</h2>
            <div class="description-content"><?php echo $empresa ["desc_empresa"] ?></div>
        </div>

        <!-- Seção de Serviços -->
        <h2 class="section-title">Serviços</h2>
        <div class="cards-grid" id="services-grid">
            <?php
                include_once("../CONTROLLER/conexao.php");

                $sql2 = "SELECT * FROM cadastro_servicos WHERE id_empresa = " . $empresa['id_empresa'];

                $result2 = $conexao->query($sql2);

                while($servico2 = $result2->fetch_assoc()){
                    echo '<div class="service-card">';
                    echo '<div class="service-logo">';
                    echo '<div class="logo-placeholder">'.$empresa["img_empresa"].'</div>';
                    echo '</div>';
                    echo '<div class="service-title">'.$servico2["titulo_servico"].'</div>';
                    echo '<div class="service-description">'.$servico2["desc_servico"].'</div>';
                    echo '</div>';
                }
            ?>
        </div>

        <!-- Seção de Colaboradores -->
        <h2 class="section-title">Colaboradores</h2>
        <div class="cards-grid" id="collaborators-grid">
            <?php
                include_once("../CONTROLLER/conexao.php");

                $sql3 = "SELECT * FROM cadastro_colaborador WHERE id_empresa = " . $empresa['id_empresa'];

                $result3 = $conexao->query($sql3);

                while($colab = $result3->fetch_assoc()){
                    echo '<div class="collaborator-card">';
                    echo '<div class="collaborator-name">'.$colab["colab_nome"].'</div>';
                    echo '<div class="collaborator-photo">';
                    echo '<div class="photo-placeholder">'.$colab["img_colaborador"].'</div>';
                    echo '</div>';
                    echo '<div class="collaborator-role">'.$colab["colab_cargo"].'</div>';
                    echo '</div>';
                }
            ?>
        </div>
    </div>

    <script src="perfil_empresa.js"></script>
</body>
</html>
