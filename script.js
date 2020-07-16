let userSearch  = document.getElementById('searchInput');
let ul = document.getElementById('list');
let dataListUl = document.getElementById('dataList');
let form = document.querySelector('#userForm');
let userMessage = document.getElementById('userMessage')
let staticsMessage = document.getElementById('staticsMessage');

let allAges = [];
let allGender = [];
let genders = { female: 0, male: 0}

const init = () => {

  form.addEventListener('keyup', () => {
    if(userSearch.value !== ''){
      document.getElementById('button').disabled = false;
    }
  });

  form.addEventListener('submit', filterUsers);
};

const fetchUsers = async () => {
  const api = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
  const response = await api.json();
  return response;
}

const filterUsers = (e) => {
  e.preventDefault();
  newFunction();  

  fetchUsers().then((response) => {
    const data = response.results;
    data.filter(byName).forEach(user => {
      displayUsers(user);   
    });
    staticsCount();
  });
}

const byName = (user) => {
  const name = [user.name.first, user.name.last].join(' ').toLowerCase();
  return name.includes(userSearch.value.toLowerCase());
}


const displayUsers = (user) => {
  const {dob: {age}, picture: {thumbnail}, name:{first, last}, gender} = user

  let li = document.createElement('li');
  let nameSpan = document.createElement('span');
  let image = document.createElement('img');
  
  image.src = thumbnail;
  textNome = document.createTextNode(` ${first} ${last}, ${age} anos` );
 
  nameSpan.appendChild(textNome);

  ul.appendChild(li);
  li.appendChild(image);
  li.appendChild(nameSpan);

  allAges.push(age);
  allGender.push(gender);
  
  genders[gender] += 1
}

const staticsCount = () => {

  let ageSum = allAges.reduce((accum, curr) => accum + curr)
  let ageAverage = (ageSum/allAges.length).toFixed(2)
  let totalUsersFounded = allAges.length

  const data = {
    ageSum: ageSum,
    ageAverage: ageAverage, 
    genders,
    totalUsersFounded: totalUsersFounded
  }

  displayAgeResults(data);
}

const displayAgeResults = (data) => {
  const {genders: {female, male}, ageSum, ageAverage, totalUsersFounded} = data
  console.log(female)
  
  let li = document.createElement('li');
  let ageP= document.createElement('p');
  let averageP = document.createElement('p');
  let maleValue = document.createElement('p');
  let femaleValue = document.createElement('p');

  staticsMessage.innerHTML = 'Statics'
  ageP.innerHTML = `Sum ages: ${ageSum}`
  averageP.innerHTML = `Average ages: ${ageAverage}`
  maleValue.innerHTML = `Total men: ${male}`
  femaleValue.innerHTML = `Total women: ${female}`
  userMessage.innerHTML = `${totalUsersFounded}: Users Found `

  dataListUl.appendChild(li);
  li.appendChild(ageP)
  li.appendChild(averageP)
  li.appendChild(maleValue)
  li.appendChild(femaleValue)
}

function newFunction() {
  dataListUl.innerHTML = '';
  ul.innerHTML = '';
  userMessage.innerHTML = '';
  totalUsersFounded = 0;
  allAges = [];
  allGender = [];
  genders = { female: 0, male: 0}
}

init();



