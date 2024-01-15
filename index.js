function init() {
  if (localStorage.getItem('followUpsCount')) {
    procesoConfirmacionCount = parseInt(localStorage.getItem('procesoConfirmacionCount'));
    newBookingCount = parseInt(localStorage.getItem('newBookingCount'));
    totalChatsCount = parseInt(localStorage.getItem('totalChatsCount'));
    followUpsCount = parseInt(localStorage.getItem('followUpsCount'));
  } else {
    procesoConfirmacionCount = 0;
    newBookingCount = 0;
    totalChatsCount = 0;
    followUpsCount = 0;
  }

  document.getElementById("procesoConfirmacionCount").textContent = procesoConfirmacionCount;
  document.getElementById("newBookingCount").textContent = newBookingCount;
  document.getElementById("totalChatsCount").textContent = totalChatsCount;
  document.getElementById("followUpsCount").textContent = followUpsCount;
  restoreListData("callsProposedList");
  restoreListData("newBookingList");
  restoreListData("bookingPediente");
  restoreListData("notesList");
}
  
window.addEventListener('DOMContentLoaded', init);
  
function saveDataToLocalStorage() {
  localStorage.setItem('procesoConfirmacionCount', procesoConfirmacionCount);
  localStorage.setItem('newBookingCount', newBookingCount);
  localStorage.setItem('totalChatsCount', totalChatsCount);
  localStorage.setItem('followUpsCount', followUpsCount);
}
  
let procesoConfirmacionCount = 0;
let newBookingCount = 0;
let totalChatsCount = 0;
let followUpsCount = 0;

const fechaActual = new Date();
const dia = String(fechaActual.getDate()).padStart(2, '0');
const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
const año = fechaActual.getFullYear();
const fechaFormateada = `${dia}-${mes}-${año}`;

function incrementClickupLeads() {
  procesoConfirmacionCount++;
  document.getElementById("procesoConfirmacionCount").textContent = procesoConfirmacionCount;
  saveDataToLocalStorage();
}
function decreaseClickupLeads() {
  if (procesoConfirmacionCount > 0) {
      procesoConfirmacionCount--;
      document.getElementById("procesoConfirmacionCount").textContent = procesoConfirmacionCount;
      saveDataToLocalStorage();
  }
}

function incrementOpenChats() {
  newBookingCount++;
  document.getElementById("newBookingCount").textContent = newBookingCount;
  saveDataToLocalStorage();
}
function decreaseOpenChats() {
  if (newBookingCount > 0) {
      newBookingCount--;
      document.getElementById("newBookingCount").textContent = newBookingCount;
      saveDataToLocalStorage();
  }
}

function incrementTotalChats() {
  totalChatsCount++;
  document.getElementById("totalChatsCount").textContent = totalChatsCount;
  saveDataToLocalStorage();
}
function decreaseTotalChats() {
  if (totalChatsCount > 0) {
    totalChatsCount--;
    document.getElementById("totalChatsCount").textContent = totalChatsCount;
    saveDataToLocalStorage();
  }
}

function incrementFollowUps() {
  followUpsCount++;
  document.getElementById("followUpsCount").textContent = followUpsCount;
  saveDataToLocalStorage();
}
function decreaseFollowUps() {
  if (followUpsCount > 0) {
      followUpsCount--;
      document.getElementById("followUpsCount").textContent = followUpsCount;
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
document.getElementById("procesoConfirmacionPlus").addEventListener("click", incrementClickupLeads);
document.getElementById("procesoConfirmacionDecrease").addEventListener("click", decreaseClickupLeads);
document.getElementById("newBookingDecrease").addEventListener("click", incrementOpenChats);
document.getElementById("openChatsDecreaseBtn").addEventListener("click", decreaseOpenChats);
document.getElementById("totalChatsBtn").addEventListener("click", incrementTotalChats);
document.getElementById("totalChatsDecreaseBtn").addEventListener("click", decreaseTotalChats);
document.getElementById("followUpsBtn").addEventListener("click", incrementFollowUps);
document.getElementById("followUpsDecreaseBtn").addEventListener("click", decreaseFollowUps);
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


document.getElementById("callsProposedBtn").addEventListener("click", () => {
    addNameToList("callsProposedInput", "callsProposedList");
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
    text += "Total chats: " + totalChatsCount + "\n";
    text += "Follow ups: " + followUpsCount + "\n\n";
    text += "Calls Proposed:\n" + getNumberedNamesTextFromList("callsProposedList") + "\n";
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
  totalChatsCount = 0;
  followUpsCount = 0;
  
  document.getElementById("procesoConfirmacionCount").textContent = procesoConfirmacionCount;
  document.getElementById("newBookingCount").textContent = newBookingCount;
  document.getElementById("totalChatsCount").textContent = totalChatsCount;
  document.getElementById("followUpsCount").textContent = followUpsCount;
  
  localStorage.removeItem("callsProposedList");
  localStorage.removeItem("newBookingList");
  localStorage.removeItem("bookingPediente");
  localStorage.removeItem("notesList");
  
  document.getElementById("callsProposedList").innerHTML = "";
  document.getElementById("newBookingList").innerHTML = "";
  document.getElementById("bookingPediente").innerHTML = "";
  document.getElementById("notesList").innerHTML = "";
} 

document.getElementById("resetBtn").addEventListener("click", resetData);

  