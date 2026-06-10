<template>
  <div class="page">
    <header class="topbar">
      <div>
        <h1>SQL Made Easy</h1>
      </div>

      <button class="profile-btn" type="button" title="Profile">
        <span class="avatar">T</span>
      </button>
    </header>

    <main
      class="layout"
      :style="{
        gridTemplateColumns: isTeacher ? '1fr' : '20em 1fr'
      }"
    >
      <StudentProgress :sections="sections" :isTeacher="isTeacher" />

      <section class="board">
        <div v-if="loading" class="state-box">Loading questions...</div>
        <div v-else-if="errorMsg" class="state-box error">{{ errorMsg }}</div>

        <article
          v-for="section in sections"
          :key="section.name"
          class="difficulty-card"
        >
          <div class="difficulty-header">
            <div class="header-left">
              <h2>{{ section.name }}</h2>
              <span class="count">{{ section.items.length }} questions</span>
            </div>

            <button
              v-if="isTeacher"
              class="add-btn"
              type="button"
              title="Add question"
              @click="goToAddQuestion(section.name)"
            >
              +
            </button>
          </div>

          <div class="question-list">
            <div
              v-for="question in section.items"
              :key="question.id"
              class="question-row"
            >
              <button
                v-if="!isTeacher"
                class="todo-circle"
                :class="{ solved: question.solved }"
                type="button"
                :aria-label="question.solved ? 'Mark unsolved' : 'Mark solved'"
                @click="toggleSolved(question)"
              >
                <span v-if="question.solved">✓</span>
              </button>

              <div class="question-content">
                <p class="question-title" @click="openQuestion(question.id)">
                  {{ question.title }}
                </p>
                <p class="question-desc">{{ question.description }}</p>
              </div>

              <div class="actions" v-if="isTeacher">
                <button
                  type="button"
                  class="text-btn"
                  @click="editQuestion(question.id)"
                >
                  <Pencil :size="18" />
                </button>
                <button
                  type="button"
                  class="text-btn danger"
                  @click="deleteQuestion(question.id)"
                >
                  <Trash2 :size="18" />
                </button>
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Pencil, Trash2 } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import StudentProgress from './features/Student-Progress.vue'
import { supabase } from '../lib/supabase'

type Difficulty = 'Easy' | 'Medium' | 'Hard'

type Problem = {
  id: string
  title: string
  description: string
  tutorial: string | null
  difficulty: Difficulty | null
  solved: boolean
  topic: string | null
  created_at: string
  updated_at: string
}

const router = useRouter()
const isTeacher = true

const questions = ref<Problem[]>([])
const loading = ref(false)
const errorMsg = ref('')

const sections = computed(() => {
  return [
    {
      name: 'Easy',
      items: questions.value.filter((q) => q.difficulty === 'Easy'),
    },
    {
      name: 'Medium',
      items: questions.value.filter((q) => q.difficulty === 'Medium'),
    },
    {
      name: 'Hard',
      items: questions.value.filter((q) => q.difficulty === 'Hard'),
    },
  ]
})

function openQuestion(id: string) {
  router.push(`/problem/${id}`)
}

function goToAddQuestion(difficulty?: string) {
  if (difficulty) {
    router.push({ path: '/teacher/question/new', query: { difficulty } })
    return
  }
  router.push('/teacher/question/new')
}

function editQuestion(id: string) {
  router.push(`/teacher/question/${id}/edit`)
}

async function deleteQuestion(id: string) {
  const ok = window.confirm('Delete this question?')
  if (!ok) return

  const { error } = await supabase.from('problems').delete().eq('id', id)

  if (error) {
    errorMsg.value = error.message
    return
  }

  await loadQuestions()
}

async function toggleSolved(question: Problem) {
  const { error } = await supabase
    .from('problems')
    .update({
      solved: !question.solved,
      updated_at: new Date().toISOString(),
    })
    .eq('id', question.id)

  if (error) {
    errorMsg.value = error.message
    return
  }

  await loadQuestions()
}

async function loadQuestions() {
  loading.value = true
  errorMsg.value = ''

  const { data, error } = await supabase
    .from('problems')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    errorMsg.value = error.message
    questions.value = []
    loading.value = false
    return
  }

  questions.value = (data ?? []) as Problem[]
  loading.value = false
}

onMounted(loadQuestions)
</script>

<style scoped>
:global(body) {
  margin: 0;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    sans-serif;
  background: #f7f8fc;
  color: #1f2937;
}

.page {
  min-height: 100vh;
  padding: 24px;
  box-sizing: border-box;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

h1 {
  margin: 0;
  font-size: 28px;
}

.profile-btn {
  width: 48px;
  height: 48px;
  border: 0;
  border-radius: 50%;
  background: #111827;
  color: white;
  display: grid;
  place-items: center;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(17, 24, 39, 0.18);
}

.avatar {
  font-weight: 700;
}

.layout {
  display: grid;
  grid-template-columns: 20em 1fr;
  gap: 24px;
  align-items: start;
}

.board {
  display: grid;
  gap: 18px;
}

.state-box {
  padding: 16px;
  border-radius: 14px;
  background: white;
  border: 1px solid #e5e7eb;
}

.state-box.error {
  color: #b91c1c;
}

.difficulty-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(15, 23, 42, 0.05);
  padding: 20px;
}

.difficulty-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.header-left h2 {
  margin: 0;
  font-size: 22px;
}

.count {
  display: inline-block;
  margin-top: 4px;
  font-size: 13px;
  color: #6b7280;
}

.add-btn {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid #d1d5db;
  background: #f9fafb;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
}

.question-list {
  display: grid;
  gap: 12px;
}

.question-row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 14px;
  align-items: center;
  padding: 14px;
  border: 1px solid #eef2f7;
  border-radius: 16px;
  background: #fcfcfd;
}

.todo-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid #9ca3af;
  background: transparent;
  cursor: pointer;
  display: grid;
  place-items: center;
  font-size: 16px;
}

.todo-circle.solved {
  background: #22c55e;
  border-color: #22c55e;
  color: white;
}

.question-content {
  min-width: 0;
  cursor: pointer;
}

.question-title {
  margin: 0 0 4px;
  font-weight: 700;
}

.question-desc {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
}

.actions {
  display: flex;
  gap: 10px;
  margin-left: auto;
}

.text-btn {
  border: 0;
  background: transparent;
  color: #2563eb;
  font-weight: 600;
  cursor: pointer;
}

.text-btn.danger {
  color: #dc2626;
}

@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;
  }
}
</style>