document.addEventListener("DOMContentLoaded", function () {
    loadEventListeners();
});

let toastQueue = [];

function loadEventListeners() {
    document.querySelector(".header span").addEventListener("click", newElement);
    document.getElementById("list").addEventListener("click", modifyTask);
    addCloseButtons();
}

function newElement() {
    let inputValue = document.getElementById("task").value.trim();

    if (inputValue === "") {
        showToast("error", "Listeye boş eleman ekleyemezsiniz!");
    } else {
        let li = document.createElement("li");
        li.textContent = inputValue;

        let span = document.createElement("span");
        span.textContent = " ×";
        span.classList.add("close");
        span.onclick = function (event) {
            event.stopPropagation();
            this.parentElement.remove();
        };

        li.appendChild(span);
        document.getElementById("list").appendChild(li);
        document.getElementById("task").value = "";

        showToast("success", "Listeye yeni eleman eklendi.");
    }
}

function modifyTask(event) {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("checked");
    }
}

function enqueueToast(type, message) {
    toastQueue.push({ type, message }); // Mesajı kuyruğa ekle
    processToastQueue(); // Kuyruğu işle
}

function processToastQueue() {
    if (toastQueue.length > 0) {
        const { type, message } = toastQueue.shift();
        const toastElement = document.getElementById(`liveToast${type === "success" ? "Success" : "Error"}`);
        toastElement.querySelector(".toast-body").textContent = message;

        const toast = new bootstrap.Toast(toastElement);
        toast.show();

        toastElement.addEventListener('shown.bs.toast', () => {
            processToastQueue(); // Bir sonraki mesajı göster
        }, { once: true });
    }
}

function addCloseButtons() {
    const listItems = document.querySelectorAll("#list li");
    listItems.forEach(item => {
        const span = document.createElement("span");
        span.textContent = " ×";
        span.classList.add("close");
        span.onclick = function (event) {
            event.stopPropagation();
            this.parentElement.remove();
        };
        item.appendChild(span);
    });
}