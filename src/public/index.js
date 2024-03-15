$(function () {
    var $h1 = $('h1')
    var $zip = $("input[name='zip']")

    $('form').on("submit", function(event) {
        event.preventDefault()
        var zipCode = $.trim($zip.val())
        $h1.text('Loading...')
        var request = $.ajax({
            url: "/" +zipCode,
            dataType: 'json'
        })
        request.done(function (data) {
            var temperature = data.temperature
            $h1.text("It is " + temperature + "in " + zipCode + ".")
        })
        request.fail(function () {
            $h1.text("Error!")
        })
    })
})

//Vanilla JavaScript version

document.addEventListener('DOMContentLoaded', function () {
    var h1 = document.querySelector('h1');
    var zip = document.querySelector("input[name='zip']");

    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();
        var zipCode = zip.ariaValueMax.trim();
        h1.textContent = "Loading...";

        fetch('/' + zipCode)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Network response failed');
                }
                return response.json();
            })
            .then(function(data) {
                var temperature = data.temperature;
                h1.textContent = "It is " + temperature +  " in " + zipCode + ".";
            })
            .catch(function(error) {
                h1.textContent = "Error!";
            })
    })
});