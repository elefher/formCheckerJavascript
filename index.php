<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" type="text/css" href="styles.css">
        <script type="text/javascript" src="formChecker.js"></script>        
        <title></title>
    </head>
    <body>
        <form id="loginForm" name="loginForm">
            <label for="email">
                <input type="email" value="" class="email" placeholder="email" id="email" data-req="true" name="email">
            </label>
            <label for="email2">
                <input type="email" value="" class="email" placeholder="email2" id="email2" data-req="true" name="email">
            </label>
            <label for="Username">
                <input type="text" value="" placeholder="username" class="email" data-req="true" name="username">
            </label>	
            <label for="password">
                <input type="password" value="" class="password" placeholder="password"  data-req="true" name="pass">
            </label>
            <label for="confpassword">
                <input type="password" placeholder="confirm password" value="" class="password"  data-req="true" name="con_pass">
            </label>
            <label for="checkbox">checkbox1<br>
                <input type="radio" value="1"  data-req="true" name="check">
                <input type="radio" value="2"  data-req="true" name="check">
                <input type="radio" value="3"  data-req="true" name="check">
                <input type="radio" value="4"  data-req="true" name="check">
            </label>
            <label for="checkbox">checkbox2<br>
                <input type="radio" value="1"  data-req="true" name="c">
                <input type="radio" value="2"  data-req="true" name="c">
                <input type="radio" value="3"  data-req="true" name="c">
                <input type="radio" value="4"  data-req="true" name="c">
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
