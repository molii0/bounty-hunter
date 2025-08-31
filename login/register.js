function reg() {
    let username = document.getElementById('regUN').value;
    let password1 = document.getElementById('regPW1').value;
    let password2 = document.getElementById('regPW2').value;
    
    if (username === "" || password1 === "" || password2 === "") {
        alert("请输入用户名和密码");
    } else {
        //判断用户名是否已经存在
        console.log("检查用户名:", username);
        console.log("localStorage中的用户:", localStorage.getItem("Sec-Sight-" + username));
        
        if (localStorage.getItem("Sec-Sight-" + username)) {
            alert("用户名已存在，请选择其他用户名");
            document.getElementById('regUN').value = "";
            document.getElementById('regPW1').value = "";
            document.getElementById('regPW2').value = "";
        } else if (password1 !== password2) {
            alert("两次密码输入不一致，请重新输入");
        }
        else {
            //如果不存在，则将用户名和密码存到网页中
            localStorage.setItem("Sec-Sight-" + username, password1);
            // 记录最新注册的用户信息，供登录页面自动填充
            localStorage.setItem("Sec-Sight-last-registered", JSON.stringify({
                username: username,
                password: password1
            }));
            alert("注册成功！");
            //注册成功后返回到主页面
            if (window.parent && window.parent !== window) {
                // 在iframe中，使用全局切换函数回到登录页
                if (window.parent.switchIframe) {
                    window.parent.switchIframe('login');
                }
                // 同步重置 login-frame 的内容为登录页
                const loginFrameEl = window.parent.document.getElementById('login-frame');
                if (loginFrameEl) {
                    loginFrameEl.src = './login.html';
                }
            } else {
                // 如果不在iframe中，直接跳转
                window.location.href = './index.html';
            }
        }
    }
}
