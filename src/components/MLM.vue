<template>
    <div class="two-cols">
        <div class="onecol">
            <h4>Refer a friend</h4>
            <div class="form-row">
                <label>Referral Link</label>
                <input type="text" readonly v-model="link">
            </div>
        </div>
        <div class="onecol">
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {SIGNUP_PAGE} from "@/common/config";
    export default {
        name: "MLM",
        computed: {
            ...mapGetters(['user']),
            link() {
                return SIGNUP_PAGE+'?ref='+this.user.id
            }
        }
    }
</script>

<style scoped>

</style>