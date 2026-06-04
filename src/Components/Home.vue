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

    <main class="layout"
  :style="{
    gridTemplateColumns: isTeacher ? '1fr' : '240px 1fr'
  }">
      <section  v-if="!isTeacher" class="summary-card" >
        <p class="summary-label">Total Problems Solved</p>
        <div class="summary-circle">
          <span>{{ solvedCount }}</span>
          <small>/ {{ totalCount }}</small>
        </div>
      </section>

      <section class="board">
        <article v-for="section in sections" :key="section.name" class="difficulty-card">
          <div class="difficulty-header">
            <div class="header-left">
              <h2>{{ section.name }}</h2>
              <span class="count">{{ section.items.length }} questions</span>
            </div>

            <button  v-if="isTeacher" class="add-btn" type="button" title="Add question">
              +
            </button>
          </div>

          <div class="question-list">
            <div v-for="question in section.items" :key="question.id" class="question-row">
              <button v-if="!isTeacher"
                class="todo-circle"
                :class="{ solved: question.solved }"
                type="button"
                :aria-label="question.solved ? 'Mark unsolved' : 'Mark solved'"
                @click="toggleSolved(question.id)"
              >
                <span v-if="question.solved">✓</span>
              </button>

              <div  class="question-content">
                <p class="question-title" @click="openQuestion(question.id)">{{ question.title }}</p>
                <p class="question-desc">{{ question.description }}</p>
              </div>

              <div class="actions" v-if="isTeacher">
                <button type="button" class="text-btn"> <Pencil :size="18" /></button>
                <button type="button" class="text-btn danger"> <Trash2 :size="18" /></button>
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Pencil, Trash2 } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

function openQuestion(id){
  router.push(`/problem/${id}`)
}
const isTeacher = true

const sections = ref([
  {
    name: 'Easy',
    items: [
      {
        id: 1,
        title: 'Two Sum',
        description: 'Find two numbers that add up to a target value.',
        solved: false,
      },
      {
        id: 2,
        title: 'Palindrome Check',
        description: 'Check whether a string reads the same forward and backward.',
        solved: true,
      },
    ],
  },
  {
    name: 'Medium',
    items: [
      {
        id: 3,
        title: 'Merge Intervals',
        description: 'Combine overlapping intervals into a single range.',
        solved: false,
      },
      {
        id: 4,
        title: 'Longest Substring',
        description: 'Find the longest substring without repeating characters.',
        solved: false,
      },
    ],
  },
  {
    name: 'Hard',
    items: [
      {
        id: 5,
        title: 'LRU Cache',
        description: 'Design a cache that removes least recently used items.',
        solved: false,
      },
      {
        id: 6,
        title: 'Word Ladder',
        description: 'Transform one word into another using shortest steps.',
        solved: false,
      },
    ],
  },
])

const totalCount = computed(() => sections.value.reduce((sum, section) => sum + section.items.length, 0))
const solvedCount = computed(() =>
  sections.value.reduce((sum, section) => sum + section.items.filter((item) => item.solved).length, 0),
)

function toggleSolved(id) {
  for (const section of sections.value) {
    const question = section.items.find((item) => item.id === id)
    if (question) {
      question.solved = !question.solved
      break
    }
  }
}
</script>

<style scoped>
:global(body) {
  margin: 0;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
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
  grid-template-columns: 240px 1fr;
  gap: 24px;
  align-items: start;
}

.summary-card,
.difficulty-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(15, 23, 42, 0.05);
}

.summary-card {
  padding: 24px;
  position: sticky;
  top: 24px;
}

.summary-label {
  margin: 0 0 16px;
  font-size: 14px;
  color: #6b7280;
  text-align: center;
}

.summary-circle {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 10px solid #d1fae5;
  display: grid;
  place-items: center;
  margin: 0 auto 16px;
  text-align: center;
}

.summary-circle span {
  display: block;
  font-size: 42px;
  font-weight: 800;
  line-height: 1;
}

.summary-circle small {
  font-size: 18px;
  color: #6b7280;
}

.board {
  display: grid;
  gap: 18px;
}

.difficulty-card {
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

  .summary-card {
    position: static;
  }
}
</style>
