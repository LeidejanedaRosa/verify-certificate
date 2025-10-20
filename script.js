async function checkCertificate(codigo) {
  const messageEl = document.getElementById("mensagem");
  messageEl.className = "mensagem";
  messageEl.textContent = "Verificando...";
  messageEl.classList.add("visivel");

  try {
    const response = await fetch("verificar_certificado.json");
    const certificates = await response.json();
    const codigoTrimmed = codigo.trim();
    const found = certificates[codigoTrimmed];
    messageEl.innerHTML = "";
    messageEl.classList.remove("sucesso", "erro");

    if (found) {
      messageEl.classList.add("mensagem", "visivel", "sucesso");
      messageEl.innerHTML = `
    ✅ <strong>Certificado válido!</strong><br/>
    <strong>Nome:</strong> ${found.nome}<br/>
    <strong>Curso:</strong> ${found.curso}<br/>
    <strong>Data de Emissão:</strong> ${found.data_emissao}<br/>    
  `;
    } else {
      messageEl.classList.add("mensagem", "visivel", "erro");
      messageEl.textContent =
        "❌ Código não encontrado. Verifique o código e tente novamente.";
    }
  } catch (error) {
    console.error("Erro ao carregar lista:", error);
    messageEl.classList.add("mensagem", "visivel", "erro");
    messageEl.textContent = "Erro ao verificar. Tente novamente mais tarde.";
  }
}

document.getElementById("form-verificacao").addEventListener("submit", (e) => {
  e.preventDefault();
  const codigo = document.getElementById("codigo").value;
  checkCertificate(codigo);
});

// Detecta se veio com ?codigo= na URL (ex: QR code)
const params = new URLSearchParams(window.location.search);
const codigoParam = params.get("codigo");
if (codigoParam) {
  document.getElementById("codigo").value = codigoParam;
  checkCertificate(codigoParam);
}
