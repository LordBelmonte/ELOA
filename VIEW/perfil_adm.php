<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Cadastro</title>
    <!-- linking external CSS file -->
    <link rel="stylesheet" href="../CSS/perfil_adm.css">
</head>
<body>
    <div class="overlay" id="overlay"></div>

    <!-- Aqui vai carregar o nav -->
    <div id="sidebar-container"></div> 
       
    <!-- Main Content -->
    <div class="container">
        <!-- Moved company info and buttons to main content area -->
        <div class="main-header">
            <div class="company-info">
                <div class="avatar">👤</div>
                <div class="company-name">Nome da empresa</div>
            </div>
            <div class="header-buttons">
                <button class="btn btn-primary" onclick="openModal('colaboradores')">Cadastro de Colaboradores</button>
                <button class="btn btn-primary" onclick="openModal('servicos')">Cadastro de serviços</button>
            </div>
        </div>

        <!-- Serviços Section -->
        <div class="section">
            <h2 class="section-title">Serviços cadastrados</h2>
            <div class="cards-container" id="servicos-list">
                <div class="card">
                    <div class="card-image"></div>
                    <div class="card-content">
                        <div class="card-title">Título do serviço</div>
                        <div class="card-subtitle">Precificação</div>
                        <div class="card-subtitle">Forma de pagamento</div>
                    </div>
                    <div class="card-content">
                        <div class="card-title">Descrição</div>
                    </div>
                    <div class="card-actions">
                        <button class="btn-small btn-edit" onclick="openModalForEdit('servicos', this.closest('.card'))">✏️ Editar</button>
                        <button class="btn-small btn-delete" onclick="this.closest('.card').remove()">✖️ Excluir</button>
                    </div>
                </div>
                <div class="card">
                    <div class="card-image"></div>
                    <div class="card-content">
                        <div class="card-title">Título do serviço</div>
                        <div class="card-subtitle">Precificação</div>
                        <div class="card-subtitle">Forma de pagamento</div>
                    </div>
                    <div class="card-content">
                        <div class="card-title">Descrição</div>
                    </div>
                    <div class="card-actions">
                        <button class="btn-small btn-edit" onclick="openModalForEdit('servicos', this.closest('.card'))">✏️ Editar</button>
                        <button class="btn-small btn-delete" onclick="this.closest('.card').remove()">✖️ Excluir</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Colaboradores Section -->
        <div class="section">
            <h2 class="section-title">Colaboradores cadastrados</h2>
            <div class="cards-container" id="colaboradores-list">
                <div class="card">
                    <div class="card-image"></div>
                    <div class="card-content">
                        <div class="card-title">Nome do colaborador</div>
                        <div class="card-subtitle">Cargo do Colaborador</div>
                        <div class="card-subtitle">Contato do colaborador</div>
                    </div>
                    <div class="card-content">
                        <div class="card-title">Data de inscrição do colaborador</div>
                    </div>
                    <div class="card-actions">
                        <button class="btn-small btn-edit" onclick="openModalForEdit('colaboradores', this.closest('.card'))">✏️ Editar</button>
                        <button class="btn-small btn-delete" onclick="this.closest('.card').remove()">✖️ Excluir</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Colaboradores -->
    <div class="modal" id="modal-colaboradores">
        <div class="modal-content">
            <button class="close-btn" onclick="closeModal('colaboradores')">&times;</button>
            <h2 class="modal-title">Cadastro de Colaboradores</h2>
            <form id="form-colaboradores">
                <div class="form-group">
                    <label class="form-label">Nome do Colaborador</label>
                    <input type="text" class="form-input" name="nome" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Cargo do Colaborador</label>
                    <input type="text" class="form-input" name="cargo" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Contato do Colaborador</label>
                    <input type="text" class="form-input" name="contato" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Data de inscrição</label>
                    <input type="date" class="form-input" name="data" required>
                </div>
                <button type="submit" class="btn-submit">PRONTO</button>
            </form>
        </div>
    </div>

    <!-- Modal Serviços -->
    <div class="modal" id="modal-servicos">
        <div class="modal-content">
            <button class="close-btn" onclick="closeModal('servicos')">&times;</button>
            <h2 class="modal-title">Cadastro de serviços</h2>
            <form id="form-servicos">
                <div class="form-group">
                    <label class="form-label">Título do serviço</label>
                    <input type="text" class="form-input" name="titulo" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Descrição do serviço</label>
                    <input type="text" class="form-input" name="descricao" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Precificação</label>
                    <input type="text" class="form-input" name="preco" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Forma de Pagamento</label>
                    <input type="text" class="form-input" name="pagamento" required>
                </div>
                <div class="upload-section">
                    <label class="form-label">Imagem</label>
                    <button type="button" class="btn-upload" onclick="document.getElementById('file-input').click()">UPLOAD</button>
                    <input type="file" id="file-input" style="display: none;" accept="image/*">
                </div>
                <button type="submit" class="btn-submit">PRONTO</button>
            </form>
        </div>
    </div>

    <!-- linking external JavaScript file -->
    <script src="../JS/perfil_adm.js"></script>
    <script src="../NAVEGACAO_WEB/menu.js"></script>
</body>
</html>
