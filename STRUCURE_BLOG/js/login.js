let users=JSON.parse(localStorage.getItem("users"))||[];
let loginUser=JSON.parse(localStorage.getItem("loginUser"));
function login() {
    let index=0;
   let email=document.getElementById("emailLogin").value.trim();
    let password=document.getElementById("passwordLogin").value.trim();
    if(email.length==0||password.length==0){
        Swal.fire({
           icon: "error",
           title: "Không được để trống",
           text: "Vui lòng nhập đầy đủ thông tin!",
         });
         return;
     }
for (let i = 0; i < users.length; i++) {
    if(email===users[i].email){
      index=i;
    }
}
if(index==0){
    Swal.fire({
        icon: "error",
        title: "Tài khoản không tồn tại",
        text: "Vui lòng nhập lại hoặc đăng ký",
      });
}else{
if (password===users[index].password) {
    loginUser = index;
    localStorage.setItem("loginUser", JSON.stringify(loginUser));
    Swal.fire({
        title: "Đăng nhập thành công",
        icon: "success",
        draggable: true
     }).then(() => {
        setTimeout(() => {
           window.location.href = "../pages/index.html";
        }, 1000); 
     });
}else{
    Swal.fire({
        icon: "error",
        title: "Mật khẩu sai",
        text: "Vui lòng nhập lại!",
      });
}
}
}