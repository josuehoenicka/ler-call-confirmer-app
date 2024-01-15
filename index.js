function init() {
  if (localStorage.getItem('totalBookingConfirmadas')) {
    procesoConfirmacionCount = parseInt(localStorage.getItem('procesoConfirmacionCount'));
    newBookingCount = parseInt(localStorage.getItem('newBookingCount'));
    totalBookingCanceladas = parseInt(localStorage.getItem('totalBookingCanceladas'));
    totalBookingConfirmadas = parseInt(localStorage.getItem('totalBookingConfirmadas'));
  } else {
    procesoConfirmacionCount = 0;
    newBookingCount = 0;
    totalBookingCanceladas = 0;
    totalBookingConfirmadas = 0;
  }

  document.getElementById("procesoConfirmacionCount").textContent = procesoConfirmacionCount;
  document.getElementById("newBookingCount").textContent = newBookingCount;
  document.getElementById("totalBookingCanceladas").textContent = totalBookingCanceladas;
  document.getElementById("totalBookingConfirmadas").textContent = totalBookingConfirmadas;
  restoreListData("bookingConfirmadasList");
  restoreListData("newBookingList");
  restoreListData("bookingPediente");
  restoreListData("notesList");
}
  
window.addEventListener('DOMContentLoaded', init);
  
function saveDataToLocalStorage() {
  localStorage.setItem('procesoConfirmacionCount', procesoConfirmacionCount);
  localStorage.setItem('newBookingCount', newBookingCount);
  localStorage.setItem('totalBookingCanceladas', totalBookingCanceladas);
  localStorage.setItem('totalBookingConfirmadas', totalBookingConfirmadas);
}
  
let procesoConfirmacionCount = 0;
let newBookingCount = 0;
let totalBookingCanceladas = 0;
let totalBookingConfirmadas = 0;

const fechaActual = new Date();
const dia = String(fechaActual.getDate()).padStart(2, '0');
const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
const año = fechaActual.getFullYear();
const fechaFormateada = `${dia}-${mes}-${año}`;

function procesoConfirmacionPlus() {
  procesoConfirmacionCount++;
  document.getElementById("procesoConfirmacionCount").textContent = procesoConfirmacionCount;
  saveDataToLocalStorage();
}
function procesoConfirmacionDecrease() {
  if (procesoConfirmacionCount > 0) {
      procesoConfirmacionCount--;
      document.getElementById("procesoConfirmacionCount").textContent = procesoConfirmacionCount;
      saveDataToLocalStorage();
  }
}

function newBookingPlus() {
  newBookingCount++;
  document.getElementById("newBookingCount").textContent = newBookingCount;
  saveDataToLocalStorage();
}
function newBookingDecrease() {
  if (newBookingCount > 0) {
      newBookingCount--;
      document.getElementById("newBookingCount").textContent = newBookingCount;
      saveDataToLocalStorage();
  }
}

function totalBookingCanceladasPlus() {
  totalBookingCanceladas++;
  document.getElementById("totalBookingCanceladas").textContent = totalBookingCanceladas;
  saveDataToLocalStorage();
}
function totalBookingCanceladasDecrease() {
  if (totalBookingCanceladas > 0) {
    totalBookingCanceladas--;
    document.getElementById("totalBookingCanceladas").textContent = totalBookingCanceladas;
    saveDataToLocalStorage();
  }
}

function totalBookingConfirmadasPlus() {
  totalBookingConfirmadas++;
  document.getElementById("totalBookingConfirmadas").textContent = totalBookingConfirmadas;
  saveDataToLocalStorage();
}
function totalBookingConfirmadasDecrease() {
  if (totalBookingConfirmadas > 0) {
      totalBookingConfirmadas--;
      document.getElementById("totalBookingConfirmadas").textContent = totalBookingConfirmadas;
      saveDataToLocalStorage();
  }
}

function incrementNewChatOutbound() {
  newChatOutboundCount++;
  document.getElementById("newChatOutboundCount").textContent = newChatOutboundCount;
  saveDataToLocalStorage();
}
function decreaseNewChatOutbound() {
    if (newChatOutboundCount > 0) {
        newChatOutboundCount--;
        document.getElementById("newChatOutboundCount").textContent = newChatOutboundCount;
        saveDataToLocalStorage();
    }
}

document.getElementById('fechaActual').textContent = fechaFormateada;
document.getElementById("procesoConfirmacionPlus").addEventListener("click", procesoConfirmacionPlus);
document.getElementById("procesoConfirmacionDecrease").addEventListener("click", procesoConfirmacionDecrease);
document.getElementById("newBookingPlus").addEventListener("click", newBookingPlus);
document.getElementById("newBookingDecrease").addEventListener("click", newBookingDecrease);
document.getElementById("totalBookingCanceladasPlus").addEventListener("click", totalBookingCanceladasPlus);
document.getElementById("totalBookingCanceladasDecrease").addEventListener("click", totalBookingCanceladasDecrease);
document.getElementById("totalBookingConfirmadasPlus").addEventListener("click", totalBookingConfirmadasPlus);
document.getElementById("totalBookingConfirmadasDecrease").addEventListener("click", totalBookingConfirmadasDecrease);
document.getElementById("newChatInboundBtn").addEventListener("click", incrementNewChatInbound);
document.getElementById("newChatInboundDecreaseBtn").addEventListener("click", decreaseNewChatInbound);
document.getElementById("newChatOutboundDecreaseBtn").addEventListener("click", decreaseNewChatOutbound);
document.getElementById("newChatOutboundBtn").addEventListener("click", incrementNewChatOutbound);

