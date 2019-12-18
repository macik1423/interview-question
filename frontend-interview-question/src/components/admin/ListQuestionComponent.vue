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
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="question in questions" :key="question.id">
                        <td>{{ question.id }}</td>
                        <td>{{ question.theme.themeType }}</td>
                        <td>{{ question.description }}</td>
                        <td>{{ question.answer }}</td>
                        <td>
                            <button class="btn btn-success" @click="updateQuestionClicked(question.id)">
                                Update
                            </button>
                        </td>
                        <td>
                            <button class="btn btn-warning" @click="deleteQuestionClicked(question.id)">
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div>
                <button class="btn btn-success" @click="addQuestionClicked()">Add</button>
            </div>
        </div>
    </div>
</template>

<script>

export default{
    name: "Questions",
    data() {
        return {
            questions: [],
            message: null,
            isPermission: true
        };
    },
    methods: {
        
    },
    created() {
        this.$store.dispatch('retrieveAdminQuestions')
    }
};
</script>

<style>

</style>