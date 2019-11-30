<template>
    <div>
        <header>
            <h2>Przykładowe pytania rekrutacyjne z javy i nie tylko...</h2>
        </header>
        <div class="container">
            <nav>
                <ul>
                    <li>
                        Dodaj
                    </li>
                    <li>
                        Quiz
                    </li>
                    <li @click="goToAdmin()">
                        Admin 
                    </li>
                </ul>
            </nav>
            <div class="question-card">
                <ul v-for="question in questions" :key="question.id">
                    <li>
                        <div class="card" style="width: 100%;">
                            <div class="card-body">
                                <!-- pomyslec nad enumem, bez hardkodowania typu -->
                                <h2 v-if="question.theme.type == 'java'"><font-awesome-icon :icon="['fab', 'java']"/></h2>
                                <h2 v-if="question.theme.type == 'spring'"><font-awesome-icon :icon="['fas', 'seedling']"/></h2>
                                <p class="card-text">{{ question.description }}</p>
                                <button @click="goToQuestion(question.id)" class="btn btn-primary">Sprawdz odpowiedz</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <footer>
            footer
        </footer>
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
        goToAdmin() {
            this.$router.push(`/admin`);
        }
    },
    created() {
        this.refreshQuestions();
    }
}
</script>

<style scoped>
.container {
    display: grid;
    grid-template-areas: "n q l"
                         "f f f"   
}
ul {
    list-style: none;
    padding: 0;
}
.question-card {
    grid-area: q;
}
header {
    text-align: center;
}
</style>