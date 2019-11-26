<template>
    <div>
        <h3>Add new question</h3>
        <div class="container">
            <form @submit="validateAndSubmit">
                <div v-if="errors.length">
                    <div class="alert alert-warning" v-bind:key="index" v-for="(error, index) in errors">{{error}}</div>
                </div>
                <fieldset class="form-group">
                    <label>Id</label>
                    <input type="text" class="form-control" v-model="id" disabled>
                </fieldset>
                <fieldset class="form-group">
                    <label>Theme</label>
                    <input type="text" class="form-control" v-model="theme">
                </fieldset>
                <fieldset class="form-group">
                    <label>Descritpion</label>
                    <input type="text" class="form-control" v-model="description">
                </fieldset>
                <button class="btn btn-success" type="submit">Save</button>
            </form>
        </div>
    </div>
</template>

<script>
import QuestionDataService from '../service/QuestionDataService';
export default{
    name: "addComponent",
    data() {
        return {
            questions:[],
            theme:'',
            description:'',
            errors: [],
            id: ''
        };
    },
    methods: {
        validateAndSubmit(e) {
            e.preventDefault();
            this.errors=[];
            if(!this.description) {
                this.errors.push("Enter valid values");
            } else if(this.description.length < 2) {
                this.errors.push("Enter atleast 2 characters in description");
            }
            this.create();
        }, 
        create() {
            console.log("create");
            if(this.errors.length === 0) {
                QuestionDataService.createQuestion({theme: this.theme, description: this.description})
                .then(() => {
                    this.$router.push('/questions');
                });
            }
        }
    },
};
</script>