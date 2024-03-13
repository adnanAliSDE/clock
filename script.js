const timer = document.querySelector('.timer');
const hourContainer = timer.querySelector('.hour span');
const minuteContainer = timer.querySelector('.minute span');
const secondContainer = timer.querySelector('.second span');
const dateContainer = document.querySelector('h3.date')
const targetConatiner = document.getElementById('target-container').parentElement;

// let data;
let targetTime = {};

const data = [
  { ramadan: 1, date: '12 March 2024', sehri: '5:04', iftar: '18:23' },
  { ramadan: 2, date: '13 March 2024', sehri: '5:03', iftar: '18:23' },
  { ramadan: 3, date: '14 March 2024', sehri: '5:02', iftar: '18:24' },
  { ramadan: 4, date: '15 March 2024', sehri: '5:01', iftar: '18:24' },
  { ramadan: 5, date: '16 March 2024', sehri: '5:00', iftar: '18:25' },
];


const setTargetTime = () => {
  let hour;
  let minute;
  const second = 0
  const today = new Date()
  const index = today.getDate() - 12
  const { sehri, iftar, date, ramadan } = data.at(index)
  dateContainer.innerHTML = `${ramadan} Ramadan, 1445 AH <small class='text-sm font-normal text-gray-600'>${date}<small>`


  if (today.getHours() <= sehri.split(':')[0] && today.getMinutes() <= sehri.split(':')[1]) {
    targetTime.target = 'sehri'
    hour = sehri.split(':').at(0)
    minute = sehri.split(':').at(1)

  } else {
    targetTime.target = 'iftar'
    hour = iftar.split(':').at(0)
    minute = iftar.split(':').at(1)
  }

  const targetDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour, minute, second)
  targetTime = {
    targetDate: targetDate,
    sehri: {
      hour: parseInt(sehri.split(':').at(0)),
      minute: parseInt(sehri.split(':').at(1)),
    }
  }


  const timeTable = document.querySelector('.time-table table tbody tr')
  timeTable.getElementsByClassName('sehri-time ').innerHTML = sehri
  timeTable.getElementsByClassName('iftar-time ').innerHTML = iftar

}

// async function getData(loc) {
//   const { latitude, longitude } = loc.coords
//   const url = `https://api.aladhan.com/v1/calendar/2024/3?latitude=${latitude}&longitude=${longitude}&method=1&school=1`
//   const res = await fetch(url)
//   const resBody = await res.json()
//   data = resBody.data
//   setTargetTime()
// }

// navigator.geolocation.getCurrentPosition(getData)

const populateUI = (hour, minute, second, isSehri) => {
  hourContainer.innerHTML = hour
  minuteContainer.innerHTML = minute
  secondContainer.innerHTML = second
  targetConatiner.innerHTML = `
  Time left for <span class="text-${isSehri ? 'green' : 'red'}-500"
  id='target-container'>${isSehri ? 'Sehri' : 'Iftar'}</span>
  `


}
let i = 0;
const updateTime = () => {
  const today = new Date();
  setTargetTime()
  let isSehri = false
  const { targetDate: target, sehri } = targetTime

  if ((today.getHours() < sehri.hour) || (today.getHours() === sehri.hour && today.getMinutes() < sehri.minute)) {
    isSehri = true
  }

  const diff = target - today

  const second = 1000
  const minute = second * 60
  const hour = minute * 60

  const hourDiff = Math.floor(diff / hour)
  const minuteDiff = Math.floor((diff % hour) / minute)
  const secondDiff = Math.floor((diff % minute) / second)

  if (i == 0) {
    console.log(`${target.getHours()}, ${target.getMinutes()}, ${target.getSeconds()} - ${today.getHours()} ${today.getMinutes()} ${today.getSeconds()} = ${hourDiff}: ${minuteDiff}: ${secondDiff}`)
    i = i + 1
  }
  populateUI(hourDiff, minuteDiff, secondDiff, isSehri)
}

setInterval(
  updateTime, 1000
)