function showEntries() {
    window.location.href = "../pages/entries_manager.html";
}
function showUsers() {
    window.location.href = "../pages/user_manager.html";
}
let articles = JSON.parse(localStorage.getItem("articles")) || [];
let categorys = JSON.parse(localStorage.getItem("categorys")) || [];
function deteArticle(index) {
    Swal.fire({
        title: "Xác nhận để xóa?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xác nhận"
    }).then((result) => {
        if (result.isConfirmed) {
            articles.splice(index, 1);
            localStorage.setItem("articles", JSON.stringify(articles));
            Swal.fire({
                title: "Đã xóa thành công!",
                icon: "success"
            });
            renderItem();
        }
    });
}
function showDetails(index) {
    document.getElementById("details").classList.remove("details");
    document.getElementById("details").classList.add("show-details");
    document.getElementById("details").innerHTML = `
     <div><button onclick="hideDetails()" style="border: 1px solid black;"><img
                        src="../assets/icons/Icon (1).png" alt=""></button></div><br>
            <div style="display: flex;">
                <div class=""><img src="../assets/images/Avatar.png" alt=""></div>
                <div class="content">
                    <h4 style="text-align: center;"> ${articles[index].title}</h4>
                   <p>${articles[index].content}</p>
                    <p>15 Like <button style="border: none;"><img src="../assets/icons/Icon (2).png" alt=""></button> 6
                        Replies <button style="border: none;"><img src="../assets/icons/Icon (3).png" alt=""></button>
                    </p>
                </div>
            </div>
    `
}
function hideDetails() {
    document.getElementById("details").classList.remove("show-details");
    document.getElementById("details").classList.add("details");
}
function updateStatus(selectElem, index) {
    const newStatus = selectElem.value;
    articles[index].status = newStatus;
    localStorage.setItem("articles", JSON.stringify(articles));
    
    showArticle();

    Swal.fire({
        icon: 'success',
        title: 'Cập nhật thành công',
        text: `Trạng thái đã đổi thành "${newStatus}"`,
        timer: 1500,
        showConfirmButton: false
    });
}
function searchArticle() {
    let title = document.getElementById("searchArticle").value.trim();
    let str = "";
    for (let i = 0; i < articles.length; i++) {
        if (articles[i].title.toLowerCase().includes(title.toLowerCase())) {
            str += `
                           <tr>
                                    <td ><img src="${articles[i].img}" alt="" width="100px" height="70px"></td>
                                    <td >${articles[i].title}</td>
                                    <td>${articles[i].category}</td>
                                    <td  onclick="showDetails(${i})">${articles[i].content.slice(0, 25)}...</td>
                                    <td>${articles[i].status}</td>
                                    <td>
                                       <select onchange="updateStatus(this, ${i})">
                                       <option value="public" ${articles[i].status === 'public' ? 'selected' : ''}>public</option>
                                       <option value="private" ${articles[i].status === 'private' ? 'selected' : ''}>private</option>
                                     </select>
                                   </td>
                                  </td>
                                    <td ><button onclick="deteArticle(${i})">Xóa</button> </td>
                                  </tr>
            `;
        }
    }
    document.getElementById("tbody").innerHTML = str;
    document.getElementById("searchArticles").value="";
    
}
function showAdd() {
    document.getElementById("add").classList.remove("add");
    document.getElementById("add").classList.add("show-add");
}
let selectedImage = ""; // Biến toàn cục để lưu link ảnh

async function addImg() {
    const { value: img } = await Swal.fire({
        input: "url",
        inputLabel: "Nhập link ảnh",
        inputPlaceholder: "https://example.com/image.jpg",
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) return "Vui lòng nhập link ảnh!";
            try {
                new URL(value);
                return null;
            } catch {
                return "Link ảnh không hợp lệ!";
            }
        }
    });

    if (img) {
        selectedImage = img; // Lưu link ảnh vào biến toàn cục
        document.getElementById("img-preview").innerHTML = `<img src="${img}" alt="Uploaded Image" style="max-width: 100%;">`;
    }
}

