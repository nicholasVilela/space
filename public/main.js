const imgAPI = 'https://sdg-astro-api.herokuapp.com/api/Nasa/apod'
const dataAPI = 'https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming'

const next = document.querySelector('#next-page')
const prev = document.querySelector('#prev-page')

class Mission {
  constructor(name, details, date, site, id, container, nameBox, detailsBox, dateBox, siteBox) {
    this.name = name
    this.details = details
    this.date = date
    this.site = site
    this.id = id
    this.container = container
    this.nameBox = nameBox
    this.detailsBox = detailsBox
    this.dateBox = dateBox
    this.siteBox = siteBox
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

const dateTimer = () => {
  setInterval(() => {
    missions.map(mission => {
      mission.dateBox.textContent = ''
      if(mission.id == currMission + 1) {
        const launchDate = new Date(mission.date
          .split('')
          .splice(0, 10)
          .join(''))
          .getTime()
          
        const now = new Date()
          .getTime()
        const remain = launchDate - now
        const days = Math.floor(remain / (1000 * 60 * 60 * 24))
        const hours = Math.floor((remain % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((remain % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((remain % (1000 * 60)) / 1000)
  
        mission.dateBox.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`
      }
    })
  }, 1000)  
}

const getMissionData = () => {
  let counter = 1
  axios.get(dataAPI)
    .then(res => {
      res.data.map(mission => {
        const cardContainer = document.createElement('div')
        const cardTitle = document.createElement('h4')
        const cardDetails = document.createElement('p') 
        const cardTimer = document.createElement('p')
        const cardSite = document.createElement('p')
        
        // mission title
        missionName = mission.mission_name

        // mission details
        missionDetails = mission.details ? mission.details : 'No description available yet.'

        // mission timer
        missionDate = mission.launch_date_utc

        // mission launch site
        missionSite = mission.launch_site.site_name_long

        let miss = new Mission(missionName, missionDetails, missionDate, missionSite, counter, cardContainer, cardTitle, cardDetails, cardTimer, cardSite)
        missions.push(miss)
        counter++
      })
    })
    .then(() => {
      displayMissionData()
    })
}

const displayMissionData = () => {
  const mainContainer = document.querySelector('#container')

  if (missions[currMission] !== undefined) {
    const separator = document.createElement('hr')
    const separator2 = document.createElement('hr')
    mainContainer.textContent = ''

    missions[currMission].container.id = 'card'

    missions[currMission].nameBox.textContent = missions[currMission].name
    missions[currMission].nameBox.id = 'card-title'

    missions[currMission].detailsBox.textContent = missions[currMission].details
    missions[currMission].detailsBox.id = 'card-details'
    missions[currMission].detailsBox.classList.add('all-text')

    missions[currMission].dateBox.id = 'card-timer'
    missions[currMission].dateBox.classList.add('all-text')

    missions[currMission].siteBox.textContent = missions[currMission].site
    missions[currMission].siteBox.id = 'card-site'
    missions[currMission].siteBox.classList.add('all-text')

    separator.id = 'line-separator'
    separator2.id = 'line-separator'

    missions[currMission].detailsBox.appendChild(separator)
    missions[currMission].dateBox.appendChild(separator2)

    missions[currMission].container.appendChild(missions[currMission].nameBox)
    missions[currMission].container.appendChild(missions[currMission].detailsBox)
    missions[currMission].container.appendChild(missions[currMission].dateBox)
    missions[currMission].container.appendChild(missions[currMission].siteBox)

    mainContainer.appendChild(missions[currMission].container)
  } 
}

const prevCard = () => {
  if(currMission == 0) {
    currMission = missions.length - 1
  }
  else {
    currMission--
  }
  displayMissionData()
}

const nextCard = () => {
  if (currMission == missions.length - 1) {
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
  dateTimer()
}
