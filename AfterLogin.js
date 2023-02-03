console.log("hello")

window.addEventListener('load', async () => {
    let response = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=702a5d9a8a5513094a5fcf009d15249a&language=en-US&page=1')
    let val = await response.json();
    console.log(val)
    let i = 1;
    val.results.forEach(element => {
        document.getElementById('cards-show').innerHTML += `<div class="w-[300px] my-8 border-2 bg-gradient-to-r from-blue-800 to-[#0B0C10] shadow-xl shadow-gray-400 rounded-lg mx-2 h-[500px] ">
            <img class="h-48 w-80" src="https://www.themoviedb.org/t/p/w220_and_h330_face/${element["backdrop_path"]}" alt="">
        
            <div class="mx-8 my-4 h-48">
                <h3 class="font-sans font-bold text-md my-2 text-white">${element["original_title"]}</h3>
                <p class="text-sm text-white">${element["overview"].substring(0,251)}</p>
            </div>
            <div class="my-8" id = ${i++}>
                <span
                    class="inline-block w-auto bg-gray-300 p-1 rounded-md mx-2 text-xs text-black font-semibold hover:bg-gray-400 hover:cursor-pointer">Year:
                    ${element['release_date']}
                </span>
                <span
                    class="inline-block w-auto bg-gray-300 p-1 rounded-md mx-2 text-xs text-black font-semibold hover:bg-gray-400 hover:cursor-pointer">Rank:
                    ${element['popularity']}
                </span>
                <button
                    class="add text-white w-16 bg-blue-500 py-2 rounded-md font-semibold text-xs hover:bg-gradient-to-r to-blue-800 from-[#0B0C10] relative"
                    ">Add movie</button>
            </div>
        </div>`
    });
    Array.from(document.getElementsByClassName('add')).forEach(element => {
        element.addEventListener('click', async () => {
            console.log(element)

            let val = localStorage.getItem('id')
            console.log(val)

            let addButton = element
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

    document.getElementById('Watchlist').addEventListener('click', async () => {
        location.href = `${location.origin}/Watchlist.html`
    })


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
    document.getElementById('cards-show').innerHTML = `<div class="max-w-sm mx-auto border-2 my-4  bg-white shadow-xl shadow-gray-400 rounded-lg">
    <img class="w-96 h-80" src="https://www.themoviedb.org/t/p/w220_and_h330_face/${val.data['results'][0]["backdrop_path"]}" alt="">

    <div class="mx-8">
        <h3 class="font-sans font-bold text-xl text-gray-700 my-2">${val.data['results'][0]["original_title"]}</h3>

        <p class="text-sm text-gray-700">${val.data['results'][0]["overview"]}</p>
    </div>

    <div class="my-8">
        <span
            class="bg-gray-300 p-1 rounded-md mx-2 mb-1 text-sm text-black font-semibold hover:bg-gray-400 hover:cursor-pointer">Year:
            ${val.data['results'][0]['release_date']}
        </span>
        <span
            class="bg-gray-300 p-1 rounded-md mx-2 mb-1 text-sm text-black font-semibold hover:bg-gray-400 hover:cursor-pointer">Rank:
            ${val.data['results'][0]['popularity']}
        </span>
        <button
            class="text-white bg-blue-500 py-2 rounded-lg font-semibold px-5 text-base hover:bg-blue-700 mt-1 relative "
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
    console.log("Hwll")
    
})

