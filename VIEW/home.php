<?php
session_start();

if (!isset($_SESSION['id_usuario'], $_SESSION['tipo_usuario'], $_SESSION['nome_usuario'])) {
    header('Location: login_cadastro.html');
    exit;
}

$nome = $_SESSION['nome_usuario'];
$tipo_usuario = $_SESSION['tipo_usuario'];
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ELOA</title>
    <link rel="stylesheet" href="../CSS/home.css">
    <link rel="stylesheet" href="../NAVEGACAO_WEB/menu.css">
   
</head>
<body>
    <div class="container">
   
         <!-- Aqui vai carregar o nav -->
        <div id="sidebar-container"></div>
       
            <!-- Content -->
            <div class="content">
                <main class="main-section">
                    <!-- Welcome Banner -->
                    <div class="welcome-banner">
                        <h1>Olá <?= htmlspecialchars($nome) ?></h1>
                        <p>BEM VINDA A PLATAFORMA ELOA, ONDE O MICRO E GRANDE NEGÓCIOS SE ENCONTRAM</p>
                    </div>

                    <!-- Services Grid -->
                    <div class="services-grid">
                        <div class="service-card">
                            <div class="service-header">
                                <div class="company-logo">LOGO<br>EMPRESA</div>
                                <div class="service-title">Título do serviço</div>
                            </div>
                            <div class="service-description">
                                BREVE DESCRIÇÃO DO SERVIÇO
                            </div>
                        </div>

                        <div class="service-card">
                            <div class="service-header">
                                <div class="company-logo">LOGO<br>EMPRESA</div>
                                <div class="service-title">Título do serviço</div>
                            </div>
                            <div class="service-description">
                                BREVE DESCRIÇÃO DO SERVIÇO
                            </div>
                        </div>

                        <div class="service-card">
                            <div class="service-header">
                                <div class="company-logo">LOGO<br>EMPRESA</div>
                                <div class="service-title">Título do serviço</div>
                            </div>
                            <div class="service-description">
                                BREVE DESCRIÇÃO DO SERVIÇO
                            </div>
                        </div>

                        <div class="service-card">
                            <div class="service-header">
                                <div class="company-logo">LOGO<br>EMPRESA</div>
                                <div class="service-title">Título do serviço</div>
                            </div>
                            <div class="service-description">
                                BREVE DESCRIÇÃO DO SERVIÇO
                            </div>
                        </div>
                    </div>
                </main>

                <!-- Right Sidebar -->
                <aside class="right-sidebar">
                    <div class="calendar-header">
                        <h3 class="calendar-title">CALENDÁRIO</h3>
                        <span class="today-badge">HOJE</span>
                    </div>

                    <div class="time-slots">
                        <div class="time-slot">
                            <span class="time-label">10:00</span>
                        </div>
                        <div class="time-slot">
                            <span class="time-label">09:30</span>
                            <div class="time-bar"></div>
                        </div>
                        <div class="time-slot">
                            <span class="time-label">09:00</span>
                            <div class="time-bar light"></div>
                        </div>
                        <div class="time-slot">
                            <span class="time-label">08:30</span>
                        </div>
                        <div class="time-slot">
                            <span class="time-label">08:00</span>
                        </div>
                    </div>

                    <div class="upcoming-events">
                        <h4 class="events-title">UPCOMING EVENTS</h4>
                        
                        <div class="event-item">
                            <div class="event-dot"></div>
                            <span class="event-text">MENTORIA 01</span>
                        </div>
                        
                        <div class="event-item">
                            <div class="event-dot"></div>
                            <span class="event-text">MENTORIA 02</span>
                        </div>
                        
                        <div class="event-item">
                            <div class="event-dot"></div>
                            <span class="event-text">MENTORIA 02</span>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    </div>

    <script src="../NAVEGACAO_WEB/menu.js"></script>
</body>
</html>
