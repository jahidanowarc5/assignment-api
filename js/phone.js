

const searchPhone = () =>{
    const searchField = document.getElementById('search-field');
    const searchFieldValue = searchField.value;
    
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchFieldValue}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        if(data.data.length === 0){
            alert('please search iphone or samsung or oppo')
            document.getElementById('spinner').style.display = 'none'
        }
        else{
            displayPhone(data.data)
        }
       })
       const spinnerDiv = document.getElementById('spinner').style.display = 'block'
    searchField.value = "";
    document.getElementById('phone-container').innerHTML = "";
    document.getElementById('single-phone').innerHTML = "";
}

const displayPhone = allPhones =>{
    // console.log(allPhones)
    const phones = allPhones.slice(0,20)
    // console.log(phones)
    const phoneContainer = document.getElementById('phone-container')
    for(const phone of phones){
        // console.log(phone)
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="max-w-sm rounded overflow-hidden shadow-lg ">
  <img class="w-full  " src="${phone.image}" alt="">
  <div class="px-6 py-4">
    <div class="font-bold text-2xl mb-2">${phone.brand}</div>
    <div class="font-bold text-xl mb-2">${phone.phone_name}</div>
    <button onclick="showDetails('${phone.slug}')" class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">Show details</button>
  </div>
  
        `
        phoneContainer.appendChild(div)
        document.getElementById('spinner').style.display = 'none'
    }
}

const showDetails = id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
    .then(res=> res.json())
    .then(data => displaySinglePhoneDetail(data.data))
    // document.getElementById('single-phone').innerHTML = "";
}

const displaySinglePhoneDetail = phone =>{
    
    const singleDetail = document.getElementById('single-phone');
    singleDetail.innerHTML = "";
    const singleDetailDiv = document.createElement('div')
    singleDetailDiv.innerHTML = `
    <div class="max-w-sm rounded overflow-hidden shadow-lg">
  <img class="w-full " src="${phone.image}" alt="Sunset in the mountains">
  <div class="px-6 py-4">
    <div class="font-bold text-2xl mb-2">${phone.brand}</div>
    <div class="font-bold text-xl mb-2">${phone.name}</div>
    <p class="text-gray-700 text-base font-bold">
     ${phone.releaseDate? phone.releaseDate : 'Released date not found'} 

    </p>
    <p class=""><span class="font-bold">Chipset:</span> ${phone.mainFeatures.chipSet}</p>
    <p class=""><span class="font-bold">Display size:</span> ${phone.mainFeatures.displaySize}</p>
    <p class=""><span class=" font-bold">Memory:</span> ${phone.mainFeatures.memory}</p>
    <p class=""><span class="font-bold">Storage:</span> ${phone.mainFeatures.storage}</p>
    <p class=""><span class="font-bold">Sensors:</span> ${phone.mainFeatures.sensors.slice(0,4)}</p>
  </div>
  <div>
  
  </div>

    `;

    singleDetail.appendChild(singleDetailDiv)
}