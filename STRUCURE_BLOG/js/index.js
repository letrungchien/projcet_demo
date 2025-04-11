let articles = JSON.parse(localStorage.getItem("articles")) || [];
function showAdd() {
    document.getElementById("container-div").style.background = "rgba(0, 0, 0,0.5)"
    document.getElementById("add").classList.remove("add");
    document.getElementById("add").classList.add("show-add");
    let btn_many = document.getElementsByClassName("btn-many");
    for (let i = 0; i < btn_many.length; i++) {
        btn_many[i].style.backgroundColor = "#7f7f7f";
    }
    let button_topic = document.getElementsByClassName("btn-topic");
    for (let i = 0; i < button_topic.length; i++) {
        button_topic[i].style.backgroundColor = "#7f7f7f";
    }
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

    let btn_many = document.getElementsByClassName("btn-many");
    for (let i = 0; i < btn_many.length; i++) {
        btn_many[i].style.backgroundColor = "#FFFFFF";
    }
    let button_topic = document.getElementsByClassName("btn-topic");
    for (let i = 0; i < button_topic.length; i++) {
        button_topic[i].style.backgroundColor = "#F0F9FF";
    }
    document.getElementById("container-div").style.backgroundColor = "#FFFFFF";
    document.getElementById("add").classList.remove("show-add");
    document.getElementById("add").classList.add("add");
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    selectedImage = ""; // reset ảnh sau khi thêm
   
}
function closeAdd() {
    let btn_many = document.getElementsByClassName("btn-many");
    for (let i = 0; i < btn_many.length; i++) {
        btn_many[i].style.backgroundColor = "#FFFFFF";
    }
    let button_topic = document.getElementsByClassName("btn-topic");
    for (let i = 0; i < button_topic.length; i++) {
        button_topic[i].style.backgroundColor = "#F0F9FF";
    }
    document.getElementById("container-div").style.backgroundColor = "#FFFFFF"
    document.getElementById("add").classList.remove("show-add");
    document.getElementById("add").classList.add("add");
}
function showDetails(index) {
    let btn_many = document.getElementsByClassName("btn-many");
    for (let i = 0; i < btn_many.length; i++) {
        btn_many[i].style.backgroundColor = "#7f7f7f";
    }
    let button_topic = document.getElementsByClassName("btn-topic");
    for (let i = 0; i < button_topic.length; i++) {
        button_topic[i].style.backgroundColor = "#7f7f7f";
    }
    document.getElementById("container-div").style.background = "rgba(0, 0, 0,0.5)"
    document.getElementById("details").classList.remove("details");
    document.getElementById("details").classList.add("show-details");
    document.getElementById("details").innerHTML = `
     <div><button onclick="hideDetails()" style="border: 1px solid black;"><img
                        src="../assets/icons/Icon (1).png" alt=""></button></div><br>
            <div style="display: flex;">
                <div class=""><img style="border-radius: 50%;" src="${ users[loginUser].img}" alt="" width="40px " height="40px"></div>
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
    let btn_many = document.getElementsByClassName("btn-many");
    for (let i = 0; i < btn_many.length; i++) {
        btn_many[i].style.backgroundColor = "#FFFFFF";
    }
    let button_topic = document.getElementsByClassName("btn-topic");
    for (let i = 0; i < button_topic.length; i++) {
        button_topic[i].style.backgroundColor = "#F0F9FF";
    }
    document.getElementById("container-div").style.backgroundColor = "#FFFFFF"
    document.getElementById("details").classList.remove("show-details");
    document.getElementById("details").classList.add("details");
}
function showContainer7() {
    document.getElementById("container7").classList.toggle("show-container7");
}
function hideContainer7() {
    document.getElementById("container7").classList.remove("show-container7");
    document.getElementById("container7").classList.add("container7");
}
let categorys = JSON.parse(localStorage.getItem("categorys"));
function showCategory() {
    let str = "";
    for (let i = 0; i < categorys.length; i++) {
        str += `
           <option value="${categorys[i].name}">${categorys[i].name}</option>
        `
    }
    document.getElementById("category").innerHTML = str;
}
showCategory();
let item = 6;
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
             <div>
                    <div><img src="${articles[i].img}" alt="" width="350px" height="200px"> </div>
                    <div style="width: 350px;">
                        <p class="date">Date:${articles[i].date}</p>
                        <h4> ${articles[i].title} &nbsp;&nbsp;<button id="btn-many" class="btn-many" onclick="showDetails(${i})"><img
                                    src="../assets/icons/Icon wrap.png" alt="" height="40px"></button></h4>
                        <span class="text1">${articles[i].content.slice(0, 110)}...</span><br><br>
                        <button id="btn-topic" class="btn-topic">${articles[i].category}</button>
                    </div>
                </div>`;
    }
    document.getElementById("content2").innerHTML = str;
    renderPage();
}
function renderPage() {
    let pages = getPages();
    let str = "";
    for (let i = 1; i <= pages; i++) {
        str += `<button class="btn2" onclick="clickPage(${i})" ${i === currentPage ? 'style="font-weight: bold;"' : ''}>   ${i} </button>`;
    }

    if (articles.length > 6) {
        document.getElementById("btn").innerHTML = `
    <button class="btn1" onclick="prevPage()"><img src="../assets/icons/Icon (4).png" alt=""> Trước</button>
  <p>  ${str} </p>
    <button class="btn3" onclick="nextPage()"> Sau <img src="../assets/icons/Icon (5).png" alt=""> </button>
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
function showBtn() {
    let str = "";
    for (let i = 0; i < categorys.length; i++) {
        str += `
      <button style="background-color: aqua;border: none;border-radius: 5px;color: #FFFFFF;" onclick="show(${i})">${categorys[i].name}</button>
      `
    }
    document.getElementById("span").innerHTML = str;
}
showBtn();
function show(index) {
    let str = "";
    for (let i = 0; i < articles.length; i++) {
        if (articles[i].category === categorys[index].name) {
            str += `
                <div>
                    <div><img src="${articles[i].img}" alt="" width="350px" height="200px"> </div>
                    <div style="width: 350px;">
                        <p class="date">Date:${articles[i].date}</p>
                        <h4> ${articles[i].title} &nbsp;&nbsp;<button id="btn-many" class="btn-many" onclick="showDetails(${i})"><img
                                    src="../assets/icons/Icon wrap.png" alt="" height="40px"></button></h4>
                        <span class="text1">${articles[i].content.slice(0, 110)}...</span><br><br>
                        <button id="btn-topic" class="btn-topic">${articles[i].category}</button>
                    </div>
                </div>`
         ;

        }
    }
    document.getElementById("content2").innerHTML = str;
}
function searchTitle() {
    let str="";
    let search=document.getElementById("input").value.trim();
    for (let i = 0; i < articles.length; i++) {
        if (articles[i].title.toLowerCase().includes(search.toLowerCase())) {
            str+=`
             <div>
                    <div><img src="${articles[i].img}" alt="" width="350px" height="200px"> </div>
                    <div style="width: 350px;">
                        <p class="date">Date:${articles[i].date}</p>
                        <h4> ${articles[i].title} &nbsp;&nbsp;<button id="btn-many" class="btn-many" onclick="showDetails(${i})"><img
                                    src="../assets/icons/Icon wrap.png" alt="" height="40px"></button></h4>
                        <span class="text1">${articles[i].content.slice(0, 110)}...</span><br><br>
                        <button id="btn-topic" class="btn-topic">${articles[i].category}</button>
                    </div>
                </div>
            `;
        }
        
    }
    document.getElementById("content2").innerHTML = str; 
    document.getElementById("input").value="";
}
let users=JSON.parse(localStorage.getItem("users"))||[];
let loginUser=JSON.parse(localStorage.getItem("loginUser"));
function showInformation() {
   document.getElementById("information").innerHTML=` 
                    <b>${users[loginUser].lastName}</b>
                    <p>${users[loginUser].email}</p>`;
}
showInformation();
async function updateImg() {
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
        users[loginUser].img = img; 
        localStorage.setItem("users",JSON.stringify(users));
    }
}
function showImg() {
    document.getElementById("img1").innerHTML=`<img style="border-radius: 50%;" src="${ users[loginUser].img}" alt="" width="40px " height="40px">`;
    document.getElementById("img2").innerHTML=`<img style="border-radius: 50%;" src="${ users[loginUser].img}" alt="" width="40px " height="40px">`;
}
showImg();
function updatePassword() {
    Swal.fire({
        title: "Mời bạn nhập mật khẩu mới",
        input: "password",
        inputAttributes: {
            autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "Xác nhận",
        showLoaderOnConfirm: true,
        preConfirm: (newPass) => {
            if (!newPass.trim()) {
                Swal.showValidationMessage('Không được để trống');
                return false;
            }
            if (newPass.length < 6) {
                Swal.showValidationMessage('Mật khẩu phải có ít nhất 6 ký tự');
                return false;
            }
            return newPass;
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            users[loginUser].password = result.value;
            localStorage.setItem("users", JSON.stringify(users));
            Swal.fire({
                title: "Đổi mật khẩu thành công!",
                icon: "success"
            });
        }
    });
}
updatePassword();