<template>
    <div>
        <h2>Przykładowe pytania rekrutacyjne z javy i nie tylko...</h2>
        <ul v-for="question in questions" :key="question.id">
            <li>
                <div class="card" style="width: 100%;">
                    <div class="card-body">
                        <!-- pomyslec nad enumem, bez hardkodowania typu -->
                        <h2 v-if="question.theme.type == 'java'"><font-awesome-icon :icon="['fab', 'java']"/></h2>
                        <h2 v-if="question.theme.type == 'spring'"><font-awesome-icon :icon="['fas', 'seedling']"/></h2>
                        <p class="card-text">{{ question.description }}</p>
                        <button @click="goToQuestion(question.id)" class="btn btn-primary">Do pytania</button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import QuestionDataService from '../service/QuestionDataService';
export default {
    data() {
        return {
            questions: [],
        }
    },
    methods: {
        refreshQuestions() {
            QuestionDataService.retrieveAllQuestions()
                .then(response => {
                    this.questions = response.data;
                });
        }, 
        goToQuestion(id) {
            this.$router.push(`/questions/${id}`);
        }, 
    },
    created() {
        this.refreshQuestions();
    }
}
</script>
<style scoped>
ul {
    list-style: none;
    padding: 0;
}
</style>