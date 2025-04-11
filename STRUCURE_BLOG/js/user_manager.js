
function showEntries() {
    window.location.href = "../pages/entries_manager.html";
}
function showArticle() {
    window.location.href = "../pages/article_manager.html";
}
let users=JSON.parse(localStorage.getItem("users"))||[];
function sorta_b() {
    let str="";
    let newUsers = users.sort((a, b) => a.lastName.localeCompare(b.lastName));
    for (let i = 0; i < newUsers.length; i++) {
        str+=`
          <tr>
             <td class="name-column-td">
                <div style="display: flex;gap: 10px;">
                    <div><img src="../assets/images/Avatar.png" alt="" srcset=""></div>
                    <div> <span>${newUsers[i].firstName} ${newUsers[i].lastName}</span>  <br>
                        <span class="span">@${newUsers[i].lastName}</span>
                    </div>
                </div>
             </td>
             <td >hoạt động</td>
             <td class="span">${newUsers[i].email}</td>
             <td >
                <button class="btn-b" onclick="block(${i})">block</button>
                <button class="btn-b" onclick="unblock(${i})">unblock</button>
             </td>
        </tr>
        `
        
    }
    document.getElementById("tbody").innerHTML=str;
    document.getElementById("btn-users").innerHTML=`${users.length} users`;
    renderItem();
    renderPage();
}
function sortb_a() {
    let str="";
    let newUsers = users.sort((b, a) => a.lastName.localeCompare(b.lastName));
    for (let i = 0; i < newUsers.length; i++) {
        str+=`
          <tr>
             <td class="name-column-td">
                <div style="display: flex;gap: 10px;">
                    <div><img src="../assets/images/Avatar.png" alt="" srcset=""></div>
                    <div> <span>${newUsers[i].firstName} ${newUsers[i].lastName}</span>  <br>
                        <span class="span">@${newUsers[i].lastName}</span>
                    </div>
                </div>
             </td>
             <td >hoạt động</td>
             <td class="span">${newUsers[i].email}</td>
             <td >
                <button class="btn-b" onclick="block(${i})">block</button>
                <button class="btn-b" onclick="unblock(${i})">unblock</button>
             </td>
        </tr>
        `
    }
    document.getElementById("tbody").innerHTML=str;
    document.getElementById("btn-users").innerHTML=`${users.length} users`;
    renderItem();
    renderPage();
}

function searchUsers(){
    let str="";
    let user=document.getElementById("inputUsers").value.trim();
for (let i = 0; i < users.length; i++) {
    if(users[i].lastName.toLowerCase().includes(user.toLowerCase())){
     str+=`
      <tr>
             <td class="name-column-td">
                <div style="display: flex;gap: 10px;">
                    <div><img src="../assets/images/Avatar.png" alt="" srcset=""></div>
                    <div> <span>${users[i].firstName} ${users[i].lastName}</span>  <br>
                        <span class="span">@${users[i].lastName}</span>
                    </div>
                </div>
             </td>
             <td >hoạt động</td>
             <td class="span">${users[i].email}</td>
             <td >
                <button class="btn-b" onclick="block(${i})">block</button>
                <button class="btn-b" onclick="unblock(${i})">unblock</button>
             </td>
        </tr>
     
     `
    }
  
}
document.getElementById("tbody").innerHTML=str;
document.getElementById("inputUsers").value="";
}
let item =5;
let currentPage = 1;
function getPages() {
    return Math.ceil(users.length / item);
}
function calStartEnd() {
    let start = (currentPage - 1) * item;
    let end = currentPage * item;
    return { start, end };
}
function renderItem() {
    const { start, end } = calStartEnd();
    let str = "";
    for (let i = start; i < end && i < users.length; i++) {
        str += `
             <tr>
             <td class="name-column-td">
                <div style="display: flex;gap: 10px;">
                    <div><img src="../assets/images/Avatar.png" alt="" srcset=""></div>
                    <div> <span>${users[i].firstName} ${users[i].lastName}</span>  <br>
                        <span class="span">@${users[i].lastName}</span>
                    </div>
                </div>
             </td>
             <td >hoạt động</td>
             <td class="span">${users[i].email}</td>
             <td >
                <button class="btn-b" onclick="block(${i})">block</button>
                <button class="btn-b" onclick="unblock(${i})">unblock</button>
             </td>
        </tr>
     `;
    }
    document.getElementById("tbody").innerHTML = str;
    document.getElementById("btn-users").innerHTML=`${users.length} users`;
    renderPage();
}
function renderPage() {
    let pages = getPages();
    let str = "";
    for (let i = 1; i <= pages; i++) {
        str += `<button class="btn2" onclick="clickPage(${i})" ${i === currentPage ? 'style="font-weight: bold;"' : ''}>${i}</button>`;
    }

   if(users.length>5){
    document.getElementById("btn").innerHTML = `
    <button class="btn1" onclick="prevPage()"><img src="../assets/icons/Icon (4).png" alt=""> Previous</button>
      <p>  ${str} </p>
    <button class="btn3" onclick="nextPage()">Next <img src="../assets/icons/Icon (5).png" alt=""></button>
`;
   }
}
renderItem();
renderPage();
function clickPage(page) {
    currentPage = page;
    renderItem();
    renderPage();
}
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderItem();
        renderPage();
    }
}
function nextPage() {
    if (currentPage < getPages()) {
        currentPage++;
        renderItem();
        renderPage();
    }
}
function updatePagination() {
    renderItem();
    renderPage();
}
updatePagination();

