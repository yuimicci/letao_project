$(function () {
    var myPageNum = 1;
    var myPageSize = 5;

    function getData() {
        $.ajax({
            url: "/category/queryTopCategoryPaging",
            data: {
                page: myPageNum,
                pageSize: myPageSize
            },
            success: function (backData) {
                console.log(backData);
                var totalPageCount = Math.ceil(backData.total / backData.size)
                $("tbody").html(template("first-tem", backData));
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: myPageNum, //当前页
                    totalPages: totalPageCount, //总页数
                    size: "small", //设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        myPageNum = page;
                        getData()
                    }
                });
            }
        })
    }
    getData();
    

    // 点击添加分类确定
    $(".modal-footer>button:last-of-type").click(function(){
        $.ajax({
            url:"/category/addTopCategory",
            data:{
                categoryName:$(".form-group input").val()
            },
            type:"post",
            success:function(backData){
                getData();
                $(".modal-add").modal('hide');
                $(".form-group input").val("");
            }
        })
    })

})