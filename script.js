let userSearch  = document.getElementById('searchInput');
let ul = document.getElementById('list');
let dataListUl = document.getElementById('dataList');

let allAges = [];
let allGender = [];
let maleCount = 0;
let femaleCount = 0;

const init = () => {
  const form = document.querySelector('#userForm');

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
  dataListUl.innerHTML = '';
  ul.innerHTML = '';
  allAges = [];
  allGender = [];
  maleCount = 0;
  femaleCount = 0;  

  fetchUsers().then((response) => {
    const data = response.results;
    data.filter(byName).forEach(user => {
      displayUsers(user);     
    });
    staticsCount(allAges, allGender);
  });
}

const byName = (user) => {
  const name = [user.name.first, user.name.last].join(' ').toLowerCase();
  return name.includes(userSearch.value);
}


const displayUsers = (user) => {
  const {dob: {age}, picture: {thumbnail}, name:{first, last}, gender} = user

  let li = document.createElement('li');
  let nameSpan = document.createElement('span');
  let image = document.createElement('img');
  
  image.src = thumbnail;
  textNome = document.createTextNode(`${first} ${last}, ${age} anos` );
 
  nameSpan.appendChild(textNome);

  ul.appendChild(li);
  li.appendChild(image);
  li.appendChild(nameSpan);

  allAges.push(age)
  allGender.push(gender)
 
}

const staticsCount = (age, gender) => {

  let ageSum = age.reduce((accum, curr) => accum + curr)
  let ageAverage = (ageSum/age.length).toFixed(2)

  gender.forEach(sex => {
    if(sex == 'male'){
      maleCount ++
    }else {
      femaleCount ++
    }
  })

  const data = {
    ageSum: ageSum,
    ageAverage: ageAverage, 
    maleCount: maleCount,
    femaleCount: femaleCount
  }

  displayAgeResults(data);
}

const displayAgeResults = (data) => {
  const {maleCount, femaleCount, ageSum, ageAverage} = data

  let li = document.createElement('li');
  let ageP= document.createElement('p');
  let averageP = document.createElement('p');
  let maleValue = document.createElement('p')
  let femaleValue = document.createElement('p')

  ageP.innerHTML = `Sum ages: ${ageSum}`
  averageP.innerHTML = `Average ages: ${ageAverage}`
  maleValue.innerHTML = `Total men: ${maleCount}`
  femaleValue.innerHTML = `Total women: ${femaleCount}`

  dataListUl.appendChild(li);
  li.appendChild(ageP)
  li.appendChild(averageP)
  li.appendChild(maleValue)
  li.appendChild(femaleValue)  
}

init();

