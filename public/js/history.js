totalQuiz = document.getElementById('totalQuiz'); 
getHistoryQuiz = localStorage.getItem('getHistoryQuiz');

document.addEventListener('DOMContentLoaded', async function () {
  try {
    // get data local 
    getHistoryQuiz = localStorage.getItem('getHistoryQuiz')
    parseHistory = JSON.parse(getHistoryQuiz)
    renderTable(parseHistory)
    
    totalQuiz.innerHTML = parseHistory.length
    // set function 
  } catch (error) {
      console.error('Error mengambil data:', error);
  }
});

function test() {
  const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.set("X-Custom-Header", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2dlbmktY3Bucy5tYWhpcnRlY2huby5teS5pZC9hcGkvdjEvdmVyaWZ5LW90cCIsImlhdCI6MTc1Mzg0NTAwMywiZXhwIjoxMDM5Mzg0NTAwMywibmJmIjoxNzUzODQ1MDAzLCJqdGkiOiJXY1hwMXBpOGNjOUNLUnRzIiwic3ViIjoiOWY3OWJmMTYtMzFmNy00MjgzLWI5NmQtMzE3OGEwMjY3ZjMyIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.2ymZAK9Vquv6DCw_f1hnYmWMMXQYpH-7RF53ZKi-hrs");
    fetch("https://geni-cpns.mahirtechno.my.id/api/v1/admin/me", {
      method: "GET",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
}

function renderTable(data) {
  const tbody = document.getElementById('history-table-body');
  if (data == null) return
  tbody.innerHTML = ''; // Kosongkan isi sebelum render ulang

  data.forEach(item => {
    const row = document.createElement('tr');
    row.className = 'bg-white border-b border-gray-200 hover:bg-gray-100';

    row.innerHTML = `
      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        ${item.date}
      </th>
      <td class="px-6 py-4">${item.correct}</td>
      <td class="px-6 py-4">${item.inCorrect}</td>
      <td class="px-6 py-4">${item.totalQuiz}</td>
      <td class="px-6 py-4 text-right">
        <a href="#" class="font-medium text-blue-600 hover:underline"><i class="fa-solid fa-trash-can text-red-600"></i></a>
      </td>
    `;

    tbody.appendChild(row);
  });
}