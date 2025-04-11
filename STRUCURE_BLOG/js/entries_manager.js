function showUsers() {
    window.location.href = "../pages/user_manager.html";
}
function showArticle() {
    window.location.href = "../pages/article_manager.html";
}
let categorys = JSON.parse(localStorage.getItem("categorys")) || [];
function show() {
    let str = "";
    for (let i = 0; i < categorys.length; i++) {
        str += `
     <tr>
       <td >${categorys[i].id}</td>
       <td >${categorys[i].name}</td>
       <td ><button onclick="updateCategory(${i})">Sửa</button>  <button onclick="deteCategory(${i})">Xóa</button> </td>
      </tr>
    `
    }
    document.getElementById("tbody").innerHTML=str;
}
// show();
function addCategory() {
    let id=0;
    if (categorys.length==0) {
        id=1;
    }else{
        id=categorys[categorys.length-1].id+1
    }
    let name=document.getElementById("name").value.trim();
    if(name.length==0){
        Swal.fire({
           icon: "error",
           title: "Không được để trống",
           text: "Vui lòng nhập đầy đủ thông tin!",
         });
         return;
  }
  let category={
    id:id,
    name:name
 }
 categorys.push(category);
   localStorage.setItem("categorys",JSON.stringify(categorys));
   document.getElementById("name").value="";
   renderItem();
   renderPage();
}
function deteCategory(index) {
    Swal.fire({
        title: "Xác nhận để xóa?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xác nhận"
    }).then((result) => {
        if (result.isConfirmed) {
            categorys.splice(index, 1);
            localStorage.setItem("categorys",JSON.stringify(categorys));
            Swal.fire({
                title: "Đã xóa thành công!",
                icon: "success"
            });
            renderItem();
            renderPage();
        }
    });

}
function updateCategory(index) {
    Swal.fire({
        title: "Cập nhật tên danh mục",
        input: "text",
        inputValue: categorys[index].name, 
        inputAttributes: {
            autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "Cập nhật",
        showLoaderOnConfirm: true,
        preConfirm: (newName) => {
            if (!newName.trim()) {
                Swal.showValidationMessage('Tên danh mục không được để trống');
                return false;
            }
            return newName;
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            categorys[index].name = result.value;
            localStorage.setItem("categorys",JSON.stringify(categorys));
            Swal.fire({
                title: "Cập nhật thành công!",
                icon: "success"
            });
            renderItem();
            renderPage();
        }
    });
}
function searchCategory() {
    let category = document.getElementById("searchCategory").value.trim();
    let str = "";
    for (let i = 0; i < categorys.length; i++) {
        if (categorys[i].name.toLowerCase().includes(category.toLowerCase())) {
            str += `
                <tr>
                    <td>${categorys[i].id}</td>
                    <td>${categorys[i].name}</td>
                    <td>
                        <button onclick="updateCategory(${i})">Sửa</button>
                        <button onclick="deteCategory(${i})">Xóa</button>
                    </td>
                </tr>
            `;
        }
    }
    document.getElementById("tbody").innerHTML = str;
    document.getElementById("searchCategory").value="";
}
let item =4;
let currentPage = 1;
function getPages() {
    return Math.ceil(categorys.length / item);
}
function calStartEnd() {
    let start = (currentPage - 1) * item;
    let end = currentPage * item;
    return { start, end };
}
function renderItem() {
    const { start, end } = calStartEnd();
    let str = "";
    for (let i = start; i < end && i < categorys.length; i++) {
        str += `
            <tr>
                    <td>${categorys[i].id}</td>
                    <td>${categorys[i].name}</td>
                    <td>
                        <button onclick="updateCategory(${i})">Sửa</button>
                        <button onclick="deteCategory(${i})">Xóa</button>
                    </td>
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

   if(categorys.length>4){
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

