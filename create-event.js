function sendForm(e) {

    // получаем значение поля key
    var keyBox = document.myForm.key;
    var val = keyBox.value;
    if (val.length > 5) {
        alert("Недопустимая длина строки");
        document.myForm.action = "./calendar.html";
    } else
        alert("Отправка разрешена");
}
var sendButton = document.myForm.send;
sendButton.addEventListener("click", sendForm);