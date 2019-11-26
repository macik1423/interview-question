<template>
    <div>
        <h1>Question application</h1>
        <app-list-question-component></app-list-question-component>
    </div>
</template>

<script>
import ListQuestionComponent from './ListQuestionComponent';
export default {
    name: "QuestionApp",
    components: {
        'app-list-question-component': ListQuestionComponent
    }
};
</script>

<style scoped>

</style>