$(function() {
    $("#login").on("click", "a", function() {
        $("#login").hide();
        $("#registered").show()
    })
    $("#registered").on("click", "a", function() {
        $("#registered").hide();
        $("#login").show()
    })
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}/, "密码必须是6-12位，且不能是空格"],
        repwd: function(value) {
            var pwd = $("#registered [name=password]").val();
            if (pwd !== value) {
                return "两次输入的密码不一致"
            }
        }
    })
    var layer = layui.layer;
    $("#registered").on("submit", function(e) {
        //1. 阻止默认的提交行为
        e.preventDefault()
        var data = {
            username: $("#registered [name=username]").val(),
            password: $("#registered [name=password]").val()
        }
        $.post('http://www.liulongbin.top:3007/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg("注册成功，请登录")
            $("#registered a").click();
        })
    })
    $("#login").on("submit", function(e) {
        //1. 阻止默认的提交行为
        e.preventDefault()
        var data = {
            username: $("#login [name=username]").val(),
            password: $("#login [name=password]").val()
        }
        $.ajax({
            method: "POST",
            url: "http://www.liulongbin.top:3007/api/login",
            data: data,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("登录失败")
                }
                layer.msg("登录成功")
                    // 将登录成功得到的 token 字符串，保存到 localStorage 中 
                localStorage.setItem('token', res.token);
                location.href = "/index.html"
            }
        });
    })

})