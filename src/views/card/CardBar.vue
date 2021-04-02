<template>
    <div>
        <LoginWelcome/>
        <Promotion/>
        <Tip/>
    </div>
        
</template>

<script>
import LoginWelcome from "@/views/card/LoginWelcome";
import Promotion from "@/views/card/Promotion";
import Tip from "@/views/card/Tip";

export default {
    name: 'CarBar',
    components: {LoginWelcome,Promotion,Tip},
    data() {
        return {}
    }
}

</script>
