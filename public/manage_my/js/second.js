$(function () {
    var mypageNum = 1;
    var mypageSize = 5;

    function getData() {
        $.ajax({
            url: "/category/querySecondCategoryPaging",
            data: {
                pageSize: mypageSize,
                page: mypageNum
            },
            success: function (backData) {
                //    console.log(backData);
                $("tbody").html(template("second-tem", backData));
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: mypageNum, //当前页
                    totalPages: Math.ceil(backData.total / backData.size), //总页数
                    size: "small", //设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        mypageNum = page;
                        getData();
                    }
                });

            }
        })
    }
    getData();


    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            //   console.log(data);
            //   console.log(data.result.picAddr);
            $(".form-group>img").attr("src", data.result.picAddr);
            $("input[name=brandLogo]").val(data.result.picAddr);
            // 人为更新字段
            $("form").data('bootstrapValidator').updateStatus("brandLogo", "VALID");
        }
    });

    // ajax获取数据  渲染页面
    var myPageSize = 500;
    var myPageNum = 1;
    $.ajax({
        url: "/category/queryTopCategoryPaging",
        data: {
            pageSize: myPageSize,
            page: myPageNum
        },
        success: function (backData) {
            console.log(backData);
            // 循环遍历数组
            $(".dropdown-menu").html("");
            $.each(backData.rows, function (i, e) {
                console.log(e.categoryName);
                $(".dropdown-menu").append('<li><a data-id="' + e.id + '" href="#">' + e.categoryName + '</a></li>');
            })
        }
    })

    // 给动态生成的li列表添加点击事件
    $(".dropdown-menu").on("click", "li a", function () {
        var categoryName = $(this).html();
        // console.log(categoryName);
        $(".select-value").html(categoryName);
        $('input[name=categoryId]').val($(this).attr('data-id'));
        // 人为更新字段
        $("form").data('bootstrapValidator').updateStatus("categoryId", "VALID");
    })

    $("form").bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //3. 指定校验字段
        fields: {
            categoryId: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "分类不能为空"
                    }

                }
            },
            brandName: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "分类名不能为空"
                    }
                }
            },
            brandLogo: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: "图片不能为空"
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        // console.log("成功了");
        $.ajax({
            url: "/category/addSecondCategory",
            type: "post",
            data: $("form").serialize(),
            success: function (backData) {
                console.log(backData);
                getData();
                $(".modal-add").modal("hide");
                window.location.reload();
            }
        })
    });
})