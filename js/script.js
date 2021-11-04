const ApiKey = "";
const baseUrl = "http://ergast.com/api/f1/";
const season = "2021";
const baseEndPoin = `${baseUrl}${season}`;
const driverEndPoin = `${baseUrl}${season}/drivers.json`;
const standingEndPoin = `${baseUrl}${season}/driverStandings.json`;
const constructorEndPoin = `${baseUrl}${season}/constructors.json`;

const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

function getListDrivers() {
    title.innerHTML = "Daftar Driver 2021"
    fetch(driverEndPoin, requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result.MRData.DriverTable.Drivers);
        let Drivers = "";
        result.MRData.DriverTable.Drivers.forEach(Drivers => {
            Drivers += `
            <li class="collection-item avatar">
                <span class="title"> ${Drivers.givenName} </span>
                <p> Nomor Mobil: ${Drivers.permanentNumber} <br>
                    Tanggal Lahir: ${Drivers.dateOfBirth} <br>
                    Asal Negara: ${Drivers.nationality}
                </p>
            </li>
            `
        });
        contents.innerHTML = '<ul class="collection">' + result.MRData.DriverTable.Drivers + '</ul>'
    })
    .catch(error => console.log('error', error));
}

function getListStandings() {
    title.innerHTML = "2021 F1 Standings"
    fetch(standingEndPoin, requestOptions)
    .then(response => response.json())
    .then(result => {
            console.log(result.MRData.StandingsTable.StandingsList.DriverStandings);
            let Standings = "";
            let i = 1;
            result.MRData.StandingsTable.StandingsList.DriverStandings.forEach(Standings => {
                Standings += `
                <tr>
                    <td style="padding-left:20px;">${i}.</td>
                    <td>${Standings.position}</td>
                    <td>${Standings.points}</td>
                    <td>${Standings.wins}</td>
                    <td>${Standings.Driver.givenName}</td>
                </tr>
                `;
                i++;
            });
            contents.innerHTML = `
                <div class="card">
                    <table class="stripped responsive-table">
                        <thead>
                            <th>Posisi</th>
                            <th>Poin Diperoleh</th>
                            <th>Menang</th>
                            <th>Driver</th>
                        </thead>
                        <tbody>
                            ${Driver}
                        </tbody>
                    </table>
                </div>
            `;
        }).catch(err => {
            console.error(err);
        })
}


function loadPage(page) {
    switch (page) {
        case "Drivers":
            getListDrivers();
            break;
        case "Standings":
            getListStandings();
            break;
    } 
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            console.log(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "Drivers";
    loadPage(page);
});