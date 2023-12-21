

fetch("https://jsonplaceholder.typicode.com/photos")
    .then(response => response.json())
    .then(jsonResponse => console.log(jsonResponse))
    .catch(error => console.error("Ошибка запроса:", error));