<template>
    <div class="container">
        <h3>All question</h3>
        <div v-if="message" class="alert alert-success">
            {{ message }}
        </div>
        <div class="container">
            <table class="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Theme</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="question in questions" :key="question.id">
                        <td>{{ question.id }}</td>
                        <td>{{ question.theme }}</td>
                        <td>{{ question.description }}</td>
                        <td>
                            <button class="btn btn-warning" @click="deleteQuestionClicked(question.id)">
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
               
            </table>
        </div>
    </div>
</template>

<script>
import QuestionDataService from '../service/QuestionDataService';
export default{
    name: "QuestionList",
    data() {
        return {
            questions: [],
            message: null,
        };
    },
    methods: {
        refreshQuestions() {
            QuestionDataService.retrieveAllQuestions()
                .then(response => {
                    this.questions = response.data;
                });
        }, 
        deleteQuestionClicked(id) {
            QuestionDataService.deleteQuestion()
                .then(response => {
                    response;
                    this.message = `Delete of question ${id} Successful`;
                    this.refreshQuestions();
                })
        }
    },
    created() {
        this.refreshQuestions();
    }
};
</script>

<style>

</style>