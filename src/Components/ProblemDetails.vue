<template>
  <div class="page">
    <nav class="breadcrumb">
      <span class="crumb" @click="goHome">Easy</span>
      <span class="sep">›</span>
      <span class="current">{{ problem.title }}</span>
    </nav>

    <div class="header">
      <div>
        <p class="meta">Problem #{{ problem.id }}</p>
        <h1 v-if="!isEditing">{{ problem.title }}</h1>
        <input v-else v-model="problem.title" class="title-input" />
      </div>

      <button
        v-if="isTeacher"
        class="icon-btn"
        type="button"
        :title="isEditing ? 'Stop editing' : 'Edit question'"
        @click="toggleEdit"
      >
        ✏️
      </button>
    </div>

    <section class="content" :class="{ teacherView: isTeacher }">
      <article class="description-card">
        <h2>Description</h2>

        <p v-if="!isEditing">
          {{ problem.description }}
        </p>
        <textarea
          v-else
          v-model="problem.description"
          class="edit-textarea"
          rows="8"
        />

        <button
          v-if="!isTeacher && !showTutorial"
          class="tutorial-btn"
          type="button"
          @click="toggleTutorial"
        >
          📘 Solution
        </button>

        <div v-if="isTeacher || showTutorial" class="tutorial-section">
          <div class="tutorial-section-head">
            <h3>Tutorial</h3>
            <span class="tutorial-badge">Teacher Article</span>
          </div>

          <p v-if="!isEditing">
            {{ problem.tutorial }}
          </p>

          <textarea
            v-else
            v-model="problem.tutorial"
            class="edit-textarea"
            rows="10"
          />

          <button
            v-if="!isTeacher && showTutorial"
            class="tutorial-btn tutorial-hide"
            type="button"
            @click="toggleTutorial"
          >
            Hide Solution
          </button>
        </div>
      </article>

      <SQLPlayground />
    </section>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import SQLPlayground from './SQLPlayground.vue'

const router = useRouter()
const isTeacher = false
const isEditing = ref(false)
const showTutorial = ref(false)

const problem = reactive({
  id: 1,
  title: 'Two Sum',
  description:
    'Find two numbers whose sum equals the target. Students can read the problem, write SQL, and test their solution in the editor area.',
  tutorial:
    'This tutorial explains the idea behind the problem in simple steps. The teacher can write a full article here and students can read it when they click the tutorial button.\n\nStep 1: Understand the target.\nStep 2: Find matching rows.\nStep 3: Return the answer in the required format.',
  starterCode: 'SELECT *\nFROM Employees;'
})

function goHome() {
  router.push('/')
}

function toggleTutorial() {
  showTutorial.value = !showTutorial.value
}

function toggleEdit() {
  isEditing.value = !isEditing.value
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding: 28px;
  background: #f7f8fc;
  color: #111827;
  box-sizing: border-box;
}

.breadcrumb {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  box-shadow: 0 6px 20px rgba(15, 23, 42, 0.05);
  margin-bottom: 18px;
}

.crumb {
  color: #2563eb;
  font-weight: 600;
  cursor: pointer;
}

.crumb:hover {
  text-decoration: underline;
}

.sep {
  color: #9ca3af;
}

.current {
  color: #111827;
  font-weight: 700;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
}

.meta {
  margin: 0 0 6px;
  font-size: 13px;
  color: #6b7280;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  font-size: 34px;
  line-height: 1.1;
}

.title-input {
  width: min(520px, 100%);
  padding: 12px 14px;
  border: 1px solid #d1d5db;
  border-radius: 14px;
  font-size: 28px;
  font-weight: 700;
  background: #fff;
}

.icon-btn {
  width: 46px;
  height: 46px;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  background: #ffffff;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.05);
}

.content {
  display: grid;
  grid-template-columns: 1.15fr 0.95fr;
  gap: 22px;
  align-items: start;
}

.content.teacherView {
  grid-template-columns: 1fr;
}

.description-card,
.editor-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 22px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
}

.description-card {
  padding: 28px;
  min-height: 360px;
}

.description-card h2,
.editor-card h2 {
  margin: 0 0 16px;
  font-size: 24px;
}

.description-card p {
  margin: 0;
  font-size: 17px;
  line-height: 1.75;
  color: #374151;
  max-width: 58ch;
}

.edit-textarea {
  width: 100%;
  border: 1px solid #dbe2ea;
  border-radius: 16px;
  padding: 14px;
  font-family: inherit;
  font-size: 15px;
  line-height: 1.7;
  color: #111827;
  background: #ffffff;
  box-sizing: border-box;
  resize: vertical;
}

.tutorial-btn {
  margin-top: 22px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  border: none;
  border-radius: 999px;
  background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%);
  color: #1e293b;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.15);
  transition: all 0.25s ease;
}

.tutorial-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(99, 102, 241, 0.25);
  background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%);
}

.tutorial-hide {
  margin-top: 18px;
}

.tutorial-section {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
}

.tutorial-section-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.tutorial-section h3 {
  margin: 0;
  font-size: 20px;
  color: #111827;
}

.tutorial-badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 999px;
  background: #eef2ff;
  color: #4f46e5;
  font-size: 12px;
  font-weight: 700;
}

.tutorial-section p {
  margin: 0;
  font-size: 16px;
  line-height: 1.8;
  color: #374151;
  white-space: pre-line;
}

@media (max-width: 960px) {
  .content {
    grid-template-columns: 1fr;
  }

  .description-card {
    min-height: auto;
  }
}
</style>