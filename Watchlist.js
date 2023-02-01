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
        document.getElementById('cards-show').innerHTML += `<div class="max-w-sm my-8 border-2 bg-white shadow-xl shadow-gray-400 rounded-lg mx-2">
        <img class="w-96 h-80" src="https://www.themoviedb.org/t/p/w220_and_h330_face/${element["img"]}" alt="">
    
        <div class="mx-8 my-4">
            <h3 class="font-sans font-bold text-xl text-gray-700 my-2">${element["title"]}</h3>
    
            <p class="text-md text-gray-700">${element["desc"]}</p>
        </div>
        <div class="my-8">
            <span
                class="bg-gray-300 p-1 rounded-md mx-2 mb-1 text-sm text-black font-semibold hover:bg-gray-400 hover:cursor-pointer">Year:
                ${element['year']}
            </span>
            <span
                class="bg-gray-300 p-1 rounded-md mx-2 mb-1 text-sm text-black font-semibold hover:bg-gray-400 hover:cursor-pointer">Rank:
                ${element['rank']}
            </span>
            
        </div>
    </div>`
    });
})

document.getElementById('signout').addEventListener('click', () => {
    location.href = `${location.origin}`;
    localStorage.clear();
})

document.getElementById('prev').addEventListener('click', () => {
    history.go(-1)
})
