$(function () {
    // $("button[type=submit]").click(function (event) {
    //     event.preventDefault();
    //     $.ajax({
    //         url: "/employee/employeeLogin",
    //         data: $("form").serialize(),
    //         type: "post",
    //         success: function (backData) {
    //             console.log(backData);
    //         }
    //     })
    // })
    //使用表单校验插件
    $("form").bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 4,
                        max: 12,
                        message: '用户名长度必须在6到30之间'
                    },
                    callback: {
                        message: '用户名不存在'
                    }
                }
            },
            password: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 16,
                        message: '密码长度必须在6到16之间'
                    },
                    callback: {
                        message: '密码错误'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        // 验证成功,开启进度条
        NProgress.start();

        $.ajax({
            url: "/employee/employeeLogin",
            data: $("form").serialize(),
            type: "post",
            success: function (backData) {
                console.log(backData);
                if (backData.success) {
                    // 登录成功
                    window.location.href = "index.html"
                } else {
                    // 登录失败
                    if (backData.error == 1000) {
                        // 用户名不存在
                        var validator = $("form").data('bootstrapValidator');
                        //使用表单校验实例可以调用一些常用的方法。
                        validator.updateStatus("username", "INVALID", "callback");
                    } else if (backData.error == 1001) {
                        var validator = $("form").data('bootstrapValidator');
                        //使用表单校验实例可以调用一些常用的方法。
                        validator.updateStatus("password", "INVALID", "callback");
                    }
                }

                setTimeout(function () {
                    //关闭进度条
                    NProgress.done();
                },3000)
            }
        })
    });

    $("button[type=reset]").click(function () {
        var validator = $("form").data('bootstrapValidator');
        validator.resetForm(); //重置表单，并且会隐藏所有的错误提示和图标
    })

})