document.addEventListener("DOMContentLoaded", () => {
    const messageField = document.querySelector('textarea[name="message"]');

    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.type;
            if (type && messageField) {
                messageField.value = `Bonjour,\nJe souhaite une demande de ${type}.`;
            }
        });
    });
});
