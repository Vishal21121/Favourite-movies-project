let email, password;

document.getElementById('email').addEventListener('input', (e) => {
    email = e.target.value;
})

document.getElementById('password').addEventListener('input', (e) => {
    password = e.target.value;
})


document.getElementById("submit").addEventListener('click', async (e) => {
    e.preventDefault();
    let res = await fetch('http://localhost:5000/api/login', {
        method: "POST",
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    let id = await res.json();
    if(id.statusCode == 200){
        localStorage.setItem('id', id.data)
        location.href = 'http://127.0.0.1:5173/AfterLogin.html'
    }else{
        document.getElementById('alert').innerHTML = `<div class="w-[550px] bg-indigo-800 m-auto my-4 py-0 rounded-2xl">
        <div class="my-4 py-1">
            <span
                class="mx-2 text-md bg-indigo-500 rounded-2xl px-3 text-white my-2 hover:bg-indigo-300 shadow-lg shadow-slate-900">
                Warning
            </span>
            <span class="mx-2 text-lg font-semi-bold rounded-2xl px-3 text-white my-2">
                Enter the correct Credentials
            </span>
        </div>
    </div>`
    }
    console.log(id);
    
    

})


document.getElementById('signup').addEventListener('click', () => {
    location.href = 'http://127.0.0.1:5173/Signup.html'
})
