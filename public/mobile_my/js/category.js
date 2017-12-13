$(function () {
    // 渲染页面
    $.ajax({
        url: "/category/queryTopCategory",
        success: function (backData) {
            // console.log(backData);
            $(".main-left .mui-scroll>ul").html(template("categoryList-tem", backData));
            // 默认第一个高亮
            $(".main-left .mui-scroll>ul>li").first().click();
        }
    })
    // 点击高亮
    $(".main-left .mui-scroll>ul").on("click", "li", function () {
        $(this).addClass("active").siblings("li").removeClass("active");
        // 右边内容渲染
        $.ajax({
            url: "/category/querySecondCategory",
            data: {
                id: $(this).data("id")
            },
            success:function(backData){
                console.log(backData);
                $(".main-right .mui-scroll>ul").html(template("categoryContent-tem", backData));
            }
        })
    })


})