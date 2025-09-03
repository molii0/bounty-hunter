window.onload = function () {
    // 页面加载完成后的初始化
    console.log("登录页面加载完成");
    autoFillLastRegistered(); // 页面加载时尝试自动填充
};

// 添加表单切换函数
function switchToLogin() {
    document.getElementById('login').checked = true;
}

function switchToSignup() {
    document.getElementById('signup').checked = true;
}

function log() {
    let logUN = document.getElementById('logUN').value;
    let logPW = document.getElementById('logPW').value;
    
    //判断用户是否输入数据
    if (logUN === "" || logPW === "") {
        alert("请输入用户名和密码");
    } else {
        //判断用户名是否已经注册
        if (localStorage.getItem("Hound_" + "CurrentPlayer" + logUN)) {
            //如果已经注册，获取用户密码
            let password = localStorage["Hound_" + "CurrentPlayer" + logUN];
            //判断用户输入的密码和注册的密码是否一致
            if (logPW === password) {
                // ("登录成功！");
                document.getElementById('logUN').value = "";
                document.getElementById('logPW').value = "";

                // 登录成功后，将当前用户名存储到 localStorage 中
                localStorage.setItem("Hound_CurrentPlayer", logUN);
                // 直接跳转到home页面
                window.location.href = './home/home.html';
            } else {
                alert("密码错误，请重新输入");
                document.getElementById('logPW').value = "";
            }
        } else {
            alert("用户名不存在，请先注册");
        }
    }
}

// 自动填充最新注册的用户信息
function autoFillLastRegistered() {
    const lastRegistered = localStorage.getItem("Hound_last-registered");
    if (lastRegistered) {
        try {
            const userInfo = JSON.parse(lastRegistered);
            document.getElementById('logUN').value = userInfo.username;
            document.getElementById('logPW').value = userInfo.password;
            
            // 填充完成后清除记录，避免影响后续使用
            localStorage.removeItem("Hound_last-registered");
            
            console.log("自动填充用户信息:", userInfo.username);
        } catch (error) {
            console.error("解析最新注册用户信息失败:", error);
            localStorage.removeItem("Hound_last-registered");
        }
    }
}








