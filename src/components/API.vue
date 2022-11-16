<template>
    <div>
        <div class="two-cols">
            <div class="onecol">
                <h5>Generate New API Key</h5>
                <div class="form-row">
                    <input type="checkbox" v-model="rights.crypto_read"/>
                    <label>Spot Trading Read</label>
                </div>
                <div class="form-row">
                    <input type="checkbox" v-model="rights.crypto_trade" />
                    <label>Spot Trading Trade</label>
                </div>
                <div class="form-row">
                    <input type="checkbox" v-model="rights.crypto_margin_read" />
                    <label>Margin Trading Read</label>
                </div>
                <div class="form-row">
                    <input type="checkbox" v-model="rights.crypto_margin_trade" />
                    <label>Margin Trading Trade</label>
                </div>
                <div class="form-row form-actions">
                    <button class="btn btn-primary pad" v-on:click="requestKey">Generate</button>
                </div>
            </div>
            <div class="onecol">
                <h5>Documentation</h5>
                <p>You can check the documentation using the <a href="https://documenter.getpostman.com/view/10540936/TVeneoXu" target="_blank">following link</a>.</p>
                <h5 :class="{hide: !apiKeyNew}">Your new API key</h5>
                <textarea :class="{hide: !apiKeyNew}" v-model="apiKeyNew">
                </textarea>
            </div>
        </div>
        <h5>Active Keys</h5>
        <table>
            <thead>
            <tr>
                <th>Created</th>
                <th>Rights</th>
                <th>Key</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <template>
                <tr
                    v-for="apiKey in apiKeys"
                    :key="apiKey.id"
                >
                    <td>{{ apiKey.timeCreatedString }}</td>
                    <td>{{ apiKey.rights.slice(1).join(', ') }}</td>
                    <td>{{ apiKey.key.slice(0, 40)+'...' }}</td>
                    <td><button class="btn btn-red" v-on:click="removeKey(apiKey.id)">Delete</button></td>
                </tr>
            </template>
            </tbody>
        </table>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {API_KEY_REMOVE, API_KEY_REQUEST} from "@/store/actions.type";

    export default {
        name: "API",
        data() {
            return {
                rights: {
                    crypto_read: false,
                    crypto_trade: false,
                    crypto_margin_read: false,
                    crypto_margin_trade: false
                }
            }
        },
        methods: {
            requestKey() {
                let key = {
                    rights: []
                }

                for(let n in this.rights) {
                    if (this.rights[n]) {
                        key.rights.push(n)
                    }
                }

                this.$store.dispatch(API_KEY_REQUEST, key)
            },
            removeKey(id) {
                this.$store.dispatch(API_KEY_REMOVE, id)
            }
        },
        computed: {
            ...mapGetters(['apiKeys', 'apiKeyNew'])
        }
    }
</script>

<style scoped>
    .form-row {
        flex-direction: row;
        align-items: center;
        padding: 0;
        margin-top: 20px;
    }

    input[type="checkbox"] {
        width: 30px;
        font-size: 3px;
    }

    label {
        margin-bottom: 0;
    }

    .pad {
        margin-bottom: 40px;
    }

    .form-actions {
        justify-content: flex-start;
    }

    p {
        margin: 30px 0
    }

    a {
        color: var(--brand);
        text-decoration: none;
    }

    textarea {
        height: 80px;
        background-color: var(--background);
        color: var(--font);
        padding: 4px;
        margin: 15px 0;
    }
</style>