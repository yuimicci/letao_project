$(function () {
    var myPageNum = 1;
    var myPageSize = 5;

    function getData() {
        $.ajax({
            url: "/product/queryProductDetailList",
            data: {
                pageSize: myPageSize,
                page: myPageNum
            },
            success: function (backData) {
                // console.log(backData);
                $("tbody").html(template("products-tem", backData));
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: myPageNum, //当前页
                    totalPages: Math.ceil(backData.total / backData.size), //总页数
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
    getData()


// 文件上传
$("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
        console.log(data);
        $('<img src="' + data.result.picAddr + '" style="width:100px;height:100px;">').appendTo("form .form-group:last");
    }
});

//   超出 禁止选择图片
$("#fileupload").click(function (event) {
    if ($("form .form-group:last img").length == 3) {
        event.preventDefault();
        $("form").data('bootstrapValidator').updateStatus("pic1", "VALID");
    }
})

// 双击图片删除图片
$("form .form-group:last").on("dblclick", "img", function () {
    $(this).remove();
})

// 初始化表单校验插件
//使用表单校验插件
$("form").bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    // excluded: [':disabled', ':hidden', ':not(:visible)'],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
        //校验用户名，对应name表单的name属性
        proName: {
            validators: {
                //不能为空
                notEmpty: {
                    message: '产品名称不能为空'
                }
            }
        },
        proDesc: {
            validators: {
                //不能为空
                notEmpty: {
                    message: '产品描述不能为空'
                }
            }
        },
        num: {
            validators: {
                //不能为空
                notEmpty: {
                    message: '用户库存不能为空'
                }
            }
        },
        price: {
            validators: {
                //不能为空
                notEmpty: {
                    message: '价格不能为空'
                }
            }
        },
        oldPrice: {
            validators: {
                //不能为空
                notEmpty: {
                    message: '原价格不能为空'
                }
            }
        },
        size: {
            validators: {
                //不能为空
                notEmpty: {
                    message: '尺寸不能为空'
                }
            }
        },
        pic1: {
            validators: {
                //不能为空
                notEmpty: {
                    message: '图片不能为空'
                }
            }
        }
    }

}).on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
        url:"/product/addProduct",
        data:$("form").serialize(),
        type:"post",
        success:function(backData){
            console.log(backData);
            getData();
            $(".modal-edit").modal("hide");
            window.location.reload();
        }
    })
});;

})