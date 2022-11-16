<template>
    <div class="verification">
        <h4>Upload a Document</h4>
        <div class="form-row">
            <label>Document type</label>
            <select v-model="type">
                <option value="0">Proof of Identity</option>
                <option value="1">Proof of Residence</option>
            </select>
        </div>
        <div class="form-row">
            <label>File</label>
            <input type="file" class="form-control-file" id="document_file">
            <span class="text-muted">We accept files with following extensions: jpg, jpeg, png, gif. Please make sure that the size of the uploaded document is less than 2 Mb.</span>
        </div>
        <div class="form-row form-actions">
            <button type="button" class="btn btn-primary" v-on:click="uploadDocument">Upload</button>
        </div>
    </div>
</template>

<script>
import {DOCUMENT_UPLOAD} from "@/store/actions.type";

export default {
    name: "Verification",
    data() {
        return {
            type: 0
        }
    },
    methods: {
        uploadDocument() {
            let data = new FormData()

            let inp = document.getElementById('document_file')

            data.append('data', JSON.stringify({
                type: parseInt(this.type)
            }))
            data.append('file', inp.files[0])

            this.$store.dispatch(DOCUMENT_UPLOAD, data)

            inp.value = ''
        }
    }
}
</script>

<style scoped>
    .verification {
        display: flex;
        flex-direction: column;
        padding: 20px 20px 50px;
        width: 100%;
    }
</style>