function add() {
    let id = 0;
    if (articles.length === 0) {
        id = 1;
    } else {
        id = articles[articles.length - 1].id + 1;
    }

    let today = new Date();
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0'); 
    let year = today.getFullYear();
    let date = `${day}/${month}/${year}`;

    let title = document.getElementById("title").value.trim();
    let category = document.getElementById("category").value.trim();
    let mood = document.getElementById("mood").value.trim();
    let content = document.getElementById("content").value.trim();
    let status = document.querySelector('input[name="status"]:checked')?.value.trim();

    if (
        title.length === 0 ||
        category.length === 0 ||
        mood.length === 0 ||
        content.length === 0 ||
        !status
    ) {
        Swal.fire({
            icon: "error",
            title: "Không được để trống",
            text: "Vui lòng nhập đầy đủ thông tin!",
        });
        return;
    }

    let img = selectedImage || ""; 
    if(img.length===0){
        Swal.fire({
            icon: "error",
            title: "Bạn chưa nhập ảnh",
            text: "Vui lòng nhập đầy đủ thông tin!",
        });
        return;
    }
    let article = {
        id: id,
        title: title,
        category: category,
        mood: mood,
        content: content,
        status: status,
        img: img,
        date: date
    };

    articles.push(article);
    localStorage.setItem("articles", JSON.stringify(articles));
    document.getElementById("add").classList.remove("show-add");
    document.getElementById("add").classList.add("add");
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    selectedImage = ""; 
   
}
function closeAdd() {
    document.getElementById("add").classList.remove("show-add");
    document.getElementById("add").classList.add("add");
}
function showCategory() {
    let str="";
    for (let i = 0; i < categorys.length; i++) {
        str+=`
           <option value="${categorys[i].name}">${categorys[i].name}</option>
        ` 
    }
    document.getElementById("category").innerHTML=str;
}
showCategory();
let indexUpdate=0;
function showUpdate(index) {
    document.getElementById("update").classList.remove("update");
    document.getElementById("update").classList.add("show-update");
    indexUpdate=index;
}
function closeUpdate() {
    document.getElementById("update").classList.remove("show-update");
    document.getElementById("update").classList.add("update");
}
function update() {
    let title = document.getElementById("titleUpdate").value.trim();
    let category = document.getElementById("categoryUpdate").value.trim();
    let mood = document.getElementById("moodUpdate").value.trim();
    let content = document.getElementById("contentUpdate").value.trim();
    let status = document.querySelector('input[name="status"]:checked')?.value.trim();
    if (
        title.length === 0 ||
        category.length === 0 ||
        mood.length === 0 ||
        content.length === 0 ||
        !status
    ) {
        Swal.fire({
            icon: "error",
            title: "Không được để trống",
            text: "Vui lòng nhập đầy đủ thông tin!",
        });
        return;
    }
    let img = selectedImage || articles[indexUpdate].img
    let article = {
        id:articles[indexUpdate].id,
        title: title,
        category: category,
        mood: mood,
        content: content,
        status: status,
        img: img
    };
    articles[indexUpdate] = article;
    localStorage.setItem("articles", JSON.stringify(articles));
    document.getElementById("update").classList.remove("show-update");
    document.getElementById("update").classList.add("update");
    document.getElementById("titleUpdate").value = "";
    document.getElementById("contentUpdate").value = "";
    selectedImage = ""; 
    renderItem();
}
function showCategoryUpdate() {
        let str="";
        for (let i = 0; i < categorys.length; i++) {
            str+=`
               <option value="${categorys[i].name}">${categorys[i].name}</option>
            ` 
        }
        document.getElementById("categoryUpdate").innerHTML=str;
}
showCategoryUpdate();

let item =4;
let currentPage = 1;
function getPages() {
    return Math.ceil(articles.length / item);
}
function calStartEnd() {
    let start = (currentPage - 1) * item;
    let end = currentPage * item;
    return { start, end };
}
function renderItem() {
    const { start, end } = calStartEnd();
    let str = "";
    for (let i = start; i < end && i < articles.length; i++) {
        str += `
                                <tr>
                                    <td ><img src="${articles[i].img}" alt="" width="100px" height="70px"></td>
                                    <td >${articles[i].title}</td>
                                    <td>${articles[i].category}</td>
                                    <td  onclick="showDetails(${i})">${articles[i].content.slice(0, 25)}...</td>
                                    <td>${articles[i].status}</td>
                                    <td>
                                       <select onchange="updateStatus(this, ${i})">
                                       <option value="public" ${articles[i].status === 'public' ? 'selected' : ''}>public</option>
                                       <option value="private" ${articles[i].status === 'private' ? 'selected' : ''}>private</option>
                                     </select>
                                   </td>
                                  </td>
                                    <td ><button style="background-color: #28A745;color: #FFFFFF;border: none;border-radius: 5px;" onclick="showUpdate(${i})">sửa</button>  <button style="background-color: #28A745;color: #FFFFFF;border: none;border-radius: 5px;" onclick="deteArticle(${i})">Xóa</button> </td>
                                  </tr>`;
    }
    document.getElementById("tbody").innerHTML = str;
    renderPage();
}
function renderPage() {
    let pages = getPages();
    let str = "";
    for (let i = 1; i <= pages; i++) {
        str += `<button class="btn2" onclick="clickPage(${i})" ${i === currentPage ? 'style="font-weight: bold;"' : ''}>${i}</button>`;
    }

   if(articles.length>4){
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

