document.addEventListener('DOMContentLoaded', function () {
    function saveToLocalStorage() {
        var name = document.getElementById('name').value;
        var rating = document.getElementById('rating').value;
        var revies_text = document.getElementById('revies-text').value;

        var review = {
            name: name,
            rating: rating,
            revies_text: revies_text
        };

        var reviews = JSON.parse(localStorage.getItem('reviews')) || [];

        reviews.push(review);

        localStorage.setItem('reviews', JSON.stringify(reviews));

        document.getElementById('name').value = '';
        document.getElementById('revies-text').value = '';

    }

    var reviewsForm = document.querySelector('.revies-form');

    if (reviewsForm) {
        reviewsForm.addEventListener('submit', function (event) {
            event.preventDefault();
            saveToLocalStorage();
        });
    }
});

function addRow(name, rating, review) {
    var table = document.getElementById("reviews-table__lines");
    var newRow = table.insertRow(0);

    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);   

    cell1.innerHTML = name;
    cell2.innerHTML = rating;
    cell3.innerHTML = review;
}

function populateTableFromLocalStorage() {
    var storedData = JSON.parse(localStorage.getItem("reviews")) || [];

    storedData.forEach(function(item) {
        addRow(item.name, item.rating, item.revies_text);
    });
}

populateTableFromLocalStorage()