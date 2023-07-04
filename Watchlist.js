window.addEventListener('load', async () => {
    let id = localStorage.getItem('id');
    let res = await fetch(`http://localhost:5000/api/getMovies/${id}`, {
        method: 'get',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    })
    let data = await res.json();
    console.log(data)
    document.getElementById('cards-show').innerHTML = ''
    data.data.forEach(element => {
        document.getElementById('cards-show').innerHTML += `<div class="w-[300px] my-8 border-2 bg-gradient-to-r from-blue-800 to-[#0B0C10] shadow-xl shadow-gray-400 rounded-lg mx-2 h-[500px]">
        <img class="h-48 w-80" src="https://www.themoviedb.org/t/p/w220_and_h330_face/${element["img"]}" alt="">
    
        <div class="mx-8 mt-4 h-48">
            <h3 class="font-sans font-bold text-md my-2 text-white">${element["title"]}</h3>
    
            <p class="text-sm text-white">${element["desc"].substring(0, 251)}</p>
        </div>
        <div class="relative top-[37px]">
            <span
                class="inline-block w-auto bg-gray-300 p-1 rounded-md mx-2 text-xs text-black font-semibold hover:bg-gray-400 hover:cursor-pointer">Year:
                ${element['year']}
            </span>
            <span
                class="inline-block w-auto bg-gray-300 p-1 rounded-md mx-2 text-xs text-black font-semibold hover:bg-gray-400 hover:cursor-pointer">Rank:
                ${element['rank']}
            </span>
            
        </div>
    </div>`
    });
})

let value;
document.getElementById('input').addEventListener('input', (e) => {
    value = e.target.value;
})
document.getElementById('search').addEventListener('click', async (e) => {
    let res = await fetch('http://localhost:5000/api/MovieFind', {
        method: "post",
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: value
        })
    })
    let val = await res.json();
    console.log(val)
    document.getElementById('heading').innerHTML = ''
    document.getElementById('cards-show').innerHTML = `<div class="w-[300px] my-8 border-2 bg-gradient-to-b from-blue-800 to-[#0B0C10] shadow-xl shadow-gray-400 rounded-lg mx-2 h-[500px]">
    <img class="h-48 w-80" src="https://www.themoviedb.org/t/p/w220_and_h330_face/${val.data['results'][0]["backdrop_path"]}" alt="">

    <div class="mx-8 my-4 h-48">
        <h3 class="font-sans font-bold text-md my-2 text-white">${val.data['results'][0]["original_title"]}</h3>
        <p class="text-sm text-white">${val.data['results'][0]["overview"].substring(0, 251)}</p>
    </div>

    <div class="my-8">
        <span
            class="inline-block w-auto bg-gray-300 p-1 rounded-md mx-2 text-xs text-black font-semibold hover:bg-gray-400 hover:cursor-pointer">Year:
            ${val.data['results'][0]['release_date']}
        </span>
        <span
            class="inline-block w-auto bg-gray-300 p-1 rounded-md mx-2 text-xs text-black font-semibold hover:bg-gray-400 hover:cursor-pointer">Rank:
            ${val.data['results'][0]['popularity']}
        </span>
        <button
            class="add text-white w-16 bg-blue-500 py-2 rounded-md font-semibold text-xs hover:bg-gradient-to-r to-blue-800 from-[#0B0C10] relative"
            id="add">Add movie</button>
    </div>
</div>`

    document.getElementById('add').addEventListener('click', async () => {
        let addButton = document.getElementById('add')
        let val = localStorage.getItem('id')
        let rank = addButton.previousElementSibling.innerText.split(':')[1];
        let year = addButton.previousElementSibling.previousElementSibling.innerText.split(':')[1]
        let title = addButton.parentNode.previousElementSibling.children[0].innerText
        let desc = addButton.parentNode.previousElementSibling.children[1].innerText
        let img = addButton.parentNode.parentNode.children[0].src
        let res = await fetch(`http://localhost:5000/api/addMovie/${val}`, {
            method: 'post',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                img: img,
                title: title,
                desc: desc,
                year: year,
                rank: rank
            })
        })
        console.log(await res.json())
    })

})


document.getElementById('signout').addEventListener('click', () => {
    location.href = `${location.origin}`;
    localStorage.clear();
})

document.getElementById('prev').addEventListener('click', () => {
    if (document.getElementById('cards-show').childElementCount > 0) {
        history.go(-1)
    }
})
