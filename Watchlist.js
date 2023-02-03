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
    
            <p class="text-sm text-white">${element["desc"].substring(0,251)}</p>
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

document.getElementById('signout').addEventListener('click', () => {
    location.href = `${location.origin}`;
    localStorage.clear();
})

document.getElementById('prev').addEventListener('click', () => {
    history.go(-1)
})
