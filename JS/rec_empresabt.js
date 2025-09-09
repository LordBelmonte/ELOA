let bt_empresa = document.querySelectorAll(".company-btn");

bt_empresa.forEach (button => {
    button.addEventListener('click', (event) => {
        let pai_bt = event.target.parentElement;
        let pai_bt_id = pai_bt.id;

        window.location.href = `empresa.php?id_empresa=${encodeURIComponent(pai_bt_id)}`;
    });
});