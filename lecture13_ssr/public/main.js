const container = document.getElementById("container");

async function getUser(){
    let res = await axios.get("http://localhost:5000/user");
    let user = res.data.user; //user ka data store hoga data mai , agar user object hai toh data mai object store hoga from index.js

    const h2 = document.createElement("h2");
    h2.innerText = `${user.name}`;

    container.innerHTML = `<p>${user.email}</p> <p>${user.age}</p>`;
    container.append(h2);//last mai push krega 
    // container.prepend(h2);//sabse upar push krdega

}

getUser();
