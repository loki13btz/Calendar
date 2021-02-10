document.addEventListener("DOMContentLoaded", function() {
    let addEventForm = document.getElementById("myForm");
    let filter = document.getElementById("filter");
    let calendarTable = document.getElementById("calendar-table")
    filter.addEventListener("change", (event) => {
        clearTable();
        showEvents(event.target.value);
    });
    addEventForm.addEventListener("submit", addEvent)
    calendarTable.addEventListener("click", function(e) {
        if (e.target && e.target.classList.contains('delete-event')) {
            localStorage.removeItem(e.target.dataset.id);
            clearTable();
            showEvents();
        }
    })
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
    "10:00": "1",
    "11:00": "2",
    "12:00": "3",
    "13:00": "4",
    "14:00": "5",
    "15:00": "6",
    "16:00": "7",
    "17:00": "8",
    "18:00": "9"
};

function addEvent(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let formDataObject = {};
    formData.forEach((value, key) => { formDataObject[key] = value });
    if (!localStorage.getItem(formDataObject.day + "_" + formDataObject.time)) {
        localStorage.setItem(formDataObject.day + "_" + formDataObject.time, JSON.stringify(formDataObject));
        e.target.reset();
    } else {
        alert(`Wrong data`);
    }
    showEvents();
}

function clearTable() {
    events_item = document.querySelectorAll(".table-active");
    if (events_item) {
        events_item.forEach((event_item) => {
            event_item.innerHTML = "";
            event_item.classList.remove("table-active");
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
                    <div class="col">
                        <button type="button" class="btn-close delete-event" data-id="${localStorage.key(i)}" aria-label="Close"></button>
                    </div>
                </div>
                `;
                td.classList.add("table-active");
            }
        }
    }
}