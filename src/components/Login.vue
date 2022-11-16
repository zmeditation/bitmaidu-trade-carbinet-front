<template>
    <div class="modal-wrapper"
         v-bind:class="modalLoginActive ? '' : 'hide'"
    >
        <div class="modal" v-on:click.stop>
            <div class="modal-header">
                <h5>Sign In</h5>
            </div>
            <div class="modal-body">
                <div class="form-row">
                    <label for="login">Login:</label>
                    <input type="text" id="login" :value="login" @input="updateLoginVal">
                </div>
                <div class="form-row">
                    <label for="password">Password:</label>
                    <input type="password" id="password" :value="password" @input="updatePasswordVal">
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary"
                    v-on:click="processLogin()"
                >Login</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {LOGIN} from "@/store/actions.type";
    import {mapGetters} from "vuex";

    export default {
        name: "Login",
        data() {
            return {
                login: '',
                password: ''
            }
        },
        methods : {
            processLogin() {
                this.$store.dispatch(LOGIN, {
                    email: this.login,
                    password: this.password
                })
            },
            updateLoginVal(e) {
                this.login = e.target.value
            },
            updatePasswordVal(e) {
                this.password = e.target.value
            }
        },
        computed: {
            ...mapGetters(['modalLoginActive', 'loggedIn'])
        }
    }
</script>

<style scoped>

</style>
