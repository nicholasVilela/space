const imgAPI = 'https://sdg-astro-api.herokuapp.com/api/Nasa/apod'
const dataAPI = 'https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming'

const next = document.querySelector('#next-page')
const prev = document.querySelector('#prev-page')

class Mission {
  constructor(name, details, timer, site) {
    this.name = name
    this.details = details
    this.timer = timer
    this.site = site
  }
}

const missions = []
let currMission = 0

const getNasaImg = () => {
  axios.get(imgAPI)
    .then(res => {
      const nasaImgContainer = document.querySelector('#nasa-img')
      nasaImgContainer.src = res.data.url
    })  
}

const getMissionData = () => {
  axios.get(dataAPI)
    .then(res => {
      res.data.map(mission => {
        // mission title
        missionName = mission.mission_name

        // mission details
        missionDetails = mission.details ? mission.details : 'No description available yet.'

        // mission timer
        missionDate = mission.launch_date_local

        // mission launch site
        missionSite = mission.launch_site.site_name_long

        let miss = new Mission(missionName, missionDetails, missionDate, missionSite)
        missions.push(miss)
      })
    })
  displayMissionData()
}

const displayMissionData = () => {
  const cardContainer = document.querySelector('#card')

  const cardContent = document.createElement('div')
  const cardTitle = document.createElement('h4')
  const cardDetails = document.createElement('p') 
  const cardTimer = document.createElement('p')
  const cardSite = document.createElement('p')
  const separator = document.createElement('hr')
  const separator2 = document.createElement('hr')

  console.log(missions[0])

  cardContainer.textContent = ''

  cardTitle.textContent = missions[currMission].name
  cardTitle.id = 'card-title'

  cardDetails.textContent = missions[currMission].details
  cardDetails.id = 'card-details'
  cardDetails.classList.add('all-text')

  cardTimer.textContent = missions[currMission].timer
  cardTimer.id = 'card-timer'
  cardTimer.classList.add('all-text')

  cardSite.textContent = missions[currMission].site
  cardSite.id = 'card-site'
  cardSite.classList.add('all-text')

  separator.id = 'line-separator'
  separator2.id = 'line-separator'

  cardContent.id = 'card-content'

  cardDetails.appendChild(separator)
  cardTimer.appendChild(separator2)

  cardContent.appendChild(cardDetails)
  cardContent.appendChild(cardTimer)
  cardContent.appendChild(cardSite)

  cardContainer.appendChild(cardTitle)
  cardContainer.appendChild(cardContent)
}

const prevCard = () => {
  if(currMission == 0) {
    currMission = missions.length
  }
  else {
    currMission--
  }
  displayMissionData()
}

const nextCard = () => {
  if (currMission == missions.length) {
    currMission = 0
  }
  else {
    currMission++
  }
  displayMissionData()
}

window.onload = () => {
  getNasaImg()
  getMissionData()
}
