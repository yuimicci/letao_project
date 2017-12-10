$(function () {
    var myPageNUm = 1;
    var myPageSize = 5;

    function getData() {
        $.ajax({
            url: "/user/queryUser",
            data: {
                page: myPageNUm,
                pageSize: myPageSize
            },
            success: function (backData) {
                console.log(backData);
                var totlaPageCount = Math.ceil(backData.total / backData.size);
                $("tbody").html(template("user-tem", backData));
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: myPageNUm, //当前页
                    totalPages: totlaPageCount, //总页数
                    size: "small", //设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        myPageNUm = page;
                        getData();
                    }
                });
                // 点击按钮
                
            }
        })
    }
    getData();


    $("tbody").on("click","button",function () {
       var index = $(this).attr("isdelete")==1?0:1;
        $.ajax({
            url:"/user/updateUser",
            data:{
                id:$(this).attr("id"),
                isDelete :index
            },
            type:"post",
            success:function(backData){
               window.location.href = window.location.href ;
            }
        })
     })
})