-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 05/09/2025 às 04:04
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `eloa`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `cadastro_colaborador`
--

CREATE TABLE `cadastro_colaborador` (
  `id_colaborador` int(11) NOT NULL,
  `id_responsavel` int(11) NOT NULL,
  `img_colaborador` varchar(255) NOT NULL,
  `colab_nome` varchar(50) NOT NULL,
  `colab_sobrenome` varchar(100) NOT NULL,
  `colab_cargo` varchar(50) NOT NULL,
  `colab_departamento` varchar(50) NOT NULL,
  `colab_genero` varchar(20) NOT NULL,
  `colab_email` varchar(255) NOT NULL,
  `colab_senha` varchar(200) NOT NULL,
  `colab_telefone` varchar(20) NOT NULL,
  `colab_celular` varchar(20) NOT NULL,
  `colab_linkedin` varchar(255) NOT NULL,
  `id_empresa` int(11) NOT NULL,
  `data_colaborador` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `cadastro_colaborador`
--

INSERT INTO `cadastro_colaborador` (`id_colaborador`, `id_responsavel`, `img_colaborador`, `colab_nome`, `colab_sobrenome`, `colab_cargo`, `colab_departamento`, `colab_genero`, `colab_email`, `colab_senha`, `colab_telefone`, `colab_celular`, `colab_linkedin`, `id_empresa`, `data_colaborador`) VALUES
(11, 9, '1757037019_colaborador.webp', 'Fernando', 'Moraes', 'Aux de Marketing', 'Marketing', 'Masculino', 'fernando@gmail.com', '$2y$10$6iehNwyzYq2ALHYV09s2oOyAFr8ihbsNNkH9Py8NV07kfU5yGDqca', '06066060', '07077007', 'Não possui', 15, '2025-09-05 01:50:19'),
(12, 9, '1757037019_colaboradora.webp', 'Maria', 'Cristina', 'Aux de Marketing', 'Marketing', 'Feminino', 'maria@gmail.com', '$2y$10$wQP7Z.nN329kpPSragBGFejPu323xjF3Jha5I4GuJgwxknPZasYh.', '040404', '050505', 'Não Possui', 15, '2025-09-05 01:50:19');

-- --------------------------------------------------------

--
-- Estrutura para tabela `cadastro_empresa`
--

CREATE TABLE `cadastro_empresa` (
  `id_empresa` int(11) NOT NULL,
  `img_empresa` varchar(255) NOT NULL,
  `razao_social` varchar(100) NOT NULL,
  `area_atuacao` varchar(50) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `cnpj_mei` varchar(20) NOT NULL,
  `insc_estadual` varchar(20) NOT NULL,
  `insc_municipal` varchar(20) NOT NULL,
  `cep` varchar(20) NOT NULL,
  `logradouro` varchar(100) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `complemento` varchar(100) NOT NULL,
  `bairro` varchar(100) NOT NULL,
  `cidade` varchar(50) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(200) NOT NULL,
  `data_empresa` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `cadastro_empresa`
--

INSERT INTO `cadastro_empresa` (`id_empresa`, `img_empresa`, `razao_social`, `area_atuacao`, `nome`, `cnpj_mei`, `insc_estadual`, `insc_municipal`, `cep`, `logradouro`, `numero`, `complemento`, `bairro`, `cidade`, `estado`, `email`, `senha`, `data_empresa`) VALUES
(15, '1757037019_empresa coca.jpg', 'Coca', 'Fabricação e Venda', 'Coca-Cola', '1111111', '222222', '333333', '01010101', 'Rua', '21', 'Empresa', 'Parque Novo Mundo', 'Guarulhos', 'São Paulo', 'coca@gmail.com', '$2y$10$Ul8uoaTIgnAGCdKpEgSkUesmG01U85rcSbW5y.U9r4GsIB0fV0r3a', '2025-09-05 01:50:19');

-- --------------------------------------------------------

--
-- Estrutura para tabela `cadastro_responsavel`
--

CREATE TABLE `cadastro_responsavel` (
  `id_responsavel` int(11) NOT NULL,
  `id_empresa` int(11) NOT NULL,
  `img_responsavel` varchar(255) NOT NULL,
  `resp_nome` varchar(50) NOT NULL,
  `resp_sobrenome` varchar(100) NOT NULL,
  `resp_cargo` varchar(50) NOT NULL,
  `resp_departamento` varchar(50) NOT NULL,
  `resp_genero` varchar(20) NOT NULL,
  `resp_telefone` varchar(20) NOT NULL,
  `resp_celular` varchar(20) NOT NULL,
  `resp_linkedin` varchar(255) NOT NULL,
  `resp_email` varchar(255) NOT NULL,
  `resp_senha` varchar(200) NOT NULL,
  `data_responsavel` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `cadastro_responsavel`
--

INSERT INTO `cadastro_responsavel` (`id_responsavel`, `id_empresa`, `img_responsavel`, `resp_nome`, `resp_sobrenome`, `resp_cargo`, `resp_departamento`, `resp_genero`, `resp_telefone`, `resp_celular`, `resp_linkedin`, `resp_email`, `resp_senha`, `data_responsavel`) VALUES
(9, 15, '1757037019_responsavel.avif', 'Denise', 'Santos', 'Gerente', 'Gerencia', 'Feminino', '09090909', '08080808', 'Não possui', 'denise@gmail.com', '$2y$10$qfOZpadQ0r9UWg7V7VQzpeORkqL5xbnwUM1Z3DOhFwnmFVWebsJ.W', '2025-09-05 01:50:19');

-- --------------------------------------------------------

--
-- Estrutura para tabela `cadastro_servicos`
--

CREATE TABLE `cadastro_servicos` (
  `id_servicos` int(11) NOT NULL,
  `id_colaborador` int(11) DEFAULT NULL,
  `id_responsavel` int(11) DEFAULT NULL,
  `id_empresa` int(11) DEFAULT NULL,
  `titulo_servico` varchar(200) NOT NULL,
  `desc_servico` text NOT NULL,
  `categoria_servico` enum('Administrativo','Financeiro','RecursosHumanos','Marketing','Produção','Logística','Tecnologia da Informação (TI)','Jurídico','Atendimento ao Cliente') NOT NULL,
  `precificacao` varchar(100) NOT NULL,
  `forma_pagamento` varchar(50) NOT NULL,
  `img_servico` varchar(255) NOT NULL,
  `data_servico` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `cadastro_servicos`
--

INSERT INTO `cadastro_servicos` (`id_servicos`, `id_colaborador`, `id_responsavel`, `id_empresa`, `titulo_servico`, `desc_servico`, `categoria_servico`, `precificacao`, `forma_pagamento`, `img_servico`, `data_servico`) VALUES
(21, 11, 9, 15, 'Salão de Beleza', 'Cabeleleira Leila', 'Atendimento ao Cliente', '0', 'Dinheiro ou Pix', 'UPLOADS/SERVICOS/1757037757_servico_cabeleleiro.jpg', '2025-09-05 02:02:37');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `cadastro_colaborador`
--
ALTER TABLE `cadastro_colaborador`
  ADD PRIMARY KEY (`id_colaborador`),
  ADD KEY `fk_colaborador_responsavel` (`id_responsavel`),
  ADD KEY `id_empresa` (`id_empresa`);

--
-- Índices de tabela `cadastro_empresa`
--
ALTER TABLE `cadastro_empresa`
  ADD PRIMARY KEY (`id_empresa`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Índices de tabela `cadastro_responsavel`
--
ALTER TABLE `cadastro_responsavel`
  ADD PRIMARY KEY (`id_responsavel`),
  ADD UNIQUE KEY `email` (`resp_email`),
  ADD KEY `fk_responsavel_empresa` (`id_empresa`);

--
-- Índices de tabela `cadastro_servicos`
--
ALTER TABLE `cadastro_servicos`
  ADD PRIMARY KEY (`id_servicos`),
  ADD KEY `id_colaborador` (`id_colaborador`,`id_responsavel`,`id_empresa`),
  ADD KEY `id_colaborador_2` (`id_colaborador`,`id_responsavel`,`id_empresa`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `cadastro_colaborador`
--
ALTER TABLE `cadastro_colaborador`
  MODIFY `id_colaborador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de tabela `cadastro_empresa`
--
ALTER TABLE `cadastro_empresa`
  MODIFY `id_empresa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de tabela `cadastro_responsavel`
--
ALTER TABLE `cadastro_responsavel`
  MODIFY `id_responsavel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `cadastro_servicos`
--
ALTER TABLE `cadastro_servicos`
  MODIFY `id_servicos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `cadastro_colaborador`
--
ALTER TABLE `cadastro_colaborador`
  ADD CONSTRAINT `fk_colaborador_responsavel` FOREIGN KEY (`id_responsavel`) REFERENCES `cadastro_responsavel` (`id_responsavel`);

--
-- Restrições para tabelas `cadastro_responsavel`
--
ALTER TABLE `cadastro_responsavel`
  ADD CONSTRAINT `fk_responsavel_empresa` FOREIGN KEY (`id_empresa`) REFERENCES `cadastro_empresa` (`id_empresa`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