function addNameToList(inputId, listId) {
    const input = document.getElementById(inputId);
    const name = input.value.trim();
    if (name !== "") {
        const list = document.getElementById(listId);
        const listItem = document.createElement("li");
        listItem.textContent = name;
        const deleteButton = document.createElement("button");
        deleteButton.style.margin = ".5em 1em";
        deleteButton.style.padding = ".5em 1em";
        deleteButton.style.borderRadius = "2em";
        deleteButton.style.fontSize = "16px";
        deleteButton.style.backgroundColor = "#ee4646";
        deleteButton.style.color = "black";
        deleteButton.style.border = "none";
        deleteButton.style.cursor = "pointer";
        deleteButton.innerHTML = '<i class="fas fa-times"></i>';
        deleteButton.addEventListener("click", () => {
            list.removeChild(listItem);
            saveListData(listId);
        });
        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
        input.value = "";
        saveListData(listId);
    }
}


document.getElementById("bookingConfirmadasListBtn").addEventListener("click", () => {
    addNameToList("callsProposedInput", "bookingConfirmadasList");
});
document.getElementById("newBookingBtn").addEventListener("click", () => {
    addNameToList("newBookingInput", "newBookingList");
});
document.getElementById("bookingPedienteBtn").addEventListener("click", () => {
  addNameToList("bookingPedienteInput", "bookingPediente");
});
document.getElementById("notesBtn").addEventListener("click", () => {
  addNameToList("notesInput", "notesList");
});

function getDataAsText() {
    let text = "";
    text += "Hubspot leads: " + procesoConfirmacionCount + "\n";
    text += "Open chats: " + newBookingCount + "\n";
    text += "Total chats: " + totalBookingCanceladas + "\n";
    text += "Follow ups: " + totalBookingConfirmadas + "\n\n";
    text += "Calls Proposed:\n" + getNumberedNamesTextFromList("bookingConfirmadasList") + "\n";
    text += "New Booking:\n" + getNumberedNamesTextFromList("newBookingList") + "\n";
    text += "New Booking:\n" + getNumberedNamesTextFromList("bookingPediente") + "\n";
    text += "Notas:\n" + getNumberedNamesTextFromList("notesList") + "\n" + "\n" + "\n" + "\n";
    text += "Creado por: https://www.linkedin.com/in/josuehoenicka/";
    return text;
}
  
function getNumberedNamesTextFromList(listId) {
    const list = document.getElementById(listId);
    let namesText = "";
    for (let i = 0; i < list.children.length; i++) {
        const listItem = list.children[i];
        const listItemText = listItem.innerText.replace(/^\d+\. /, "");
        namesText += `${i + 1}. ${listItemText}\n`;
    }
    return namesText;
}
  
document.getElementById("descargarBtn").addEventListener("click", () => {
    const textData = getDataAsText();
    const blob = new Blob([textData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fechaFormateada}.txt`;
    a.click();
});

function saveListData(listId) {
    const list = document.getElementById(listId);
    const listData = Array.from(list.children).map((listItem) => listItem.textContent);
    localStorage.setItem(listId, JSON.stringify(listData));
}

function restoreListData(listId) {
    const listData = localStorage.getItem(listId);
    if (listData) {
      const list = document.getElementById(listId);
      const parsedListData = JSON.parse(listData);
      for (let i = 0; i < parsedListData.length; i++) {
        const listItem = document.createElement("li");
        listItem.textContent = parsedListData[i];
        const deleteButton = document.createElement("button");
        deleteButton.style.margin = ".5em 1em";
        deleteButton.style.padding = ".5em 1em";
        deleteButton.style.borderRadius = "2em";
        deleteButton.style.fontSize = "16px";
        deleteButton.style.backgroundColor = "#ee4646";
        deleteButton.style.color = "black";
        deleteButton.style.border = "none";
        deleteButton.style.cursor = "pointer";
        deleteButton.innerHTML = '<i class="fas fa-times"></i>';
        deleteButton.addEventListener("click", () => {
          list.removeChild(listItem);
          saveListData(listId);
        });
  
        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
      }
    }
  }
  

function resetData() {
  
  procesoConfirmacionCount = 0;
  newBookingCount = 0;
  totalBookingCanceladas = 0;
  totalBookingConfirmadas = 0;
  
  document.getElementById("procesoConfirmacionCount").textContent = procesoConfirmacionCount;
  document.getElementById("newBookingCount").textContent = newBookingCount;
  document.getElementById("totalBookingCanceladas").textContent = totalBookingCanceladas;
  document.getElementById("totalBookingConfirmadas").textContent = totalBookingConfirmadas;
  
  localStorage.removeItem("bookingConfirmadasList");
  localStorage.removeItem("newBookingList");
  localStorage.removeItem("bookingPediente");
  localStorage.removeItem("notesList");
  
  document.getElementById("bookingConfirmadasList").innerHTML = "";
  document.getElementById("newBookingList").innerHTML = "";
  document.getElementById("bookingPediente").innerHTML = "";
  document.getElementById("notesList").innerHTML = "";
} 

document.getElementById("resetBtn").addEventListener("click", resetData);

  