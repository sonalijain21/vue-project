<template>
  <div class="page">
    <div class="header">
      <h1>{{ problem.title }}</h1>

      <button v-if="isTeacher" class="edit-btn">Edit</button>
    </div>

    <div class="content">
      <div class="description">
        <h2>Description</h2>

        <p>
          {{ problem.description }}
        </p>

        <button class="tutorial-btn">Tutorial</button>
      </div>

      <div class="starter-code">
        <h2>Starter Code</h2>

        <pre
          >{{ problem.code }}
        </pre>
      </div>
    </div>
  </div>
</template>

<script setup>
const isTeacher = true;

const problem = {
  id: 1,
  title: "Two Sum",
  description: "Find two numbers whose sum equals the target.",
  code: `function twoSum(nums, target){

}`,
};
</script>
<style scoped>
.page {
  padding: 40px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.description,
.starter-code {
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 20px;
}

.edit-btn {
  padding: 10px 16px;
}

.tutorial-btn {
  margin-top: 20px;
}

pre {
  white-space: pre-wrap;
}
</style>
