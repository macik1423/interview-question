<template>
    <div> 
        <div class="card" style="width: 100%;">
            <div class="card-header">
                {{ question.description }}
            </div>
            <div class="card-body">
                <!-- pomyslec nad enumem, bez hardkodowania typu -->
                <p class="card-text">{{ question.answer }}</p>
                
            </div>
        </div>
    </div>
</template>

<script>
import QuestionDataService from '../../service/QuestionDataService';
export default {
    data() {
        return {
            question: '',
        };
    },
    computed: {
        id() {
            return this.$route.params.id;//patrzy na routes "/questions/:id" na id
        }
    },
    methods: {
        getQuestion(id) {
            QuestionDataService.retrieveQuestion(id)
                .then(response => {
                    this.question = response.data; 
                });
        }
    },
    created() {
        this.getQuestion(this.id);
    }
}
</script>
<style scoped>
.card {
    margin-top: 20%;
}
</style>