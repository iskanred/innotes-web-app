<script>
    import {base} from "$app/paths";
</script>

<header>
    <nav>
        <a href="{base}/">Innotes</a>
        <a href="{base}/notes/">My Notes</a>
        <a href="{base}/about/">About</a>
        <a href="{base}/auth/">Log in</a>
    </nav>
</header>

<slot />

<style>
    header {
        text-align: center;
        background-color: #dedddd;
        padding: 10px;
    }
    nav {
        height: 100%;
        width: 100%;

        display: flex;
        justify-content: space-between;
    }
    a {
        font-size: 36pt;
        font-weight: bold;
        margin-left: 10px;
        margin-right: 10px;
    }
</style>
