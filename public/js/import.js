const res = document.getElementById('response');
res.addEventListener('click', function () {
  console.log('Button clicked!');
  getExcelData();
});

function getExcelData() {
    const xhr = new XMLHttpRequest(); // Membuat instance XMLHttpRequest

    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    xhr.open('GET', proxyUrl + './../../vocab.json', true); // Menentukan metode dan URL file JSON

    // Menentukan apa yang terjadi jika request selesai
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            // Parsing JSON yang diterima dari server
            const parsedData = JSON.parse(xhr.responseText);
            console.log(parsedData);
        } else {
            console.error('Request failed with status:', xhr.status);
        }
    };

    // Menangani kesalahan jaringan
    xhr.onerror = function() {
        console.error('There was an error with the request.');
    };

    xhr.send(); // Mengirim request ke server
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

//usage:
