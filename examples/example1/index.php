<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script type="text/javascript" src="formChecker.js"></script>
        <title></title>
    </head>
    <body>
        <form id="loginForm" name="loginForm">
            <label for="email">Email<br>
                <input type="email" value="" class="email" id="email" data-req="true" name="email">
            </label>	
            <label for="Username">Username<br>
                <input type="text" value="" class="email" id="email" data-req="true" name="username">
            </label>	
            <label for="password">Password<br>
                <input type="password" value="" class="password" id="password" data-req="true" name="pass">
            </label>
            <label for="confpassword">Conf-Password<br>
                <input type="password" value="" class="password" id="password" data-req="true" name="con_pass">
            </label>
            <label for="checkbox">checkbox<br>
                <input type="radio" value="" class="password" id="password" name="check">
                <input type="radio" value="" class="password" id="password" name="check">
            </label>
            <label for="select">select city<br>
                <select name="city" data-req="true">
                    <option value=""></option>
                    <option value="1">xxxx</option>
                    <option value="1">xxx</option>
                    <option value="1">xx</option>
                    <option value="1">x</option>
                </select>
            </label>
            <label for="remember">
                Remember Me
                <input type="checkbox" id="remember" name="remember">
            </label>
            <input type="submit" value="Log In" class="glass" id="submit">
        </form>
    </body>
</html>
