document.addEventListener("DOMContentLoaded", function() {
    let addEventForm = document.getElementById("myForm");
    let filter = document.getElementById("filter");
    filter.addEventListener("change", (event) => {
        clearTable();
        showEvents(event.target.value);
    });
    addEventForm.addEventListener("submit", addEvent)
    showEvents();
});

const days = {
    "monday": "2",
    "tuesday": "3",
    "wednesday": "4",
    "thursday": "5",
    "friday": "6"
};

const times = {
    "10:00": "2",
    "11:00": "3",
    "12:00": "4",
    "13:00": "5",
    "14:00": "6",
    "15:00": "7",
    "16:00": "8",
    "17:00": "9",
    "18:00": "10"
};

function addEvent(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let formDataObject = {};
    formData.forEach((value, key) => { formDataObject[key] = value });
    localStorage.setItem(formDataObject.day + "_" + formDataObject.time, JSON.stringify(formDataObject));
    showEvents();
}

function clearTable() {
    events = document.querySelectorAll(".table-active");
    if (events) {
        events.forEach((event) => {
            event.innerHTML = "";
            event.className = "";
        });
    }
}

function showEvents(member = null) {
    let event = {};
    for (var i = 0; i < localStorage.length; i++) {
        event = JSON.parse(localStorage.getItem(localStorage.key(i)));
        console.log(event.member);
        if (!member || member === "allMembers" || (event.member === member || event.member === "allMembers")) {
            if (times[event.time] && days[event.day]) {
                let td = document.querySelector(`.table tr:nth-child(${times[event.time]}) td:nth-child(${days[event.day]})`);
                td.innerHTML = `
                <div class="row">
                    <div class="col-8">
                        ${event.eventName}
                    </div>
                </div>
                `;
                td.className = "table-active";
            }
        }
    }
}