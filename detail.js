const params = new URLSearchParams(window.location.search)
const rideID = params.get("id")
const ride = getRideRecord(rideID)

document.addEventListener("DOMContentLoaded", async ()=>{

const fristPosition = ride.data[0]
const fristLocationData = await getLocationData(fristPosition.latitude, fristPosition.longitude)


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

document.querySelector("#data").appendChild(dataElement)

})