// 判断管理员登录
$.ajax({
    url:" /employee/checkRootLogin",
    success:function(backData){
        if(backData.error==400){
            window.location.href = "login.html";
        }
    }
})

$(".le_content header i.glyphicon-qrcode").click(function(){
    $(".le_aside").toggle();
    $(".le_content").toggleClass("act");
})
// 点击出现模态框
$(".le_content header i.glyphicon-log-out").click(function(){
    $(".bs-example-modal-sm").modal('show');
})
// 点击确定关闭模态框
$(".bs-example-modal-sm .btn-danger").click(function(){
    $(".bs-example-modal-sm").modal('hide');
    $.ajax({
        url:"/employee/employeeLogout",
        success:function(backData){
            window.location.href = "login.html";
        }
    })
})

$(".le_aside .main ul ol>li>a").click(function(){
    $(this).css("color","#fff");
})
$(".le_aside .main ul>li:eq(1)").click(function(){
    $(this).children("ol").slideToggle();
})