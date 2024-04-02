const rideListElement = document.querySelector("#rideList")
const allRides = getAllRides()

allRides.forEach(async ([id, value]) => {
    const ride = JSON.parse(value)
    ride.id = id


    const itemElement = document.createElement("li")
    itemElement.id = ride.id
    itemElement.className = "d-flex p-1 align-items-center justify-content-between shadow-sm gap-3"
    rideListElement.appendChild(itemElement)

    itemElement.addEventListener("click", () =>{
        window.location.href = `./detail.html?id=${ride.id}`
    })

    const fristPosition = ride.data[0]
    const fristLocationData = await getLocationData(fristPosition.latitude, fristPosition.longitude)

    const mapID = `map${ride.id}`
    const mapElement = document.createElement("div")
    mapElement.id = mapID
    mapElement.style = "width:100px;height:100px"
    mapElement.classList.add("bg-secondary")
    mapElement.classList.add("rounded")

    const dataElement = document.createElement("div")
    dataElement.className = "flex-fill d-flex flex-column"


    const cityDiv = document.createElement("div")
    cityDiv.innerText = `${fristLocationData.city} - ${fristLocationData.countryCode}`
    cityDiv.className = "text-primary mb-2"

    const maxSpeedDiv = document.createElement("div")
    maxSpeedDiv.innerText = `Max speed: ${getMaxSpeed(ride.data)} Km/h`
    maxSpeedDiv.className = "h5"

    const distanceDiv = document.createElement("div")
    distanceDiv.innerText = `Distance: ${getDistance(ride.data)} km`

    const durationDiv = document.createElement("div")
    durationDiv.innerText = `Duration: ${getDuration(ride)}`

    const dateDiv = document.createElement("div")
    dateDiv.innerText = getStartDate(ride)
    dateDiv.className = "text-secondary mt-2"

    dataElement.appendChild(cityDiv)
    dataElement.appendChild(maxSpeedDiv)
    dataElement.appendChild(distanceDiv)
    dataElement.appendChild(durationDiv)
    dataElement.appendChild(dateDiv)

    itemElement.appendChild(mapElement)
    itemElement.appendChild(dataElement)

    const map = L.map(mapID,{
        attributionControl: false,
        zoomControl: false,
        dragging:false,
        scrollWheelZoom: false
    })
    map.setView([fristPosition.latitude, fristPosition.longitude], 13)
    L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_background/{z}/{x}/{y}{r}.{ext}', {
        minZoom: 5,
        maxZoom: 20,
        ext: 'png'
    }).addTo(map);

    L.marker([fristPosition.latitude, fristPosition.longitude]).addTo(map)

})

